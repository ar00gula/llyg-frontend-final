import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { reviewUpdated } from '../books/booksSlice'

export const EditReviewForm = ({ match }) => {
    const { reviewId } = match.params

    const review = useSelector(state => state.reviews.find(review => review.id === reviewId))

    const [title, setTitle] = useState(review.title)
    const [content, setContent] = useState(review.content)

    const dispatch = useDispatch()
    const history = useHistory()

    const onTitleChanged = e => setTitle(e.target.value)
    const onContentChanged = e => setContent(e.target.value)  

    const onSaveReviewClicked = () => {
        if (title && content) {
            dispatch(reviewUpdated({id: reviewId, title, content}))
            history.push(`/`)
        }
    }

    return (
        <section>
            <h2>Edit Review</h2>
      <form>
        <label htmlFor="reviewTitle">Review Title:</label>
        <input
          type="text"
          id="reviewTitle"
          name="reviewTitle"
          placeholder="What's on your mind?"
          value={title}
          onChange={onTitleChanged}
        />
        <label htmlFor="reviewContent">Content:</label>
        <textarea
          id="reviewContent"
          name="reviewContent"
          value={content}
          onChange={onContentChanged}
        />
      </form>
      <button type="button" onClick={onSaveReviewClicked}>
        Save Review
      </button>
        </section>
    )
}