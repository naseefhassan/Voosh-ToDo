import React, { useContext } from 'react';
import { SearchContext } from '../../Context/SearchContext';

function Search() {
  const { searchTerm, setSearchTerm } = useContext(SearchContext);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="border-2 rounded-sm p-2 text-sm flex justify-between px-3 mx-5">
      <div>
        <label htmlFor="search" className="font-semibold">
          Search:
        </label>
        <input
          type="search"
          name="search"
          id="search"
          value={searchTerm}
          onChange={handleSearchChange}
          className="border-2 sm:px-2 rounded-sm sm:mx-2"
          placeholder="Search..."
        />
      </div>
      <div>
        <label htmlFor="sort" className="font-semibold">
          Sort by:
        </label>
        <select id="sort" name="sort" className="border-2 rounded-md font-semibold mx-2">
          <option value="recent">Recent</option>
          <option value="oldest">Oldest</option>
        </select>
      </div>
    </div>
  );
}

export default Search;
