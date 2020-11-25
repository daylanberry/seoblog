import fetch from 'isomorphic-fetch';
import { API }from '../config';
import axios from 'axios'

// export const signup = (user) => {

//   return fetch(`${API}/api/signup`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: user
//   })
//   .then(response => {
//     return response.json()
//   })
//   .catch(err => err)
// }

export const signup = async (user) => {

  return axios.post(`${API}/api/signup`, user)
    .then(res => res.json())
    .catch(e => e)

}