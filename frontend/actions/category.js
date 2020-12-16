import { API }from '../config';
import axios from 'axios';

export const create = (category, token) => {

  return axios.post(`${API}/api/category`, category, {
    headers: {
      'Authorization': `Bearer ${token}`
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


export const getCategories = () => {

  return axios.get(`${API}/api/categories`)
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


export const singleCategory = (slug) => {

  return axios.get(`${API}/api/category/${slug}`)
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


export const removeCategory = (slug, token) => {

  return axios.delete(`${API}/api/category/${slug}`, {
    headers: {
      'Authorization': `Bearer ${token}`
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