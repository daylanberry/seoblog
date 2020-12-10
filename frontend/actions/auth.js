import { API }from '../config';
import axios from 'axios';
import cookie from 'js-cookie';
import Router from 'next/router';

export const handleResponse = (response) => {

  if (response.status === 401) {
    return signout(() => {
      Router.push({
        pathname: '/signin',
        query: {
          message: 'Your session is expired. Please sign in'
        }
      })
    })
  } else {
    return
  }
}

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


export const updateUser = (user, next) => {

  if (process.browser) {
    if (localStorage.getItem('user')) {
      let auth = JSON.parse(localStorage.getItem('user'));
      auth = user;
      localStorage.setItem('user', JSON.stringify(auth))
      next();
    }
  }
}


export const forgotPassword = email => {
  return axios.put(`${API}/api/forgot-password`, {email})
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


export const resetPassword = (resetInfo) => {

  return axios.put(`${API}/api/reset-password`, resetInfo)
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