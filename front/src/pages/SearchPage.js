import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import { AnimatePresence, motion } from "framer-motion";

function SearchPage() {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="min-h-full h-auto flex justify-center">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          opacity: { duration: 3 },
          y: { duration: 1.5 },
        }}
        className=" w-9/12 bg-white my-2 rounded-lg flex flex-col min-h-[900px] items-center"
      >
        <div>Search User Here:</div>
        <motion.div
          initial={{ scale: 1 }}
          animate={{ scale: isFocused ? 1.05 : 1 }}
          transition={{ type: "spring", stiffness: 100 }}
          className="w-1/2 h-[45px] flex justify-center mb-10 mt-5"
        >
          <SearchBar setIsSearchFocus={setIsFocused} />
        </motion.div>
      </motion.div>
    </div>
  );
}

export default SearchPage;
