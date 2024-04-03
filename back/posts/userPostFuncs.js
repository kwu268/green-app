const supabase = require("../supabaseClient");

const sendCreatePostRequest = async (title, numHoles, strokes, userID) => {
  try {
    const { data, error } = await supabase.from("user_posts").insert({
      title: title,
      created_by: userID,
      num_holes: numHoles,
      game_details: {
        strokes: strokes,
      },
    });
    return data;
  } catch (error) {
    return error;
  }
};

const sendFetchPostsRequest = async (user_id) => {
  try {
    const response = await supabase
      .from("user_posts")
      .select(
        `post_id,
      created_at,
      created_by,
      game_details,
      title,
      num_holes,
      user_profile!user_posts_created_by_fkey (
        display_name
      ),
      user_likes (
        is_liked,
        user_id
      ),
      user_comments (
        comment_string,
        user_id,
        user_profile (
          display_name
        )
      )`
      )
      .eq("created_by", user_id);
    const postData = response.data.map((post) => {
      return {
        ...post,
        user_likes: post.user_likes.filter((like) => like.is_liked),
      };
    });
    return postData;
  } catch (error) {}
};

const sendCreateCommentRequest = async (comment, user_id, post_id) => {
  try {
    const { data, error } = await supabase
      .from("user_comments")
      .insert({
        post_id: post_id,
        comment_string: comment,
        user_id: user_id,
      })
      .select();
    return data;
  } catch (error) {
    return error;
  }
};

const sendLikeRequest = async (user_id, post_id, isLiked) => {
  try {
    if (isLiked == true) {
      const { data, error } = await supabase
        .from("user_likes")
        .upsert(
          { is_liked: true, post_id: post_id, user_id: user_id },
          { onConflict: ["post_id", "user_id"] }
        )
        .eq("user_id", user_id)
        .eq("post_id", post_id)
        .select();
      return data;
    } else {
      const { data, error } = await supabase
        .from("user_likes")
        .update({ is_liked: false })
        .eq("user_id", user_id)
        .eq("post_id", post_id)
        .select();
      console.log(error);
      return data;
    }
  } catch (error) {}
};

const getIsLiked = async (user_id, post_id) => {
  try {
    const { data, error } = await supabase
      .from("user_likes")
      .select("is_liked")
      .eq("user_id", user_id)
      .eq("post_id", post_id);
    if (data.length == 0 || !data[0].is_liked) {
      return false;
    } else {
      return true;
    }
  } catch (error) {}
};

const getFollowedUsers = async (user_id) => {
  try {
    const { data, error } = await supabase
      .from("user_follow")
      .select("following_user_id")
      .eq("user_id", user_id);
    const followedUsers = data.map((follow) => follow.following_user_id);
    return followedUsers;
  } catch (error) {}
};

const getFollowedPosts = async (user_id) => {
  try {
    const followedUsers = await getFollowedUsers(user_id);
    const { data, error } = await supabase
      .from("user_posts")
      .select(
        `post_id,
      created_at,
      created_by,
      game_details,
      title,
      num_holes,
      user_profile!user_posts_created_by_fkey (
        display_name
      ),
      user_likes (
        is_liked,
        user_id
      ),
      user_comments (
        comment_string,
        user_id,
        user_profile (
          display_name
        )
      )`
      )
      .in("created_by", followedUsers);

    return data;
  } catch (error) {}
};
module.exports = {
  sendCreatePostRequest,
  sendFetchPostsRequest,
  sendCreateCommentRequest,
  sendLikeRequest,
  getIsLiked,
  getFollowedPosts,
};
