"use client";
import Image from "next/image";
import React, { useCallback, useMemo } from "react";
import { BsTwitterX } from "react-icons/bs";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { AiFillHome } from "react-icons/ai";
import { IoIosSearch } from "react-icons/io";
import { GoBell } from "react-icons/go";
import { MdOutlineLocalPostOffice } from "react-icons/md";
import { FaRegBookmark } from "react-icons/fa6";
import { CgMoreO, CgProfile } from "react-icons/cg";
import { useCurrentUser } from "../../../../hooks/user";
import { useGetAllTweets } from "../../../../hooks/tweet";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { graphqlClient } from "../../../../clientgrahql/api";
import { verifyGoogleTokenQuery } from "../../../../graphql/query/user";
import Link from "next/link";
import { User } from "../../../../gql/graphql";

interface TwitterLayoutProp {
  children: React.ReactNode,
  // user:User|null
}
interface TwitterSidebarButton {
  title: string;
  icon: any;
  link: string;
}

export const TwitterLayout: React.FC<TwitterLayoutProp> = (props) => {
  const {user} = useCurrentUser()
  console.log(`user-> ${user}`)
  
  const SidebarItems: TwitterSidebarButton[] = useMemo(
    () => [
      {
        title: "Home",
        icon: <AiFillHome />,
        link: "/",
      },
      {
        title: "Explore",
        icon: <IoIosSearch />,
        link: "/",
      },
      {
        title: "Notification",
        icon: <GoBell />,
        link: "/",
      },
      {
        title: "Messages",
        icon: <MdOutlineLocalPostOffice />,
        link: "/",
      },
      {
        title: "Booksmark",
        icon: <FaRegBookmark />,
        link: "/",
      },
      {
        title: "Premium",
        icon: <BsTwitterX />,
        link: "/",
      },
      {
        title: "Profile",
        icon: <CgProfile />,
        link: `/${user?.id}`,
      },
      {
        title: "More",
        icon: <CgMoreO />,
        link: "/",
      },
    ],
    [user?.id]
  );
  
  const queryClient = useQueryClient();
  const handleLoginWithGoogle = useCallback(
    async (cred: CredentialResponse) => {
      const googleToken = cred.credential;
      if (!googleToken) return toast.error("Google token not found");
      console.log(googleToken);
      try {
        const { verifyGoogleToken } = await graphqlClient.request(
          verifyGoogleTokenQuery,
          { token: googleToken }
        );
        toast.success("Verified Success");
        console.log(verifyGoogleToken);
        if (verifyGoogleToken) {
          window.localStorage.setItem("_twitter_token", verifyGoogleToken);
        }
        await queryClient.invalidateQueries({ queryKey: ["current_user"] });
      } catch (error) {
        toast.error("Verification failed");
        console.error(error);
      }
    },
    [queryClient]
  );

  const handleLogout = useCallback(async() => {
    localStorage.removeItem("_twitter_token");
    await queryClient.invalidateQueries({queryKey: ["all-tweets"]})
    await queryClient.invalidateQueries({queryKey: ["current_user"]})
  }, []);

  return (
    <div className="grid grid-cols-12 h-screen w-screen sm:px-32">
      <div className="col-span-2 sm:col-span-3    sm:pt-1 flex sm:justify-end  sm:pr-4  relative">
        <div className="w-full sm:w-auto">
          <div className=" mt-5 sm:mt-0 text-3xl w-full flex justify-center sm:block   hover:bg-gray-800  sm:p-3 sm:ml-2  cursor-pointer transition-all">
            <BsTwitterX />
          </div>
          {/* //SideBar */}
          <div className=" mt-5  sm:ml-0 sm:mt-0 text-xl sm:pr-4 flex flex-col items-center sm:block ">
            <ul>
              {SidebarItems.map((item) => (
                <li
                  key={item.title}
                  className="flex justify-start items-center gap-4 hover:bg-gray-900 hover:backdrop-brightness-90 rounded-full w-fit px-2 sm:px-5 py-2 cursor-pointer mb-2"
                >
                  <Link href={item.link} className="flex gap-4">
                    <span className="text-3xl ">{item.icon}</span>{" "}
                    <span className="hidden sm:inline ">{item.title}</span>
                  </Link>
                </li>
              ))} 
            </ul>
            <div className="mt-5 sm:px-5">
              <button className="hidden sm:block bg-[#1A8CD8] py-3 px-4 rounded-full text-xl w-full font-semibold ">
                Post
              </button>
              <button className="ml-2 sm:ml-0 sm:hidden bg-[#1A8CD8] py-3 px-3 rounded-full text-xl  font-semibold ">
                <BsTwitterX />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-5 flex justify-center gap-3 items-center absolute bottom-4 ">
          {user && user.profileImageURL && (
            <Image
              className="rounded-3xl ml-2 sm:ml-0"
              src={user?.profileImageURL}
              alt="user-image"
              height={50}
              width={50}
            />
          )}
          <h1 className="text-2xl font-semibold hidden sm:block">
            {user?.firstName} {user?.lastName}
          </h1>
        </div>
      </div>

      <div className="col-span-10 sm:col-span-5 border-r-[1px] border-l-[1px] border-gray-600 h-screen overflow-scroll no-scrollbar">
        {props.children}
      </div>

      <div className="hidden sm:block sm:col-span-3 ">
        {!user && (
          <div className=" ml-4 mt-2 p-5 border border-gray-500 rounded-2xl flex flex-col ">
            <h1 className="my-2 text-2xl font-semibold">New to Twitter</h1>
            <GoogleLogin
              onSuccess={handleLoginWithGoogle}
              onError={() => {
                console.log("Login Failed");
              }}
            />
          </div>
        )}
        {user && (
          <button
            className="bg-[#1d9bf0] font-semibold text-sm py-2 px-4 rounded-full ml-4 mt-4"
            onClick={handleLogout}
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
};
