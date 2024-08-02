"use client"
import React, { useCallback, useState } from 'react'
import { useGetAllTweets, useGetTweetById } from '../../../../hooks/tweet';
import Image from 'next/image';
import { useCreateComment } from '../../../../hooks/comment';

export default function PostComment(props:any) {
      const [content, setContent] = useState("");

    const {id}=props;
    const tweet=useGetTweetById(id).data?.getTweetById;

    const {mutate}=useCreateComment();

    const handleClick =useCallback (()=>{
     mutate({content:content,tweetId:id});
     setContent("")
    },[content]);
  return (

    <div className='m-2 h-screen'>
        {/* Post */}
        { tweet && (
    <div className='border-gray-600 rounded-lg   p-2 sm:p-5  transition-all cursor-pointer sm:h-fit'>
      <div className='grid grid-cols-12  gap-3'>
      <div className='col-span-2 sm:col-span-1'>
        {
          tweet?.author?.profileImageURL && <Image className='rounded-full' src={tweet.author.profileImageURL} alt='avavtar' height={60} width={150} />
        }
      </div>
      <div className='col-span-10 sm:col-span-11 '>
        <h5 className='font-bold'>{tweet?.author?.firstName + " " + tweet?.author?.lastName}</h5>
        
        <div className=' mt-5'>
            <p>{tweet?.content}</p>
        {
          tweet?.imageURL && <Image src={tweet?.imageURL} alt="tweet-image" height={300} width={300}></Image>
        }
        </div>
        {/* input */}
        <div className='mt-5'>
      <div className="col-span-10 sm:col-span-11 rounded-xl  mt-2 p-2 bg-black">
        <textarea value={content} 
          onChange={(e) => setContent(e.target.value)}
          placeholder={`Write a comment to ${tweet?.author?.firstName+"'s Post"}`}
          rows={3}
          className=" px-1 py-4 bg-transparent border-b border-t border-slate-500 w-full text-lg focus:border-blue-500 resize-none transition-all"
        />
        <div className='flex justify-end'>
        <button className='bg-blue-500 p-2 rounded-md px-10 text-white ml-5 text-xl hover:bg-blue-600 transition-all' onClick={handleClick}>Reply</button>
        </div>
      </div>

    </div>
      </div>
    </div>
    </div>
)}

    


   {/* Write a commment */}

  {/* {tweet && } */}


    {/* SHow Comment */}



   {tweet && <div className='border-t border-gray-300 px-1 py-2 mt-2 overflow-y-scroll  no-scrollbar  '>
     { 
     tweet?.comment &&
     tweet?.comment?.map((comment)=>
     
       <div className='border-gray-700   py-5 p-2 sm:p-5  transition-all cursor-pointer  my-2 border-t '>
      <div className='grid grid-cols-12  gap-3'>
      <div className='col-span-2 sm:col-span-1'>
        {
          comment?.user?.profileImageURL && <Image className='rounded-full' src={comment?.user?.profileImageURL} alt='commentImage' height={60} width={150} />
         }
      </div>
      <div className='col-span-10 sm:col-span-11 '>
        <h5 className='font-bold'>{comment?.user?.firstName + " " + comment?.user?.lastName}</h5>
        
        <div className=' mt-5'>
            <p>{comment?.content}</p>
        </div>
        
      </div>
      
    </div>
   
    </div>
    )
  }
    </div>}
  
    </div>
  )
}
