import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { nanoid } from '@reduxjs/toolkit'
import { Link } from 'react-router-dom'
import { UserReviewCard } from '../books/reviews/UserReviewCard'
import { pageUser } from './usersSlice'

export const UserPage = () => {

    const dispatch = useDispatch()
    const userStatus = useSelector(state => state.users.status)
  
    useEffect(() => {
      if (userStatus === 'idle') {
        dispatch(pageUser())
      }
    }, [userStatus, dispatch])
    //this is doing nothing

    const currentUser = useSelector(state => state.users.currentUser)

    if (currentUser) {
        return (
            <div className="userPage">
                <h2>Currently Reading</h2>
                <div className="half-box">
                    {console.log(currentUser)}
                </div>
                <div className="half-box">
                    {currentUser.books.slice().reverse().map(book => <Link to={{pathname: `/books/${book.id}`}}>{book.title} - {book.author}<br></br></Link>)}
                </div>
                <h2>Reviews</h2>
                <div className="full-box">
                    {currentUser.reviews.slice().reverse().map(review => <UserReviewCard review={review} />)}
                </div>
            </div>
        )
    } else {
        return(
            <div>Please log in before viewing this page!</div>
        )
    }
}