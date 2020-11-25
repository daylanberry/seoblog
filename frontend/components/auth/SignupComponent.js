import { useState } from 'react';
import { signup } from '../../actions/auth';

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

  const { name, email, password, error, loading, message, showForm } = values;

  const handleSubmit = (e) => {
    e.preventDefault()

    setValues({...values, loadng: true, error: false})
    const user = { name, email, password }


    signup(user)
      .then((data) => {

        if (data && data.error) {
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
      {signupForm()}
    </>
  )
}

export default SignupComponent;