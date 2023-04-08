import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { dispatch } = useContext(AuthContext)
  const [isPending, setIsPending] = useState(false) 
  const [errorEmail, setErrorEmail] = useState(null)
  const [errorPassword, setErrorPassword] = useState(null)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const user = { email, password }
    setIsPending(true)
    
    const response = await fetch('/login', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: { 'Content-Type': 'application/json' }
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({type: 'LOGIN', payload: json})
      setEmail('')
      setPassword('')
      setErrorEmail('')
      setErrorPassword('')
      setIsPending(false)
      navigate('/', {replace: true})
    }

    if (!response.ok) {
      setErrorEmail(json.email)
      setErrorPassword(json.password)
      setIsPending(false)
    }
  }

  return ( 
    <div className="login-form">
      <form onSubmit={handleSubmit}>
        <h3>Login</h3>
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
        {!isPending && <button>Log in</button>}
        {isPending && <button>Logging in...</button>}
      </form>
    </div>
  )
}
    
export default Login