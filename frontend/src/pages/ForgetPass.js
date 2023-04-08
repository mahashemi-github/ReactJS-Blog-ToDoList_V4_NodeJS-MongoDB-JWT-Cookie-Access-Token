import { useState } from 'react'

const ForgetPass = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [id, setId] = useState('')
  const [msg, setMsg] = useState('')

  const [isPendinge, setIsPendinge] = useState(false)  
  const [isPendingp, setIsPendingp] = useState(false)  
  const [errorEmail, setErrorEmail] = useState(null)
  const [errorPassword, setErrorPassword] = useState(null)
  const [resetDone, setResetDone] = useState(false)

  const handleSubmitemail = async (e) => {
    e.preventDefault()
    setIsPendinge(true)
        
    const response = await fetch('/forgetpassemail', {
      method: 'POST',
      body: JSON.stringify({ email }),
      headers: { 'Content-Type': 'application/json' }
    })
    const json = await response.json()

    if (response.ok) {
      setId(json.id)
      setEmail('')
      setPassword('')
      setErrorEmail('')
      setErrorPassword('')
      setIsPendinge(false)
    }

    if (!response.ok) {
      setErrorEmail(json.email)
      setIsPendinge(false)
    }
  }

  const handleSubmitpass = async (e) => {
    e.preventDefault()
    setIsPendingp(true)
    console.log(id, 'kkkkkkkkk')
    setId(id)
        
    const response = await fetch('/resetpass/' + id, {
      method: 'PATCH',
      body: JSON.stringify({ password }),
      headers: { 'Content-Type': 'application/json' }
    })
    const json = await response.json()

    if (response.ok) {
      setMsg(json.msg)
      setEmail('')
      setPassword('')
      setErrorEmail('')
      setErrorPassword('')
      setIsPendingp(false)
      setResetDone(true)
    }

    if (!response.ok) {
      setErrorPassword(json.password)
      setIsPendingp(false)
      setResetDone(false)
    }
  }

  return ( 
    <div className="forget-password-form">
      {!id && !resetDone && <>
        <h3><span className="material-symbols-outlined">Change_Circle</span>&nbsp;Forgot password?</h3> 
        <form className="confirm-email" onSubmit={handleSubmitemail}>
          <label>Enter your registered email</label>
          <input 
          type='text' 
          required 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={errorEmail ? 'errorinput' : ''}
          />
        <div className="error">{errorEmail}</div>
          {!isPendinge && <button>Confirm email</button>}
          {isPendinge && <button>Confirming email...</button>}
        </form>
      </> }
      {id && !resetDone && <>
        <form className='reset-password' onSubmit={handleSubmitpass}>
        <label>Enter your new password</label>
        <input 
        type='password' 
        required 
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className={errorPassword ? 'errorinput' : ''}
        />
        <div className="error">{errorPassword}</div>
        {!isPendingp && <button>Password reset</button>}
        {isPendingp && <button>Password resetting...</button>}
        </form>
      </> }
      {resetDone && 
      <div className="password-reset-done">
        <span className="material-symbols-outlined">Done</span>&nbsp; 
        {msg}<br/><span className='continue' style={{marginLeft: '28px'}}>Log in to continue. </span></div>
      }
    </div>
  )
}
    
export default ForgetPass