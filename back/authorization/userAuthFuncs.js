const supabase = require("../supabaseClient");

const sendCreateUserRequest = async (email, password, display_name) => {
  await supabase.auth
    .signUp({
      email: email,
      password: password,
      options: {
        data: {
          display_name: display_name,
        },
      },
    })
    .then((data) => {
      if (data.error) {
        throw new Error(data.error);
      }
      console.log("here worked");
      return 0;
    })
    .catch((error) => {
      throw error;
    });
};

const sendSignInRequest = async (email, password) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    if (error) {
      throw error; // This will be caught by the catch block below
    }
    return data; // This will return the data object back to the caller
  } catch (error) {
    console.error(error);
    throw error; // This will pass the error back to the Express route handler
  }
};

module.exports = { sendCreateUserRequest, sendSignInRequest };

// BEGIN
//   INSERT INTO public.user_profile (id, email, display_name)
//   VALUES (NEW.id, NEW.email, NEW.display_name);
//   RETURN NEW;
// END
