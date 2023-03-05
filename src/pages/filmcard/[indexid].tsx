import AppLayout from '@/Layouts/AppLayout'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { APIkey } from '..'
import axios from 'axios'
import Link from 'next/link'
import { BsChevronRight } from 'react-icons/bs';

type moveInfoT = {
    backdrop_path: string,
	id: number,
	original_title: string,
	overview: string,
	poster_path:string
}


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
							<p>Главная</p>
						</Link>
						<BsChevronRight/>
					</div>
				</div>
			</div>
		</section>
    </AppLayout>
  )
}

export default index

// `https://image.tmdb.org/t/p/w220_and_h330_face/${moveInfo?.poster_path}`