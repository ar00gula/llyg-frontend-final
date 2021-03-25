import { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit' 
// import { sub } from 'date-fns'


const initialState = {
    books: [],
    status: 'idle',
    error: null
}

// [
//     { id: '1',
//     title: "The Magpie Lord",
//     author: "KJ Charles",
//     summary: "Gay Victorian bird magic",
//     img_url: "../../images/magpie-lord.jpg",
//     rating: 5,
//     hearts: 0,
//     reviews: [] },
//     { id: '2',
//     title: "Widdershins",
//     author: "Jordan L Hawk",
//     summary: "turn of the century gay lovecraftian horror romance",
//     img_url: "../../images/slippery-creatures.png",
//     rating: 5,
//     hearts: 0,
//     reviews: []
//     }
// ]

export const fetchBooks = createAsyncThunk('books/fetchBooks', async () => {
    const data = await fetch(`http://localhost:3001/books`)
    const json = await data.json()
    
    return json.map(book => {
      return {
          id: book.id,
          title: book.title,
          author: `${book.author.first_name} ${book.author.last_name}`,
          summary: book.summary,
          img_url: book.img_url,
          created_at: book.created_at,
          hearts: book.hearts,
          reviews: book.reviews
      }
    })
  }
)

const booksSlice = createSlice({
    name: 'books',
    initialState,
    reducers: {
        reviewAdded: {
            reducer(state, action) {
                const existingBook = state.books.find(book => book.id === action.payload.bookId)
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
        reviewUpdated(state, action) {
            const { id, title, content } = action.payload
            const existingReview = state.books.find(review => review.id === id)
            if (existingReview) {
                existingReview.title = title
                existingReview.content = content
            }
        },
        heartAdded(state, action) {
            const { bookId } = action.payload
            const existingBook = state.books.find(book => book.id === bookId)
            if (existingBook) {
                existingBook.hearts++
            }
        },
        heartRemoved(state, action) {
            const { bookId } = action.payload
            const existingBook = state.books.find(book => book.id === bookId)
            if (existingBook) {
                existingBook.hearts--
            }
        }
    },
    extraReducers: {
        [fetchBooks.pending]: (state, action) => {
            state.status = 'loading'
        },
        [fetchBooks.fulfilled]: (state, action) => {
            state.status = 'succeeded'
            state.books = state.books.concat(action.payload)
        },
        [fetchBooks.rejected]: (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
        }
    }
})

export const { reviewAdded, reviewUpdated, heartAdded, heartRemoved } = booksSlice.actions

export default booksSlice.reducer

export const selectAllBooks = state => state.books.books

export const selectBookById = (state, bookId) => state.books.books.find(book => book.id === bookId)