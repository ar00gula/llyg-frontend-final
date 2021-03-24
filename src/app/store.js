import { configureStore } from '@reduxjs/toolkit';
// import reviewsReducer from '../features/reviews/reviewsSlice';
import usersReducer from '../features/users/usersSlice';
import booksReducer from '../features/books/booksSlice'


export default configureStore({
  reducer: {
    // reviews: reviewsReducer,
    users: usersReducer,
    books: booksReducer
  },
});
