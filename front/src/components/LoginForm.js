import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { useForm } from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup'

const serverURL = process.env.REACT_APP_BACKEND_SERVER;

function LoginForm({ setToken }) {
  // Consts
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(6).required(),
  })

  const {register, handleSubmit, formState: {errors} } = useForm({
    //use the schema for our form validation
    resolver: yupResolver(schema)
  })

  const navigate = useNavigate();

  

  const logIn = async (email, password) => {
    setIsLoading(true);
    const params = {
      email: email,
      password: password,
    };
    await axios
      .post(`${serverURL}/signIn`, { ...params })
      .then((response) => {
        setIsLoading(false);
        if (response.data.user) {
          setToken(response.data);
        }
        else {
          throw new Error(response.data.result)
        }
        navigate("/home");
      })
      .catch((e) => {
        setIsLoading(false);
        setIsError(e.message);
      });
  };



  const submitLoginRequest = (data, event) => {
    try {
      setIsError(false)
      const {email, password} = data

      logIn(email, password);
    } catch (error) {
      setIsError(error.message);
    }
  };

  return (
    <div className="flex flex-col  items-center  w-full  ">
    
      <div className=" text-center h-1/3  flex flex-col  w-4/5 ">
        <div className=" text-center text-3xl font-medium text-emerald-700">
          Sign In
        </div>
        <p className=" text-gray-500 pb-3">Welcome back!</p>
      </div>
      <form
        className="flex flex-col w-4/5 "
        onSubmit={handleSubmit(submitLoginRequest)}
      >
        <input
          className={`px-2 py-1 rounded-md ${errors.email ? 'mb-1 border-red-800 border-2': 'mb-4'}`}
          type="text"
          placeholder={`Email address`}
          {...register("email")}
        />
        {errors.email && <p className=" text-sm my-1 text-red-800">{errors.email.message}</p>}
        <input
          className={`px-2 py-1 rounded-md ${errors.password ? 'mb-1 border-red-800 border-2': 'mb-4'}`}
          type="password"
          placeholder={`Password`}
          {...register("password")}
          />
          {errors.password && <p className=" text-sm my-1 text-red-800">{errors.password.message}</p>}
        <button
          className=" px-4 py-2 text-stone-200 font-medium rounded-md w-full shadow-xl bg-emerald-700 hover:bg-emerald-400"
          type="submit"
        >{`Log In`}</button>
      </form>
      {isError && <p className="my-2 text-red-800">{isError}</p>}
    </div>
  );
}


export default LoginForm;
