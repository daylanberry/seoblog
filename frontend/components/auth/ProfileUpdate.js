import Link from 'next/link';
import Router from 'next/router';
import { useState, useEffect} from 'react';
import { getCookie, isAuth, updateUser } from '../../actions/auth';
import { getProfile, updateProfile } from '../../actions/user';
import { API } from '../../config';

const ProfileUpdate = () => {
  const [values, setValues] = useState({
    username: '',
    username_for_photo: '',
    name: '',
    email: '',
    password: '',
    error: false,
    success: false,
    loading: false,
    photo: '',
    userData: process.browser && new FormData(),
    about: ''
  })

  const token = getCookie('token')
  const { username, username_for_photo, name, email, password, error, success, loading, photo, userData, about } = values;

  const init = () => {
    return getProfile(token)
      .then(data => {
        if (data && data.error) {
          setValues({...values, error: data.error })

        } else {
          setValues({
            ...values,
            username: data.username,
            username_for_photo: data.username,
            name: data.name,
            email: data.email,
            about: data.about,
          })
        }
      })
  }

  useEffect(() => {
    init()
  }, []);

  const handleChange = (name) => (e) => {

    const value = name === 'photo' ? e.target.files[0] : e.target.value;

    userData.set(name, value)
    setValues({...values, [name]: value, userData, error: false, success: false})
  }

  const handleSubmit = (e) => {

    e.preventDefault();

    setValues({...values, loading: true});

    return updateProfile(token, userData)
      .then(data => {
        if (data.error) {
          setValues({...values, error: data.error, success: false, loading: false})
        } else {

          updateUser(data, () => {
            setValues({
              ...values,
              username: data.username,
              name: data.name,
              email: data.email,
              about: data.about,
              success: true,
              loading: false
            });
          })

        }
      })
  }

  const profileUpdateForm = () => (
    <form onSubmit={handleSubmit}>
      <div className='form-group'>
        <label className='btn btn-outline-info'>
          Profile Photo
          <input type='file' accept='image/*' onChange={handleChange('photo')} hidden/>
        </label>
      </div>

      <div className='form-group'>
        <label className='text-muted'>Username</label>
        <input type='text' value={username} className='form-control' onChange={handleChange('username')}/>
      </div>

       <div className='form-group'>
        <label className='text-muted'>name</label>
        <input type='text' value={name} className='form-control' onChange={handleChange('name')}/>
      </div>

       <div className='form-group'>
        <label className='text-muted'>Email</label>
        <input type='text' value={email} className='form-control' onChange={handleChange('email')}/>
      </div>

       <div className='form-group'>
        <label className='text-muted'>About</label>
        <textarea type='text' value={about} className='form-control' onChange={handleChange('about')}/>
      </div>

      <div className='form-group'>
        <label className='text-muted'>Password</label>
        <input type='password' value={password} className='form-control' onChange={handleChange('password')}/>
      </div>

      <div>
        <button type='submit' className='btn btn-primary'>Submit</button>
      </div>
    </form>
  )

  const showError = () => (
    <div className='alert alert-danger' style={{display: error ? '' : 'none'}}>{error}</div>
  )

  const showSuccess = () => (
    <div className='alert alert-success' style={{display: success ? '' : 'none'}}>Profile Updated</div>
  )

  const showLoading = () => (
    <div className='alert alert-info' style={{display: loading ? '' : 'none'}}>Loading...</div>
  )


  return (
    <>
      <div className='container'>
        <div className='row'>
          <div className='col-md-4'>
            <img
              src={`${API}/api/user/photo/${username_for_photo}`}
              className='img img-fluid mb-5'
              style={{maxHeight: 'auto', maxWidth: '100%'}}
              alt='User profile'
            />
          </div>
          <div className='col-md-8 mb-5'>
            {showSuccess()}
            {showError()}
            {showLoading()}
            {profileUpdateForm()}
          </div>
        </div>
      </div>
    </>
  )
}

export default ProfileUpdate;