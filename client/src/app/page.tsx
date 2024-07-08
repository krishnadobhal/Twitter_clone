"use client"
import React, { useCallback } from "react";
import Image from 'next/image';
import { BsTwitterX } from "react-icons/bs";
import { AiFillHome } from "react-icons/ai";
import { IoIosSearch } from "react-icons/io";
import { GoBell } from "react-icons/go";
import { MdOutlineLocalPostOffice } from "react-icons/md";
import { FaRegBookmark } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";
import { Inter } from "next/font/google";
import { FeedCard } from "./components/FeedCard";
//const inter = Inter({ subsets: ["latin"] });
import { CgMoreO } from "react-icons/cg";
import { graphqlClient } from "../../clientgrahql/api";
import {CredentialResponse, GoogleLogin} from "@react-oauth/google"
import toast from "react-hot-toast";
import { verifyGoogleTokenQuery } from "../../graphql/query/user";
import { useCurrentUser } from "../../hooks/user";
import { useQueryClient } from "@tanstack/react-query";


interface TwitterSidebarButton {
  title: string;
  icon: any;
}

const SidebarItems: TwitterSidebarButton[] = [
  {
    title: "Home",
    icon: <AiFillHome />,
  },
  {
    title: "Explore",
    icon: <IoIosSearch />,
  },
  {
    title: "Notification",
    icon: <GoBell />,
  },
  {
    title: "Messages",
    icon: <MdOutlineLocalPostOffice />,
  },
  {
    title: "Booksmark",
    icon: <FaRegBookmark />,
  },
  {
    title:"Premium",
    icon:<BsTwitterX/>
  },
  {
    title: "Profile",
    icon: <CgProfile />,
  },
  {
    title: "More",
    icon: < CgMoreO/>,
  },

];



export default function Home() {
  const {user}=useCurrentUser();
  console.log(user)
  const queryClient=useQueryClient()

  const handleLoginWithGoogle = useCallback(async (cred: CredentialResponse) => {
    const googleToken = cred.credential;
    if (!googleToken) return toast.error("Google token not found");
    console.log(googleToken)

    try {
      const { verifyGoogleToken } = await graphqlClient.request(verifyGoogleTokenQuery, { token: googleToken });
      toast.success("Verified Success");
      console.log(verifyGoogleToken);
      if(verifyGoogleToken){
        window.localStorage.setItem('_twitter_token',verifyGoogleToken);
      }
      await queryClient.invalidateQueries({queryKey:["current_user"]})
    } catch (error) {
      toast.error("Verification failed");
      console.error(error);
    }
  }, [queryClient]);
  return (
    <div>
      <div className="grid grid-cols-12 h-screen w-screen px-32">
        <div className="col-span-3   pt-1 ml-16  ">
          <div className=" text-3xl w-fit hover:bg-gray-800 rounded-full p-3 ml-2  cursor-pointer transition-all">
            <BsTwitterX />
          </div>
          <div className="mt-1  text-xl pr-4">
            <ul>
              {SidebarItems.map((item) => (
                <li
                  key={item.title}
                  className="flex justify-start items-center gap-4 hover:bg-gray-900 hover:backdrop-brightness-90 rounded-full w-fit px-5 py-2 cursor-pointer mb-2"
                >
                  <span className="text-3xl">{item.icon}</span> <span >{item.title}</span>
                </li>
              ))}
            </ul>
            <div className="mt-5 px-5">
              <button className="bg-[#1A8CD8] py-3 px-4 rounded-full text-xl w-full font-semibold ">
                Post
              </button>
            </div>
          </div>
          <div>
            {user && user.profileImageURL && (<Image src={user?.profileImageURL} alt="user-image"  height={50} width={50} />)}
            <h1 className="text-2xl font-bold mt-5">
              {user?.firstName} {user?.lastName}
            </h1>
          </div>
        </div>
        <div className="col-span-5 border-r-[1px] border-l-[1px] border-gray-600 h-screen overflow-scroll no-scrollbar">
          <FeedCard/>
          <FeedCard/>
          <FeedCard/>
          <FeedCard/>
          <FeedCard/>
          <FeedCard/>
          <FeedCard/>
          <FeedCard/>
          <FeedCard/>
        </div>
        <div className="col-span-3 ">
          {!user && (<div className="ml-4 mt-2 p-5 border border-gray-500 rounded-2xl flex flex-col ">
            <h1 className="my-2 text-2xl font-semibold">New to Twitter</h1>
            <GoogleLogin onSuccess={handleLoginWithGoogle} />
          </div>)}
        </div>
      </div>
    </div>
  );
}
