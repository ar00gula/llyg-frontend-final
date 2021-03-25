import { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit' 
// import { sub } from 'date-fns'


const initialState = {
    books: [],
    status: 'idle',
    error: null
}

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

export const addNewReview = createAsyncThunk('books/addNewReview', async initialReview => {
    const response = await fetch(`http://localhost:3001/reviews`, {
        ///aight bitch when you come back to this, you gotta 
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        id: nanoid(),
        date: new Date().toISOString(),
        title: initialReview.title,
        content: initialReview.content,
        user: initialReview.userId,
      })
    })
    return response
})

const booksSlice = createSlice({
    name: 'books',
    initialState,
    reducers: {
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
        },
        [addNewReview.fulfilled]: (state, action) => {
            state.books.push(action.payload)
        }
    }
})

export const { reviewAdded, reviewUpdated, heartAdded, heartRemoved } = booksSlice.actions

export default booksSlice.reducer

export const selectAllBooks = state => state.books.books

export const selectBookById = (state, bookId) => state.books.books.find(book => book.id === bookId)