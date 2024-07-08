import Image from 'next/image'
import React, { useCallback } from 'react'
import { CiImageOn } from "react-icons/ci";


export const AddTweet = ({user}:any):React.ReactNode => {

  const handleSelectImage=useCallback(()=>{
    const input=document.createElement('input');
    input.setAttribute('type',"file");
    input.setAttribute("accept","image/*");
    input.click();
  },[])

  return (
    
            <div className='grid grid-flow-col grid-col-12 gap-3 pt-4'>
            <div className='col-span-1 h-fit w-fit rounded-3xl overflow-hidden ml-3'>
              {
                user?.profileImageURL &&(
                 user && user.profileImageURL && (<Image src={user?.profileImageURL} alt="user-image"  height={50} width={50} />)
                )
              }
            </div>
            <div className='col-span-11 pr-5'>
              <textarea placeholder={"What's Happening?"} rows={3} className=' px-1 bg-transparent border-b border-slate-700 w-full text-xl '>
              </textarea>
            <div className='flex justify-between px-4 my-2 items-center'>
              <CiImageOn onClick={handleSelectImage} className='text-2xl '/>
              <button className='bg-blue-500 py-2 rounded-3xl px-6 font-bold'>Post</button>
            </div>
            </div>
            </div>     
  )
}
