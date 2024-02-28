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
    console.log(data);
    return data;
  } catch (error) {
    return error;
  }
};

const sendFetchPostsRequest = async (user_id) => {
  try {
    const response = await supabase
      .from("user_posts")
      .select()
      .eq("created_by", user_id);
    return response.data;
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

    console.log(data);
    console.log(error);
    return data;
  } catch (error) {
    return error;
  }
};

const sendFetchPostCommentsLikes = async (post_id) => {
  try {
    const comments = await supabase
      .from("user_comments")
      .select(
        `
      comment_id,
      comment_string,
      created_at,
      post_id,
      user_id,
      user_profile (
        display_name
      )
    `
      )
      .eq("post_id", post_id);

    const likes = await supabase
      .from("user_likes")
      .select()
      .eq("post_id", post_id);
      console.log(likes)

    return { comments: comments.data, likes: likes.data };
  } catch (error) {}
};

const sendLikeRequest = async (user_id, post_id, method) => {
  try {
    if (method === "like") {
      const { data, error } = await supabase
        .from("user_likes")
        .insert({
          post_id: post_id,
          liked_by: user_id,
        })
        .select();
        console.log(data)
        console.log(error)
        return data;
    }
    else {
      const { data, error } = await supabase
      .from("user_likes")
      .delete()
      .eq('liked_by', user_id)
      .select();
      console.log(error)
      return data;
    }

  } catch (error) {}
};
module.exports = {
  sendCreatePostRequest,
  sendFetchPostsRequest,
  sendCreateCommentRequest,
  sendFetchPostCommentsLikes,
  sendLikeRequest,
};
