import React, { useState } from 'react'
import { useHistory, Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { userSignup } from './usersSlice'
import { unwrapResult } from '@reduxjs/toolkit'


export const SignUpForm = () => {

  const dispatch = useDispatch()
  const history = useHistory()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')

  const [addRequestStatus, setAddRequestStatus] = useState('idle')


  const handleUsernameChange = e => setUsername(e.target.value)
  const handlePasswordChange = e => setPassword(e.target.value)
  const handlePasswordConfirmationChange = e => setPasswordConfirmation(e.target.value)

  
  const canSave = [username, password, passwordConfirmation].every(Boolean) && addRequestStatus === 'idle'

  const redirect = () => history.push('/account')

  const handleSubmit = async () => {
    if (canSave) {
        try { setAddRequestStatus('pending')
        const resultAction = await dispatch(
            userSignup({username: username, password: password, password_confirmation: passwordConfirmation})
        )
        unwrapResult(resultAction)

        setUsername('')
        setPassword('')
        setPasswordConfirmation('')

        } catch (err) {
            console.error('Failed to sign up: ', err)
        } finally {
            setAddRequestStatus('idle')
            redirect()
        }
    }
}

  return(
    <div>
        <h1>Sign Up</h1>
        <form className="ui form">
            <div className="field">
                <label>Username</label>
                <input value={username} onChange={handleUsernameChange} type="text" name="username" placeholder="username"/>
            </div>
            <div className="field">
                <label>Password</label>
                <input value={password} onChange={handlePasswordChange} type="password" name="password" placeholder="password"/>
            </div>
            <div className="field">
                <label>Password</label>
                <input value={passwordConfirmation} onChange={handlePasswordConfirmationChange} type="password" name="password_confirmation" placeholder="password confirmation"/>
            </div>
            
            <button className="ui button" type="button" onClick={handleSubmit} disabled={!canSave}>Sign Up!</button>

            <div>
                or <Link to={{pathname: `/login`}}>log in</Link>!
            </div>
        </form>
    </div>
  )
}