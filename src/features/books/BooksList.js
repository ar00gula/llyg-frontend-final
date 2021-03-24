import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
// import { ReviewUser } from './ReviewUser'
// import { TimeAgo } from './TimeAgo'

export const BooksList = () => {
    const books = useSelector(state => state.books)
    let sortedBooks = books.slice().sort((a,b) => a.title.localeCompare(b.title))
    //stretch goal - ignore "the" and "a"

    const sortBooks = (category) => {
        sortedBooks = books.slice().sort((a,b) => b.category.localeCompare(a.category))
        return sortedBooks
    }

    //render newest first
    const renderedBooks = sortedBooks.map(book => (
        <article className="book-info" key={book.id}>
            <h3>{book.title}</h3>
            <h4>{book.author}</h4>
        </article>
        //make it so u can expand a review and see more than just the preview
    )//add code here to make it so that a max of 6 reviews show? or make a box around them and let you scroll thru the whole thing?
    )
    // why is this in parentheses
    
    return (
        <section className="reviews-list">
            <h2>Books</h2>
            {renderedBooks}
        </section>
    )
}