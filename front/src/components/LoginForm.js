import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom'


const serverURL = process.env.REACT_APP_BACKEND_SERVER;

function LoginForm({setToken}) {
  // Consts
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate()


  const logIn = async (email, password) => {
    setIsLoading(true)
    const params = { 
      email: email,
      password: password
    }
    await axios.post(`${serverURL}/signIn`, { ...params })
    .then((response) => {
      setIsLoading(false)
      setToken(response.data);
      navigate('/home')

    })
    .catch((e) => {
      setIsLoading(false)
      setError(e)
      console.log(error)
    })
  }

  const submitLoginRequest = (event) => {
    event.preventDefault();
    const [ email, password ] = event.target;
    logIn(email.value, password.value)

  }
  
  return (
  <div className="flex flex-col  items-center  w-full  ">
    <div className=" text-center h-1/3  flex flex-col  w-4/5 "> 
      <div className=" text-center text-3xl font-medium text-emerald-700">Sign In</div>
      <p className=" text-gray-500 pb-3">Welcome back!</p>
    </div>
    <form
        className="flex flex-col w-4/5 gap-5 "
        onSubmit={submitLoginRequest}
      >
        <input className="px-2 py-1 rounded-md" type="text" placeholder={`Email address`} />
        <input className="mb-9 px-2 py-1 rounded-md" type="password" placeholder={`Password`} />
        <button className=" px-4 py-2 text-stone-200 font-medium rounded-md w-full shadow-xl bg-emerald-700 hover:bg-emerald-400" type="submit">{`Log In`}</button>
      </form>
  </div>
)}

export default LoginForm;
