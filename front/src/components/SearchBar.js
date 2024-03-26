import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";


function SearchBar({ setIsSearchFocus }) {
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()
    const searchValue = e.target[1].value
    console.log(searchValue)
    navigate(`/search/${searchValue}`)
  }
  return (
    <div className="h-full w-full rounded-xl border-black border mx-1">
      <form className="h-full bg-white rounded-xl flex gap-1 pl-3" onSubmit={handleSearch}>
        <button>
          <SearchIcon className="h-full" />
        </button>
        <input
          type="text"
          className=" outline-none bg-white w-full mr-2"
          placeholder={`Search for users`}
          onFocus={() => {
            setIsSearchFocus(true);
          }}
          onBlur={() => {
            setIsSearchFocus(false);
          }}
        />
      </form>
    </div>
  );
}

export default SearchBar;
