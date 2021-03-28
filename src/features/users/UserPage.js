import React from 'react'
import { useSelector } from 'react-redux'
import { nanoid } from '@reduxjs/toolkit'
import { Link } from 'react-router-dom'


export const UserPage = () => {

    const currentUser = useSelector(state => state.users.currentUser)

    
    if (currentUser) {
        return (
            <div>
                <div className="half-box">
                    {console.log(currentUser)}
                </div>
                <div className="half-box">
                    {currentUser.books.slice().reverse().map(book => <Link to={book.id} key={nanoid()}>{book.title} - {book.author}<br></br></Link>)}
                </div>
                <div className="full-box">
                    reviews
                </div>
            </div>
        )
    } else {
        return(
            <div>Please log in before viewing this page!</div>
        )
    }
}