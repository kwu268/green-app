import React, {useState} from "react";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import { motion } from "framer-motion";

function SearchBar({setIsSearchFocus}) {
  return (
    <div
      
      className="h-full w-full rounded-xl border-black border mx-1"
    >
      <form className="h-full bg-white rounded-xl flex gap-1 pl-3">
        <button><SearchIcon className="h-full" /></button>
        <input
          type="text"
          className=" outline-none bg-white w-full mr-2"
          placeholder={`Search for users`}
          onFocus={ () => {
            setIsSearchFocus(true)
          }}
          onBlur={ () => {
            setIsSearchFocus(false)
          }}
        />
      </form>
    </div>
  );
}

export default SearchBar;
