import { useState, useEffect } from 'react';
import { signin, authenticate, isAuth } from '../../actions/auth';
import Router from 'next/router';
import Link from 'next/link';
import LoginGoogle from './LoginGoogle';

const SigninComponent = () => {

  const [values, setValues] = useState({
    email: '',
    password: '',
    error: '',
    loading: false,
    message: '',
    showForm: true
  });

  useEffect(() => {

    if (isAuth()) {
      Router.replace('/')
    }
  })

  const { email, password, error, loading, message, showForm } = values;

  const handleSubmit = (e) => {
    e.preventDefault()

    setValues({...values, loadng: true, error: false})
    const user = { email, password }


    signin(user)
      .then((data) => {

        if (!data || data && data.error) {
          setValues({...values, error: data.error, loading: false})
        } else {
          // save user token to cookie
          // save user info to localstorage
          // authenticate user
          authenticate(data, () => {
            if (isAuth() && isAuth().role === 1) {
              Router.push('/admin')
            } else {
              Router.push('/user')
            }
          })
        }
      })

  };

  const handleChange = (name) => e => {

    setValues({
      ...values,
      error: false,
      [name]: e.target.value
    })

  };

  const showLoading = () => {

    return loading ? (
      <div className='alert alert-info'>loading...</div>
    ) : null
  }

  const showError = () => {

    return error ? (
      <div className='alert alert-danger'>{error}</div>
    ) : null
  }

  const showMessage = () => {

    return message ? (
      <div className='alert alert-info'>{message}</div>
    ): null
  }


  const signinForm = () => {

    return (
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <input
            type='email'
            className='form-control'
            placeholder='Type your email'
            value={email}
            onChange={handleChange('email')}
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            className='form-control'
            placeholder='Type your password'
            value={password}
            onChange={handleChange('password')}
          />
        </div>
        <div>
          <button className='btn btn-primary'>Signin</button>
        </div>
      </form>
    )
  }

  return (
    <>
      {showError()}
      {showLoading()}
      {showMessage()}
      <LoginGoogle />
      {showForm && signinForm()}
      <br/>
      <Link href='/auth/password/forgot'>
        <a className='btn btn-outline-danger btn-sm'>Forgot Password</a>
      </Link>
    </>
  )
}

export default SigninComponent;