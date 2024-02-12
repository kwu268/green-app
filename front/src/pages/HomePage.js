import React, { useState } from 'react'
import { useNavigate, useLocation  } from 'react-router-dom'


function HomePage() {
  const location = useLocation();
  console.log("location: ", location)
  const user = location.state?.data?.user
  const session = location.state?.data?.session
  return (
    <div className='border-2 border-blue-500 h-screen flex justify-center'>
      <div className=' w-9/12 border-2 border-red-500 '>

      </div>
    </div>
  )
}

export default HomePage