import { createSlice } from '@reduxjs/toolkit'

const initialState = [
    { id: '1', title: 'First Review!', content: 'Hello!' },
    { id: '2', title: 'Second Review', content: 'More text' }  
]

const reviewsSlice = createSlice({
    name: 'reviews',
    initialState,
    reducers: {
        reviewAdded(state, action) {
            state.push(action.payload)
        }
    }
})

export const { reviewAdded } = reviewsSlice.actions

export default reviewsSlice.reducer