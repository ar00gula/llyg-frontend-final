import React from 'react'
import { HeartButton } from './HeartButton'
// import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

export const BookCard = ({book}) => {
    return (
        <div className="bookcard">
            <Link to={{pathname: `/books/${book.id}`}}><img className="book-cover" src={book.img_url} alt="book-cover" /></Link>
            <span className="heart-button"><HeartButton book={book}/></span>
        </div>
    )
}