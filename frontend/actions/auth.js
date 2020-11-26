import { API }from '../config';
import axios from 'axios';
import cookie from 'js-cookie';

export const signup = async (user) => {

  return axios.post(`${API}/api/signup`, user)
    .then(res => res.data)
    .catch(e => e.response.data)
}

export const signin = (user) => {

  return axios.post(`${API}/api/signin`, user)
    .then(res => res.data)
    .catch(e => e.response.data)
}

export const signout = (next) => {

  removeCookie('token')
  removeLocalStorage('user')
  next()

  return axios.get(`${API}/api/signout`)
    .then(() => res.data)
    .catch(e => console.log(e))
}


export const setCookie = (key, value) => {

  if (process.browser) {

    cookie.set(key, value, {
      expires: 1
    })
  }
};


export const removeCookie = (key) => {

  if (process.browser) {
    cookie.remove(key)
  }
};

export const getCookie = (key) => {

  if (process.browser) {
    return cookie.get(key)
  }
};

export const setLocalStorage = (key, value) => {

  if (process.browser) {
    localStorage.setItem(key, JSON.stringify(value))
  }
}


export const removeLocalStorage = (key) => {

  if (process.browser) {
    localStorage.removeItem(key)
  }
}

export const authenticate = (data, next) => {
  setCookie('token', data.token)
  setLocalStorage('user', data.user)
  next()
}


export const isAuth = () => {

  if (process.browser) {
    const cookieChecked = getCookie('token')
    if (cookieChecked) {
      if (localStorage.getItem('user')) {

        return JSON.parse(localStorage.getItem('user'))
      } else {

        return false
      }
    }
  }
}