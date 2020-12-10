import { API }from '../config';
import axios from 'axios';
import queryString from 'query-string';
import { isAuth, handleResponse } from './auth';

export const createBlog = (blog, token) => {

  let createBlogEndpoint;

  if (isAuth() && isAuth().role === 1) {
    createBlogEndpoint = `${API}/api/blog`
  } else if (isAuth() && isAuth().role === 0) {
    createBlogEndpoint = `${API}/api/user/blog`
  }

  return axios.post(`${createBlogEndpoint}`, blog, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json'
    }
  })
    .then(res => {
      handleResponse(res)
      return res.data
    })
    .catch(err => {
      if (err && err.response && err.response.data) {
        handleResponse(err.response)
        return err.response.data
      } else {
        return {
          error: 'something went wrong '
        }
      }
    })
}


export const listBlogsWithCategoriesAndTags = (skip, limit) => {
  const data = { skip, limit }

  return axios.post(`${API}/api/blogs-categories-tags`, data)
    .then(res => res.data)
    .catch(err => {
      if (err && err.response && err.response.data) {
        return err.response.data
      } else {
        return {
          error: 'something went wrong '
        }
      }
    })
}

export const singleBlog = (slug) => {

  return axios.get(`${API}/api/blog/${slug}`)
    .then(res => res.data)
    .catch(err => {
      if (err && err.response && err.response.data) {
        return err.response.data
      } else {
        return {
          error: 'something went wrong '
        }
      }
    })
}

export const relatedBlogs = (blog, limit) => {

  return axios.post(`${API}/api/blogs/related`, {blog, limit})
    .then(res => res.data)
    .catch(err => {
      if (err && err.response && err.response.data) {
        return err.response.data
      } else {
        return {
          error: 'something went wrong '
        }
      }
    })
}


export const list = (username) => {

  let listBlogEndpoint;

  if (username) {
    listBlogEndpoint = `${API}/api/${username}/blogs`
  } else {
    listBlogEndpoint = `${API}/api/blogs`
  }

  return axios.get(`${listBlogEndpoint}`)
    .then(res => res.data)
    .catch(err => {
      if (err && err.response && err.response.data) {
        return err.response.data
      } else {
        return { error: 'something went wrong '}
      }
    })
}

export const removeBlog = (slug, token) => {

  let deleteBlogEndpoint;

  if (isAuth() && isAuth().role === 1) {
    deleteBlogEndpoint = `${API}/api/blog/${slug}`
  } else if (isAuth() && isAuth().role === 0) {
    deleteBlogEndpoint = `${API}/api/user/blog/${slug}`
  }

  return axios.delete(`${deleteBlogEndpoint}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
      }
    })
    .then(res => res.data)
    .catch(err => {
      if (err && err.response && err.response.data) {
        return err.response.data
      } else {
        return {
          error: 'something went wrong '
        }
      }
    })
}


export const updateBlog = (blog, token, slug) => {

  let updateBlogEndpoint;

  if (isAuth() && isAuth().role === 1) {
    updateBlogEndpoint = `${API}/api/blog/${slug}`
  } else if (isAuth() && isAuth().role === 0) {
    updateBlogEndpoint = `${API}/api/user/blog/${slug}`
  }

  return axios.put(`${updateBlogEndpoint}`, blog, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json'
    }
  })
    .then(res => res.data)
    .catch(err => {
      if (err && err.response && err.response.data) {
        return err.response.data
      } else {
        return {
          error: 'something went wrong '
        }
      }
    })
}

export const listSearch = (params) => {
  let query = queryString.stringify(params)

  return axios.get(`${API}/api/blogs/search?${query}`)
    .then(res => res.data)
    .catch(err => {
      if (err && err.response && err.response.data) {
        return err.response.data
      } else {
        return {
          error: 'something went wrong '
        }
      }
    })
}

