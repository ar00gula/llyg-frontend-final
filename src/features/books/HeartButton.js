import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleFavorite } from '../users/usersSlice'

export const HeartButton = ({ book }) => {
  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.users.currentUser)

  const [liked, setLiked] = useState(false)

  let emoji
  if (currentUser.books) {
    if (currentUser.books.find(userBook => userBook.title === book.title )) {
      emoji = "♥"
    } else {
      emoji = "♡"
    }
  }

  const heartButton = 
      <div
        className="muted-button heart-button"
        onClick={() => {
          if (currentUser.books.find(userBook => userBook.title === book.title ) ) {
            dispatch(toggleFavorite({ book_id: book.id, favorite: false }))
            setLiked(false)
          } else {
            dispatch(toggleFavorite({ book_id: book.id, favorite: true }))
            setLiked(true)
          }
        }}
      >
        {emoji}
      </div>

  return heartButton
}