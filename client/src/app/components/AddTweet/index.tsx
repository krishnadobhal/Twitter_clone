import Image from 'next/image'
import React, { useCallback, useState } from 'react'
import { CiImageOn } from "react-icons/ci";
import { useCreateTweet } from '../../../../hooks/tweet';


export const AddTweet = ({user}:any):React.ReactNode => {
 
    const [content,setContent]=useState('');
  const handleSelectImage=useCallback(()=>{
    const input=document.createElement('input');
    input.setAttribute('type',"file");
    input.setAttribute("accept","image/*");
    input.click();
  },[])

  const {mutate} =useCreateTweet();

  const handleCreateTweet= useCallback(()=>{
   mutate({
    content,
   });
  },[content,mutate]);
  return (
    
            <div className='grid grid-cols-12 gap-3 p-5'>
            <div className='col-span-1 '>
              {
                user?.profileImageURL &&(
                 user && user.profileImageURL && (<Image className='rounded-full' src={user?.profileImageURL} alt="user-image"  height={50} width={50} />)
                )
              }
            </div>
            <div className='col-span-11'>
              <textarea value={content} onChange={(e)=>setContent(e.target.value)} placeholder={"What's Happening?"} rows={3} className=' px-1 bg-transparent border-b border-slate-700 w-full text-xl '>
              </textarea>
            <div className='flex justify-between px-4 my-2 items-center'>
              <CiImageOn onClick={handleSelectImage} className='text-2xl '/>
              <button onClick={handleCreateTweet} className='bg-blue-500 py-2 rounded-3xl px-6 font-bold'>Post</button>
            </div>
            </div>
            </div>     
  )
}
