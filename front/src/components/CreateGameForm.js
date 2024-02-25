

import React, { useState } from "react"; 
import axios from "axios";

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import DialogTitle from '@mui/material/DialogTitle';
import { Button } from "@mui/material";


const serverURL = process.env.REACT_APP_BACKEND_SERVER


export default function CreateGameForm({token}) {
  const [holes, setHoles] = useState('');

  const handleChange = (event) => {
    setHoles(event.target.value);
  };

  const createHoleInput = (numHoles) => {
    const arr = [];
    for (let i = 0; i < numHoles; i++) {
      arr.push(
        <div className=" w-1/2 flex justify-stretch gap-3 my-1" key={i}>
          <label>Hole {i+1}</label>
          <TextField
          className="w-1/5 ml-3"
          autoFocus
          required
          margin="dense"
          id="Par"
          name="Par"
          label="Par"
          type="number"
          variant="standard"
          />
          <TextField
          className="w-1/5"
          autoFocus
          required
          margin="dense"
          id="Strokes"
          name="Strokes"
          label="Strokes"
          type="number"
          variant="standard"
          >hole {i}</TextField>
        </div>
      );
    }
    return arr;
  }

  const sendCreatePostRequest = async (title, numHoles, strokes, userID) => {
    // setIsLoading(true);
    const params = {
      title: title,
      numHoles: numHoles,
      strokes: strokes,
      userID: userID
    }
    await axios.post(`${serverURL}/createPost`, { ...params })
    .then(response => {
      console.log("response.data.result")
      
    })
    .catch(error => {
      console.log(error.message)
      // setError(error.message);
      // setIsLoading(false);
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const [title, numHoles] = event.target
    const strokeArray = [];
    for (let i = 2; i < (2+parseInt(numHoles.value)) * 2 - 2; i++) {
      if (i % 2 !== 0) {
        continue
    }
    const currentHole = {par: event.target[i].value, strokes: event.target[i+1].value}
    strokeArray.push(currentHole)
    }
    sendCreatePostRequest(title.value, numHoles.value, strokeArray, token.user.id);
    // console.log(token.user.id)
  }
  return (

      <form className='flex justify-center flex-wrap gap-2 items-center' onSubmit={(handleSubmit)}>
        <div className="flex w-full flex-col">
          <div className=" text-left text-3xl font-medium text-emerald-700">Create a post</div>
          <p className=" text-gray-500 text-left  pt-3">Give your post a title and select the number of holes you're playing </p>
        </div>
        <TextField
          className="w-1/3 "
          autoFocus
          required
          margin="dense"
          id="title"
          name="title"
          label="Title"
          type="string"
          variant="standard"
        />
        <TextField
          className="w-1/3 "
          autoFocus
          required
          margin="dense"
          id="numholes"
          name="numholes"
          label="Number of Holes"
          type="number"
          variant="standard"
          onChange={handleChange}
        />
        {holes && (
          <div className="flex flex-col items-center">
              <DialogTitle className="">Strokes per Hole</DialogTitle>
            <div className="w-full flex flex-wrap"> {createHoleInput(holes)} </div>
            
          </div>
        )}
        <button className="pt-3 px-4 py-2 text-stone-200 font-medium rounded-md w-4/5 shadow-xl bg-emerald-700 hover:bg-emerald-400" type="submit">Create post</button>
      </form>

  );
}