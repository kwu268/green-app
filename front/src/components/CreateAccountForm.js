import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Dialog from "@mui/material/Dialog";
import Alert from "@mui/material/Alert";
const serverURL = process.env.REACT_APP_BACKEND_SERVER;

function CreateAccountForm({ setToken }) {
  // Consts
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(6).required(),
    displayName: yup.string().min(2).required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    //use the schema for our form validation
    resolver: yupResolver(schema),
  });

  const signUp = async (email, password, display_name) => {
    setIsLoading(true);
    const params = {
      email: email,
      password: password,
      display_name: display_name,
    };
    await axios
      .post(`${serverURL}/createUser`, { ...params })
      .then((response) => {
        if (response.data.result == "created") {
          window.location.reload();
        } else {
          throw new Error(response.data.result);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error.toString());
        setIsError(error.message);
        setIsLoading(false);
      });
  };

  const submitNewUser = (data) => {
    try {
      setIsError(false)
      const { email, password, displayName } = data;
      signUp(email, password, displayName);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="flex flex-col  items-center  w-full">
      <div className=" text-center h-1/3  flex flex-col  w-4/5 ">
        <div className=" text-center text-3xl font-medium text-emerald-700">
          Create an account
        </div>
        <p className=" text-gray-500 pb-3">Welcome to Greeen!</p>
      </div>
      <form
        className={`flex flex-col w-4/5`}
        onSubmit={handleSubmit(submitNewUser)}
      >
        <input
          className={`px-2 py-1 rounded-md  ${
            errors.email ? "mb-1 border-red-800 border-2" : "mb-4"
          }`}
          type="text"
          placeholder={`Email`}
          {...register("email")}
        />
        {errors.email && (
          <p className=" text-sm my-1 text-red-800">{errors.email.message}</p>
        )}
        <input
          className={`px-2 py-1 rounded-md  ${
            errors.password ? "mb-1 border-red-800 border-2" : "mb-4"
          }`}
          type="password"
          placeholder={`Password`}
          {...register("password")}
        />
        {errors.password && (
          <p className=" text-sm my-1 text-red-800">
            {errors.password.message}
          </p>
        )}
        <input
          className={`px-2 py-1 rounded-md  ${
            errors.displayName ? "mb-1 border-red-800 border-2" : "mb-4"
          }`}
          type="text"
          placeholder={`Display Name`}
          {...register("displayName")}
        />
        {errors.displayName && (
          <p className=" text-sm my-1 text-red-800">
            Display name must be at least 2 characters.
          </p>
        )}
        <button
          disable
          className="pt-3 px-4 py-2 text-stone-200 font-medium rounded-md w-full shadow-xl bg-emerald-700 hover:bg-emerald-400"
          type="submit"
        >
          Create account
        </button>
      </form>
      {isError && <p className="mt-3 text-red-800">{isError}</p>}
    </div>
  );
}

export default CreateAccountForm;
