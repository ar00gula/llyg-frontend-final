import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import store from './app/store';
import { Provider } from 'react-redux';
import { fetchBooks } from './features/books/booksSlice'
import { pageUser } from './features/users/usersSlice'
const userToken = localStorage.getItem('token')

store.dispatch(fetchBooks())

if (userToken && store.getState().users.status === 'idle') {
  store.dispatch(pageUser())
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);