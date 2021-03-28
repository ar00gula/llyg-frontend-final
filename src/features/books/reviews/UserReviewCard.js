import React from 'react'
import { TimeAgo } from './TimeAgo'
import { useSelector, useDispatch } from 'react-redux'
import { nanoid } from '@reduxjs/toolkit'
import { Link } from 'react-router-dom'
import { pageUser } from '../../users/usersSlice'

//there is some stuff happening with asynchronicty that i am not grokking here

export const UserReviewCard = ({review}) => {

    
    const book = useSelector(state => state.books.books.find(book => book.id === review.book_id))

    return (
        <div className="review-excerpt" key={nanoid()}>
            <Link to={{pathname: `/books/${book.id}`}}>{book.title}</Link>
            <h3>{review.title}</h3>
            <p className="review-content">{review.content.substring(0, 200)}</p>
            <TimeAgo timestamp={review.date} />
            {/* <Link to={`/editReview/${review.id}`} className="button">
                Edit Review
            </Link> */}
        </div>
    )
}