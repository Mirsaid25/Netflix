import AppLayout from '@/Layouts/AppLayout'
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import React, { useState } from 'react'
import { Doughnut } from 'react-chartjs-2';
import { AiFillDislike, AiFillLike, AiOutlineMinus } from 'react-icons/ai';
import { BsChevronRight } from 'react-icons/bs';
import { FaHeart } from 'react-icons/fa';
import { IoMdMenu } from 'react-icons/io';
import { createTheme, Pagination } from '@mui/material'
import { APIkey } from '..';
import SectionOneItem from '@/Components/index_child/sectionOneItem';
import ActorFilms from '@/Components/actor_childs/ActorFilmsComponent';

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
	const router = query.id;

	const res = await fetch(
		`https://api.themoviedb.org/3/person/${router}?api_key=${APIkey}&language=ru`
	);

	const res2 = await fetch(
		`https://api.themoviedb.org/3/person/${router}/movie_credits?api_key=${APIkey}&language=ru`
	);

	const res3 = await fetch(
		`https://api.themoviedb.org/3/person/${router}/images?api_key=${APIkey}`
	);

	const res4 = await fetch(
		`https://api.themoviedb.org/3/genre/movie/list?api_key=${APIkey}&language=en-US`
	);

	// const res5 = await fetch(
	// 	`https://api.themoviedb.org/3/search/person?api_key=${APIkey}&language=en-US&query=${"li"}&page=1&include_adult=false`
	// );

	

    const data = await res.json();
    const credits = await res2.json();
    const images = await res3.json();
    const ganres = await res4.json();

	return {
	    props: {
		    data:data,
			credits:credits,
			images: images,
			ganres: ganres,
	    },
	};
};

const actor = ({data ,credits , images , ganres, search}:any) => {
	console.log(search);

	const [selectOne , setSelectOne] = useState(true)
	const [bestFilms , setbestFilms] = useState(credits?.cast?.slice(0,4))

	// const bestFilms:object = credits?.cast?.slice(0,20)
	
	
	const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
		if(value === 1){
			setbestFilms(credits?.cast?.slice(0,4))
		} else if(value === 2){
			setbestFilms(credits?.cast?.slice(4,8))
		} else if(value === 3){
			setbestFilms(credits?.cast?.slice(8,12))
		} else if(value === 4){
			setbestFilms(credits?.cast?.slice(12,16))
		} else if(value === 5){
			setbestFilms(credits?.cast?.slice(16,20))
		}
	};

  return (
    <AppLayout>
        <section className="section1 flex flex-col items-start w-[80%] m-auto justify-center mb-[75px] max-xl:mb-[50px] max-lg:mb-[45px]">
			<div className="flex justify-between gap-[50px] mb-5">
                <img src={data?.profile_path !== undefined ? `https://www.themoviedb.org/t/p/w220_and_h330_face/${data?.profile_path}` : "/image/[indexId]/posterError.svg"} alt="" 
				    className="w-[400px] h-[550px] max-lg:w-[300px] max-lg:h-[400px] max rounded-xl " />
				<div className="flex flex-col items-start w-full">
                    <div className="flex items-center gap-2 mb-1">
						<Link href={"/"}>
                            <span className="text-[#4F5B7C] font-semibold max-lg:font-medium">Главная </span>
						</Link>
						<BsChevronRight color="#4F5B7C"/>
						<Link href={"/actor"}>
                            <span className="text-[#4F5B7C] font-semibold max-lg:font-medium">Актёры</span>
						</Link>
						<BsChevronRight color="#4F5B7C"/>
						<p className="text-white font-semibold max-lg:font-medium">{data?.name}</p>
					</div>
					<h1 className="text-white text-[65px] max-xl:text-[40px] font-black">{data?.name !== null ? data?.name : null }</h1>
					<p className='text-white text-[25px] font-medium mb-8'>{data?.also_known_as.length > 0 ? data?.also_known_as[0] : null }</p>
					<div className='flex items-center gap-5 mb-5'>
                        <span onClick={()=> setSelectOne(true)} className={selectOne? 'text-[19px] text-white font-semibold cursor-pointer underline underline-offset-4' : 'font-semibold text-[19px] text-[#6D717D] cursor-pointer'}>Информация</span>
                        <span onClick={()=> setSelectOne(false)} className={selectOne? 'font-semibold text-[19px] text-[#6D717D] cursor-pointer' : 'text-[19px] text-white font-semibold cursor-pointer underline underline-offset-4'}>Биография</span>
					</div>
					{selectOne? (
                            <div className="relative flex w-full justify-between gap-[60px]">
                                        <table className="w-full text-sm text-left text-gray-500">
                                            <tbody>
                                                <tr>
                                                    <th className="py-4 text-[18px] font-bold text-white pr-10">
						                			    День рождения:
                                                    </th>
                                                    <td className="py-4 text-[18px] font-bold text-[#F2F60F] ">
                                                        {data?.birthday !== undefined ? data?.birthday : "null" }
                                                    </td>
                                                </tr>
						                		{data?.deathday !== null ? (
                                                        <tr>
                                                            <th className="py-4 text-[18px] font-bold text-white pr-10">
						                					    День смерти:
                                                            </th>
                                                            <td className="py-4 text-[18px] font-bold text-[#F2F60F] ">
                                                                {data?.deathday  !== null ? data?.deathday : "null"}
                                                            </td>
                                                        </tr>
						                		    )
						                		    :
						                			null
						                	    }
				                        		<tr>
                                                    <th className="py-4 text-[18px] font-bold text-white pr-10">
                                                        Место рождения:
                                                    </th>
                                                    <td className="py-4 text-[18px] font-bold text-[#F2F60F] ">
				                        			    {data?.place_of_birth !== null ? data?.place_of_birth : "null" }
                                                    </td>
                                                </tr>
						                		<tr>
                                                    <th className="py-4 text-[18px] font-bold text-white pr-10">
						                			    Популярность:
                                                    </th>
                                                    <td className="py-4 text-[18px] font-bold text-[#F2F60F] ">
				                        			    {data?.popularity !== null ? data?.popularity.toFixed(0) : "null" }
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                            </div>
					    ) 
					    :
					    (
                            <div>
					    	    <p className='text-white text-[17px] font-medium leading-5'>{data?.biography}</p>
					        </div>
					    )
				    }
					
				</div>
			</div>
		</section>
		<section className="section2 mb-[65px] max-sm:hidden">
		    <div className="flex relative items-center justify-between gap-20 mb-10 max-lg:mb-5 max-sm:mb-3 max-2xl:flex-col max-2xl:items-start max-2xl:gap-1 max-sm:items-center max-sm:justify-center max-sm:flex-row max-sm:gap-4">
		    	<h1 className="text-white font-black text-[65px] max-[1580px]:text-[50px] max-xl:text-[40px] max-sm:text-[32px]">Лучшие фильмы</h1>
			</div>
			<div className="grid grid-cols-4 max-md:grid-cols-3 mb-5 gap-3">
                {bestFilms.map((item: any) => <SectionOneItem type="movie" key={item?.id} arr={item} arrId={ganres.genres}/> )}
			</div>
			<div className="flex items-center justify-center text-white">
			    <Pagination count={5} variant="text" onChange={handleChange} size="large" color="primary" />
			</div>
		</section>
		<section className="section3 mb-[65px]">
		    <h1 className="text-white font-black mb-2 text-[65px] max-[1580px]:text-[50px] max-xl:text-[40px] max-sm:text-[32px]">Фото</h1>
			<p className='text-white text-[25px] font-semibold mb-5'>{data?.name}</p>
		    <div className='grid grid-cols-5 gap-5'>
				{
					images?.profiles?.map((item:{file_path:string, id:number})=> <div key={item?.id}><img  className="w-full h-full rounded-lg" src={`https://www.themoviedb.org/t/p/w220_and_h330_face/${item?.file_path}`} alt=""/></div> )
				}
			</div>
		</section>
		<section className="section4 mb-[65px]">
		    <h1 className="text-white font-black mb-2 text-[65px] max-[1580px]:text-[50px] max-xl:text-[40px] max-sm:text-[32px]">Фильмы</h1>
            <div className='flex flex-col gap-5'>
				{credits?.cast?.map((item:any)=> <ActorFilms key={item.id} data={item}/>)}
			</div>	    
		</section>
    </AppLayout>
  )
}

export default actor