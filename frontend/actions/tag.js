import { API }from '../config';
import axios from 'axios';
import { handleResponse } from './auth'

export const create = (tag, token) => {

  return axios.post(`${API}/api/tag`, tag, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
    .then(res => {
      handleResponse(res)
      return res.data
    })
    .catch(err => {
      if (err.response && err.response.data) {
        handleResponse(err.response)
        return err.response.data
      }
    })
}


export const getTags = () => {

  return axios.get(`${API}/api/tags`)
    .then(res => {
      handleResponse(res)
      return res.data
    })
    .catch(err => err.response)
}


export const singleTag = (slug) => {

  return axios.get(`${API}/api/tag/${slug}`)
    .then(res => res.data)
    .catch(err => err.response)
}


export const removeTag = (slug, token) => {

  return axios.delete(`${API}/api/tag/${slug}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
    .then(res => res.data)
    .catch(err => err.response)
}