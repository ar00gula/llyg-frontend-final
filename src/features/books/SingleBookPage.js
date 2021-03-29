import React from 'react'
import { useSelector } from 'react-redux'
import { AddReviewForm } from './reviews/AddReviewForm'
import { ReviewsList } from './reviews/ReviewsList'

export const SingleBookPage = ({ match }) => {
  const bookId = match.params.bookId
  console.log(match)
  console.log(bookId)

  const book = useSelector(state => state.books.books.find(book => book.id.toString() === bookId))

  if (!book) {
    return (
      <section>
        <h2>Book not found!</h2>
      </section>
    )
  }

  return (
    <div className="single-book-page">
      <div className='book-container'>
        <div className='book-img-container'>
          <img className="book-page-img" src={book.img_url} alt="cover" />
        </div>
        <div className='book-info-container'>
          <h1>{book.title}</h1>
          <h2>{book.author}</h2>
          {book.summary.split('<b>').join("").split('<br>').join("").split('</b>').join("")}
        </div>
      </div>
        <div className= 'reviews-container'>
          <ReviewsList bookId={bookId}/>
          <AddReviewForm bookId={bookId} />
        </div>
    </div>
  )
}