import AppLayout from '@/Layouts/AppLayout'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { APIkey } from '..'
import axios from 'axios'
import Link from 'next/link'
import { BsChevronRight } from 'react-icons/bs';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import Image from 'next/image'
ChartJS.register(ArcElement, Tooltip, Legend);

type moveInfoT = {
    backdrop_path: string,
	id: number,
	original_title: string,
	overview: string,
	poster_path:string,
	release_date :string,
	production_countries:[
		{name:string}
	],
	genres: [
		{name:string}
	]
}

export const data = {
	datasets: [
	  {
		label: 'Kinoarea',
		data: [12, 5],
		backgroundColor: [
		  'rgba(75, 203, 54)',
		  'transparent'
		],
		borderColor: [
			'rgb(75,203,54)'
		],
		borderWidth: 0,
		borderRadius: 2,
	  },
	],
  };

function index() {	
	const [moveInfo, setMoveInfo] = useState<moveInfoT>()


	function GetId() {
		const router = useRouter()
		const slug  = router.query
	  
		return slug.indexid?.toString()
	}

	const id = GetId()

	useEffect(() => {
	  axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${APIkey}&language=en-US`)
	    .then(res=> {
			if(res.status === 200 || res.status === 201){
				setMoveInfo(res.data)
			}
		})

		// axios.get(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${APIkey}&language=en-US`)
	    // .then(res=> {
		// 	if(res.status === 200 || res.status === 201){
		// 		console.log(res.data);
				
		// 	}
		// })
	}, [])

	console.log(moveInfo);
	
	
	// production_countries
  return (
    <AppLayout>
        <section className='px-[100px]'>
			<div className='flex justify-between gap-10 mb-[45px]'>
				<div>
					<img src={`https://www.themoviedb.org/t/p/w220_and_h330_face/${moveInfo?.backdrop_path}`}  alt="" className='w-[400px] h-[560px] rounded-xl' />
				</div>
				<div className='w-full flex flex-col justify-start'>
					<div className='flex items-center gap-2'>
						<Link href={"/"}>
							<p className='text-[#4F5B7C] font-medium cursor-pointer'>Главная</p>
						</Link>
						<BsChevronRight color='#4F5B7C'/>
						<Link href={"/"}>
							<p className='text-[#4F5B7C] font-medium cursor-pointer'>Фильмы</p>
						</Link>
						<BsChevronRight color='#4F5B7C'/>
						<p className='text-white font-medium'>Film name</p>
					</div>
					<h1 className='text-white text-[65px] font-black'>{moveInfo?.original_title}</h1>
					<div className='flex items-center gap-[22px] mb-3'>
						<div className='flex items-center justify-center flex-col'>
                            <div className='relative w-[100px] h-[100px] flex flex-col items-center justify-center rounded-full'>
					            <Doughnut data={data} className="w-full h-full container"/>
							    <p className='text-white text-[13px] absolute top-[55%] left-1/2 -translate-x-1/2 -translate-y-1/2'>1</p>
						    </div>
						    <p className='text-white text-[15px] font-medium'>Kinoarea</p>
						</div>
						<div className='flex items-center justify-center flex-col'>
                            <div className='relative w-[100px] h-[100px] flex flex-col items-center justify-center rounded-full'>
					            <Doughnut data={data} className="w-full h-full container"/>
							    <p className='text-white text-[13px] absolute top-[55%] left-1/2 -translate-x-1/2 -translate-y-1/2'>1</p>
						    </div>
						    <p className='text-white text-[15px] font-medium'>IMDb</p>
						</div>
					</div>
					<p className='text-white text-[20px] font-medium leading-[166.5%] mb-[30px]'>{moveInfo?.overview}</p>
					<button className='flex items-center gap-3 border-2 px-[35px] py-5 rounded-[10px] w-fit'>
                        <Image alt="" width={10} height={10} src={'/icons/play-icon.svg'} className="w-5 h-5" />
						<p className='text-white text-[18px] font-bold'>Смотреть трейлер</p>
					</button>
				</div>
			</div>
			<div className='w-full text-white flex  justify-between'>
			    <table className='w-1/2'>
              		<tr>
              		  <td className='text-lg font-medium'>Year</td>
              		  <td className='text-[#F2F60F] text-lg'>{moveInfo?.release_date.split("-").at(0)}</td>
              		</tr>
					<tr>
              		  <td className='text-lg font-medium'>Country</td>
              		  <td className='text-[#F2F60F] text-lg'>{moveInfo?.production_countries[0].name}</td>
              		</tr>
					<tr>
              		  <td className='text-lg font-medium'>Ganre</td>
              		  <td className='text-[#F2F60F] text-lg'>{moveInfo?.genres.at(0)?.name}</td>
              		</tr>
                </table>
				<table className='w-1/2'>
              		<tr>
              		  <td className='text-lg font-medium'>Country</td>
              		  <td className='text-[#F2F60F] text-lg'></td>
              		</tr>
                </table>
			</div>
		</section>
    </AppLayout>
  )
}

export default index

// `https://image.tmdb.org/t/p/w220_and_h330_face/${moveInfo?.poster_path}`