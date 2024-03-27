import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import { AnimatePresence, motion } from "framer-motion";
import AvatarInfo from "../components/AvatarInfo";
import { sendParamSearch } from "../api/profileApi";

function SearchPage() {
  const [isFocused, setIsFocused] = useState(false);
  const [userProfile, setUserProfile] = useState([]);
  const { username } = useParams();

  const navigate = useNavigate()


  const refreshSearchData = async (display_name) => {
    try {
      const searchedUsers = await sendParamSearch(display_name);
      setUserProfile(searchedUsers.data);
    } catch (error) {
      console.error("Error refreshing search data:", error);
      return error;
    }
  };

  const handleClickUser = async (e) => {
    const userDisplayName = await e.currentTarget.querySelector('p').textContent
     navigate(`/profile/${userDisplayName}`)
  }

  useEffect(() => {
    if (username) {
      refreshSearchData(username);
    }
  }, []);
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
          <SearchBar
            setIsSearchFocus={setIsFocused}
            setUserProfile={setUserProfile}
            initialValue={username}
          />
        </motion.div>

        <div className="flex w-full justify-evenly">
          {userProfile.length > 0 &&
            userProfile.map((user, i) => {
              return (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex border-2 border-gray-700 rounded-xl flex-wrap w-1/4 h-[60px] items-center gap-3 "
                  onClick={handleClickUser}
                >
                  <div className="ml-2">
                    <AvatarInfo
                      displayName={user.display_name.display_name}
                      size={"w-10 h-10"}
                    />
                  </div>
                  <p>{user.display_name.display_name}</p>
                </motion.button>
              );
            })}
        </div>
      </motion.div>
    </div>
  );
}

export default SearchPage;
