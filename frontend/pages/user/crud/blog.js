import Layout from '../../../components/Layout';
import Private from '../../../components/auth/Private';
import BlogCreate from '../../../components/crud/BlogCreate';

import Link from 'next/link';

const Create = () => {

  return (
    <Layout>
      <Private>
        <div className='row pl-5 pr-5'>
          <div className='col-md-12 pt-5 pb-5'>
            <h2>Create a new blog</h2>
          </div>
          <div className='col-md-12'>
            <BlogCreate />
          </div>
        </div>
      </Private>
    </Layout>
  )
}

export default Create