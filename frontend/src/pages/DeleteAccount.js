import { useState } from 'react'

const DeleteAccount = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [errorEmail, setErrorEmail] = useState(null)
    const [errorPassword, setErrorPassword] = useState(null)

    const [isPending, setIsPending] = useState(false) 
    const [msg, setMsg] = useState('')

    const handleDeleteAccount = async (e) => {
        e.preventDefault()
        const user = { email, password }
        setIsPending(true)
        
        const response = await fetch('/deleteaccount', {
          method: 'DELETE',
          body: JSON.stringify(user),
          headers: { 'Content-Type': 'application/json' }
        })
        const json = await response.json()
    
        if (response.ok) {
          setEmail('')
          setPassword('')
          setErrorEmail('')
          setErrorPassword('')
          setIsPending(false)
          setMsg(json.msg)
        }
    
        if (!response.ok) {
          setErrorEmail(json.email)
          setErrorPassword(json.password)
          setIsPending(false)
          setMsg('')
        }
      }

      return ( 
        <div className="delete-account-form">
            <form onSubmit={handleDeleteAccount}>
            <h3><span className="material-symbols-outlined">Delete</span>&nbsp;Delete account  </h3>
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
            {!isPending && <button>Delete Account</button>}
            {isPending && <button>Deleting Account...</button>}
            {msg && <div className='msg'><span className="material-symbols-outlined">Done</span>&nbsp;
            {msg}</div>}
        </form>
        </div>
     )
}
 
export default DeleteAccount