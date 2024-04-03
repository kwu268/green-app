import axios from "axios";

const serverURL = process.env.REACT_APP_BACKEND_SERVER;

export const getProfilePosts = async (user_id) => {
  try {
    const response = await axios.get(`${serverURL}/getProfilePost`, {
      params: { user_id },
    });
    return response.data; // This value will be returned to where the function is called
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // This allows the caller of getProfilePosts to handle the error
  }
};

export const getUserInfo = async (user_id) => {
  try {
    const response = await axios.get(`${serverURL}/getProfileInfo`, {
      params: { user_id },
    });
    return response.data[0]; // This value will be returned to where the function is called
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // This allows the caller of getProfilePosts to handle the error
  }
};

export const getFollowedPosts = async (user_id) => {
  try {
    const response = await axios.get(`${serverURL}/getFollowedPost`, {
      params: { user_id },
    });
    return response.data;
  } catch (error) {}
};

export const sendParamProfileUserId = async (display_name) => {
  try {
    const response = await axios.get(`${serverURL}/paramUserId`, {
      params: { display_name },
    });

    return response;
  } catch (error) {}
};

export const sendParamSearch = async (display_name) => {
  try {
    const response = await axios.get(`${serverURL}/paramSearch`, {
      params: { display_name },
    });
    return response;
  } catch (error) {}
};
export const getFollowInfo = async (user_id) => {
  try {
    const response = await axios.get(`${serverURL}/getFollows`, {
      params: { user_id },
    });
    return response;
  } catch (error) {}
};
export const getIsFollowed = async (user_id, following_user_id) => {
  try {
    const response = await axios.get(`${serverURL}/getIsFollowed`, {
      params: { user_id, following_user_id },
    });
    return response;
  } catch (error) {}
};

export const sendFollowRequest = async (
  user_id,
  following_user_id,
  is_followed
) => {
  console.log('sending')
  try {
    const params = {
      user_id: user_id,
      following_user_id: following_user_id,
      is_followed: is_followed,
    };
    const response = await axios.post(`${serverURL}/sendFollowRequest`, {
      ...params,
    });
    return response;
  } catch (error) {}
};
