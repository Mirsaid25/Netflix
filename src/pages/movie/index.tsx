import AppLayout from '@/Layouts/AppLayout'
import axios from 'axios'
import { elements } from 'chart.js'
import { Input } from 'gray-matter'
import Link from 'next/link'
import React, { HTMLProps, useEffect, useState } from 'react'
import { BsChevronRight } from 'react-icons/bs'
import { APIkey } from '..'

const index =()=> {
	const [ganreArr , setGanreArr] = useState([])
	const [ganreActive , setGanreActive] = useState([{}])
	const [filterHandle , setFilterHandle] = useState(false)


    useEffect(() => {
	    axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${APIkey}&language=en-US`)
		    .then(res=>res.status === 200 || res.status === 201 ? setGanreArr(res.data.genres) : null)
	}, [])
	
	console.log(ganreActive);
	
	function filtering(element: EventTarget){
	// 	// console.log(element.checked);
	// 	if(element.checked){
	// 		setGanreActive([...ganreActive ,{id: element.title}])
	// 		// console.log(element);
			
	// 	}
	
	}

  return (
    <AppLayout>
        <section className='section1'>
            <div className='flex justify-between'>
				<div>
				    <h1 className="text-white font-black mb-2 text-[65px] max-[1580px]:text-[50px] max-xl:text-[40px] max-sm:text-[32px]">Все фильмы</h1>
					<div className="flex items-center gap-2 mb-1">
						<Link href={"/"}>
                            <span className="text-[#4F5B7C] font-semibold max-lg:font-medium">Главная </span>
						</Link>
						<BsChevronRight color="#4F5B7C"/>
						<p className="text-white font-semibold max-lg:font-medium">Фильмы</p>
					</div>
				</div>
				<div className={filterHandle ? 'w-auto bg-[#000025] rounded-xl p-5 overflow-hidden transition-all ease-in' : 'w-auto h-[60px] bg-[#000025] rounded-xl p-5 overflow-hidden'}>
                        <div onClick={()=> setFilterHandle(!filterHandle)} className='flex items-center justify-between gap-3 mb-5 cursor-pointer'>
							<p className='text-[white] text-[14px] font-semibold'>Жанры</p>
							<img src="/icons/filter_icon.svg" alt="" className={filterHandle ? 'w-[11px] h-[11px]' :'w-[11px] h-[11px] rotate-180' } />
						</div>
						<div className='flex flex-col gap-3'>
							{ganreArr.length >0 ?  ganreArr?.map((item:any) =>(
								<div className='flex items-center gap-2'>
							        <input onClick={(e) => filtering(e.target)} type="checkbox" name={item.name} title={item.id} id="" className='w-4 h-4 cursor-pointer'/>
                                    <p className='text-white font-medium'>{item.name}</p>
							    </div>
							)):
						       null 
						    }
							
						</div>
				</div>
			</div>
		</section>
    </AppLayout>
  )
}

export default index