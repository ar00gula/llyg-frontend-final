import React from 'react'
import { useSelector } from 'react-redux'
import { AddReviewForm } from './reviews/AddReviewForm'
import { ReviewsList } from './reviews/ReviewsList'

export const SingleBookPage = ({ match }) => {
  const bookId = match.params.bookId
  console.log(match)
  console.log(bookId)

  const book = useSelector(state => state.books.books.find(book => book.id.toString() === bookId))

  // useEffect(() => {
  //   if (addRequestStatus === 'idle') {
  //       dispatch(fetchBooks())
  //       //this is VERY wrong (creating additional entries) how tf do i update this should be so easy
  //   }
  // }, [addRequestStatus, dispatch])
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
          <ReviewsList bookId={bookId}/>
          <AddReviewForm bookId={bookId} />
    </section>
  )
}