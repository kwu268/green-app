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


const sendFetchPostsRequest =  async (user_id) => {
  try {
    const response = await supabase
    .from('user_posts')
    .select()
    .eq('created_by', user_id)
    // console.log(response.data)
    return response.data
  } catch (error) {
    
  }
  }

module.exports = { sendCreatePostRequest, sendFetchPostsRequest };