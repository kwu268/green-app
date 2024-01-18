const express = require('express');
const cors = require('cors');


const app = express()
app.use(cors());
app.use(express.json());

const {sendCreateUserRequest, sendSignInRequest} = require('./authorization/userAuthFuncs')


app.get("/", (req, res) => {
    res.json("here")
}) 

app.post("/createUser", (req, res) => {
    const {email, password, display_name} = req.body;
    const result = sendCreateUserRequest(email, password, display_name)
    res.json({"result": result})
    // console.log(result)
    
});

app.get("/signIn", (req, res) => {
    const {email, password} = req.body;
    const result = sendSignInRequest("kelvinwu717@gmail.com", "123456")
    res.json(result)
}) 


app.listen(3001, () => {"Server started on port 3001"})