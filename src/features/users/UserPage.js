import React from 'react'
import { useSelector } from 'react-redux'

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
                    {currentUser.books.map(book => <p>{book.title} - {book.author.first_name} {book.author.last_name}</p>)}
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