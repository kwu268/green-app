import React from "react";
import { motion } from "framer-motion";
import axios from "axios";

const serverURL = process.env.REACT_APP_BACKEND_SERVER;




function ProfileDialog({handleDialogClose}) {

  const sendCreateAboutMeRequest = async (about_me, user_id) => {
    // setIsLoading(true);
    const params = {
      about_me: about_me,
      user_id: user_id
    }
    await axios.post(`${serverURL}/sendAboutMe`, { ...params })
    .then(response => {
      console.log("got about me")
      
    })
    .catch(error => {
      console.log(error.message)
    })
  }
  
  const handleSave = async (event) => {
    event.preventDefault();
    const aboutMeString = event.target[0].value
    const aboutMeJSON = {about_me : aboutMeString}
    const tokenData = JSON.parse(sessionStorage.getItem('token'));
    await sendCreateAboutMeRequest(aboutMeJSON, tokenData.user.id)
    window.location.reload();
    handleDialogClose()
  
  }

  return (
    <div className="w-full h-[500px]">
      <div className="flex flex-col h-full">
        <div className="text-3xl font-medium text-emerald-700">About Me</div>
        <p className=" text-gray-500 text-left  pt-3">
          Write a description for your profile below!
        </p>
        <form className=" h-5/6 mt-3 flex flex-col items-end" name="aboutMe" onSubmit={handleSave}>
        <textarea
          className="rounded-md border-2 border-black w-full h-5/6 p-2"
          placeholder="Write about yourself..."
        ></textarea>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className=" mt-5 w-[100px] h-[50px] text-stone-200 font-medium rounded-md  shadow-xl bg-emerald-700 hover:bg-emerald-400"
            type="submit"
          >
            Save
          </motion.button>
        </form>
      </div>
      <div></div>
    </div>
  );
}

export default ProfileDialog;
