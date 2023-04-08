import { Outlet } from 'react-router-dom'

const AllBlogsLayout = () => {
  return ( 
    <div className="allblogs-layout">
      <Outlet />
    </div>
  )
}
 
export default AllBlogsLayout