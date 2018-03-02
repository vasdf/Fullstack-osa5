import React from 'react'
import { mount } from 'enzyme'
import App from './App'
import LoginForm from './components/LoginForm'
import Blog from './components/Blog'
jest.mock('./services/blogs')
import blogService from './services/blogs'

describe('<App />', () => {
  let app

  

  describe('when user is not logged in', () => {
    beforeEach(() => {
      app = mount(<App />)
    })

    it('only login form is rendered', () => {
      app.update()

      const loginComponents = app.find(LoginForm)
      expect(loginComponents.length).toBe(1)

      const blogComponents = app.find(Blog)
      expect(blogComponents.length).toBe(0)
    })
  })

  describe('when user is logged in', () => {
    beforeEach(() => {
      const user = {
        username: 'Testaaja3',
        token: '123321123312',
        name: 'Testi3'
      }

      localStorage.setItem('loggedUser', JSON.stringify(user))

      app = mount(<App />)
    })

    it('all blogs are rendered', () => {
      app.update()

      const blogComponents = app.find(Blog)
      expect(blogComponents.length).toBe(blogService.blogs.length)
    })
  })

})