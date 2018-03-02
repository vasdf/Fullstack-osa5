let token = null

const blogs = [
  {
    id: '5a422a851b54a676234d17f7',
    title: 'Testiblog_1_title',
    author: 'Testiblog_1_author',
    url: 'Testiblog_1_url',
    likes: '123',
    user: {
      _id: '5a437a9e514ab7f168ddf138',
      username: 'Testaaja1',
      name: 'Testi1'
    }
  },
  {
    id: '5a421e21e0b8b04a45638211',
    title: 'Testiblog_2_title',
    author: 'Testiblog_2_author',
    url: 'Testiblog_2_url',
    likes: '456',
    user: {
      _id: '5a437a9e514ab7f168ddf138',
      username: 'Testaaja1',
      name: 'Testi1'
    }
  },
  {
    id: '5a451e30b5ffd44a58fa70ab',
    title: 'Testiblog_3_title',
    author: 'Testiblog_3_author',
    url: 'Testiblog_3_url',
    likes: '321',
    user: {
      _id: '5a451df7571c224a31b5c8ce',
      username: 'Testaaja2',
      name: 'Testi2'
    }
  }
]

const getAll = () => {
  return Promise.resolve(blogs)
}

const setToken = () => {

}

export default { getAll, blogs, setToken }