import { API }from '../config';
import axios from 'axios';


export const emailContactForm = (data) => {

  let emailEndpoint;

  if (data.authorEmail) {
    emailEndpoint = `${API}/api/contact-blog-author`
  } else {
    emailEndpoint = `${API}/api/contact`
  }

  return axios.post(`${emailEndpoint}`, data)
    .then(res => {
      return res.data
    })
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