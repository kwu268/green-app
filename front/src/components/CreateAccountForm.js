import React, {useState} from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom'

const serverURL = process.env.REACT_APP_BACKEND_SERVER

function CreateAccountForm() {
  // Consts
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate()

  const navToVerifyPage = (email) => {
    navigate('/account-created', { state: { data: email } })
  }



  const signUp = async (email, password, display_name) => {
    setIsLoading(true);
    const params = {
      email: email,
      password: password,
      display_name: display_name
    }
    await axios.post(`${serverURL}/createUser`, { ...params })
    .then(response => {
      console.log(response.data.result)
      if (response.data.result == "created") {
        navToVerifyPage(email)
      }
      setIsLoading(false);
    })
    .catch(error => {
      setError(error.message);
      setIsLoading(false);
    })
  }

  const submitNewUser =  (event) => {
    event.preventDefault();
    const [email, password, display] = event.target
    signUp(email.value, password.value, display.value);
  } 
  return (
    <div className="flex flex-col  items-center  w-full">
      <div className=" text-center h-1/3  flex flex-col  w-4/5 "> 
        <div className=" text-center text-3xl font-medium text-emerald-700">Create an account</div>
        <p className=" text-gray-500 pb-3">Welcome to Greeen!</p>
      </div>
      <form
        className="flex flex-col w-4/5  gap-3"
        onSubmit={submitNewUser}
      >
        <input className="px-2 py-1 rounded-md" type="text" placeholder={`Email`} />
        <input className="px-2 py-1 rounded-md" type="password" placeholder={`Password`} />
        <input className="px-2 mb-10 py-1 rounded-md" type="text" placeholder={`Display Name`} />
        <button className="pt-3 px-4 py-2 text-stone-200 font-medium rounded-md w-full shadow-xl bg-emerald-700 hover:bg-emerald-400" type="submit">Create account</button>
      </form>
    </div>
  );
}

export default CreateAccountForm;
