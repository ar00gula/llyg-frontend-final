import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {SortBooksForm} from './SortBooksForm'
import { BookCard } from './BookCard'
// import { ReviewUser } from './ReviewUser'
// import { TimeAgo } from './TimeAgo'

export const BooksList = () => {
    const books = useSelector(state => state.books)
    //stretch goal - ignore "the" and "a"

    const [sortBy, setSortBy] = useState('author')
    let sortedBooks = books.slice().sort((a,b) => a[sortBy].localeCompare(b[sortBy]))


    //render newest first
    const renderedBooks = sortedBooks.map(book => (
        <article className="book-info" key={book.id}>
            <BookCard book={book} />
        </article>
        //make it so u can expand a review and see more than just the preview
    )//add code here to make it so that a max of 6 reviews show? or make a box around them and let you scroll thru the whole thing?
    )
    // why is this in parentheses
    
    return (
        <section className="reviews-list">
            <SortBooksForm sortBy={setSortBy} />
            <h2>Books</h2>
            {console.log(sortBy)}
            {renderedBooks}
        </section>
    )
}