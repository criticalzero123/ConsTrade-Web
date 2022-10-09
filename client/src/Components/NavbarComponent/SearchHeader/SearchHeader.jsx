import React, { useState } from "react";

import { AiOutlineSearch } from "react-icons/ai";

const SearchHeader = () => {
  const searchTypeSelect = ["Platform", "Genre"];

  const [searchType, setSearchType] = useState(searchTypeSelect[0]);
  const [searchInput, setSearchInput] = useState("");

  const search = (e) => {
    e.preventDefault();
    if (
      (searchType.toLowerCase() === "platform" ||
        searchType.toLowerCase() === "genre") &&
      searchInput.trim() !== ""
    ) {
      window.location.href = `/search/category/${searchInput}`;
    } else {
      //other
    }
  };

  return (
    <form onSubmit={search}>
      <div className="flex place-items-center ">
        <div className="w-25 ">
          <select
            required={true}
            onChange={(e) => setSearchType(e.target.value)}
            value={searchType}
            className="rounded-l-md border-gray-300"
          >
            {searchTypeSelect.map((searchTypeValue) => (
              <option value={searchTypeValue} key={searchTypeValue}>
                {searchTypeValue}
              </option>
            ))}
          </select>
        </div>
        <label className="relative block w-96">
          <button
            className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
            onClick={search}
          >
            <AiOutlineSearch size={18} color={"gray"} />
          </button>
          <input
            className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-r-md  py-2 pl-3 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-md"
            placeholder="Search..."
            type="text"
            onChange={(e) => setSearchInput(e.target.value)}
            required
          />
        </label>
      </div>
    </form>
  );
};

export default SearchHeader;
