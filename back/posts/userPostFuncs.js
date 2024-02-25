const supabase = require("../supabaseClient");


const sendCreatePostRequest =  async (title, numHoles, strokes, userID) => {
  const { data, error } = await supabase.from('user_posts').insert({ 
      title: title,
      created_by: userID,
      num_holes: numHoles,
      game_details: {
          strokes: strokes
      } 
  })
  try {
    console.log(error)
    return data
  } catch (error) {
    return error
  }
      
  }


const sendFetchPostsRequest = async () => {
  await supabase
  .from('user_posts')
  .select()
  .then((data) => {
    if (data.error) {
      throw new Error(data.error);
    }
    console.log(data);
    return data;
  })
  .catch((error) => {
    throw error;
  });
}

module.exports = { sendCreatePostRequest, sendFetchPostsRequest };