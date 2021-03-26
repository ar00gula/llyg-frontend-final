import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getUsers } from './usersSlice'

export const UserPage = () => {
  const dispatch = useDispatch()

  useEffect(() => {
        dispatch(getUsers())
  }, [dispatch])

  return (
    <section>
        hey
    </section>
  )
}