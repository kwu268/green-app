import React from "react";
import AvatarInfo from "./AvatarInfo.js";
import ProfileUserInfo from "./ProfileUserInfo.js";

function Profile() {
  return (
    <div className="flex justify-center items-center bg-green-100">
      <div className="flex flex-row items-center justify-around w-1/2">
        <div className="my-5">
          <AvatarInfo />
        </div>

        <div className="">
          <ProfileUserInfo
            name="Kelvin"
            games="4"
            following="10"
            followers="30"
          />
        </div>
      </div>
    </div>
  );
}

export default Profile;
