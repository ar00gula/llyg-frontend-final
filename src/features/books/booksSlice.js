import { createSlice, nanoid } from '@reduxjs/toolkit' //nanoid 
import { sub } from 'date-fns'


const initialState = [
    { id: '1',
    title: "The Magpie Lord",
    author: "KJ Charles",
    summary: "Gay Victorian bird magic",
    img_url: "../../images/magpie-lord.jpg",
    rating: 5,
    hearts: 0,
    reviews: [] },
    { id: '2',
    title: "Widdershins",
    author: "Jordan L Hawk",
    summary: "turn of the century gay lovecraftian horror romance",
    img_url: "../../images/slippery-creatures.png",
    rating: 5,
    hearts: 0,
    reviews: []
    }
]

const booksSlice = createSlice({
    name: 'books',
    initialState,
    reducers: {
        reviewAdded: {
            reducer(state, action) {
                const existingBook = state.find(book => book.id === action.payload.bookId)
                existingBook.reviews.push(action.payload.review)
            },
            prepare(title, content, userId, bookId) {
                return {
                    payload: {
                        review: {
                            id: nanoid(),
                            date: new Date().toISOString(),
                            title,
                            content,
                            user: userId
                        },
                        bookId: bookId
                    }
                }
            }
        },
        heartAdded(state, action) {
            const { bookId } = action.payload
            const existingBook = state.find(book => book.id === bookId)
            if (existingBook) {
                existingBook.hearts++
            }
        },
        heartRemoved(state, action) {
            const { bookId } = action.payload
            const existingBook = state.find(book => book.id === bookId)
            if (existingBook) {
                existingBook.hearts--
            }
        }
    }
})

export const { heartAdded, heartRemoved, reviewAdded } = booksSlice.actions

export default booksSlice.reducer