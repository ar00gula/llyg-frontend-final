import React from 'react'
import { HeartButton } from './HeartButton'
// import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

export const BookCard = ({book}) => {
    return (
        <div className="bookcard">
            <Link to={{pathname: `/books/${book.id}`}}>{book.title}</Link>
            <HeartButton book={book}/>
            <img className="book-cover" src={book.img_url} alt="cover-image" />
        </div>
    )
}