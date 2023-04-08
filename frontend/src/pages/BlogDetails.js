import { useLoaderData, useNavigate, useParams } from 'react-router-dom'
import { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import HandleBlogEdit from './HandleBlogEdit'

const BlogDetails = () => {
  const id  = useParams().id
  const blog = useLoaderData()
  const navigate = useNavigate()
  const [display, setDisplay] = useState(false)
  const [userIsAuthor, setUserIsAuthor] = useState(false)

  const { userco } = useContext(AuthContext)

  useEffect(() => {
    if(userco) {
    console.log(blog.author , userco.user) 
     if(blog.author === userco.user) {
      setUserIsAuthor(true)
      }
    } else {
    setUserIsAuthor(false)
    }
  }, [userco, blog.author])

  const handleClickDelete = async () => {
    const response = await fetch('/blogs/' + id , {
      method: 'DELETE'
    })
    // const json = await response.json()
    
    if (response.ok) {
      console.log('Blog successfully deleted.')
      navigate('/') 
    }  
  }

  const openEditForm = (e) => {
    setDisplay( true )
    e.target.className = 'activee'
  }

  return ( 
    <div>
      <h2>Blog Details</h2>
      <div className="blog-details"> 
        <h3>Blog title: {blog.title}</h3>
        <div>Blog author: {blog.author}</div>
        <div>Created at: {blog.createdAt}</div>
        <div className="details">
          <p>Blog body: {blog.body}</p>
        </div>
        {userIsAuthor && <button onClick={handleClickDelete}>Delete</button>}
        {userIsAuthor && <button onClick={openEditForm}>Edit</button>}
      </div>
      {display && userIsAuthor && <HandleBlogEdit blog={ blog } />}
    </div>
  )
}

export const blogdetailsLoader = async ({ params }) => {
  const { id } = params  
  const res = await fetch('/blogs/' + id)
  const data = await res.json()  

  if (!res.ok) {
      throw Error('Could not fetch the data for that resource.')
  }
  return data
}
 
export default BlogDetails