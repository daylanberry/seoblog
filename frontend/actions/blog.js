import { API }from '../config';
import axios from 'axios';
import queryString from 'query-string';

export const createBlog = (blog, token) => {

  return axios.post(`${API}/api/blog`, blog, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json'
    }
  })
    .then(res => res.data)
    .catch(err => err.response.data)
}


export const listBlogsWithCategoriesAndTags = (skip, limit) => {
  const data = { skip, limit }

  return axios.post(`${API}/api/blogs-categories-tags`, data)
    .then(res => res.data)
    .catch(err => err.response.data)
}

export const singleBlog = (slug) => {

  return axios.get(`${API}/api/blog/${slug}`)
    .then(res => res.data)
    .catch(err => err.response.data)
}

export const relatedBlogs = (blog, limit) => {

  return axios.post(`${API}/api/blogs/related`, {blog, limit})
    .then(res => res.data)
    .catch(err => console.log(err))
}


export const list = () => {

  return axios.get(`${API}/api/blogs`)
    .then(res => res.data)
    .catch(err => err)
}

export const removeBlog = (slug, token) => {

  return axios.delete(`${API}/api/blog/${slug}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
      }
    })
    .then(res => res.data)
    .catch(err => err)
}


export const updateBlog = (blog, token, slug) => {

  return axios.put(`${API}/api/blog/${slug}`, blog, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json'
    }
  })
    .then(res => res.data)
    .catch(err => err.response.data)
}

export const listSearch = (params) => {
  let query = queryString.stringify(params)

  return axios.get(`${API}/api/blogs/search?${query}`)
    .then(res => res.data)
    .catch(err => err)
}

