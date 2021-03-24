import React, {useState} from 'react'
import { useSelector } from 'react-redux'
import { AddReviewForm } from '../reviews/AddReviewForm'
import { ReviewsList } from '../reviews/ReviewsList'

export const SingleBookPage = ({ match }) => {
  const { bookId } = match.params

  const book = useSelector(state =>
    state.books.find(book => book.id === bookId)
  )

  // const [review, setReview] = useState([])

  if (!book) {
    return (
      <section>
        <h2>Book not found!</h2>
      </section>
    )
  }

  return (
    <section>
        <img src={book.img_url} alt="cover" />
        <h1>{book.title}</h1>
        <React.Fragment>
          <ReviewsList bookId={bookId}/>
          <AddReviewForm bookId={bookId}/>
        </React.Fragment>
    </section>
  )
}