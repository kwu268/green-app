import React, { useState, useEffect } from "react";
import axios from "axios";

import AvatarInfo from "../components/AvatarInfo.js";
import PostCard from "../components/PostCard.js";

const serverURL = process.env.REACT_APP_BACKEND_SERVER;

function ProfilePage({token}) {
  const [posts, setPosts] = useState(false)
  //state variable to check if parameter for profile that isn't user's profile is set 

  const getProfilePosts = () => {
    
    // console.log(params)
		axios.get(`${serverURL}/getProfilePost`, {params: {
      user_id: token.user.id
    }} )
			.then(response => {
				console.log(response.data)
        setPosts(response.data)
			})
			.catch(error => {
				console.error('Error fetching data:', error);
			});
	}

  // const getUserInfo
	
	useEffect(() => {
		getProfilePosts();
		}, []);


  return (
    <div className="   min-h-full h-auto flex justify-center">
      <div className=" w-9/12  flex flex-col rounded-lg h-auto mt-2">
        {/* 3 divs total: profile, side info, recent posts */}
        <div className=" flex h-[350px] w-full rounded-tl-xl rounded-tr-xl ">
          {/* top half */}
          <div className="flex flex-col w-2/3 shadow-md shadow-slate-300 rounded-xl">
            <div className="bg-gradient-to-tr from-amber-500 via-fuchsia-300 to-cyan-300 h-1/2rounded-tl-xl rounded-tr-xl">
              <div className="relative top-16 left-[20px] w-44 rounded-full p-2 bg-white flex">
                <AvatarInfo />
              </div>
            </div>
            <div className="bg-white h-2/3 rounded-bl-xl rounded-br-xl pt-24 ">
              Name info and follower info
            </div>
          </div>
          <div className="bg-white h-full w-1/3 ml-4 shadow-md shadow-slate-300 rounded-xl">
            about me section and golf stats
          </div>
        </div>

        <div className=" bg-white w-full  my-4 shadow-md shadow-slate-300 rounded-xl min-h-[600px] "> 
          <div className=" text-left text-3xl font-medium text-emerald-700 mt-10 ml-10">Posts</div>
          <div className="flex mb-10 mt-10 gap-14 justify-center flex-wrap ">
          {posts && posts.map((postData, i) => {
                  return <PostCard key={i} postData={postData} />;
                })}
          </div>
        </div>

      </div>
    </div>
  );
}

export default ProfilePage;
