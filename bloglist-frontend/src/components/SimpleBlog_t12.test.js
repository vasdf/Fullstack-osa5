import React from 'react'
import { shallow } from 'enzyme'
import Blog from './SimpleBlog_t12'

describe('<SimpleBlog />', () => {
  it('renders title, author and likes', () => {
    const blog = {
      title: 'Testi',
      author: 'Testaaja',
      likes: '123123'
    }

    const blogComponent = shallow(<Blog blog={blog} />)
    const titleAndAuthorDiv = blogComponent.find('.titleAndAuthor')

    expect(titleAndAuthorDiv.text()).toContain(blog.title)
    expect(titleAndAuthorDiv.text()).toContain(blog.author)

    
    const likesDiv = blogComponent.find('.likes')
  
    expect(likesDiv.text()).toContain('123123')
  })

  it('clicking the like button twice calls event handler twice', () => {
    const blog = {
      title: 'Testi',
      author: 'Testaaja',
      likes: '123321'
    }

    const mockHandler = jest.fn()

    const blogComponent = shallow(<Blog blog={blog} onClick={mockHandler} />)

    const button = blogComponent.find('button')
    button.simulate('click')
    button.simulate('click')

    expect(mockHandler.mock.calls.length).toBe(2)
  })
})