import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'


const initialState = {
  users: [],
  currentUser: {},
  status: 'idle',
  error: null
}

export const userSignup = createAsyncThunk('users/userSignup', async userInfo => {
  const response = await fetch(`http://localhost:3001/users`, {
      ///aight bitch when you come back to this, you gotta add a reviews controller and update your backend so that you can add reviews!!
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      username: userInfo.username,
      password: userInfo.password,
      password_confirmation: userInfo.password_confirmation,
    })
  }).then(resp => resp.json())

  if (response.jwt) {
    localStorage.setItem('token', response.jwt)
  }

  return response
})

export const userLogin = createAsyncThunk('users/userLogin', async userInfo => {
  const response = await fetch(`http://localhost:3001/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": window.localStorage.getItem('token')
    },
    body: JSON.stringify({
      username: userInfo.username,
      password: userInfo.password,
    })
  }).then(resp => resp.json())

  if (response.jwt) {
    localStorage.setItem('token', response.jwt)
  }

  return response
})

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: {
    [userSignup.fulfilled]: (state, action) => {
      state.status = 'succeeded'
      state.currentUser = action.payload.user
    },
    [userSignup.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.payload.errors
    },
    [userLogin.fulfilled]: (state, action) => {
      state.status = 'succeeded'
      state.currentUser = action.payload.user
    },
    [userLogin.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.payload.failure
    }

  }
})

export default usersSlice.reducer