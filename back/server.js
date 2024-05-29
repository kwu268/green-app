const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const {
  sendCreateUserRequest,
  sendSignInRequest,
  sendGetUserRequest,
} = require("./authorization/userAuthFuncs");
const {
  sendCreatePostRequest,
  sendFetchPostsRequest,
  sendCreateCommentRequest,
  getIsLiked,
  sendLikeRequest,
  getFollowedPosts,
} = require("./posts/userPostFuncs");
const {
  sendFetchProfileInfo,
  sendAboutMe,
  sendParamProfileUserId,
  sendSearchUserResult,
  getFollowInfo,
  getIsFollowed,
  sendFollowRequest,
} = require("./userInfo/accountFuncs");

app.get("/", (req, res) => {
  res.json("here");
});

// User Authentication
app.post("/createUser", async (req, res) => {
  const { email, password, display_name } = req.body;
  try {
    const request = await sendCreateUserRequest(email, password, display_name);

    if (request?.Error) {
      throw new Error(request.Error);
    }

    res.json({ result: "created" });
  } catch (error) {
    console.log("here ", error);
    res.json({ result: error.message.toString() });
  }
});

app.post("/signIn", async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await sendSignInRequest(email, password);
    if (result?.Error) {
      throw new Error(result.Error);
    }
    res.json(result);

  } catch (error) {
    console.log("here ", error.message.toString());
    res.json({ result: error.message.toString() });
  }
});

//User Profile Information API
app.get("/getProfileInfo", async (req, res) => {
  const { user_id } = req.query;
  try {
    const result = await sendFetchProfileInfo(user_id);
    res.json(result);
  } catch (error) {}
});

app.post("/sendAboutMe", async (req, res) => {
  const { about_me, user_id } = req.body;
  console.log(about_me);
  console.log(user_id);
  const result = await sendAboutMe(about_me, user_id);
  res.json("updated about me");
});
//Game Post Related APIs
app.post("/createPost", async (req, res) => {
  const { title, numHoles, strokes, userID } = req.body;
  try {
    const request = await sendCreatePostRequest(
      title,
      numHoles,
      strokes,
      userID
    );
    res.json("created");
  } catch (error) {
    console.log(error);
    res.json({ result: error.message });
  }
});

app.get("/getFollowedPost", async (req, res) => {
  const { user_id } = req.query;
  try {
    const result = await getFollowedPosts(user_id);
    res.json(result);
  } catch (error) {}
});

app.get("/getProfilePost", async (req, res) => {
  const { user_id } = req.query;
  try {
    const posts = await sendFetchPostsRequest(user_id);
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/createComment", async (req, res) => {
  const { comment, userID, postID } = req.body;
  try {
    const request = await sendCreateCommentRequest(comment, userID, postID);
    res.json("comment created");
  } catch (error) {}
});

app.get("/getIsLiked", async (req, res) => {
  const { user_id, post_id } = req.query;

  try {
    const request = await getIsLiked(user_id, post_id);
    res.json(request);
  } catch (error) {}
});

app.post("/sendLikeRequest", async (req, res) => {
  const { user_id, post_id, isLiked } = req.body;
  console.log("isLike: ", isLiked);

  try {
    const request = await sendLikeRequest(user_id, post_id, isLiked);
    res.json(request);
  } catch (error) {}
});

app.get("/paramUserId", async (req, res) => {
  const { display_name } = req.query;
  console.log("called");
  try {
    const response = await sendParamProfileUserId(display_name);
    res.json(response);
  } catch (error) {}
});

app.get("/paramSearch", async (req, res) => {
  const { display_name } = req.query;
  try {
    const response = await sendSearchUserResult(display_name);
    res.json(response);
  } catch (error) {}
});

app.get("/getFollows", async (req, res) => {
  const { user_id } = req.query;
  try {
    const response = await getFollowInfo(user_id);
    res.json(response);
  } catch (error) {}
});

app.get("/getIsFollowed", async (req, res) => {
  const { user_id, following_user_id } = req.query;
  console.log("checking if followed");
  try {
    const response = await getIsFollowed(user_id, following_user_id);
    res.json(response);
  } catch (error) {}
});

app.post("/sendFollowRequest", async (req, res) => {
  const { user_id, following_user_id, is_followed } = req.body;
  console.log("checking if followed");
  try {
    const response = await sendFollowRequest(
      user_id,
      following_user_id,
      is_followed
    );
    res.json(response);
  } catch (error) {}
});

app.listen(3001, () => {
  "Server started on port 3001";
});
