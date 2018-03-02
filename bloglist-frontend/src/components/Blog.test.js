import React from 'react'
import { shallow } from 'enzyme'
import Blog from './Blog'

describe('<Blog />', () => {
  let blogComponent

  beforeEach(() => {
    const blog = {
      title: 'Testi',
      author: 'Testaaja',
      likes: '12345',
      user: { username: 'Testikäyttäjä', name: 'Testinimi'}
    }

    blogComponent = shallow(<Blog blog={blog} />)
  })

  it('only title and author displayed by default', () => {
    const moreInfoAboutBlogDiv = blogComponent.find('.moreInfoAboutBlog')
    expect(moreInfoAboutBlogDiv.getElement().props.style).toEqual({ display: 'none' })

    const titleAndAuthorDiv = blogComponent.find('.titleAndAuthor')
    expect(titleAndAuthorDiv.text()).toContain('Testi')
    expect(titleAndAuthorDiv.text()).toContain('Testaaja')
  })

  it('after clicking title all the details are displayed', () => {
    const titleAndAuthorButton = blogComponent.find('.titleAndAuthorButton')
    titleAndAuthorButton.simulate('click')

    const moreInfoAboutBlogDiv = blogComponent.find('.moreInfoAboutBlog')
    expect(moreInfoAboutBlogDiv.getElement().props.style).toEqual({ display: '' })

    expect(moreInfoAboutBlogDiv.text()).toContain('Testinimi')
    expect(moreInfoAboutBlogDiv.text()).toContain('12345')
    expect(moreInfoAboutBlogDiv.text()).toContain('Testi')
    expect(moreInfoAboutBlogDiv.text()).toContain('Testaaja')
  })
})