import React from 'react'
import AvatarInfo from './AvatarInfo.js';
import ProfileUserInfo from './ProfileUserInfo.js';

function Profile() {
  return (
    <div className='flex justify-center gap-32 items-center' >
        
        <div className='my-5'>
          <AvatarInfo/>
        </div>
        

        <div className=''>
          <ProfileUserInfo name="Kelvin" games="4" following="10" followers="30"/>
        </div>
        
    </div>
  )
}

export default Profile