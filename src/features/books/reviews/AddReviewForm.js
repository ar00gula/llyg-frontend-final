import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { reviewAdded } from '../booksSlice'


export const AddReviewForm = ({bookId}) => {
    const dispatch = useDispatch()

    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [userId, setUserId] = useState('')

    const users = useSelector(state => state.users)

    const onTitleChanged = e => setTitle(e.target.value)
    const onContentChanged = e => setContent(e.target.value)
    const onUserChanged = e => setUserId(e.target.value)

    const onSubmitReview = () => {
        if (title && content) {
            dispatch(reviewAdded(title, content, userId, bookId)
                //dispatching action creator (includes defined type string) with arugment of our desired payload
            )

            setTitle('')
            setContent('')
            setUserId('')
            //blanks out form
        }
    }

    const canSave = Boolean(title) && Boolean(content) && Boolean(userId)

    const usersOptions = users.map(user => (
        <option key={user.id} value={user.id}>
            {user.name}
        </option>
    ))


    return (
        <section className="review-form">
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
                <br></br>
                <label htmlFor="reviewUser">User:</label>
                <select id="reviewUser" value={userId} onChange={onUserChanged}>
                    <option value=""></option>
                    {usersOptions}
                </select>
                <br></br>
                <label htmlFor="reviewContent">Content:</label>
                <textarea
                id="reviewContent"
                name="reviewContent"
                value={content}
                onChange={onContentChanged}
                />
                <br></br>
                <button type="button" onClick={onSubmitReview} disabled={!canSave}>Submit Review</button>
            </form>
        </section>
    )
}