import React from "react";
import { BsTwitterX } from "react-icons/bs";
import { AiFillHome } from "react-icons/ai";
import { IoIosSearch } from "react-icons/io";
import { GoBell } from "react-icons/go";
import { MdOutlineLocalPostOffice } from "react-icons/md";
import { FaRegBookmark } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

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
    title: "profile",
    icon: <CgProfile />,
  },
];

export default function Home() {
  return (
    <div className="{inter.className}">
      <div className="grid grid-cols-12 h-screen w-screen px-56">
        <div className="col-span-3 pt-8">
          <div className="text-4xl w-fit hover:bg-gray-800 rounded-full p-4 cursor-pointer transition-all">
            <BsTwitterX />
          </div>
          <div className="mt-4  text-2xl pr-4">
            <ul>
              {SidebarItems.map((item) => (
                <li
                  key={item.title}
                  className="flex justify-start items-center gap-4 hover:bg-gray-800 rounded-full w-fit px-5 py-2 cursor-pointer mb-2"
                >
                  <span>{item.icon}</span> <span>{item.title}</span>
                </li>
              ))}
            </ul>
            <div className="mt-5 px-5">
              <button className="bg-[#1A8CD8] py-3 px-4 rounded-full text-xl w-full ">
                Tweet
              </button>
            </div>
          </div>
        </div>
        <div className="col-span-6 border-r-[1px] border-l-[1px] border-gray-400 "></div>
        <div className="col-span-3 "></div>
      </div>
    </div>
  );
}
