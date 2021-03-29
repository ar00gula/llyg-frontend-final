import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleFavorite } from '../users/usersSlice'

export const HeartButton = ({ book }) => {
  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.users.currentUser)

  if (currentUser) {
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
          } else {
            dispatch(toggleFavorite({ book_id: book.id, favorite: true }))
          }
        }}
      >
        {emoji}
      </div>

  return heartButton
  } else {
    return("")
  }

  

  
}