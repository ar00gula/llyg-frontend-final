import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'
import './App.css'
import './stylesheets/navbar.css'
import './stylesheets/books.css'
import { BooksList } from './features/books/BooksList'
import { Navbar } from './app/Navbar'
import { SortedBooksPage } from './features/books/SortedBooksPage'
import { SingleBookPage } from './features/books/SingleBookPage'
import { SignUpForm } from './features/users/Signup';
import { LoginForm } from './features/users/LoginForm';
import { UserPage } from './features/users/UserPage'

function App() {

  return (
    <Router>
      <div className="wrapper">
        <Switch>
          <Route
            exact path="/"
            render={() => (
              <React.Fragment>
              </React.Fragment>
            )}
          />
          <Route
            exact path="/books"
            render={() => (
              <React.Fragment>
                <BooksList />
              </React.Fragment>
             )}
          />
          <Route exact path="/books/sort/:sortBy" component={SortedBooksPage} />
          <Route exact path="/books/:bookId" component={SingleBookPage} />
          <Route exact path="/signup" component={SignUpForm} />
          <Route exact path="/login" component={LoginForm} />
          <Route exact path="/account" component={UserPage} />

          <Redirect to="/" />
          {/* o shit what does redirect do */}
        </Switch>
      </div>
    <Navbar />
    </Router>
  );
}

export default App;
