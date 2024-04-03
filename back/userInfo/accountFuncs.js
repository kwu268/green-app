const supabase = require("../supabaseClient");

const sendFetchProfileInfo = async (user_id) => {
  try {
    const response = await supabase
      .from("user_profile")
      .select()
      .eq("id", user_id);
    return response.data;
  } catch (error) {}
};

const sendAboutMe = async (about_me, user_id) => {
  try {
    const { data, error } = await supabase
      .from("user_profile")
      .update({ about_me: about_me })
      .eq("id", user_id)
      .select();
    return data;
  } catch (error) {
    return error;
  }
};

const sendParamProfileUserId = async (display_name) => {
  try {
    const response = await supabase
      .from("user_profile")
      .select()
      .eq(
        "display_name",
        `{
          "display_name": "${display_name}"
        }`
      );
    return response.data;
  } catch (error) {}
};

const sendSearchUserResult = async (display_name) => {
  try {
    const response = await supabase
      .from("user_profile")
      .select()
      .ilike("display_name->>display_name", `%${display_name}%`);

    return response.data;
  } catch (error) {}
};
const getFollowInfo = async (user_id) => {
  try {
    const response = await supabase
      .from("user_follow")
      .select()
      .or(`user_id.eq.${user_id}, following_user_id.eq.${user_id}`);

    const followingArray = [];
    const followerArray = [];
    console.log(response)
    response.data.forEach((relation) => {
      if (relation.user_id == user_id && relation.is_followed) {
        followingArray.push(relation);
      } else if (relation.following_user_id == user_id && relation.is_followed) {followerArray.push(relation);}
    });
    return { following: followingArray, followers: followerArray };
  } catch (error) {}
};

const getIsFollowed = async (user_id, following_user_id) => {
  try {
    const { data, error } = await supabase
      .from("user_follow")
      .select("is_followed")
      .eq("user_id", user_id)
      .eq("following_user_id", following_user_id);
      console.log(data)

    if (data.length == 0 || !data[0].is_followed) {
      return false;
    } else {
      return true;
    }
  } catch (error) {}
};

const sendFollowRequest = async (user_id, following_user_id, is_followed) => {
  try {
    if (is_followed == true) {
      const { data, error } = await supabase
        .from("user_follow")
        .upsert(
          { is_followed: true, following_user_id: following_user_id, user_id: user_id },
          { onConflict: ["following_user_id", "user_id"] }
        )
        .eq("user_id", user_id)
        .eq("following_user_id", following_user_id)
        .select();
      return data;
    } else {
      const { data, error } = await supabase
        .from("user_follow")
        .update({ is_followed: false })
        .eq("user_id", user_id)
        .eq("following_user_id", following_user_id)
        .select();
      console.log(error);
      return data;
    }
  } catch (error) {}
};
module.exports = {
  sendFetchProfileInfo,
  sendAboutMe,
  sendParamProfileUserId,
  sendSearchUserResult,
  getFollowInfo,
  getIsFollowed,
  sendFollowRequest
};
