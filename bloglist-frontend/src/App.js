import React from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import CreateBlogForm from './components/CreateBlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      username: '',
      password: '',
      user: null,
      notification: null,
      notification_type: null,
      newBlog: {
        title: '',
        author: '',
        url: ''
      }
    }
  }

  componentDidMount() {
    blogService.getAll().then(blogs =>
      this.setState({
        blogs: blogs.sort((b1, b2) => {
          if (b1.likes > b2.likes) {
            return -1
          }
          if (b1.likes < b2.likes) {
            return 1
          }

          return 0
        })
      })
    )

    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.setState({ user })
      blogService.setToken(user.token)
    }
  }

  login = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })

      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
      this.setState({
        username: '',
        password: '',
        user,
        notification: 'You are logged in',
        notification_type: 'success'
      })

      setTimeout(() => {
        this.setState({
          notification: null,
          notification_type: null
        })
      }, 2000)

    } catch (exception) {
      this.setState({
        notification: 'wrong username or password',
        notification_type: 'error'
      })

      setTimeout(() => {
        this.setState({
          notification: null,
          notification_type: null
        })
      }, 5000)
    }
  }

  addBlog = (event) => {
    event.preventDefault()
    this.createBlogForm.toggleVisibility()

    const newBlog = this.state.newBlog

    blogService
      .create(newBlog)
      .then(newBlog => {
        this.setState({
          blogs: this.state.blogs.concat(newBlog),
          newBlog: {
            title: '',
            author: '',
            url: ''
          },
          notification: `A new blog ${newBlog.title} by ${newBlog.author} added`,
          notification_type: 'success'
        })
        setTimeout(() => {
          this.setState({
            notification: null,
            notification_type: null
          })
        }, 5000)
      })
  }

  like = (id) => {
    return () => {
      const blog = this.state.blogs.find(blog => blog.id === id)
      const updatedBlog = {
        user: blog.user._id,
        likes: blog.likes + 1,
        author: blog.author,
        title: blog.title,
        url: blog.url
      }

      blogService
        .update(id, updatedBlog)
        .then(updatedBlog => {
          updatedBlog.id = updatedBlog._id
          this.setState({
            blogs: this.state.blogs.map(blog => blog.id !== id ? blog : updatedBlog)
          })
        })
    }
  }

  delete = (id) => {
    return () => {
      const result = window.confirm("Do you really want to delete")

      if (result) {

        blogService
          .deleteBlog(id)
          .then(response => {
            this.setState({
              blogs: this.state.blogs.filter(blog => blog.id !== id)
            })
          })
          .catch(error => {
            this.setState({ notification: 'You are not allowed to delete that', notification_type: 'error' })
            setTimeout(() => {
              this.setState({
                notification: null,
                notification_type: null
              })
            }, 5000)
          })
      }
    }
  }

  handleLoginFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleLogOut = () => {
    this.setState({
      user: null,
      notification: 'You are logged out',
      notification_type: 'success'
    })
    window.localStorage.removeItem('loggedUser')
    setTimeout(() => {
      this.setState({
        notification: null,
        notification_type: null
      })
    }, 5000)
  }

  handleCreateBlogFieldChange = (event) => {
    const newBlog = this.state.newBlog
    newBlog[event.target.name] = event.target.value

    this.setState({ newBlog })
  }

  showDelete = (blog) => {
    if (blog.user === undefined || blog.user === null) {
      return true
    }

    if (blog.user.username === this.state.user.username) {
      return true
    }
    return false
  }

  render() {
    const blogListForm = () => (
      <div>
        <h2>blogs</h2>
        {this.state.blogs.map(blog =>
          <Blog key={blog.id} blog={blog} like={this.like(blog.id)} delete={this.delete(blog.id)} showDelete={this.showDelete(blog)}/>
        )}
      </div>
    )

    if (this.state.user === null) {
      return (
        <div>
          <Notification message={this.state.notification} type={this.state.notification_type} />
          <LoginForm
            onSubmit={this.login}
            handleChange={this.handleLoginFieldChange}
            username={this.state.username}
            password={this.state.password}
          />
        </div>
      )
    }

    return (
      <div>
        <Notification message={this.state.notification} type={this.state.notification_type} />

        <p>{this.state.user.name} logged in <button onClick={this.handleLogOut}>Logout</button> </p>

        <Togglable buttonLabel='create new blog' ref={component => this.createBlogForm = component}>
          <CreateBlogForm
            onSubmit={this.addBlog}
            handleChange={this.handleCreateBlogFieldChange}
            title={this.state.newBlog.title}
            author={this.state.newBlog.author}
            url={this.state.newBlog.url}
          />
        </Togglable>
        {blogListForm()}
      </div>
    );
  }
}

export default App;
