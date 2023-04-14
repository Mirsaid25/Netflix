import Image from 'next/image'
import React, { useEffect } from 'react'

const Preloader = () => {
  
    useEffect(()=>{
        
    } ,[])

  return (
    <div className='w-full h-screen bg-black flex items-center justify-center text-white text-3xl fixed top-0 left-0 z-20'>
        <Image
		    className='animate-bounce w-1/2' 
		    src={"/image/header/Netflix_logo.svg.png"}  
		    width={500} 
		    height={500} 
		    alt="logo"
		/>
    </div>
  )
}

export default Preloader