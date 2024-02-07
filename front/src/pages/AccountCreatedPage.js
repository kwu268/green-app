import React from 'react'
import { useNavigate, useLocation  } from 'react-router-dom'

function AccountCreatedPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.data;
  console.log("location: ", location)

  return (
    <div className=' bg-violet-200 h-screen w-full flex justify-center items-center'>
      <div className='bg-white w-1/2 h-4/6 shadow-xl rounded-xl'>
        <div className='flex flex-col h-full'>
          <div className='border-2 border-red-500 h-2/5'>image</div>
          <div className='border-2 border-cyan-300  text-center'>Verify your email address</div>
          <div className='border-2 border-cyan-300 text-center'>A verification email has been sent to your email {email} </div>
          <div className='border-2 border-cyan-300 text-center'>Please check your email and click the link provided in the email to complete your account registration</div>
          <div className='border-2 border-cyan-300 text-center'><br/>Sign in below once you have verified your email</div>
          <button className=' bg-slate-300 rounded-md' onClick={ () => {
          navigate('/sign-in')
        }}>sign in</button>
        </div>
      </div>
    </div>
  )
}

export default AccountCreatedPage