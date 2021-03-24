import { createSlice, nanoid } from '@reduxjs/toolkit'
import { sub } from 'date-fns'


const initialState = [
    { id: '1', title: 'First Review!', content: 'Hello!',
    date: sub(new Date(), { minutes: 10 }).toISOString() },
    { id: '2', title: 'Second Review', content: 'More text',  
    date: sub(new Date(), { minutes: 5 }).toISOString() }  
]

const reviewsSlice = createSlice({
    name: 'reviews',
    initialState,
    reducers: {
        reviewAdded: {
            reducer(state, action) {
                state.push(action.payload)
            },
            prepare(title, content, userId) {
                return {
                    payload: {
                        id: nanoid(),
                        date: new Date().toISOString(),
                        title,
                        content,
                        user: userId
                    }
                }
            }
        },
        reviewUpdated(state, action) {
            const { id, title, content } = action.payload
            const existingReview = state.find(review => review.id === id)
            if (existingReview) {
                existingReview.title = title
                existingReview.content = content
            }
        }
    }
})

export const { reviewAdded, reviewUpdated } = reviewsSlice.actions

export default reviewsSlice.reducer