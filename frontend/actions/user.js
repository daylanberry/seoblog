import { API }from '../config';
import axios from 'axios';

export const userPublicProfile = (username) => {
  return axios.get(`${API}/api/users/${username}`)
    .then(res => res.data)
    .catch(err => err.response.data)
}


export const getProfile = (token) => {

  return axios.get(`${API}/api/user/profile`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
    .then(res => res.data)
    .catch(err => err.response.data)
}


export const updateProfile = (token, user) => {

  return axios.put(`${API}/api/user/update`, user, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
    .then(res => res.data)
    .catch(err => err)
}
