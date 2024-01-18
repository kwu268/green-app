import React, {useState} from 'react'
import axios from 'axios';

const serverURL = process.env.REACT_APP_BACKEND_SERVER


function SignInPage() {

  const [userInfo, setUserInfo] = useState(
    {
      display_name: null,
      email: null,
      password: null
    }
  );

  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const signUp = async (email, password, display_name) => {
    setIsLoading(true);
    const params = {
      email: email,
      password: password,
      display_name: display_name
    }

    await axios.post(`${serverURL}/createUser`, { ...params })
    .then(response => {
      console.log(response.data);
      setIsLoading(false);
    })
    .catch(error => {
      setError(error.message);
      setIsLoading(false);
    })
  }

  const submitNewUser =  (event) => {
    event.preventDefault();
    setUserInfo({
      ...userInfo,
        email: event.target[0].value,
        password: event.target[1].value,
        display_name: event.target[2].value
      
    })
    signUp(event.target[0].value, event.target[1].value, event.target[2].value);


  } 


  return (
    <div className='flex justify-center items-center h-screen border-green-500 border-2 bg-green-200'>
      <div className='w-2/3 h-3/4 flex justify-evenly bg-white rounded-3xl shadow-2xl'>
        <div className='w-1/3 '>
          image
        </div>
        <div className='border-green-500 border-2 w-2/3 flex-col flex items-center '>
            <div className='border-orange-500 border-2 h-2/5'>LOGO</div>
            <form className='flex flex-col border-blue-500 border-2 h-2/5 justify-center items-center' onSubmit={submitNewUser}> 
                <input  type="text" placeholder={`Email`} />
                <input  type="password" placeholder={`password`} /> 
                <input  type="text" placeholder={`Display Name`} />
                <button className='w-1/4' type="submit">{`Search`}</button>
            </form>
          </div>
        </div>
    </div>
  )
}

export default SignInPage