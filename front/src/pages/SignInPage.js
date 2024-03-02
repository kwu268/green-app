import React, {useState} from 'react'
import axios from 'axios';
import CreateAccountForm from '../components/CreateAccountForm';
import LoginForm from '../components/LoginForm';
import logo from '../images/logo.png';
import { motion } from "framer-motion";

function SignInPage({setToken}) {
  //consts
  const [isLoginForm, setLoginForm] = useState(true)
  const [isSignUpForm, setSignUpForm] = useState(false)
  


  return (
    <div className='flex justify-center items-center h-screen  bg-gradient-to-b from-green-300 to-green-200'>
      <div className="w-2/4 h-3/4 flex flex-col justify bg-green-banner bg-cover bg-center rounded-3xl shadow-2xl shadow-gray-700 items-center">
          <motion.div 
          className='h-[500px] mt-40 flex  w-2/5  flex-col    bg-neutral-100 shadow-2xl shadow-gray-700 rounded-md '
          initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              opacity: { duration: 1 }, // Duration of 1 second for the opacity transition
              y: { duration: 1 },
            }}>
            <img src={logo} className='object-scale-down h-1/5 mt-8 ' alt="Greeen Logo "/>
            <div className=''>
              {isLoginForm && (
              <div className='w-full  flex flex-col items-center'> 
                <LoginForm setToken={setToken}/> 
                <div className='flex py-2'>
                  New to Greeen?
                  <button className="pl-2 font-medium text-blue-500   " type="submit" onClick={() => {
                      setLoginForm(false)
                      setSignUpForm(true)
                    }}>Create an account
                  </button>
                </div>
            
              </div>) }
              {isSignUpForm && 
              <div className='flex flex-col w-full items-center '>
                <CreateAccountForm setToken={setToken} />
                <div className='flex py-2'>
                  Have an account?
                  <button className="pl-2 font-medium text-blue-500   " type="submit" onClick={() => {
                      setLoginForm(true)
                      setSignUpForm(false)
                    }}>Log in
                  </button>
                </div>
                
              </div>
              }  
            </div>
              
          </motion.div>
      </div>
    </div>
  )
}

export default SignInPage