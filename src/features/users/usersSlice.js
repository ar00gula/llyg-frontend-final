import { createSlice } from '@reduxjs/toolkit'

const initialState = [
  { id: '0', name: 'Arianna Mayer' },
  { id: '1', name: 'Jalana Sloatman' },
  { id: '2', name: 'Caitlyn Fuoco' }
]

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {}
})

export default usersSlice.reducer