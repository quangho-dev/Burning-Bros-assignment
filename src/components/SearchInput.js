import React from "react";

const SearchInput = ({ query, handleSearch }) => {
  return (
    <input
      placeholder="Enter a name..."
      type="text"
      value={query}
      onChange={handleSearch}
      className="search-input"
    ></input>
  );
};

export default SearchInput;
