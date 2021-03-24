import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import { reviewAdded } from './reviewsSlice'


export const SortBooksForm = (props) => {

    // const [sortBy, setSortBy] = useState('')

    // const users = useSelector(state => state.users)

    // const onSortByChanged = e => setSortBy(e.target.value)



  return (
    <div className="sort-by-form">
      <form>
      <label>Sort by:</label>
            <select id="cars" name="cars" onChange={(e) => props.sortBy(e.target.value)}>
            <option value=""></option>
            <option value="author">Author</option>
            <option value="title">Title</option>
            <option value="recent">Recent</option>
            <option value="genre">Genre</option>
        </select>
      </form>
    </div>
  );
}