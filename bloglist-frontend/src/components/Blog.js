import React from 'react'
import PropTypes from 'prop-types'

class Blog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false
    }
  }

  toggleVisibility = () => {
    this.setState({ visible: !this.state.visible })
  }

  render() {
    const blogStyle = {
      paddingLeft: 2,
      border: 'solid',
      borderWidth: 2,
      marginBottom: 1
    }

    const hideIfVisible = { display: this.state.visible ? 'none' : '', lineHeight: 0, height: 10 }
    const showIfVisible = { display: this.state.visible ? '' : 'none' }

    const showDelete = { display: this.props.showDelete ? '' : 'none' }

    return (
      <div style={blogStyle}>
        <div style={hideIfVisible} className='titleAndAuthor'>
          <p onClick={this.toggleVisibility} className='titleAndAuthorButton'>{this.props.blog.title} {this.props.blog.author}</p>
        </div>
        <div style={showIfVisible} className='moreInfoAboutBlog'>
          <p onClick={this.toggleVisibility}>{this.props.blog.title} {this.props.blog.author}</p>
          <p>
            <a href={this.props.blog.url} target="_blank">{this.props.blog.url}</a><br />
            {this.props.blog.likes}<button onClick={this.props.like}>like</button><br />
            added by {this.props.blog.user.name}<br />
          </p>
          <div style={showDelete}>
            <button onClick={this.props.delete}>delete</button>
          </div>

        </div>
      </div>
    )
  }
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired
}

export default Blog