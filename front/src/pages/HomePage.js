import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import { motion } from "framer-motion";
import PostCard from "../components/PostCard";
import { getProfilePosts } from "../api/profileApi";
import homeBanner from "../images/banner.png";

const token = JSON.parse(sessionStorage.getItem("token"));

//PostCard add bottom part of card to show user avatar, name, and num likes and comments

function HomePage() {
  const [posts, setPosts] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const refreshPostData = async () => {
    try {
      setPosts(await getProfilePosts(token.user.id));
    } catch (error) {
      console.error("Error refreshing post data:", error);
      return error;
    }
  };

  useEffect(() => {
    refreshPostData();
  }, []);

  return (
    <div className="min-h-full h-auto flex justify-center">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          opacity: { duration: 3 }, // Duration of 1 second for the opacity transition
          y: { duration: 1.5 },
        }}
        className=" w-9/12 bg-white my-2 rounded-lg flex flex-col min-h-[900px] items-center"
      >
        <motion.div
          initial={{ scale: 1 }}
          animate={{ scale: isFocused ? 1.05 : 1 }}
          transition={{ type: "spring", stiffness: 100 }}
          className="w-5/6 h-[400px] rounded-lg border-black border-2 bg-home-screen bg-center  flex items-end mt-6 shadow-slate-500 shadow-lg"
        >
          <motion.div className="w-full h-[45px] flex justify-center mb-10 ">
            <SearchBar setIsSearchFocus={setIsFocused} />
          </motion.div>
        </motion.div>

        <div className="">
          <div className=" text-left text-2xl font-medium  my-10 ml-16">
            Recent Posts
          </div>
          <motion.div
            className="flex mb-10 gap-14 justify-center flex-wrap w-auto h-auto "
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              opacity: { duration: 3 }, // Duration of 1 second for the opacity transition
              y: { duration: 1.5 },
              staggerChildren: 0.3, // Duration of 1 second for the y-axis transition
            }}
          >
            {posts &&
              posts != false &&
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
        </div>
      </motion.div>
    </div>
  );
}

export default HomePage;
