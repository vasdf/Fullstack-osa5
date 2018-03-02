import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const create = async (newBlog) => {
  const config = {
    headers: { 'authorization': token}
  }

  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const update = (id, newBlog) => {
  const request = axios.put(`${baseUrl}/${id}`, newBlog)
  return request.then(response => response.data)
}

const deleteBlog = (id) => {
  const config = {
    headers: { 'authorization': token}
  }

  const response = axios.delete(`${baseUrl}/${id}`, config)
  return response.then(response => response.data)
}

export default { getAll, setToken, create, update, deleteBlog }