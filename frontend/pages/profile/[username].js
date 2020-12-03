import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../components/Layout';
import { useState } from 'react';
import { userPublicProfile } from '../../actions/user';
import moment from 'moment';
import { API, DOMAIN, APP_NAME, FB_APP_ID } from '../../config'

const UserProfile = ({user, blogs}) => {

  const showUserBlogs = () => {

    return blogs.map((blog, i) => {
      return (
        <div className='mt-4 mb-4' key={i}>
          <Link href={`/blogs/${blog.slug}`}>
            <a className='lead'>{blog.title}</a>
          </Link>
        </div>
      )
    })
  }

  return (
    <>
      <Layout>
        <div className='container'>
          <div className='row'>
            <div className='col-md-12'>
              <div className='card'>
                <div className='card-body'>
                  <h5>{user.name}</h5>
                  <Link href={`${user.profile}`}>
                    <a>View profile</a>
                  </Link>
                  <p className='text-muted'>Joined {moment(user.createAt).fromNow()}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <br />
        <div className='container pb-5'>
          <div className='row'>
            <div className='col-md-6'>
              <div className='card'>
                <div className='card-body'>
                  <h5
                    className='card-title bg-primary pt-4 pb-4 pl-4 pr-4 text-white'
                  >
                    Recent blogs by {user.name}
                  </h5>
                  <br />
                  {showUserBlogs()}
                </div>
              </div>
            </div>

            <div className='col-md-6'>
              <div className='card'>
                <div className='card-body'>
                  <h5 className='card-title bg-primary pt-4 pb-4 pl-4 pr-4 text-white'>
                    Message {user.name}
                  </h5>
                  <br />
                  <p>Contact form</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </Layout>
    </>
  )
}

UserProfile.getInitialProps = ({query}) => {

  return userPublicProfile(query.username)
    .then(data => {
      console.log(data)

      if (data.error) {
        console.log(data.error)
      } else {
        return { user: data.user, blogs: data.blogs }

      }

    })
}

export default UserProfile;