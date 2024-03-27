import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { sendParamSearch } from "../api/profileApi";

function SearchBar({ setIsSearchFocus, initialValue, setUserProfile }) {
  const navigate = useNavigate()
  const [searchValue, setSearchValue] = useState(null)
  
  const getUsers = async (display_name) => {
      console.log(display_name)
      const userInfo = await sendParamSearch(display_name)
      console.log(userInfo.data)
    
  }

  const handleSearch = (e) => {
    const searchName = e.target[1].value
    console.log(searchName)
    navigate(`/search/${searchName}`)
  }

  const handleInputChange = (event) => {
    setSearchValue(event.target.value);
  };

  useEffect( () => {
    if (initialValue) {
      setSearchValue(initialValue)
    }
  }, [])
  return (
    <div className="h-full w-full rounded-xl border-black border mx-1">
      <form className="h-full bg-white rounded-xl flex gap-1 pl-3" onSubmit={handleSearch}>
        <button>
          <SearchIcon className="h-full" />
        </button>
        <input
        value={searchValue}
          type="text"
          className=" outline-none bg-white w-full mr-2"
          placeholder={`Search for users`}
          onChange={handleInputChange}
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
