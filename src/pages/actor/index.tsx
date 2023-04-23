import ActorFilms from '@/Components/actor_childs/ActorFilmsComponent'
import Actiors from '@/Components/[indexId]_child/Actior'
import AppLayout from '@/Layouts/AppLayout'
import axios from 'axios'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { BsChevronRight } from 'react-icons/bs'
import { APIkey } from '../_app'

const index = () => {
	const [arr1, setArr1] = useState([])
	const [arr2, setArr2] = useState([])
	const [arr3, setArr3] = useState([])
	const [arr4, setArr4] = useState([])
	const [arr5, setArr5] = useState([])
	const [arr6, setArr6] = useState([])
 
	useEffect(() => {
		axios.get(`https://api.themoviedb.org/3/person/popular?api_key=${APIkey}&language=en-US&page=1`)
		    .then(res1 => setArr1(res1.data.results))

		axios.get(`https://api.themoviedb.org/3/person/popular?api_key=${APIkey}&language=en-US&page=2`)
		    .then(res2 => setArr2(res2.data.results))

		axios.get(`https://api.themoviedb.org/3/person/popular?api_key=${APIkey}&language=en-US&page=3`)
		    .then(res3 => setArr3(res3.data.results))

		axios.get(`https://api.themoviedb.org/3/person/popular?api_key=${APIkey}&language=en-US&page=4`)
		    .then(res4 => setArr4(res4.data.results))

		axios.get(`https://api.themoviedb.org/3/person/popular?api_key=${APIkey}&language=en-US&page=5`)
		    .then(res5 => setArr5(res5.data.results))

	    axios.get(`https://api.themoviedb.org/3/person/popular?api_key=${APIkey}&language=en-US&page=6`)
		    .then(res6 => setArr6(res6.data.results))
	  
	},[])
	
  return (
    <AppLayout>
        <div className='mb-10'>
		    <h1 className="text-white font-black mb-2 text-[65px] max-[1580px]:text-[50px] max-xl:text-[40px] max-sm:text-[32px] max-[500px]:text-[28px]">Все актёры</h1>
			<div className="flex items-center gap-2 mb-1">
				<Link href={"/"}>
                    <span className="text-[#4F5B7C] font-semibold max-lg:font-medium">Главная </span>
				</Link>
				<BsChevronRight color="#4F5B7C"/>
				<p className="text-white font-semibold max-lg:font-medium">Актёры</p>
			</div>
		</div>
		<div className='grid grid-cols-4 max-lg:grid-cols-3 max-sm:grid-cols-2 gap-5'>
			{
				arr1?.map((item:any)=> <Actiors key={item.id} data={item}/>)
			}
			{
				arr2?.map((item:any)=> <Actiors key={item.id} data={item}/>)
			}
			{
				arr3?.map((item:any)=> <Actiors key={item.id} data={item}/>)
			}
			{
				arr4?.map((item:any)=> <Actiors key={item.id} data={item}/>)
			}
			{
				arr5?.map((item:any)=> <Actiors key={item.id} data={item}/>)
			}
			{
				arr6?.map((item:any)=> <Actiors key={item.id} data={item}/>)
			}
		</div>
    </AppLayout>
  )
}

export default index