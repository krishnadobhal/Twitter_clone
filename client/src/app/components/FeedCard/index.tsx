import Image from 'next/image'
import { FC } from 'react'
import { BiMessageRounded } from "react-icons/bi";
import { FaRetweet } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { MdOutlineFileUpload } from "react-icons/md";
import { Tweet } from '../../../../gql/graphql';


interface FeedCardProps{
  data:Tweet
}

export const FeedCard:FC<FeedCardProps> = (props) => {
  const {data}= props
  return (
    <div className='border-t  border-gray-600 p-5  transition-all cursor-pointer'>
      <div className='grid grid-cols-12  gap-3'>
      <div className='col-span-1'>
        {
          data.author?.profileImageURL && <Image className='rounded-full' src={data.author.profileImageURL} alt='avavtar' height={60} width={150} />}
      </div>
      <div className='col-span-11'>
        <h5>{data.author?.firstName+" "+data.author?.lastName}</h5>
        <p>{data.content}</p>
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
