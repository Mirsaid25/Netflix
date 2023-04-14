import { APIkey } from '@/pages';
import axios from 'axios';
import Link from 'next/link'
import React, { useEffect, useState } from 'react'


const searchComponent = ({data, type}:any) => {
        console.log(data.backdrop_path);
        
  return (
    <Link href={{
              pathname: `/${type}/&`,
              query: { id: data?.id },
            }}>
        <div className='flex items-center justify-between border-b-2 p-5 border-[#3B486B]'>
            <div className='flex items-center gap-10'>
            <img src={data?.backdrop_path !== null && data?.backdrop_path !== undefined ? `https://www.themoviedb.org/t/p/w220_and_h330_face/${data?.backdrop_path}` : "/image/[indexId]/posterError.svg"} alt=""  className='h-[150px] w-[90px] rounded-md'/>
            <div className='flex flex-col items-start justify-start gap-2'>
                <h2 className='text-white text-[25px] font-bold'>{data?.original_title}</h2>
                <span className='text-[17px] font-medium text-[#54689E]'>{data?.title}</span>
                <h2 className='text-white text-[25px] font-bold'>{data?.original_name}</h2>
                <span className='text-[17px] font-medium text-[#54689E]'>{data?.name}</span>
            </div>
            </div>
            <div className='flex items-center gap-14'>
                <div className='flex flex-col items-center justify-center gap-2'>
                    <div className='w-full min-w-[50px] py-[10px] px-1 rounded-md bg-[#4BCB36]'>
                        <p className='text-center text-white text-[18px] font-bold'>{data?.popularity}</p>
                    </div>
                </div>
            </div>
        </div>
    </Link>
  )
}

export default searchComponent