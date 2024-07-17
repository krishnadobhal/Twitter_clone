"use client"
import Image from 'next/image'
import { FC } from 'react'
import { BiMessageRounded } from "react-icons/bi";
import { FaRetweet } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { MdOutlineFileUpload } from "react-icons/md";
import { Tweet } from '../../../../gql/graphql';
import Link from 'next/link';


interface FeedCardProps{
  data:Tweet
}

export const FeedCard:FC<FeedCardProps> = (props) => {
  const {data}= props
  return (
    <div className='border-t  border-gray-600  py-5 p-2 sm:p-5  transition-all cursor-pointer'>
      <div className='grid grid-cols-12  gap-3'>
      <div className='col-span-2 sm:col-span-1'>
        {
          data.author?.profileImageURL && <Image className='rounded-full' src={data.author.profileImageURL} alt='avavtar' height={60} width={150} />}
      </div>
      <div className='col-span-10 sm:col-span-11'>
      {data.author?.id ? (
          <Link href={`/${data.author.id}`}>
            <h5>{data.author.firstName + " " + data.author.lastName}</h5>
          </Link>
            ) : (
            <h5>{data.author?.firstName + " " + data.author?.lastName}</h5>
          )}
        <p>{data.content}</p>
        {
          data.imageURL && <Image src={data.imageURL} alt="tweet-image" height={300} width={300}></Image>
        }
        <div className='flex  justify-between p-2 w-[90%] text-gray-500'>
          <div>
          <BiMessageRounded/>
          </div>
          <div>
          <FaRetweet/>
          </div>
          <div>
          <CiHeart/>
          </div>
          <div>

          <MdOutlineFileUpload/>
          </div>
        </div>
      </div>

    </div>
    </div>
  )
}
