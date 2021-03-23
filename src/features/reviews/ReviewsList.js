import React from 'react'
import { useSelector } from 'react-redux'

export const ReviewsList = () => {
    const reviews = useSelector(state => state.reviews)

    //render newest first
    const renderedReviews = reviews.map(review => (
        <article className="review-excerpt" key={review.id}>
            <h3>{review.title}</h3>
            <p className="review-content">{review.content.substring(0, 200)}</p>
        </article>
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