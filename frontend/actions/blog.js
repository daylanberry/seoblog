import { API }from '../config';
import axios from 'axios';

export const createBlog = (blog, token) => {

  return axios.post(`${API}/api/blog`, blog, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json'
    }
  })
    .then(res => res.data)
    .catch(err => err.response)
}