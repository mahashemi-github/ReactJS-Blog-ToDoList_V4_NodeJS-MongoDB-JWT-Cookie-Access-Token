import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

const Signup = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { dispatch } = useContext(AuthContext)
  const [isPending, setIsPending] = useState(false) 
  const [errorUsername, setErrorUsername] = useState(null)
  const [errorEmail, setErrorEmail] = useState(null)
  const [errorPassword, setErrorPassword] = useState(null)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const user = { username, email, password }
    setIsPending(true)
    
    const response = await fetch('/signup', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: { 'Content-Type': 'application/json' }
    })
    const json = await response.json()

    if(response.ok) {
      dispatch({type: 'LOGIN', payload: json})
      setUsername('')
      setEmail('')
      setPassword('')
      setErrorUsername('')
      setErrorEmail('')
      setErrorPassword('')
      setIsPending(false)
      navigate('/', {replace: true})
    }

    if(!response.ok) {
      console.log(json.email, json.password, json.username)
      setErrorUsername(json.username)
      setErrorEmail(json.email)
      setErrorPassword(json.password)
      setIsPending(false)
    }

  }

  return ( 
    <div className="signup-form">
      <form onSubmit={handleSubmit}>
        <h3>Signup</h3>
        <label>Username</label>
        <input 
        type='text' 
        required 
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className={errorUsername ? 'errorinput' : ''}
        />
        <div className="error">{errorUsername}</div>
        <label>Email</label>
        <input 
        type='text' 
        required 
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={errorEmail ? 'errorinput' : ''}
        />
        <div className="error">{errorEmail}</div>
        <label>Password</label>
        <input 
        type='password' 
        required 
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className={errorPassword ? 'errorinput' : ''}
        />            
        <div className="error">{errorPassword}</div>
        {!isPending && <button>Sign up</button>}
        {isPending && <button>Signing up...</button>}
      </form>
    </div>
  )
}
    
export default Signup