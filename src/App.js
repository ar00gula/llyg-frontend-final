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
          <Redirect to="/" />
          {/* o shit what does redirect do */}
        </Switch>
      </div>
    <Navbar />
    </Router>
  );
}

export default App;
