import React, { useState } from 'react'
import { useHistory, Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { userLogin } from './usersSlice'
import { unwrapResult } from '@reduxjs/toolkit'


export const LoginForm = () => {

  const dispatch = useDispatch()
  const history = useHistory()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [addRequestStatus, setAddRequestStatus] = useState('idle')


  const handleUsernameChange = e => setUsername(e.target.value)
  const handlePasswordChange = e => setPassword(e.target.value)
  
  const canSave = [username, password].every(Boolean) && addRequestStatus === 'idle'

  const redirect = () => history.push('/account')

  const handleSubmit = async () => {
    if (canSave) {
        try { setAddRequestStatus('pending')
        const resultAction = await dispatch(
            userLogin({username: username, password: password})
        )
        unwrapResult(resultAction)

        setUsername('')
        setPassword('')

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
        <h1>Login</h1>
        <div>{}</div>
        <form className="ui form">
            <div className="field">
                <label>Username</label>
                <input value={username} onChange={handleUsernameChange} type="text" name="username" placeholder="username"/>
            </div>
            <div className="field">
                <label>Password</label>
                <input value={password} onChange={handlePasswordChange} type="password" name="password" placeholder="password"/>
            </div>
            
            <button className="ui button" type="button" onClick={handleSubmit} disabled={!canSave}>Login!</button>

            <div>
                or <Link to={{pathname: `/signup`}}>sign up</Link>!
            </div>
        </form>
    </div>
  )
}