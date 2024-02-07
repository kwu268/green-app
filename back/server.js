const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const {
  sendCreateUserRequest,
  sendSignInRequest,
} = require("./authorization/userAuthFuncs");

app.get("/", (req, res) => {
  res.json("here");
});

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

app.listen(3001, () => {
  "Server started on port 3001";
});
