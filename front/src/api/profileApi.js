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
    return response.data
  } catch (error) {
    
  }
}

  export const sendParamProfileUserId = async (display_name) => {
    try {
      console.log("in api")
      const response = await axios.get(`${serverURL}/paramUserId`, {
        params: { display_name },
      });
      return response
    } catch (error) {
      
    }
}
