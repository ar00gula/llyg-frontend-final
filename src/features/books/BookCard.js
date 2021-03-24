import React from 'react'
import '../../stylesheets/bookcard.css'
// import { useSelector } from 'react-redux'
// import { Link } from 'react-router-dom'

export const BookCard = (props) => {
    return (
        <div className="bookcard">
            <h4>{props.book.title}</h4>
            <img className="book-cover" src={props.book.img_url} alt="cover-image" />
        </div>
    )
}