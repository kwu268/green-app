import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import { AnimatePresence, motion } from "framer-motion";
import PostCard from "../components/PostCard";
import {  getFollowedPosts } from "../api/profileApi";
import AddBoxIcon from "@mui/icons-material/AddBox";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import CreateGameForm from "../components/CreateGameForm";



//PostCard add bottom part of card to show user avatar, name, and num likes and comments

function HomePage() {
  const [posts, setPosts] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [open, setOpen] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const token = JSON.parse(sessionStorage.getItem("token"));

  const refreshPostData = async () => {
    try {
      setPosts(await getFollowedPosts(token.user.id));

    } catch (error) {
      console.error("Error refreshing post data:", error);
      return error;
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleDialogClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    refreshPostData();

    const handleScroll = () => {
      const homeScreenBanner_Yoffset = 400;
      const shouldShowSearchBar = window.scrollY > homeScreenBanner_Yoffset;
      setShowSearchBar(shouldShowSearchBar);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-full h-auto flex justify-center">
      <AnimatePresence className="">
        {showSearchBar && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 1 }}
            animate={{ opacity: 1, y: 0, scale: isFocused ? 1.05 : 1 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ type: "spring", stiffness: 100, duration: 0.5 }}
            className="w-1/3 h-[45px] fixed  z-10  mt-5"
          >
            <SearchBar setIsSearchFocus={setIsFocused} />
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          opacity: { duration: 3 }, 
          y: { duration: 1.5 },
        }}
        className=" w-9/12 bg-white my-2 rounded-lg flex flex-col min-h-[900px] items-center"
      >
        <motion.div className="w-5/6 h-[400px] rounded-lg border-black border-2 bg-home-screen bg-center  flex justify-around items-end mt-6 shadow-slate-500 shadow-lg">
          <div className="w-1/3 mb-10 flex">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className=" w-full h-[45px] border-black border-2 text-black font-medium rounded-full  shadow-xl bg-white hover:bg-emerald-400"
              type="button"
              onClick={handleClickOpen}
            >
              <AddBoxIcon />
              Create a post
            </motion.button>
            <Dialog
              className="flex flex-col items-center"
              open={open}
              onClose={handleDialogClose}
              fullWidth
            >
              <DialogContent>
                <CreateGameForm
                  token={token}
                  handleDialogClose={handleDialogClose}
                />
              </DialogContent>
            </Dialog>
          </div>
          <motion.div
            initial={{ scale: 1 }}
            animate={{ scale: isFocused ? 1.05 : 1 }}
            transition={{ type: "spring", stiffness: 100 }}
            className="w-1/3 h-[45px] flex justify-center mb-10 "
          >
            <SearchBar setIsSearchFocus={setIsFocused} />
          </motion.div>
        </motion.div>

          <div className=" text-left text-2xl font-medium  my-10 ml-16">
            Recent Posts
          </div>
          <motion.div
            className="flex mb-10 gap-14 justify-center flex-wrap w-full h-auto "
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              opacity: { duration: 3 }, // Duration of 1 second for the opacity transition
              y: { duration: 1.5 },
              staggerChildren: 0.3, // Duration of 1 second for the y-axis transition
            }}
          >
            {posts &&
              posts !== false &&
              posts.toReversed().map((postData, i) => {
                return (
                  <PostCard
                    key={i}
                    postData={postData}
                    token={token}
                    onActionComplete={refreshPostData}
                  />
                );
              })}
          </motion.div>
      </motion.div>
    </div>
  );
}

export default HomePage;
