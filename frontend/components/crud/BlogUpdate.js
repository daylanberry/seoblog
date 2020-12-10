import { singleBlog, updateBlog } from '../../actions/blog';
import { getCookie, isAuth } from '../../actions/auth';
import { getCategories } from '../../actions/category';
import { getTags } from '../../actions/tag';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import Router from 'next/router';
import dynamic from 'next/dynamic';
import { withRouter } from 'next/router';
const ReactQuill = dynamic(import('react-quill'), { ssr: false, loading: () => <p>Loading ...</p> }
);
import '../../node_modules/react-quill/dist/quill.snow.css';
import { QuillModules, QuillFormats } from '../../helpers/quill';
import { API } from '../../config';

const BlogUpdate = ({router}) => {

  const [body, setBody] = useState('');
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);

  // categories
  const [checked, setChecked] = useState([]);
  const [checkedTags, setCheckedTags] = useState([]);

  const [values, setValues] = useState({
    title: '',
    error: '',
    success: '',
    formData: new FormData(),
  });

  const { title, error, success, formData } = values;
  const token = getCookie('token');

  useEffect(() => {
    // setValues({...values, formData: new FormData()})
    initBlog()
    initCategories()
    initTags()

  }, [router])

  const initBlog = () => {

    if (router.query.slug) {
      return singleBlog(router.query.slug)
        .then(data => {
          if (!data || data.error) {
            console.log(data.error)
          } else {
            setValues({...values, title: data.title})
            setBody(data.body)
            setChecked(data.categories.map(c => c._id))
            setCheckedTags(data.tags.map(t => t._id))

          }

        })
      }
    }


  const initCategories = () => {
    return getCategories()
      .then(data => {
        if (!data) return
        if (data.error) {
          console.log(data.error)
          setValues({
            ...values,
            error: data.error
          })
        } else {
          setCategories(data)
        }
      })
  }

  const initTags = () => {

    return getTags()
      .then(data => {
        if (!data) return
        if (data.error) {
          setValues({
            ...values,
            error: data.error
          })
        } else {
          setTags(data)
        }
      })
  }

  const handleToggle = (id) => () => {
    setValues({...values, error: ''});

    const clickedCategory = checked.indexOf(id)
    const all = [...checked]

    if (clickedCategory === -1) {
      all.push(id)
    } else {
      all.splice(clickedCategory, 1)
    }
    setChecked(all)
    formData.set('categories', all)

  }


  const handleTagsToggle = (id) => () => {
    setValues({...values, error: ''});

    const all = [...checkedTags];
    const tagIdx = all.indexOf(id)

    if (tagIdx === -1) {
      all.push(id)

    } else {
      all.splice(tagIdx, 1)
    }
    setCheckedTags(all)
    formData.set('tags', all)

  }


  const showCategories = () => {

    return (
      categories && categories.map((cat, i) => (
        <li className='list-unstyled' key={i}>
          <input
            className='mr-r'
            type='checkbox'
            checked={checked.includes(cat._id)}
            style={{marginRight: '10px'}}
            onChange={handleToggle(cat._id)}
          />
          <label className='form-check-label'>{cat.name}</label>
        </li>
      ))
    )
  }


  const showTags = () => {
    return (
      tags && tags.map((tag, i) => (
        <li className='list-unstyled' key={i}>
          <input
            className='mr-r'
            type='checkbox'
            checked={checkedTags.includes(tag._id)}
            style={{marginRight: '10px'}}
            onChange={handleTagsToggle(tag._id)}
          />
          <label className='form-check-label'>{tag.name}</label>
        </li>
      ))
    )
  }

  const handleChange = (name) => e => {

    const value = name === 'photo' ? e.target.files[0] : e.target.value
    formData.set(name, value);

    setValues({
      ...values,
      [name]: value,
      formData,
      error: ''
    })
  }

  const handleBody = () => (e) => {
    setBody(e)
    console.log('called')
    formData.set('body', e)
  }


  const editBlog = (e) => {
    e.preventDefault();

    return updateBlog(formData, token, router.query.slug)
      .then(data => {
        if (data.error) {
          setValues({...values, error: data.error})
        }

        setValues({...values, title: '', success: `Blog titled ${data.title} is successfully updated`})

        if (isAuth() && isAuth().role === 1) {
          Router.replace(`/admin`)

        } else if (isAuth() && isAuth().role === 0) {

          Router.replace(`/user`)
        }

      })
  }

  const showError = () => (
    <div className='alert alert-danger' style={{display: error ? '': 'none'}}>{error}</div>
  )

  const showSuccess = () => (
    <div className='alert alert-success' style={{display: success ? '': 'none'}}>{success}</div>
  )


  const updateBlogForm = () => {
    return (
      <form onSubmit={editBlog}>
        <div className='form-group'>
          <label className='text-muted'>Title</label>
          <input
            className='form-control'
            type='text'
            value={title}
            onChange={handleChange('title')}
          />
        </div>

        <div className='form-group'>
          <ReactQuill
            modules={QuillModules}
            formats={QuillFormats}
            value={body}
            placeholder='Write something amazing'
            onChange={handleBody()}
          />
        </div>

        <div>
          <button
            type='submit'
            className='btn btn-primary'
          >
            Update
          </button>
        </div>
      </form>
    )
  }

  return (
    <div className='container-fluid pb-5'>
      <div className='row'>

        <div className='col-md-8'>
          {updateBlogForm()}
          <div className='pt-3'>
            {showError()}
            {showSuccess()}
            <hr />
          </div>

          <img
            src={`${API}/api/blog/photo/${router.query.slug}`} alt='title'
            style={{width: '100%'}}
          />
        </div>

        <div className='col-md-4'>
          <div>
            <div className='form-group pb-2'>
              <h5>Featured image</h5>
              <hr />

              <small className='text-muted'>Max size: 1mb</small>
              <label className='btn btn-outline-info'>Upload featured image
                <input type='file' accept='image/*' onChange={handleChange('photo')} hidden/>
              </label>
            </div>
          </div>
          <div>
            <h5>Categories</h5>
            <hr />
            <ul style={{maxHeight: '200px', overflowY: 'scroll'}}>{showCategories()}</ul>
          </div>
          <div>
            <h5>Tags</h5>
            <hr />
            <ul style={{maxHeight: '200px', overflowY: 'scroll'}}>{showTags()}</ul>
          </div>
        </div>
      </div>

    </div>
  )
}

export default withRouter(BlogUpdate);