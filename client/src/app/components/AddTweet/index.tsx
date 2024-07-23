"use client";
import Image from "next/image";
import React, { useCallback, useState } from "react";
import { CiImageOn } from "react-icons/ci";
import { useCreateTweet } from "../../../../hooks/tweet";
import { useCurrentUser } from "../../../../hooks/user";
import { graphqlClient } from "../../../../clientgrahql/api";
import { GetSignedUrlForTweetQuery } from "../../../../graphql/query/tweet";
import axios from "axios";
import toast from "react-hot-toast";
import { URL } from "url";
import { NextURL } from "next/dist/server/web/next-url";
import { discardImageMutation } from "../../../../graphql/mutation/tweet";

export const AddTweet = (): React.ReactNode => {
  const { user } = useCurrentUser();



  const [content, setContent] = useState("");
  const [ImageURL,setImageURL] = useState("")
  const [ImageName,setImageName] = useState("")

  const handlerInputChangeFile=useCallback((input:HTMLInputElement)=>{

    return async(event:Event)=>{

      event?.preventDefault();  

      const file:File | null | undefined=input.files?.item(0);
      if(!file) return;
      console.log(file);
      
      setImageName(file?.name)
      const {getSignedUrlForTweet}=await graphqlClient.request(GetSignedUrlForTweetQuery,{
        imageName:file?.name,
        imageType:file?.type
      })
      console.log(getSignedUrlForTweet)

      if(getSignedUrlForTweet){
        toast.loading("Uploading...",{id:'2'});

        await axios.put(getSignedUrlForTweet, file, {
          headers: {
            "Content-Type": file.type,
          },
        });

        toast.success("Upload Complete",{id:'2'})

        const url=new NextURL(getSignedUrlForTweet);
        const myfilepath=`${url.origin}${url.pathname}`
        setImageURL(myfilepath)
      }

    }
  },[])

  const handleSelectImage = useCallback(() => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");

    const handlerFn =handlerInputChangeFile(input);

    input.addEventListener("change",handlerFn)

    input.click();
  }, [handlerInputChangeFile]);


  const { mutate } = useCreateTweet();


  const handleCreateTweet = useCallback(() => {
    mutate({
      content,
      imageURL:ImageURL
    });
    setContent("")
    setImageURL("");
  }, [content, mutate,ImageURL]);


const DiscardImage=useCallback(async()=>{
  console.log(ImageName);
  await graphqlClient.request(discardImageMutation,{
    imageName:ImageName
  })
  setContent("")
  setImageURL("");
  setImageName("")
},[ImageName])

  return (
    <div className="grid grid-cols-12 gap-3 p-2 py-5  sm:p-5">

      <div className="col-span-2 sm:col-span-1 ">
        {user?.profileImageURL && user && user.profileImageURL && (
          <Image
            className="rounded-full"
            src={user?.profileImageURL}
            alt="user-image"
            height={50}
            width={50}
          />
        )}
      </div>

      <div className="col-span-10 sm:col-span-11">
        
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={"What's Happening?"}
          rows={3}
          className=" px-1 bg-transparent border-b border-slate-700 w-full text-xl "
        ></textarea>
        {ImageURL && <Image src={ImageURL} alt="tweet-image" height={300} width={300}></Image>}
        <div className="flex justify-between px-4 my-2 items-center">
          <CiImageOn onClick={handleSelectImage} className="text-2xl " />

          <div className="flex gap-6">
          <button 
            onClick={DiscardImage}
            className="text-slate-400 py-2 rounded-3xl px-6 font-bold cursor-pointer transition-all hover:bg-gray-900 hover:text-slate-100 "
          >
            Discard
          </button>

          <button 
            onClick={handleCreateTweet}
            className="bg-blue-500 py-2 rounded-3xl px-6 font-bold"
          >
            Post
          </button>
          </div>

        </div>
      </div>
    </div>
  );
};
