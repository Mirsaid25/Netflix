import React from 'react'

type Actiors = {
    data:{
        character:string,
        name:string,
        profile_path:string
    }
}

const Actiors= ({data}:Actiors)=> {
  return (
    <div className='flex flex-col items-start'>
        <img src={data?.profile_path !== null ? `https://www.themoviedb.org/t/p/w220_and_h330_face/${data?.profile_path}` : "/image/[indexId]/profile-gray.jpg"} alt="" className='w-[250px] h-[250px] rounded-md bg-[red] mb-4'/>
        <h1 className='text-[white] font-bold text-[18px] mb-3'>{data?.character}</h1>
        <p className='text-[#F2F60F]'>{data?.name}</p>
    </div>
  )
}

export default Actiors