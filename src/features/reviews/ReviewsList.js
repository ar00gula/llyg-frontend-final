import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { ReviewUser } from './ReviewUser'
import { TimeAgo } from './TimeAgo'

export const ReviewsList = (props) => {
    const reviews = useSelector(state => state.reviews)
    const orderedReviews = reviews.slice().sort((a,b) => b.date.localeCompare(a.date))

    //render newest first
    const renderedReviews = orderedReviews.map(review => (
        <article className="review-excerpt" key={review.id}>
            <h3>{review.title}</h3>
            <p className="review-content">{review.content.substring(0, 200)}</p>
            <ReviewUser userId={review.user} />
            <TimeAgo timestamp={review.date} />
            <Link to={`/editReview/${review.id}`} className="button">
                Edit Review
            </Link>
        </article>
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