import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { nanoid } from '@reduxjs/toolkit'
import { reviewAdded } from './reviewsSlice'

export const AddReviewForm = () => {
    const dispatch = useDispatch()
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')

    const onTitleChanged = e => setTitle(e.target.value)
    const onContentChanged = e => setContent(e.target.value)

    const onSubmitReview = () => {
        if (title && content) {
            dispatch(
                reviewAdded({
                    id: nanoid(),
                    title,
                    content
                })
                //dispatching action creator (includes defined type string) with arugment of our desired payload

            )

            setTitle('')
            setContent('')
            //blanks out form
        }
    }

    return (
        <section>
            <h2>Write a Review!</h2>
            <form>
                <label htmlFor="reviewTitle">Review Title:</label>
                <input
                type="text"
                id="reviewTitle"
                name="reviewTitle"
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
                <button type="button" onClick={onSubmitReview}>Submit Review</button>
            </form>
        </section>
    )
}