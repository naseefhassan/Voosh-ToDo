
function Search() {
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
          className="border-2 px-2 rounded-sm mx-2"
          placeholder="Search..."
        />
      </div>
      <div>
        <label htmlFor="search" className="font-semibold">
          Sort by: 
        </label>
        <select id="option" name="option" className="border-2 rounded-md font-semibold mx-2 ">
          <option value="recent">Recent</option>
          <option value="female">Oldest</option>
        </select>
      </div>
    </div>
  );
}

export default Search;
