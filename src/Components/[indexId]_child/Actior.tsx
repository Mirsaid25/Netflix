import Link from 'next/link'
import React from 'react'

type Actiors = {
    data:{
        character:string,
        name:string,
        profile_path:string,
		id:number
    }
}

const Actiors= ({data}:Actiors)=> {
  return (
	<Link href={{
		pathname: `/actor/&`,
		query: { id: data?.id },
	  }}>
        <div className='h-full flex flex-col items-start justify-between cursor-pointer'>
	    	<div className="h-full w-full mb-2">
	            <img src={data?.profile_path !== null ? `https://www.themoviedb.org/t/p/w220_and_h330_face/${data?.profile_path}` : "/image/[indexId]/profile-gray.jpg"} alt="" className='w-full h-full object-cover rounded-md mb-4'/>
	    	</div>
	    	<div className="">
	            <h1 className='text-[white] font-bold text-[18px] mb-3'>{data?.character}</h1>
        	    <p className='text-[#F2F60F]'>{data?.name}</p>
	    	</div>
        </div>
	</Link>
  )
}

export default Actiors