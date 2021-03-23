import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'
import { ReviewsList } from './features/reviews/ReviewsList'
import { AddReviewForm } from './features/reviews/AddReviewForm'
import './App.css'

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route
            exact path="/"
            render={() => (
              <React.Fragment>
                <AddReviewForm />
                <ReviewsList />
              </React.Fragment>
            )}
          />
          <Redirect to="/" />
          {/* o shit what does redirect do */}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
