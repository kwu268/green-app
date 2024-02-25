import React, { useState } from "react";
import Navbar from "../components/Navbar.js";
import GameDataGrid from "../components/GameDataGrid.js";
import GameDataRow from "../components/GameDataRow.js";
import Profile from "../components/Profile.js";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import { sampleData } from "../sampleData.js";
import AppsIcon from "@mui/icons-material/Apps";
import MenuIcon from "@mui/icons-material/Menu";
import AvatarInfo from "../components/AvatarInfo.js";

function ProfilePage({token}) {
  const [viewType, setViewType] = useState("grid");

  return (
    <div className="   min-h-full h-auto flex justify-center">
      <div className=" w-9/12  flex flex-col rounded-lg h-auto mt-2">
        {/* 3 divs total: profile, side info, recent posts */}
        <div className=" flex h-[500px] w-full rounded-tl-xl rounded-tr-xl ">
          {/* top half */}
          <div className="flex flex-col w-2/3 shadow-md shadow-slate-300 rounded-xl">
            <div className="bg-gradient-to-tr from-amber-500 via-fuchsia-300 to-cyan-300 h-1/3 rounded-tl-xl rounded-tr-xl">
              <div className="relative top-20 left-[20px] w-44 rounded-full p-2 bg-white flex">
                <AvatarInfo />
              </div>
            </div>
            <div className="bg-white h-2/3 rounded-bl-xl rounded-br-xl pt-24 ">
              Name info and follower info
            </div>
          </div>
          <div className="bg-white h-full w-1/3 ml-4 shadow-md shadow-slate-300 rounded-xl">
            about me section and golf stats
          </div>
        </div>

        <div className=" bg-white w-full  my-4 shadow-md shadow-slate-300 rounded-xl min-h-[600px] "> 
          posts
        </div>

      </div>
    </div>

    // <div className='border-2 border-blue-500 h-screen flex justify-center'>
    //   <div className=' w-9/12  flex flex-col shadow-2xl shadow-slate-800 rounded-lg h-auto'>
    //     <div className="bg-gradient-to-tr from-amber-500 via-fuchsia-300 to-cyan-300 h-1/4 rounded-tl-xl rounded-tr-xl">

    //     </div>

    //     <div className=" bg-white w-full h-full ">
    //       <div className='fixed top-24 left-64 rounded-full p-2 bg-white flex'>
    //         <AvatarInfo/>
    //       </div>
    //       <div className="flex ">
    //         <div className="w-1/2 mt-24 pl-8  flex items-center">
    //           <div className="flex flex-col gap-1 w-3/4">
    //             <div className=" text-4xl font-bold text-sky-950">Kelvin Wu</div>
    //             <div className="  font-medium text-sky-950">@Displayname</div>
    //             <div className="flex gap-2">
    //                 <div>3 Following</div>
    //                 <div>2 Followers</div>
    //             </div>
    //           </div>
    //           <button className=" px-4 py-2 text-stone-200 font-medium rounded-md h-1/2 shadow-xl bg-emerald-700 hover:bg-emerald-400" >Edit Profile</button>
    //         </div>
    //         <div className="mt-20 flex justify-evenly w-1/2 items-center">
    //           <div className="flex flex-col items-center">
    //             <div className="font-bold text-sky-950">
    //               Games Posted
    //             </div>
    //             <div>
    //               0
    //             </div>
    //           </div>
    //           <div className="flex flex-col items-center">
    //             <div className="font-bold text-sky-950">
    //               Favourite Club
    //             </div>
    //             <div>
    //               0
    //             </div>
    //           </div>
    //           <div className="flex flex-col items-center">
    //             <div className="font-bold text-sky-950">
    //               Furthest Stroke
    //             </div>
    //             <div>
    //               0
    //             </div>
    //           </div>

    //         </div>
    //       </div>
    //       <div className="px-8  mt-5">
    //         <div className="text-3xl font-semibold text-sky-950"> Recent Posts</div>
    //         <div className="flex gap-2">
    //           {/* <GameDataGrid courseData={sampleData[0]}/>
    //           <GameDataGrid courseData={sampleData[0]}/>
    //           <GameDataGrid courseData={sampleData[0]}/> */}
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>

    // <div className="flex ">
    //   <div className=" flex flex-col items-center w-full justify-around">
    //     <div className="">
    //       <Profile/>
    //     </div>
    //     <div className="m-3">
    //       <ButtonGroup
    //             variant="contained"
    //             aria-label="outlined primary button group"
    //           >
    //             <Button
    //               className="bg-green-200"
    //               onClick={() => {setViewType("grid")}}>
    //               <AppsIcon />
    //             </Button>
    //             <Button
    //               className="bg-green-200"
    //               onClick={() => {setViewType("row")}}>
    //               <MenuIcon />
    //             </Button>
    //             <Button
    //             className="bg-green-200"
    //             onClick={() => {setViewType("stats")}}>
    //               Stats
    //             </Button>
    //         </ButtonGroup>
    //     </div>

    //     {viewType === "grid" && (
    //         <div className="grid grid-cols-12 justify-around content-around gap-2">
    //           {sampleData.map((course) => {
    //             return (
    //               <div className="col-span-6 md:col-span-3">
    //                 <GameDataGrid courseData={course} />
    //               </div>

    //               )
    //           })}
    //         </div>
    //       )}

    //     {viewType === "row" && (
    //                 <div className="border-green-700 border-2 w-3/4  flex-col">
    //                   {sampleData.map((course) => {
    //                     return (
    //                       <div className="m-1p">
    //                         <GameDataRow courseData={course} />
    //                       </div>
    //                       )
    //                   })}
    //                 </div>
    //               )}

    //   </div>
    // </div>
  );
}

export default ProfilePage;
