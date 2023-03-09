import AppLayout from '@/Layouts/AppLayout'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { APIkey } from '..'
import axios from 'axios'
import Link from 'next/link'
import { BsChevronRight } from 'react-icons/bs';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
ChartJS.register(ArcElement, Tooltip, Legend);

type moveInfoT = {
    backdrop_path: string,
	id: number,
	original_title: string,
	overview: string,
	poster_path:string
}

export const data = {
	datasets: [
	  {
		label: '# of Votes',
		data: [12, 5],
		backgroundColor: [
		  'rgba(75, 203, 54)',
		  'rgba(30,37,56, 0.1)'
		],
		borderColor: [
			'rgb(75,203,54)'
			
		],
		borderWidth: 0,
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
	}, [])
	console.log(moveInfo);
	
	
  return (
    <AppLayout>
        <section className='px-[100px]'>
			<div className='flex justify-between gap-10'>
				<div>
					<img src=""  alt="" className='w-[400px] h-[560px] rounded-xl' />
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
					<h1 className='text-white text-[65px] font-black'>Побег из Претории</h1>
					<div className='flex items-center gap-[22px]'>
						<div className='relative w-[70px] h-[70px]'>
					        <Doughnut data={data} />
							<p className='text-white text-[13px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>1</p>
						</div>
						<div className='relative w-[70px] h-[70px]'>
					        <Doughnut data={data} />
							<p className='text-white text-[13px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>1</p>
						</div>
					</div>
				</div>
			</div>
		</section>
    </AppLayout>
  )
}

export default index

// `https://image.tmdb.org/t/p/w220_and_h330_face/${moveInfo?.poster_path}`