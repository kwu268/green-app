import React from 'react'
import AvatarInfo from './AvatarInfo.js';
import ProfileUserInfo from './ProfileUserInfo.js';

function Profile() {
  return (
    <div className='flex gap-32  items-center border-2 border-purple-500' >
        
        <div className='my-5 flex flex-col w-full h-full'>
          <div className='fixed top-36 left-72 border-2 border-green-800 rounded-full p-2 bg-white'>
            <AvatarInfo/>
          </div>
          Kelvin
        </div>
        

        <div className=''>
          <ProfileUserInfo name="Kelvin" games="4" following="10" followers="30"/>
        </div>
        
    </div>
  )
}

export default Profile