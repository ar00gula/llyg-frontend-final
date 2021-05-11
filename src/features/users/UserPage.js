import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { nanoid } from '@reduxjs/toolkit'
import { Link } from 'react-router-dom'
import { UserReviewCard } from '../books/reviews/UserReviewCard'
import { pageUser } from './usersSlice'
import Incrementer from './Incrementer'

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
    const books = useSelector(state => state.books.books)
    let currentBook = currentUser.books.find(book => book.id > 1)

    if (currentUser) {
        return (
            <div className="userPage">
                <div className="grid-container">
                    <div className="col">
                <h2>Currently Reading</h2>
                <div className="half-box">
                    {!currentBook ? "" : <Link to={{pathname: `/books/${currentBook.id}`}}><img style={{height: "500px", margin: "auto", display: "block"}} src={currentBook.img_url} alt="cover" /></Link>}
                </div></div>
                <div className="col">
                    <h2>Favorites</h2>
                <div className="half-box">
                    {console.log(currentUser.books)}
                    {currentUser.books.slice().reverse().map(book => <Link to={{pathname: `/books/${book.id}`}}><p><span className="format-title">{book.title} </span><span style={{fontSize: "20px"}}>||</span> {book.author}<br></br></p></Link>)}
                    {/* <img className="fav-cover-img" src={book.img_url} alt="cover" /> */}
                </div></div></div>
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