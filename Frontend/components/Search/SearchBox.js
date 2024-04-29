import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';

const SearchBox = ({ onSearchSubmit }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onSearchSubmit(searchTerm); 
    }, 500); 

    return () => clearTimeout(timeoutId);
  }, [searchTerm, onSearchSubmit]);

  return (
    <form onSubmit={(e) => e.preventDefault()} className="w-full my-4 mx-auto text-black">
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search..."
          className="py-2 px-4 w-full border-2 border-gray-300 rounded-full focus:outline-none focus:border-blue-500"
        />
        <button type="submit" className="absolute right-0 top-0 mt-2 mr-3">
          <svg
            className="text-gray-500 hover:text-blue-500 h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-5-5m2-5c0-3.866-3.134-7-7-7s-7 3.134-7 7 3.134 7 7 7 7-3.134 7-7z"
            ></path>
          </svg>
        </button>
      </div>
    </form>

  );
};

export default SearchBox;
