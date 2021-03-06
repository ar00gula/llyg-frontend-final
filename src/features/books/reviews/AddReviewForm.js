import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addNewReview } from '../booksSlice'
import { unwrapResult } from '@reduxjs/toolkit'

export const AddReviewForm = ({bookId}) => {
    const dispatch = useDispatch()

    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [addRequestStatus, setAddRequestStatus] = useState('idle')

    const currentUser = useSelector(state => state.users.currentUser)

    const canSave = [title, content].every(Boolean) && addRequestStatus === 'idle'

    const onTitleChanged = e => setTitle(e.target.value)
    const onContentChanged = e => setContent(e.target.value)

    const onSubmitReview = async () => {
        const date = new Date().toISOString()
        const review = addNewReview({title: title, content: content, username: currentUser.username, userId: currentUser.id, book: bookId, date: date})

        if (canSave) {
            try { setAddRequestStatus('pending')
            const resultAction = await dispatch(review
                //dispatching action creator (includes defined type string) with arugment of our desired payload
                //username and user_id are redundant but i don't want to take the time to update on backend
            )
            unwrapResult(resultAction)

            setTitle('')
            setContent('')
            //blanks out form
            } catch (err) {
                console.error('Failed to save the post: ', err)
            } finally {
                setAddRequestStatus('idle')
            }
        }
    }

    return (
        <section className="review-form">
            <br></br>
            <h2>Write a Review!</h2>
            <form>
                <label htmlFor="reviewTitle">Review Title: </label>
                <input
                type="text"
                id="reviewTitle"
                name="reviewTitle"
                value={title}
                onChange={onTitleChanged}
                />
                <br></br>
                <br></br>
                <label htmlFor="reviewContent">Content: </label>
                <textarea
                id="reviewContent"
                name="reviewContent"
                value={content}
                onChange={onContentChanged}
                />
                <br></br>
                <br></br>
                <button type="button" onClick={onSubmitReview} disabled={!canSave}>Submit Review</button>
            </form>
        </section>
    )
}