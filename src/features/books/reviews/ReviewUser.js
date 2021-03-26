import React from 'react'
import { useSelector } from 'react-redux'

export const ReviewUser = ({ userId }) => {
    //needs to match prop name exactly
  const user = useSelector(state => state.users.currentUser)

  return <span>by {user ? user.username : 'Unknown author'}</span>
}