import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  users: [],
  currentUser: {},
  error: null
}

export const userSignup = createAsyncThunk('users/userSignup', async userInfo => {
  const response = await fetch('http://localhost:3001/users', {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${window.localStorage.getItem('token')}`
      },
    body: JSON.stringify({
      username: userInfo.username,
      password: userInfo.password
    }),
  }).then(resp => resp.json())

  if (response.jwt) {
    localStorage.setItem('token', response.jwt)
    return response
  }
})

export const userLogin = createAsyncThunk('users/userLogin', async userInfo => {
  const response = await fetch('http://localhost:3001/login', {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      },
    body: JSON.stringify({
      username: userInfo.username,
      password: userInfo.password
    }),
  }).then(resp => resp.json())

  if (response.jwt) {
    localStorage.setItem('token', response.jwt)
  }
  console.log(response)
  return response
})

export const currentUser = createAsyncThunk('users/currentUser', async () => {
  const response = await fetch('http://localhost:3001/profile', {
    headers: {
      'Authorization': `Bearer ${window.localStorage.getItem('token')}`
      }
    }).then(resp => resp.json())

  return response
})

export const getUsers = createAsyncThunk('users/getUsers', async () => {
  const response = await fetch(`http://localhost:3001/users`).then(resp => resp.json())
  return response
  }
)

export const toggleFavorite = createAsyncThunk('books/toggleFavorite', async favoriteInfo => {
  const response = await fetch(`http://localhost:3001/users/update`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      'Authorization': `Bearer ${window.localStorage.getItem('token')}`
    },
    body: JSON.stringify({
      book_id: favoriteInfo.book_id,
      favorite: favoriteInfo.favorite
    })
  }).then(resp => resp.json())
  return response
})

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    authenticated(state) {
      state.authenticated = true
    },
    userLogout(state) {
      state.currentUser = {}
    }
  },
  extraReducers: {
    [userSignup.fulfilled]: (state, action) => {
      state.status = 'succeeded'
      state.currentUser = action.payload.user
      state.authenticated = true
    },
    [userSignup.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.payload.error
      state.authenticated = false
    },
    [userLogin.fulfilled]: (state, action) => {
      state.status = 'succeeded'
      state.currentUser = action.payload.user
    },
    [userLogin.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.payload.message
    },
    [getUsers.fulfilled]: (state, action) => {
      state.users = action.payload
      console.log(action.payload)
    },
    [currentUser.fulfilled]: (state, action) => {
      state.currentUser = action.payload.user
    },
    [toggleFavorite.fulfilled]: (state, action) => {
      state.currentUser.favorites.push(action.payload.favoriteBook)
    }
  }
})

export const { authenticated, userLogout } = usersSlice.actions


export default usersSlice.reducer