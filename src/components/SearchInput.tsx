import React from "react";

interface Props {
  query: string;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchInput: React.FC<Props> = ({ query, handleSearch }) => {
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
