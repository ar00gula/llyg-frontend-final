import React from 'react'
import { HeartButton } from './HeartButton'
// import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

export const BookCard = (props) => {
    return (
        <div className="bookcard">
            <Link to={{pathname: `/books/${props.book.id}`}}>{props.book.title}</Link>
            <HeartButton book={props.book}/>
            <img className="book-cover" src={props.book.img_url} alt="cover-image" />
        </div>
    )
}