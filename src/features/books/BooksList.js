import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {SortBooksForm} from './SortBooksForm'
import { BookCard } from './BookCard'
// import { ReviewUser } from './ReviewUser'
// import { TimeAgo } from './TimeAgo'

export const BooksList = () => {
    const books = useSelector(state => state.books)
    //stretch goals - ignore "the" and "a", sort by series inside of author

    const [sortBy, setSortBy] = useState('author')
    let sortedBooks = books.slice().sort((a,b) => a[sortBy].localeCompare(b[sortBy]))

    const renderedBooks = sortedBooks.map(book => (
        <article className="book-info" key={book.id}>
            <BookCard book={book} />
        </article>
        )
    )

    return (
        <section className="reviews-list">
            <SortBooksForm sortBy={setSortBy} />
            <h2>Books</h2>
            {renderedBooks}
        </section>
    )
}