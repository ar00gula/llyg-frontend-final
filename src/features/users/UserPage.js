import React from 'react'
import { useSelector } from 'react-redux'
import { nanoid } from '@reduxjs/toolkit'


export const UserPage = () => {

    const usersSlice = useSelector(state => state.users)
    const currentUser = useSelector(state => state.users.currentUser)
    
    if (currentUser) {
        return (
            <div>
                <div className="half-box">
                    {console.log(currentUser)}
                </div>
                <div className="half-box">
                    {console.log(currentUser.books)}
                    {currentUser.books.map(book => <p key={nanoid()}>{book.title} - {book.author}</p>)}
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