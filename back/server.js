const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const { sendCreateUserRequest, sendSignInRequest, sendGetUserRequest} = require("./authorization/userAuthFuncs");
const { sendCreatePostRequest} = require("./posts/userPostFuncs");


app.get("/", (req, res) => {
  res.json("here");
});


// User Authentication 
app.post("/createUser", async (req, res) => {
  const { email, password, display_name } = req.body;
  try {
    const request = await sendCreateUserRequest(email, password, display_name);
    res.json({ result: "created" });
  } catch (error) {
    res.json({ result: error.message }); 
  }
});

app.post("/signIn", async (req, res) => {
  const { email, password } = req.body;
  const result = await sendSignInRequest(email, password);
  res.json(result);
  console.log(result)
});

// app.get("/getUser", async (req, res) => {
//   try {
//     const request = await sendGetUserRequest()
//     console.log(request)
//   } catch (error) {
//     console.log(error.message)
//   }
// })


//Game Post Related APIs
app.post("/createPost", async (req, res) => {
  const { title, numHoles, strokes, userID } = req.body;
  try {
    const request = await sendCreatePostRequest(title, numHoles, strokes, userID)
    console.log("test: ", request)
    // console.log("success")
  } catch (error) {
    console.log(error)
      res.json({result: error.message})
  } 
})


app.listen(3001, () => {
  "Server started on port 3001";
});
