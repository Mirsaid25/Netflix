import SectionOneItem from '@/Components/index_child/sectionOneItem'
import AppLayout from '@/Layouts/AppLayout'
import axios from 'axios'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { BsChevronRight } from 'react-icons/bs'
import { APIkey } from '../_app' 

const index =()=> {
	const [arr , setArr] = useState([])
	const [filteredArr , setFilteredArr] = useState([])

	const [ganreArr , setGanreArr] = useState<any>([])
	const [ganreActive , setGanreActive] = useState([{id:0}])

	const [filterHandle , setFilterHandle] = useState(false)


    useEffect(() => {
        axios.get(`https://api.themoviedb.org/3/tv/popular?api_key=${APIkey}&language=en-US&page=1`)
	      .then(res1 => {
			if(res1.status === 200 || res1.status === 201){
			    setArr(res1.data.results)
				setFilteredArr(res1.data.results)
		    } 
		})

		// axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${APIkey}&language=en-US&page=2`)
	    //   .then(res => res.status === 200 || res.status === 201 ? setArr(...arr , ...res.data.results): null)

	    axios.get(`https://api.themoviedb.org/3/genre/tv/list?api_key=${APIkey}&language=en-US`)
		    .then(res=>res.status === 200 || res.status === 201 ? setGanreArr(res.data.genres) : null)
	}, [])
	
	useEffect(() => {
		if(ganreActive.length === 1){
			setFilteredArr(arr)
			setFilterHandle(false)
		}else{
		    setFilteredArr(  
		        arr.filter((item: any)=>{
		    	    for(let ganre of ganreActive){
		    			for( let item2 of item.genre_ids){
		    	    		if(item2 === ganre.id){
		    					return item
		    	    		}
		    	    	}
		    	    }
		        })
		    )
		}
	}, [ganreActive])
		
	function filtering(element: any){
		if(element.checked){
			setGanreActive([...ganreActive ,{id: +element.title}])
		} else{
            setGanreActive(
			   ganreActive.filter(item=> {
			       if (item.id !== +element.title) {
			           return item
			       }
			   })	
			)
		    
		}
	
	}

  return (
    <AppLayout>
        <section className='section1 mb-5'>
            <div className='flex items-center justify-between relative'>
				<div>
				    <h1 className="text-white font-black mb-2 text-[65px] max-[1580px]:text-[50px] max-xl:text-[40px] max-sm:text-[32px] max-[500px]:text-[28px]">Все сериалы</h1>
					<div className="flex items-center gap-2 mb-1">
						<Link href={"/"}>
                            <span className="text-[#4F5B7C] font-semibold max-lg:font-medium">Главная </span>
						</Link>
						<BsChevronRight color="#4F5B7C"/>
						<p className="text-white font-semibold max-lg:font-medium">Сериалы</p>
					</div>
				</div>
				<div className={filterHandle ? 'w-auto bg-[#000025] rounded-xl p-5 max-xl:p-4 max-lg:p-3 max-sm:p-2 overflow-hidden transition-all ease-in absolute right-0 top-0 z-10' : 'w-auto h-[60px] max-xl:h-[50px] max-lg:h-[45px] max-md:h-[40px] max-sm:h-[33px] bg-[#000025] rounded-xl p-5 max-xl:p-4 max-lg:p-3 max-sm:p-2 overflow-hidden'}>
                        <div onClick={()=> setFilterHandle(!filterHandle)} className='flex items-center justify-between gap-3 max-sm:gap-2 mb-5 max-md:mb-3 cursor-pointer'>
							<p className='text-[white] text-[14px] max-md:text-[12px] font-semibold'>Жанры</p>
							<img src="/icons/filter_icon.svg" alt="" className={filterHandle ? 'w-[11px] h-[11px] max-md:w-[9px] max-md:h-[9px]' :'w-[11px] h-[11px] max-md:w-[9px] max-md:h-[9px] rotate-180' } />
						</div>
						<div className='flex flex-col gap-3 max-md:gap-2'>
							{ganreArr.length >0 ?  ganreArr?.map((item:any) =>(
								<div className='flex items-center gap-2 max-md:gap-1'>
							        <input onClick={(e) => filtering(e.target)} type="checkbox" name={item.name} title={item.id} id="" 
									   className='w-4 h-4 max-md:w-3 max-md:h-3 cursor-pointer'/>
                                    <p className='text-white max-xl:text-[14px] max-[900px]:text-[12px] max-[500px]:text-[10px] font-medium'>{item.name}</p>
							    </div>
							)):
						       null 
						    }
							
						</div>
				</div>
			</div>
		</section>
		<section className='section2 w-[88%] max-xl:w-[80%] max-lg:w-[80%] max-md:w-[77%] max-sm:w-[70%] max-[385px]:w-[65%] max-[326px]:w-[60%]'>
			<div className='grid grid-cols-5 max-xl:grid-cols-4 max-lg:grid-cols-3 max-sm:grid-cols-2 max-[385px]:grid-cols-1 gap-5 max-md:gap-3'>
                {filteredArr.map((item:any)=> <SectionOneItem arr={item} arrId={ganreArr} type="tv"/>)}
			</div>
		</section>
    </AppLayout>
  )
}

export default index