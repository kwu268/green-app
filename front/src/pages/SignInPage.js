import React, {useState} from 'react'
import axios from 'axios';
import CreateAccountForm from '../components/CreateAccountForm';
import LoginForm from '../components/LoginForm';
import logo from '../images/logo.png';
function SignInPage() {
  //consts
  const [isLoginForm, setLoginForm] = useState(true)
  const [isSignUpForm, setSignUpForm] = useState(false)


  return (
    <div className='flex justify-center items-center h-screen  bg-gradient-to-b from-green-300 to-green-200'>
      <div className="w-2/4 h-3/4 flex flex-col justify bg-green-banner bg-cover bg-center rounded-3xl shadow-2xl shadow-gray-700 ">
        <div className='h-1/4'></div>
        <div className='h-3/5 w-full flex justify-center'>
          <div className='w-2/5 h-full flex-col flex  bg-neutral-200 shadow-2xl shadow-gray-700 '>
            <img src={logo} className='object-scale-down h-1/5 mt-2' alt="Greeen Logo"/>
            {isLoginForm && (
            <div className='w-full h-full flex flex-col items-center'> 
              <LoginForm /> 
              <div className='flex flex-col w-full items-center mb-7 gap-2'>
                or
                <button className="font-medium text-stone-200 w-4/5 px-4 py-2 rounded-md  shadow-xl bg-emerald-700 hover:bg-emerald-400" type="submit" onClick={() => {
                  setLoginForm(false)
                  setSignUpForm(true)
                }}>Sign Up
                </button>
              </div>
          
            </div>) }
            {isSignUpForm && 
            <div className='flex flex-col w-full items-center mb-7 gap-2'>
              <CreateAccountForm />
              Have an account?
              <button className="font-medium text-stone-200 w-4/5 px-4 py-2 rounded-md  shadow-xl bg-emerald-700 hover:bg-emerald-400" type="submit" onClick={() => {
                  setLoginForm(true)
                  setSignUpForm(false)
                }}>Log in
                </button>
            </div> }    
          </div>
        </div>

        {/* <img src='../images/banner.png'/>
        <div className='w-1/3 '>
          <div className='h-full border-pink-500 border-2 flex flex-col items-end justify-center'>
            <button className='w-1/4 h-7 border-2 bg-violet-300 rounded-md' onClick={() => {
              setLoginForm(true)
              setSignUpForm(false)
            }}>
              Log In
            </button>
            <button className='w-1/4 h-7 border-2 bg-violet-300 rounded-md' onClick={() => {
              setLoginForm(false)
              setSignUpForm(true)
            }}>Sign Up</button>
          </div>
        </div>
        <div className='border-green-500 border-2 w-2/3 flex-col flex items-center '>
            <div className='border-orange-500 border-2 h-2/5'>LOGO</div>
            {isLoginForm && <LoginForm /> }
            {isSignUpForm && <CreateAccountForm /> }
          </div> */}
        </div>
    </div>
  )
}

export default SignInPage