import { API }from '../config';
import axios from 'axios';

export const userPublicProfile = (username) => {

  return axios.get(`${API}/api/users/${username}`)
    .then(res => res.data)
    .catch(err => err.response.data)
}
