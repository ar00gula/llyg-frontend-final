import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  users: [],
  currentUser: null,
  status: 'idle',
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

export const pageUser = createAsyncThunk('users/pageUser', async () => {
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

export const toggleFavorite = createAsyncThunk('users/toggleFavorite', async favoriteInfo => {
  const response = await fetch(`http://localhost:3001/users/update`, {
    method: "PATCH",
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

// export const currentlyReading = createAsyncThunk('users/currentlyReading', async (book) => {
//   const response = await fetch(`http://localhost:3001/users/currentlyReading`, {
//     method: "PATCH",
//     headers: {
//       "Content-Type": "application/json",
//       "Accept": "application/json",
//       'Authorization': `Bearer ${window.localStorage.getItem('token')}`
//     },
//     body: JSON.stringify({
//       book_id: book.book_id,
//     })
//   }).then(resp => resp.json())
//   return response
// })

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    authenticated(state) {
      state.authenticated = true
    },
    userLogout(state) {
      state.currentUser = {}
    },
    reviewAdded(state, action) {
      state.currentUser.reviews.push(action.payload)
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
    [pageUser.pending]: (state, action) => {
      state.status = 'loading'
    },
    [pageUser.fulfilled]: (state, action) => {
      state.currentUser = action.payload.user
      state.status = 'succeeded'
    },
    [pageUser.rejected]: (state, action) => {
      state.currentUser = null
      state.status = 'failed'
      state.error = "User fetch failed. Please try logging in!"
    },
    [toggleFavorite.fulfilled]: (state, action) => {
      if (action.payload.addBook) {
        console.log('adding')
      state.currentUser.books.push(action.payload.addBook)
      } else {
        console.log("removing")
        console.log(action.payload.removeBook.id)
        console.log(state.currentUser.books)
        state.currentUser.books = state.currentUser.books.filter(book => book.id !== action.payload.removeBook.id)
      }
    }
    // [currentlyReading.fulfilled]: (state, action) => {
    //   state.currentUser.currentBooks.push(action.payload.currentBook)
    // }
  }
})

export const { authenticated, userLogout, reviewAdded } = usersSlice.actions

export default usersSlice.reducer