import { Button } from "@mui/material";
import React from "react";

// const ProfileUserInfo = ({name}) => {
//     return (
//         <div className=''>
//             {name}
//             <div className='flex justify-around'>
//                 <div>Games </div>
//                 <div>Following </div>
//                 <div>Followers </div>
//             </div>
//         </div>
//     )
// }

function ProfileUserInfo({ name, games, following, followers }) {
  return (
    <div className="flex flex-col ">
      <div className="flex justify-start gap-5">
        <div className="text-lg font-bold">{name}</div>
        <div>
          <Button className="bg-gray-400">Edit</Button>
        </div>
      </div>

      <div className="flex justify-start gap-5">
        <div>
          <p> Games</p>
          <p className="ml-4">{games}</p>
        </div>

        <div>
          <p>Following</p>
          <p className="ml-4">{following}</p>
        </div>

        <div>
          <p>Followers</p>
          <p className="ml-4">{followers}</p>
        </div>
      </div>
    </div>
  );
}

export default ProfileUserInfo;
