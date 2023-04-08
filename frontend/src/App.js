import {
  createBrowserRouter, 
  createRoutesFromElements,
  Route, 
  RouterProvider,
  Navigate
} from 'react-router-dom'

// pages import
import AllBlogs, { allblogsLoader } from './pages/AllBlogs'
import BlogDetails, { blogdetailsLoader } from './pages/BlogDetails'
import BlogsError from './pages/BlogsError'
import ToDoList from './pages/ToDoList'
import NewBlog from './pages/NewBlog'
import Faq from './pages/Faq'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'
import SignupLogin from './pages/SignupLogin'

// layouts import
import RootLayout from './layouts/RootLayout'
import HelpLayout from './layouts/HelpLayout'
import AllBlogsLayout from './layouts/AllBlogsLayout'

const router = createBrowserRouter(
  createRoutesFromElements(        
    <Route path='/' element={<RootLayout />}>
      <Route path='/' element={<AllBlogsLayout />} errorElement={<BlogsError />}>
        <Route 
          index 
          element={<AllBlogs />} 
          loader={allblogsLoader} 
        />
        <Route 
          path=':id' 
          element={<BlogDetails />}
          loader={blogdetailsLoader}
        />
      </Route>
      <Route 
      path='create' 
      element={<NewBlog />} 
      />
      <Route path='todo' element={<ToDoList />} />
      <Route path='help' element={<HelpLayout />} >
        <Route path='faq' element={<Faq />} />
        <Route path='contact' element={<Contact />} />
      </Route>
      <Route path='signuplogin' element={<SignupLogin />} />
      <Route path='*' element={<NotFound />} />
    </Route>
  )
)

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App
