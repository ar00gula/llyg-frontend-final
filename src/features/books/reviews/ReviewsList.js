import { nanoid } from '@reduxjs/toolkit'
import React from 'react'
import { useSelector } from 'react-redux'
// import { Link } from 'react-router-dom'
// import { AddReviewForm } from './AddReviewForm'
import { BookReviewCard} from './BookReviewCard'

export const ReviewsList = ({bookId}) => {
    const reviews = useSelector(state =>
        state.books.books.find(book => book.id.toString() === bookId).reviews
      )
    const orderedReviews = reviews.slice().sort((a,b) => b.date.localeCompare(a.date))
    
    const renderedReviews = orderedReviews.map(review => (
        <BookReviewCard review={review} />
        //make it so u can expand a review and see more than just the preview
    )//add code here to make it so that a max of 6 reviews show? or make a box around them and let you scroll thru the whole thing?
    )
    // why is this in parentheses
    
    return (
        <section className="reviews-list">
            <h2>Recent Reviews</h2>
            {renderedReviews}
        </section>
    )
}