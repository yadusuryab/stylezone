import React from 'react'
import logo from '@/public/stylezone-wordmark.png'
import Image from 'next/image'


function Brand() {
  return (
    <Image src={logo.src} width={200} height={30} alt="Stylezone" />

  )
}

export default Brand
