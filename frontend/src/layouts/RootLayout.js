import { NavLink, Link, Outlet, useNavigate, Navigate, useLocation } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { useState, useContext} from 'react'

const RootLayout = () => {
  const [isPending, setIsPending] = useState(false)
  const { userco, dispatch } = useContext(AuthContext)
  const location = useLocation()
  const navigate = useNavigate()

  const handleLogout = async () => {
    setIsPending(true)    
    const response = await fetch('/logout')
    const json = await response.json()
    console.log(json.msg) 
  
    if (response.ok) {
      setIsPending(false)
      dispatch({type: 'LOGOUT'})
      console.log('You are logged out.')
      if(location.pathname === '/create') {
        navigate('/signuplogin') 
      }
    }
  }

  return ( 
    <div className="root-layout">
      <header>
        <nav>
          <h1>MyNoteBook</h1>
          <NavLink to="/">All Blogs</NavLink>
          {userco && <NavLink to="create">New Blog</NavLink>}
          {!userco && <Link to="signuplogin">New Blog</Link>}
          <NavLink to="todo">To-Do List</NavLink>
          <NavLink to="help">Help</NavLink>
          {!userco && <NavLink to="signuplogin">My Account</NavLink>}
          {userco && <button onClick={handleLogout}>Log out</button>}
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  )
}
 
export default RootLayout