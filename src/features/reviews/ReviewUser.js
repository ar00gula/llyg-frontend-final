import React from 'react'
import { useSelector } from 'react-redux'

export const ReviewUser = ({ userId }) => {
    //needs to match prop name exactly
  const user = useSelector(state =>
    state.users.find(user => user.id === userId)
  )

  return <span>by {user ? user.name : 'Unknown author'}</span>
}