import { APIkey } from '@/pages';
import axios from 'axios';
import Link from 'next/link'
import React, { useEffect, useState } from 'react'


const ActorFilms = ({data}:any) => {
    const [arrGanre, setArrGanre] = useState([])

    useEffect(() => {
        axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${APIkey}&language=en-US`)
        .then(res => {
            if(res.status === 200 || res.status === 201){
                setArrGanre(res.data.genres)
            }
        })
    }, [])
    

    const ganre =  arrGanre.filter((item: any) => {
	    for(let items of data?.genre_ids){
			if(item.id === items){
				return item
	    	}
	    }
    })
    
  return (
    <div className='flex items-center justify-between border-b-2 pb-10 bg-[#1E2538] border-[#3B486B]'>
        <div className='flex items-center gap-10'>
            <img src={data?.backdrop_path !== null ? `https://www.themoviedb.org/t/p/w220_and_h330_face/${data?.backdrop_path}` : "/image/[indexId]/posterError.svg"} alt=""  className='h-[300px] w-[200px] rounded-md'/>
            <div className='flex flex-col items-start justify-start gap-2'>
                <h2 className='text-white text-[25px] font-bold'>{data?.original_title}</h2>
                <span className='text-[17px] font-medium text-[#54689E]'>{data?.title}</span>
                <p className='text-[#F2F60F] text-[15px]'>{ganre.map((item:{name:string}) => `${item?.name[0].toUpperCase() + item?.name.slice(1)}, `)}...</p>
                <span className='text-[15px] font-medium text-[#54689E]'>{data?.character}</span>
            </div>
        </div>
        <div className='flex items-center gap-14'>
            <div className='flex flex-col items-center justify-center gap-2'>
                <div className='w-full py-[10px] rounded-md bg-[#4BCB36]'>
                    <p className='text-center text-white text-[18px] font-bold'>{data?.popularity}</p>
                </div>
                <p className='text-[#DEDEDE] text-[18px] font-medium'>Themoviedb</p>
            </div>
            <Link href={{
              pathname: `/movie/&`,
              query: { id: data?.id },
            }}>
                <div className='bg-[#3657CB] px-10 py-5 rounded-xl shadow-lg shadow-blue-500/50'>
                    <p className='text-white text-[18px] font-bold'>Карточка фильма</p>
                </div>
            </Link>
        </div>
    </div>
  )
}

export default ActorFilms