import React from "react";
import { BiSearch } from "react-icons/bi";
import { BsFillMicFill } from "react-icons/bs";
import { IoFilterOutline } from "react-icons/io5";

export default function SearchBar({ search, setSearch, handleFilter }) {
  return (
    <div>
      <div className="py-5 flex justify-center items-center">
        <div className="flex items-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-500">
          <div className="flex items-center justify-evenly bg-gray-100 py-4 rounded-lg w-[290px]">
            <BiSearch className="text-gray-500 z-20" />
            <input
              className="outline-none bg-gray-100 w-[240px]"
              type="text"
              placeholder="Article name or keyword..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <BsFillMicFill className="text-gray-500 mx-2" size={20} />
          <button onClick={handleFilter}>
            <IoFilterOutline className="text-gray-500 mr-2" size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
