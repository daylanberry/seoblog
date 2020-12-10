import Layout from '../../components/Layout';
import Private from '../../components/auth/Private';
import Link from 'next/link'

const UserIndex = () => {

  return (
    <Layout>
      <Private>
        <div className='row pl-5'>
          <div className='col-md-12 pt-5 pb-5'>
            <h2>Admin Dashboard</h2>
          </div>
          <div className='col-md-4'>
            <ul class="list-group">

              <li className="list-group-item">
                <a href='/user/crud/blog'>Create Blog</a>
              </li>

              <li className="list-group-item">
                <Link href='/user/crud/blogs'>
                  <a>Update/Delete Blog</a>
                </Link>
              </li>

              <li className="list-group-item">
                <Link href='/user/update'>
                  <a>Update profile</a>
                </Link>
              </li>

            </ul>
          </div>
          <div className='col-md-8'>
            right
          </div>
        </div>
      </Private>
    </Layout>
  )
}

export default UserIndex;