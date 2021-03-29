import React from 'react'
import { useSelector } from 'react-redux'
import { TimeAgo } from './TimeAgo'
import { nanoid } from '@reduxjs/toolkit'

export const BookReviewCard = ({review}) => {

    const currentUser = useSelector(state => state.users.currentUser)

    if(review.username) {
        return (
            <article className="review-excerpt" key={nanoid()}>
                <h3>{review.title}</h3>
                <p className="review-content">{review.content.substring(0, 200)}</p>
                by {review.username}
                {/* go refactor yr backend so it sends a username too */}
                <TimeAgo timestamp={review.date} />
                {/* <Link to={`/editReview/${review.id}`} className="button">
                    Edit Review
                </Link> */}
            </article>
        )
        } else {
            return (
                <article className="review-excerpt" key={nanoid()}>
                    <h3>{review.title}</h3>
                    <p className="review-content">{review.content.substring(0, 200)}</p>
                    by {currentUser.username}
                    {/* go refactor yr backend so it sends a username too */}
                    <TimeAgo timestamp={review.date} />
                    {/* <Link to={`/editReview/${review.id}`} className="button">
                        Edit Review
                    </Link> */}
                </article>
            )
        }
}