import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import {SortBooksForm} from './SortBooksForm'
import { BookCard } from './BookCard'
import { selectAllBooks } from './booksSlice'
// import { ReviewUser } from './ReviewUser'
// import { TimeAgo } from './TimeAgo'

export const BooksList = () => {
    const books = useSelector(selectAllBooks)
    //stretch goals - ignore "the" and "a", sort by series inside of author
    
    const bookStatus = useSelector(state => state.books.status)
    const error = useSelector(state => state.books.error)

    // useEffect(() => {
    //     if(bookStatus === 'idle') {
    //         dispatch(fetchBooks())
    //     }
    // }, [bookStatus, dispatch])

    const [sortBy, setSortBy] = useState('author')

    let content

    if (bookStatus === 'loading') {
        content = <div className="loader">Loading books, please wait!</div>
    } else if (bookStatus === 'succeeded') {
        let sortedBooks = books.slice().sort((a,b) => a[sortBy].localeCompare(b[sortBy]))
        
        content = sortedBooks.map(book => (
            <article className="book-info" key={book.id}>
                <BookCard book={book} />
            </article>
            )
        )
    } else if (bookStatus === 'failed') {
        content = <div>{error}</div>
    }

    return (
        <section className="reviews-list">
            <SortBooksForm sortBy={setSortBy} />
            <h2>Books</h2>
            {content}
        </section>
    )
}