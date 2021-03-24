import { configureStore } from '@reduxjs/toolkit';
import usersReducer from '../features/users/usersSlice';
import booksReducer from '../features/books/booksSlice'


export default configureStore({
  reducer: {
    users: usersReducer,
    books: booksReducer
  },
});
