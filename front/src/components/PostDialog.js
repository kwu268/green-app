import React from 'react'
import TableData from './TableData'

function PostDialog({postData}) {
  return (
    <div className='flex w-[1200px]'>
        <div className='w-3/5 border-black border-2 h-full'>
            <TableData postData={postData}/>
        </div>
        <div className=' flex flex-col border-2 border-black w-2/5'>
            <div className=' h-[85%]'>
                comments 
            </div>
            <div className=''>
                like
            </div>
            <div className='flex border-1  h-[10%] border-2 border-slate-500 rounded-lg'>
                <form className='flex w-full'>
                    <input className=' w-5/6'></input>
                    <button className=" text-stone-200 font-medium rounded-md w-1/6 shadow-xl bg-emerald-700 hover:bg-emerald-400" type="submit">Send</button>
                </form>
                
            </div>
        </div>
    </div>
  )
}

export default PostDialog