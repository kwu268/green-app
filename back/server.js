const express = require('express');
const cors = require('cors');


const app = express()
app.use(cors());
app.use(express.json());

const sendCreateUserRequest = require('./authorization/createUser')

app.get("/", (req, res) => {
    console.log(supabase)
    res.json("here")
}) 

app.post("/createUser", (req, res) => {
    const {email, password, display_name} = req.body;
    const result = sendCreateUserRequest(email, password, display_name)
    res.json({"result": result})
    // console.log(result)
    
});

app.listen(3001, () => {"Server started on port 3001"})