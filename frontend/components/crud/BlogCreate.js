import { createBlog } from '../../actions/blog';
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
import '../../node_modules/react-quill/dist/quill.snow.css'

const BlogCreate = ({router}) => {

  const blogFromLS = () => {

    if (typeof window === 'undefined') return false

    if (localStorage.getItem('blog')) {
      return JSON.parse(localStorage.getItem('blog'))
    } else {
      return false
    }
  }

  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);

  // categories
  const [checked, setChecked] = useState([]);
  // tags
  const [checkedTags, setCheckedTags] = useState([]);

  const [body, setBody] = useState(blogFromLS());
  const [values, setValues] = useState({
    error: '',
    sizeError: '',
    success: '',
    formData: '',
    title: '',
    hidePublishButton: false
  });

  const { error, sizeError, success, formData, title, hidePublishButton} = values;

  const initCategories = () => {
    return getCategories()
      .then(data => {
        if (data.error) {
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

  useEffect(() => {
    setValues({
      ...values,
      formData: new FormData()
    })

    initCategories()
    initTags()
  }, [router])

  const publishBlog = (e) => {
    e.preventDefault()
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

  const handleBody = (e) => {
    setBody(e)
    formData.set('body', e)

    if (typeof window !== 'undefined') {
      localStorage.setItem('blog', JSON.stringify(e))
    }
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

  const showCategories = () => {
    return (
      categories && categories.map((cat, i) => (
        <li className='list-unstyled' key={i}>
          <input
            className='mr-r'
            type='checkbox'
            style={{marginRight: '10px'}}
            onChange={handleToggle(cat._id)}
          />
          <label className='form-check-label'>{cat.name}</label>
        </li>
      ))
    )
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

  const showTags = () => {
    return (
      tags && tags.map((tag, i) => (
        <li className='list-unstyled' key={i}>
          <input
            className='mr-r'
            type='checkbox'
            style={{marginRight: '10px'}}
            onChange={handleTagsToggle(tag._id)}
          />
          <label className='form-check-label'>{tag.name}</label>
        </li>
      ))
    )
  }



  const createBlogForm = () => {
    return (
      <form onSubmit={publishBlog}>
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
            modules={BlogCreate.modules}
            formats={BlogCreate.formats}
            value={body}
            placeholder='Write something amazing'
            onChange={handleBody}
          />
        </div>

        <div>
          <button
            type='submit'
            className='btn btn-primary'
          >
            Publish
          </button>
        </div>
      </form>
    )
  }

  return (
    <div className='container-fluid'>
      <div className='row'>

        <div className='col-md-8'>
          <h2>Create blog form</h2>
          {createBlogForm()}
        </div>

        <div className='col-md-4'>
          <div>
            <div classNAme='form-group pb-2'>
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

BlogCreate.modules = {
  toolbar: [
    [{
      header: '1'
    }, {
      header: '2'
    }, {
      header: [3, 4, 5, 6]
    }, {
      font: []
    }],
    [{
      size: []
    }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{
      list: 'ordered'
    }, {
      list: 'bullet'
    }],
    ['link', 'image', 'video'],
    ['clean'],
    ['code-block']
  ]
};

BlogCreate.formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'link',
  'image',
  'video',
  'code-block'
];

export default withRouter(BlogCreate)