import React from 'react'

export const SortBooksForm = (props) => {

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