import React from 'react'
import { useSelector } from 'react-redux'
import { BookCard } from './BookCard'

export const SortedBooksPage = ({ match }) => {
  let { sortBy } = match.params

  const books = useSelector(state =>
    state.books.books.slice().sort((a,b) => a[sortBy].localeCompare(b[sortBy]))
  )

  if (!books) {
    return (
      <section>
        {console.log(sortBy)}
        <h2>Category not found!</h2>
      </section>
    )
  }

  const renderedBooks = books.map(book => (
    <article className="book-info" key={book.id}>
        <BookCard book={book} />
    </article>
    )
)
  return (
    <section>
        {renderedBooks}
    </section>
  )
}