import Layout from '../../../components/Layout';
import Private from '../../../components/auth/Private';
import BlogUpdate from '../../../components/crud/BlogUpdate';

import Link from 'next/link';

const Blog = () => {

  return (
    <Layout>
      <Private>
        <div className='row pl-5 pr-5'>
          <div className='col-md-12 pt-5 pb-5'>
            <h2>Create a new blog</h2>
          </div>
          <div className='col-md-12'>
            <BlogUpdate />
          </div>
        </div>
      </Private>
    </Layout>
  )
}

export default Blog;