import React, { useState } from 'react'
import { useNavigate } from 'react-router'

import MessagePopup from '../components/common/MessagePopup'

const Register = ({ setUser }) => {
  let navigate = useNavigate()

  const [userName, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [popup, setPopup] = useState(null)

  const onUsernameChange = (e) => {
    setUserName(e.target.value)
  }
  const onEmailChange = (e) => {
    setEmail(e.target.value)
  }
  const onPasswordChange = (e) => {
    setPassword(e.target.value)
  }

  async function onFormSubmit(e) {
    e.preventDefault()
    try {
      const response = await fetch('/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userName,
          password,
          email,
        }),
      })
      const info = await response.json()
      if (info.isAuthenticated) {
        setUser(info.data.role, info.isAuthenticated, info.data) // set the user state at top level (this will all be changed to context or redux after i get everything working)
        navigate('/profile')
      } else {
        setPopup({ msg: info.msg, color: 'red' })
        setTimeout(() => setPopup(null), 3000)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <main id='login__main-container'>
      <form className='login__form' onSubmit={onFormSubmit}>
        {popup && <MessagePopup msg={popup} style={{ width: '100%' }} />}
        <h1 className='hero-text'>Register</h1>
        <label htmlFor='user_name'>Full Name</label>
        <input
          type='text'
          name='username'
          value={userName}
          id='user_name'
          onChange={onUsernameChange}
        />
        <label htmlFor='email'>Email</label>
        <input
          type='email'
          name='email_input'
          value={email}
          id='email'
          onChange={onEmailChange}
        />
        <label htmlFor='password'>Password</label>
        <input
          type='password'
          name='password_input'
          value={password}
          id='password'
          onChange={onPasswordChange}
        />
        <input type='submit' value='Submit' id='submit_btn' />
      </form>
    </main>
  )
}

export default Register
