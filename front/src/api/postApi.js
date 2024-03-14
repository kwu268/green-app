import axios from "axios";

const serverURL = process.env.REACT_APP_BACKEND_SERVER;

export const sendLikeRequest = async (user_id, post_id, isLiked) => {
  const params = {
    user_id: user_id,
    post_id: post_id,
    isLiked: isLiked,
  };
  console.log("method: ", isLiked);
  await axios
    .post(`${serverURL}/sendLikeRequest`, { ...params })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error.message);
    });
};

export const postComment = async (comment, user_id, postID) => {
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

export const getIsLiked = async (user_id, post_id) => {
  try {
    const response = await axios.get(`${serverURL}/getIsLiked`, {
      params: {
        user_id: user_id,
        post_id: post_id,
      },
    });
    return response.data
  } catch (error) {}
};


export const createPost = async (title, numHoles, strokes, userID) => {
  // setIsLoading(true);
  const params = {
    title: title,
    numHoles: numHoles,
    strokes: strokes,
    userID: userID
  }
  await axios.post(`${serverURL}/createPost`, { ...params })
  .then(response => {
    console.log(response.data)
    
  })
  .catch(error => {
    console.log(error.message)
  })
}