//search and select, with option to create if not in existence
//tag page is tag cloud ala ao3
//make reviews 

import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addNewReview } from '../booksSlice'
import { unwrapResult } from '@reduxjs/toolkit'

export const AddUserTagForm = ({bookId}) => {
    const dispatch = useDispatch()

    const [tag, setTag] = useState('')
    const [addRequestStatus, setAddRequestStatus] = useState('idle')

    const currentUser = useSelector(state => state.users.currentUser)

    const canSave = [title, content].every(Boolean) && addRequestStatus === 'idle'

    const onTagChanged = e => setTag(e.target.value)

    const searchTags = () => {
        for (i = 0; i < li.length; i++) {
            a = li[i].getElementsByTagName("a")[0];
            txtValue = a.textContent || a.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
              li[i].style.display = "";
            } else {
              li[i].style.display = "none";
            }
          }
    }

    const onSubmitTag = async () => {
        const date = new Date().toISOString()
        // const review = addNewReview({title: title, content: content, username: currentUser.username, userId: currentUser.id, book: bookId, date: date})

        if (canSave) {
            try { setAddRequestStatus('pending')
            const resultAction = await dispatch(review
                //dispatching action creator (includes defined type string) with arugment of our desired payload
                //username and user_id are redundant but i don't want to take the time to update on backend
            )
            unwrapResult(resultAction)

            setTag('')
            //blanks out form
            } catch (err) {
                console.error('Failed to add tag: ', err)
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
            <input type="text" id="tag" onkeyup="searchTags()" placeholder="Add tag">

                <ul id="myUL">
                <li><a href="#">Adele</a></li>
                <li><a href="#">Agnes</a></li>

                <li><a href="#">Billy</a></li>
                <li><a href="#">Bob</a></li>

                <li><a href="#">Calvin</a></li>
                <li><a href="#">Christina</a></li>
                <li><a href="#">Cindy</a></li>
                </ul>
       
                <button type="button" onClick={onSubmitReview} disabled={!canSave}>Submit Review</button>
            </form>
        </section>
    )
}