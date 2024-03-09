import React, { useEffect, useRef, useState } from "react";
import TableData from "./TableData";
import FavoriteIcon from "@mui/icons-material/Favorite";
import axios from "axios";

import { getPostCommentsLikes } from "./PostCard";

const serverURL = process.env.REACT_APP_BACKEND_SERVER;

function PostDialog({ postData, token, onActionComplete }) {
  const [like, setLike] = useState(false);


  const sendLikeRequest = async (user_id, post_id, method) => {
    const params = {
      user_id: user_id,
      post_id: post_id,
      method: method,
    };
    console.log("method: ", method)
    await axios
      .post(`${serverURL}/sendLikeRequest`, { ...params })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const likePost = async () => {
    var method;
    if (!like) method = "like";
    else method = "dislike";
    await sendLikeRequest(token.user.id, postData.post_id, method)
    await onActionComplete()
    await getIsLiked(token.user.id, postData.post_id)
  };

  const postComment = async (comment, user_id, postID) => {
    const params = {
      comment: comment,
      userID: user_id,
      postID: postID,
    };
    await axios
      .post(`${serverURL}/createComment`, { ...params })
      .then((response) => {})
      .catch((error) => {
        console.log(error.message);
      });
  };

  const handleComment = async (event) => {
    event.preventDefault();
    const [comment] = event.target;
    await postComment(comment.value, token.user.id, postData.post_id);
    await onActionComplete();
    comment.value = "";
  };

  const getIsLiked = async (user_id, post_id) => {
    console.log("here gettign likes")
    await axios
      .get(`${serverURL}/getIsLiked`, {
        params: {
          user_id: user_id,
          post_id: post_id,
        },
      })
      .then((response) => {
        setLike(response.data);
      })
      .catch((error) => {});
  };
  useEffect(() => {
    console.log("useEffect")
    getIsLiked(token.user.id, postData.post_id);
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
            {like === true ? (
              <FavoriteIcon className="transition-colors ease-in-out delay-150 text-2xl stroke-black text-red-500" />
            ) : (
              <FavoriteIcon className="transition-colors ease-in-out delay-150 text-2xl stroke-black text-white" />
            )}
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
