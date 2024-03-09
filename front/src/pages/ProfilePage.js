import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

import AvatarInfo from "../components/AvatarInfo.js";
import PostCard from "../components/PostCard.js";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import ProfileDialog from "../components/ProfileDialog.js";
import { motion } from "framer-motion";

const serverURL = process.env.REACT_APP_BACKEND_SERVER;

function ProfilePage({ token }) {
  const [posts, setPosts] = useState(false);
  const [userInfo, setUserInfo] = useState(false);
  const [numFollowers, setNumFollowers] = useState(0);
  const [numFollowing, setNumFollowing] = useState(0);
  const [open, setOpen] = useState(false);
  let hasFetched = useRef(false)


  const handleDialogClose = () => {
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const getProfilePosts = () => {
    axios
      .get(`${serverURL}/getProfilePost`, {
        params: {
          user_id: token.user.id,
        },
      })
      .then((response) => {
        hasFetched.current = true
        setPosts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const getUserInfo = () => {
    axios
      .get(`${serverURL}/getProfileInfo`, {
        params: {
          user_id: token.user.id,
        },
      })
      .then((response) => {
        setUserInfo(response.data[0]);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const refreshPosts = () => {
    getProfilePosts();
  };

  useEffect(() => {
    if (!hasFetched.current) {
      getProfilePosts();
      getUserInfo();
    }
    
  }, );
  

  return (
    <div className="   min-h-full h-auto flex justify-center">
      <div className=" w-9/12  flex flex-col rounded-lg h-auto mt-2">
        <div className=" flex h-[300px] w-full rounded-tl-xl rounded-tr-xl ">
          <div className="flex flex-col w-2/3 shadow-md shadow-slate-300 rounded-xl">
            <div className="bg-gradient-to-tr from-amber-500 via-fuchsia-300 to-cyan-300 rounded-tl-xl rounded-tr-xl ">
              <div className="relative top-16 left-[20px] w-44 rounded-full p-2 bg-white flex">
                <AvatarInfo />
              </div>
            </div>
            <div className="bg-white  rounded-bl-xl rounded-br-xl h-1/2  flex justify-between">
              <div className="w-1/5  flex items-center justify-end ">
                <p className=" text-3xl font-medium  mt-10 mr-6">
                  {userInfo ? userInfo.display_name.display_name : " "}
                </p>
              </div>
              <div className="w-1/5 flex justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className=" h-1/3 w-[110px] text-stone-200 font-medium rounded-full mt-4  shadow-xl bg-emerald-700 hover:bg-emerald-400"
                  type="button"
                  onClick={(handleClickOpen)}
                >
                  Edit Profile
                </motion.button>
                <Dialog
                  maxWidth='lg'
                  fullWidth
                  open={open}
                  onClose={handleDialogClose}
                >
                  <DialogContent >
                    <ProfileDialog handleDialogClose={handleDialogClose}/>
                  </DialogContent>
                </Dialog>
              </div>
              <div className="flex gap-4 text-lg mt-5 mr-16 font-semibold w-3/5 justify-end">
                <div className="flex flex-col items-center">
                  <div>Game Posts</div>
                  <div> {posts ? posts.length : 0}</div>
                </div>
                <div className="flex flex-col items-center">
                  <div>Followers</div>
                  <div>{numFollowers}</div>
                </div>
                <div className="flex flex-col items-center">
                  <div>Following</div>
                  <div>{numFollowing}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white h-full w-1/3 ml-4 shadow-md shadow-slate-300 rounded-xl flex flex-col">
            <div className="h-1/8 ml-3 mt-3 text-lg font-medium">About Me</div>
            <div className="h-full  border-t-2 border-t-gray-500  m-2"><p className="m-1">{userInfo && userInfo.about_me.about_me}</p></div>
          </div>
        </div>

        <div className="bg-white rounded-xl min-h-[600px] mt-4">
          <div className=" text-left text-2xl font-medium  my-10 ml-16">
            Posts
          </div> 
          <motion.div
            className="flex mb-10 gap-14 justify-center flex-wrap w-auto h-auto"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              opacity: { duration: 3 }, // Duration of 1 second for the opacity transition
              y: { duration: 1.5 },
              staggerChildren: 0.3 // Duration of 1 second for the y-axis transition
            }}
            
          >
            {posts &&
              posts.toReversed().map((postData, i) => {
                return <PostCard key={i} postData={postData} token={token} onActionComplete={refreshPosts}/>;
              })}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
