import { API }from '../config';
import axios from 'axios';

export const create = (category, token) => {

  return axios.post(`${API}/api/category`, category, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
    .then(res => res.data)
    .catch(err => err.response)
}


export const getCategories = () => {

  return axios.get(`${API}/api/categories`)
    .then(res => res.data)
    .catch(err => err.response)
}


export const singleCategory = (slug) => {

  return axios.get(`${API}/api/category/${slug}`)
    .then(res => res.data)
    .catch(err => err.response)
}


export const removeCategory = (slug, token) => {

  return axios.delete(`${API}/api/category/${slug}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
    .then(res => res.data)
    .catch(err => err.response)
}