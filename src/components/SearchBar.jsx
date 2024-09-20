import React from 'react';

const SearchBar = ({ searchKey, setSearchKey, searchMovies }) => (
  <form className="container mb-4" onSubmit={searchMovies}>
    <input
      type="text"
      value={searchKey}
      placeholder="Search for movies"
      onChange={(e) => setSearchKey(e.target.value)}
    />
    <button type="submit" className="btn btn-primary">
      Search
    </button>
  </form>
);

export default SearchBar;
