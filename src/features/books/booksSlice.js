import { createSlice, createAsyncThunk } from '@reduxjs/toolkit' 

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
        ///aight bitch when you come back to this, you gotta add a reviews controller and update your backend so that you can add reviews!!
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        'Authorization': `Bearer ${window.localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        date: initialReview.date,
        title: initialReview.title,
        content: initialReview.content,
        user: initialReview.username,
        user_id: initialReview.userId,
        book_id: initialReview.book
      })
    }).then(resp => resp.json())
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
        // not yet connected to backend
        heartRemoved(state, action) {
            const { bookId } = action.payload
            const existingBook = state.books.find(book => book.id === bookId)
            if (existingBook) {
                existingBook.hearts--
            }
        }
    },
    extraReducers: {
        [fetchBooks.pending]: (state) => {
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
            state.status = 'succeeded'
            let bookReviewed = state.books.find(book => book.id === action.payload.bookId)
            bookReviewed.reviews.push(action.payload.review)
        }
    }
})

export const { reviewAdded, reviewUpdated, heartAdded, heartRemoved } = booksSlice.actions

export default booksSlice.reducer

export const selectAllBooks = state => state.books.books

export const selectBookById = (state, bookId) => state.books.books.find(book => book.id === bookId)