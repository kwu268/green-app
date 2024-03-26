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
      .from('user_profile')
      .update({ about_me: about_me })
      .eq('id', user_id)
      .select()
      console.log(data);
      return data;
    } catch (error) {
      return error;
    }
  };

  const sendParamProfileUserId = async (display_name) => {
    try {
      console.log("in supa")
      const response = await supabase
        .from("user_profile")
        .select('id')
        .eq("display_name", `{
          "display_name": "${display_name}"
        }`);
        console.log("HERE IT IS:  ", response.data)
      return response.data;
    } catch (error) {}
  }
module.exports = { sendFetchProfileInfo, sendAboutMe, sendParamProfileUserId };