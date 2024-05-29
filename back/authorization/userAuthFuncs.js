const supabase = require("../supabaseClient");

const sendCheckIfEmailExistsRequest = async (email) => {
  try {
    const response = await supabase
      .from("user_profile")
      .select()
      .eq("email", email);
    return response.data;
  } catch (error) {}
};

const sendCheckIfDisplayNameExistsRequest = async (display_name) => {
  try {
    const response = await supabase
      .from("user_profile")
      .select()
      .eq("display_name", `{"display_name": "${display_name}"}`);
    return response.data;
  } catch (error) {}
};

const sendCreateUserRequest = async (email, password, display_name) => {
  try {
    const email_result = await sendCheckIfEmailExistsRequest(email);
    const display_name_result = await sendCheckIfDisplayNameExistsRequest(
      display_name
    );
    if (email_result.length > 0) {
      return { Error: "An account with this email already exists" };
    }
    if (display_name_result.length > 0) {
      return { Error: "An account with this display name already exists" };
    }

    console.log("good");
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          display_name: display_name,
        },
      },
    });
    console.log(data);
    console.log(error);
  } catch (error) {}
};

const sendSignInRequest = async (email, password) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    console.log("befire");
    console.log(error)
    if (error) {
      console.log("jump");
      return { Error: error.message }; // This will be caught by the catch block below
    }
    console.log("goody");
    return data;
    // This will return the data object back to the caller
  } catch (error) {}
};

const sendGetUserRequest = async () => {
  try {
    const { data, error } = await supabase.auth.getUser();
    console.log(data);
    console.log("error: ", error);
    return data;
  } catch (error) {
    return error;
  }
};

module.exports = {
  sendCreateUserRequest,
  sendSignInRequest,
  sendGetUserRequest,
};

// BEGIN
//   INSERT INTO public.user_profile (id, email, display_name)
//   VALUES (NEW.id, NEW.email, NEW.display_name);
//   RETURN NEW;
// END
