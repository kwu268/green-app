import React, { useEffect, useRef, useState } from "react";
import TableData from "./TableData";
import FavoriteIcon from "@mui/icons-material/Favorite";

import { sendLikeRequest, postComment, getIsLiked } from "../api/postApi";


function PostDialog({ postData, token, onActionComplete }) {
  const [isLiked, setIsLiked] = useState(false);

  const likePost = async () => {
    await sendLikeRequest(token.user.id, postData.post_id, !isLiked);
    await onActionComplete();
    await getIsLiked(token.user.id, postData.post_id);
  };

  const handleComment = async (event) => {
    event.preventDefault();
    const [comment] = event.target;
    await postComment(comment.value, token.user.id, postData.post_id);
    await onActionComplete();
    comment.value = "";
  };

  const checkIsLiked = async () => {
    try {
      setIsLiked(await getIsLiked(token.user.id, postData.post_id));
    } catch (error) {}
  };

  useEffect(() => {
    checkIsLiked();
  });

  return (
    <div className={`flex h-[550px] gap-2`}>
      <div className="w-3/5  h-full flex items-center ">
        <TableData postData={postData} />
      </div>
      <div className=" flex flex-col border-2 w-2/5 h-full bg-white rounded-lg">
        <div className=" h-[90%] pl-3 pt-3 overflow-y-auto border-2">
          {postData.user_comments &&
            postData.user_comments.map((commentData, i) => {
              return (
                <div key={i} className="flex gap-2">
                  <div className="font-bold">
                    {commentData.user_profile.display_name.display_name}
                  </div>
                  <div>{commentData.comment_string}</div>
                </div>
              );
            })}
        </div>
        <div className=" flex items-end mb-2 gap-1">
          <button onClick={likePost}>
            <FavoriteIcon
              className={`transition-colors ease-in-out  text-2xl stroke-black ${
                isLiked === true ? "text-red-500" : "text-white"
              }`}
            />
          </button>
          <div className=" text-lg">{postData.user_likes.length}</div>
        </div>
        <div className="flex  border-2rounded-lg">
          <form
            className="flex h-full w-full items-end"
            onSubmit={handleComment}
          >
            <input
              className="h-full w-5/6 px-2 py-3  border-slate-400"
              type="text"
              placeholder={"Type your comment here..."}
            />
            <button
              className="h-full text-stone-200 font-medium rounded-md w-1/6 shadow-xl bg-emerald-700 hover:bg-emerald-400"
              type="submit"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PostDialog;
