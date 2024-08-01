"use client"
import React from 'react'
import { ClipLoader, MoonLoader } from 'react-spinners'
import { TwitterLayout } from '../components/Layout/TwitterLayout'
export default function loading() {
  return (
    <TwitterLayout>
      <div className='w-full h-screen flex justify-center items-center'>

      <MoonLoader
      color="#1eaae7"
      speedMultiplier={1}
/>
      </div>
    </TwitterLayout>
  )
}
