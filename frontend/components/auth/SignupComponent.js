import { useState, useEffect } from 'react';
import { signup, isAuth, preSignup } from '../../actions/auth';
import Router from 'next/router';
import Link from 'next/link'

const SignupComponent = () => {

  const [values, setValues] = useState({
    name: '',
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

  const { name, email, password, error, loading, message, showForm } = values;

  const handleSubmit = (e) => {
    e.preventDefault()

    setValues({...values, loadng: true, error: false})
    const user = { name, email, password }


    preSignup(user)
      .then((data) => {

        if (data && data.error && data.error.length) {
          setValues({...values, error: data.error, loading: false})
        } else {

          setValues({...values, name: '', email: '', password: '', error: '', loading: false, message: data.message, showForm: false })
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


  const signupForm = () => {

    return (
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <input
            type='text'
            className='form-control'
            placeholder='Type your name'
            value={name}
            onChange={handleChange('name')}
          />
        </div>
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
          <button className='btn btn-primary'>Sign up</button>
        </div>
      </form>
    )
  }

  return (
    <>
      {showError()}
      {showLoading()}
      {showMessage()}
      {showForm && signupForm()}
      <Link href='/auth/password/forgot'>
        <a className='btn btn-outline-danger btn-sm'>Forgot Password</a>
      </Link>
    </>
  )
}

export default SignupComponent;