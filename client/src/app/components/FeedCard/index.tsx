import Image from 'next/image'
import { FC } from 'react'
import { BiMessageRounded } from "react-icons/bi";
import { FaRetweet } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { MdOutlineFileUpload } from "react-icons/md";




export const FeedCard:FC = () => {
  return (
    <div className='border-t  border-gray-600 p-5  transition-all cursor-pointer'>
      <div className=' grid-col-12 flex gap-4'>
      <div className='col-span-2 border-2 h-fit rounded-3xl overflow-hidden'>
        <Image src="/avatar.jpg" alt='avavtar' height={60} width={150} />
      </div>
      <div className='col-span-10'>
        <h5>Bhaskar</h5>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores, soluta beatae porro ad, quidem aspernatur aperiam facere veritatis placeat omnis accusamus sapiente quaerat. Quisquam rerum, magnam possimus inventore modi nemo!</p>
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
