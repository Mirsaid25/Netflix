// import SectionOneItem from "@/Components/index_child/sectionOneItem";
import AppLayout from "@/Layouts/AppLayout";
import { Inter } from "@next/font/google";
import {useEffect, useState } from "react";
import { AiOutlineMinus } from 'react-icons/ai';
import { IoMdMenu } from "react-icons/io";
import { MdOutlineClose } from "react-icons/md";
import {BsArrowRight} from "react-icons/bs"
import {AiFillLike, AiFillDislike} from "react-icons/ai"
import { Swiper, SwiperSlide } from 'swiper/react';
import {Scrollbar} from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import Image from "next/image";
import useWindowSize from "@rooks/use-window-size";
import { createTheme, Pagination } from '@mui/material'
import SectionFiveItem from "@/Components/index_child/sectionFiveItem";
import axios from "axios";
import dynamic from 'next/dynamic'
import MyLoader from "@/Components/MyLoader";
import Link from "next/link";
import Preloader from "@/Components/Preloader";

const SectionOneItem = dynamic(() => import('@/Components/index_child/sectionOneItem'), {
  loading: () => <p className="text-[white] font-black text-[50px]">{<MyLoader/>}</p>,
})

export const APIkey = "d8c00e564262e291fb38f263b4c7128e"

const inter = Inter({ subsets: ["latin"] });

const theme = createTheme({
	components: {
	  MuiTabs: {
		styleOverrides: {
		  indicator: {
			backgroundColor: "white",
			height: 3,
			contrastText: "#7f1616"
		  }
		}
	  }
	}
  });

export default function Home() {
    const [filterModalOne, setFilterModalOne] = useState<boolean>(false)
    const [filterModalTwo, setFilterModalTwo] = useState<boolean>(false)

	const [arr, setArr] = useState<any>([])
	const [arrSectionOne, setArrSectionOne] = useState<[]>([])
	const [arrGanre, setArrGanre] = useState<[]>([])


	const [arrPopular, setArrPopular] = useState<[]>([])
	const [arrPopularReload, setArrPopularReload] = useState([])
	const [plaginationNum, setPlaginationNum] = useState<number>(1)

	const [popularPersonsArr, setPopularPersonsArr] = useState<any>([{name:"loading",profile_path:"loading" }])
	
	const [trailerKey, setTrailerKey] = useState<string>("yjRHZEUamCc")
	const [trailerName, setTrailerName] = useState<string>("John Wick: Chapter 4")
	
	const size:number|null = useWindowSize().innerWidth

	useEffect(() => {
	    axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${APIkey}&language=en-US&page=1`)
	      .then(res => {
			    if(res.status === 200 || res.status === 201){
					setArr(res.data.results); 
					setArrSectionOne(res.data.results)
				}
		  })

		axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${APIkey}&language=en-US`)
		    .then(res => {
				if(res.status === 200 || res.status === 201){
					setArrGanre(res.data.genres)
				}
			})

		axios.get(`https://api.themoviedb.org/3/person/popular?api_key=${APIkey}&language=rus&page=1`)
		    .then(res => {
				if(res.status === 200 || res.status === 201){
					setPopularPersonsArr(res.data.results)
				}
			})
	}, [])
		
	useEffect(() => {
		axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${APIkey}&language=en-US&page=${plaginationNum}`)
		.then(res => setArrPopular(res.data.results))
	}, [plaginationNum])

	useEffect(()=>{
        setArrPopularReload(arrPopular)
	}, [arrPopular])
	
    function filterPopularFilmsWithDate(e: React.ChangeEvent<any>){		
		if(e.target.id !== "all"){
			    const Arr =  arrPopular.filter((item :any)=>{
                if(item.release_date.split("-").at(0) === e.target.id){
                    return item
			    }
		    })
		    setArrPopularReload(Arr)
		} else(
			setArrPopularReload(arrPopular)
		)
        
	}
  
	function trailSlider(id:number){
		for(let item of arr){
			axios.get(`https://api.themoviedb.org/3/movie/${item?.id}/videos?api_key=${APIkey}&language=en-US`)
			.then(res => {
				if(res.data.results.length >= 1 && res.data.id === id ){
					res.data.results.filter((item:any) => {
                        if(item.type === "Trailer"){
							setTrailerKey(item.key)
						}
					})
				} 
			})
            if(item.id === id){
				setTrailerName(item.title)
			}
			
		}
	}

	const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
		setPlaginationNum(value);
	};


	const filterFilmsWithGanre = (item:any) =>{
        setArrSectionOne(arr.filter((item2:{genre_ids:[]})=>{
           for(let item3 of item2.genre_ids){
				if (item3 === +item.id) {
					return item2
				}
				if(item.id === "all"){
					return item2
				}
		   }
		}))
	}

    return (
		<AppLayout>
			    <section className="section1 flex flex-col justify-center mb-14 max-md:mb-6 max-sm:mb-8">
			    	<div className="flex relative items-center justify-between gap-20 mb-10 max-lg:mb-5 max-sm:mb-3 max-2xl:flex-col max-2xl:items-start max-2xl:gap-1 max-sm:items-center max-sm:justify-center max-sm:flex-row max-sm:gap-4">
			    		<h1 className="text-white font-black text-[65px] max-[1580px]:text-[50px] max-xl:text-[40px] max-sm:text-[32px]">Сейчас в кино</h1>
			    		<AiOutlineMinus size={60} color="white" className="max-[1765px]:hidden"/>
			    		<div className="flex items-center gap-[25px] max-xl:gap-5 max-sm:hidden">
			    			<span onClick={(e)=> filterFilmsWithGanre(e.target)} className="text-[#696F78FF] hover:text-white transition ease-in-out cursor-pointer font-bold text-[18px] max-xl:text-[15px]" id="all">Все</span>
			    			<span onClick={(e)=> filterFilmsWithGanre(e.target)} className="text-[#696F78FF] hover:text-white transition ease-in-out cursor-pointer font-bold text-[18px] max-xl:text-[15px]" id="28">Боевик</span>
			    			<span onClick={(e)=> filterFilmsWithGanre(e.target)} className="text-[#696F78FF] hover:text-white transition ease-in-out cursor-pointer font-bold text-[18px] max-xl:text-[15px]" id="12">Приключения</span>
			    			<span onClick={(e)=> filterFilmsWithGanre(e.target)} className="text-[#696F78FF] hover:text-white transition ease-in-out cursor-pointer font-bold text-[18px] max-xl:text-[15px]" id="35">Комедия</span>
			    			<span onClick={(e)=> filterFilmsWithGanre(e.target)} className="text-[#696F78FF] hover:text-white transition ease-in-out cursor-pointer font-bold text-[18px] max-xl:text-[15px]" id="878">Фантастика</span>
			    			<span onClick={(e)=> filterFilmsWithGanre(e.target)} className="text-[#696F78FF] hover:text-white transition ease-in-out cursor-pointer font-bold text-[18px] max-xl:text-[15px]" id="53">Триллер</span>
			    			<span onClick={(e)=> filterFilmsWithGanre(e.target)} className="text-[#696F78FF] hover:text-white transition ease-in-out cursor-pointer font-bold text-[18px] max-xl:text-[15px]" id="18">Драма</span>
			    		</div>
			    		<IoMdMenu color="white" onClick={()=> setFilterModalOne(true)} size={25} className="hidden max-sm:block cursor-pointer"/>
			    		{filterModalOne ? 
			    		    <div className="absolute top-0 right-0 backdrop-blur-xl p-3 border-2 border-white flex flex-col gap-2 rounded-md z-10">
			    		        <MdOutlineClose onClick={()=> setFilterModalOne(false)} size={25} className="absolute top-1 right-1 cursor-pointer" color="white"/>
			    		        <span onClick={(e)=> {filterFilmsWithGanre(e.target); setFilterModalOne(false)}} id="all" className="text-white cursor-pointer font-bold text-[15px]">Все</span>
			    		    	<span onClick={(e)=> {filterFilmsWithGanre(e.target); setFilterModalOne(false)}} id="28" className="text-[grey] cursor-pointer font-bold text-[15px]">Боевики</span>
			    		    	<span onClick={(e)=> {filterFilmsWithGanre(e.target); setFilterModalOne(false)}} id="12" className="text-[grey] cursor-pointer font-bold text-[15px]">Приключения</span>
			    		    	<span onClick={(e)=> {filterFilmsWithGanre(e.target); setFilterModalOne(false)}} id="35" className="text-[grey] cursor-pointer font-bold text-[15px]">Комедии</span>
			    		    	<span onClick={(e)=> {filterFilmsWithGanre(e.target); setFilterModalOne(false)}} id="878" className="text-[grey] cursor-pointer font-bold text-[15px]">Фантастика</span>
			    		    	<span onClick={(e)=> {filterFilmsWithGanre(e.target); setFilterModalOne(false)}} id="53" className="text-[grey] cursor-pointer font-bold text-[15px]">Триллеры</span>
			    		    	<span onClick={(e)=> {filterFilmsWithGanre(e.target); setFilterModalOne(false)}} id="18" className="text-[grey] cursor-pointer font-bold text-[15px]">Драма</span>
			    		    </div> 
			    			: null
			    		}
			    	</div>
			    	<div className="w-full grid grid-cols-4 max-[830px]:grid-cols-3 max-sm:grid-cols-2 gap-5 max-md:gap-3 max-sm:gap-2 mb-[50px] max-lg:mb-[40px] max-md:mb-[30px] max-sm:mb-5">
			    	    {arr !== undefined && size !== null && size >= 830 ? arrSectionOne.slice(0,8).map((arr:{popularity: number, id:number,backdrop_path: string,original_title: string,genre_ids:[]}) => <SectionOneItem type="movie" key={arr.id} arrId={arrGanre} arr={arr}/>) : null}
			    		{arr !== undefined && size !== null && size < 830 && size >= 640 ? arrSectionOne.slice(0,9).map((arr:{popularity: number, id:number,backdrop_path: string,original_title: string,genre_ids:[]})=> <SectionOneItem type="movie" key={arr.id} arrId={arrGanre} arr={arr}/>) : null}
			    		{arr !== undefined && size !== null && size < 640 ? arrSectionOne.slice(0,6).map((arr:{popularity: number,id:number,backdrop_path: string,original_title: string,genre_ids:[]})=> <SectionOneItem type="movie" key={arr.id} arrId={arrGanre} arr={arr}/>) : null}
			    	</div>
			    	<Link href="/movie" className="flex justify-center">
			    	    <button className="border-2 border-white px-11 max-lg:px-[34px] max-md:px-[32px] py-5 max-lg:py-[16px] max-md:py-[11px] rounded-xl text-white text-lg max-lg:text-base font-bold m-auto" title="Все новинки">Все новинки</button>
			    	</Link>
			    </section>
			    <section className="section2 mb-[75px]">
			    	<div className="flex items-center justify-between mb-[40px] max-sm:flex-col max-sm:gap-2 max-sm:mb-2">
			    		<h1 className="text-white font-black text-[65px] max-[1580px]:text-[50px] max-xl:text-[40px] max-sm:text-[32px]">Новые трейлеры</h1>
			    		<div className="flex items-center gap-5 cursor-pointer">
			    			<p className="text-white text-[22px] max-xl:text-[18px] font-bold">Все трейлеры</p>
			    			<BsArrowRight color="white" size={26}/>
			    		</div>
			    	</div>
			    	<div className="mb-[50px] max-lg:mb-[30px] max-md:mb-[25px] max-sm:mb-[20px]">
			    		<iframe title="trailer" src={`https://www.youtube.com/embed/${trailerKey}`} frameBorder="0" className="w-full h-[800px] rounded-xl mb-5 max-xl:h-[511px] max-lg:h-[450px] max-md:h-[370px] max-sm:h-[250px] max-[425px]:h-[200px]"></iframe>
			    		<div className="flex items-center justify-between">
                            <h1 className="text-white text-[45px] max-lg:text-[35px] max-md:text-[30px] max-sm:text-[25px] font-black">{trailerName}</h1>
			    			<div className="flex items-center gap-2">
			    				<div className="bg-[#1B2133] w-[58px] h-[58px] max-lg:h-[40px] max-lg:w-[40px] max-md:h-[30px] max-md:w-[30px] rounded-xl flex items-center justify-center cursor-pointer">
			    					<AiFillLike color="white" size={26} className="max-lg:w-[17px] max-lg:h-[17px] max-md:w-[13px] max-md:h-[13px] "/>
			    				</div>
			    				<div className="bg-[#1B2133] w-[58px] h-[58px] max-lg:h-[40px] max-lg:w-[40px] max-md:h-[30px] max-md:w-[30px] rounded-xl flex items-center justify-center cursor-pointer">
			    					<AiFillDislike color="white" size={26} className="max-lg:w-[17px] max-lg:h-[17px] max-md:w-[13px] max-md:h-[13px] "/>
			    				</div>
			    			</div>
			    		</div>
			    	</div>
			    	<Swiper
			    	      modules={[Scrollbar]}
                          spaceBetween={20}
                          slidesPerView={size !== null && size < 426 ? 3 : 5}
                          scrollbar={{ draggable:true }}
                        >
			    			{arr.map((item: any)=> (
			    				<SwiperSlide key={item.id} 
			    				onClick={(e)=>{
                                    trailSlider(item?.id)
			    				}}
			    				>
                                <div className="w-full h-[350px] max-xl:h-[200px] max-lg:h-[155px] max-md:h-[150px] max-[640px]:h-[120px] max-sm:h-[130px] rounded-xl overflow-hidden mb-2 relative cursor-pointer"
                                >
                                  <img
                                    src={`https://www.themoviedb.org/t/p/w220_and_h330_face/${item?.backdrop_path}`}
                                    alt=""
                                    className="w-full h-full"
                                  />
                                  <img
                                    src={"/image/main/play_icon.svg"}
                                    alt=""
                                    className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-[35px] h-[35px] max-lg:w-[20px] max-lg:h-[20px] max-md:w-[16px] max-md:h-[16px] max-[226px]:h-[18px] max-[226px]:w-[18px]"
                                  />
                                </div>
                                <p className="text-[20px] max-lg:text-[15px] max-md:text-[13px] font-black text-white">{item?.title}</p>
                            </SwiperSlide>
			    			))}
			    			
                          ...
                    </Swiper>
			    </section>
			    <section className="section3 mb-[65px]">
			        <div className="flex relative items-center justify-between gap-20 mb-10 max-lg:mb-5 max-sm:mb-3 max-2xl:flex-col max-2xl:items-start max-2xl:gap-1 max-sm:items-center max-sm:justify-center max-sm:flex-row max-sm:gap-4">
			        		<h1 className="text-white font-black text-[65px] max-[1580px]:text-[50px] max-xl:text-[40px] max-sm:text-[32px]">Популярные фильмы</h1>
			        		<AiOutlineMinus size={60} color="white" className="max-[1765px]:hidden"/>
			        		<div className="flex items-center gap-[25px] max-xl:gap-5 max-sm:hidden">
			        			<span id="all"  onClick={filterPopularFilmsWithDate} className="text-[grey] hover:text-white cursor-pointer font-bold text-[18px] max-xl:text-[15px]">Всё время</span>
			        			<span id="2023" onClick={filterPopularFilmsWithDate}  className="text-[grey] hover:text-white cursor-pointer font-bold text-[18px] max-xl:text-[15px]">2023</span>
			        			<span id="2022" onClick={filterPopularFilmsWithDate}  className="text-[grey] hover:text-white cursor-pointer font-bold text-[18px] max-xl:text-[15px]">2022</span>
			        			<span id="2021" onClick={filterPopularFilmsWithDate}  className="text-[grey] hover:text-white cursor-pointer font-bold text-[18px] max-xl:text-[15px]">2021</span>
			        			<span id="2020" onClick={filterPopularFilmsWithDate}  className="text-[grey] hover:text-white cursor-pointer font-bold text-[18px] max-xl:text-[15px]">2020</span>
			        			<span id="2019" onClick={filterPopularFilmsWithDate}  className="text-[grey] hover:text-white cursor-pointer font-bold text-[18px] max-xl:text-[15px]">2019</span>
			        			<span id="2018" onClick={filterPopularFilmsWithDate}  className="text-[grey] hover:text-white cursor-pointer font-bold text-[18px] max-xl:text-[15px]">2018</span>
			        		</div>
			        		<IoMdMenu color="white" onClick={()=> setFilterModalTwo(true)} size={25} className="hidden max-sm:block cursor-pointer"/>
			        		{filterModalTwo ? 
			        		    <div className="absolute top-0 right-0 backdrop-blur-xl p-5 pr-8 border-2 border-white flex flex-col gap-2 rounded-md z-10">
			        		        <MdOutlineClose onClick={()=> setFilterModalTwo(false)} size={25} className="absolute top-1 right-1 cursor-pointer" color="white"/>
			        		        <span id="all"  onClick={(e)=>{filterPopularFilmsWithDate(e); setFilterModalTwo(false)}} className="text-[grey] hover:text-white cursor-pointer font-bold text-[15px]">Всё</span>
			        		    	<span id="2023" onClick={(e)=>{filterPopularFilmsWithDate(e); setFilterModalTwo(false)}} className="text-[grey] hover:text-white cursor-pointer font-bold text-[15px]">2023</span>
			        		    	<span id="2022" onClick={(e)=>{filterPopularFilmsWithDate(e); setFilterModalTwo(false)}} className="text-[grey] hover:text-white cursor-pointer font-bold text-[15px]">2022</span>
			        		    	<span id="2021" onClick={(e)=>{filterPopularFilmsWithDate(e); setFilterModalTwo(false)}} className="text-[grey] hover:text-white cursor-pointer font-bold text-[15px]">2021</span>
			        		    	<span id="2020" onClick={(e)=>{filterPopularFilmsWithDate(e); setFilterModalTwo(false)}} className="text-[grey] hover:text-white cursor-pointer font-bold text-[15px]">2020</span>
			        		    	<span id="2019" onClick={(e)=>{filterPopularFilmsWithDate(e); setFilterModalTwo(false)}} className="text-[grey] hover:text-white cursor-pointer font-bold text-[15px]">2019</span>
			        		    	<span id="2018" onClick={(e)=>{filterPopularFilmsWithDate(e); setFilterModalTwo(false)}} className="text-[grey] hover:text-white cursor-pointer font-bold text-[15px]">2018</span>
			        		    </div> 
			        			: null
			        		}
			    	</div>
			    	<div className="grid grid-cols-4 max-md:grid-cols-3 max-sm:grid-cols-2 mb-5 gap-3">
                        {arrPopularReload !== undefined && arrPopularReload.length !== 0 ? arrPopularReload.slice(0,8).map((item:{id:number, popularity: number; backdrop_path: string; original_title: string; genre_ids: []; })=> <SectionOneItem type="movie" key={item.id} arrId={arrGanre} arr={item}/> ) : null}				    
			    		{arrPopularReload !== undefined && arrPopularReload.length !== 0 && size !== null && size < 768 && size >= 640  ? arrPopularReload.slice(0,6).map((item:{id:number, popularity: number; backdrop_path: string; original_title: string; genre_ids: []; })=> <SectionOneItem type="movie" key={item.id} arrId={arrGanre} arr={item}/> ) : null}
			    		{arrPopularReload !== undefined && arrPopularReload.length !== 0 && size !== null && size < 640  ? arrPopularReload.slice(0,4).map((item:{id:number, popularity: number; backdrop_path: string; original_title: string; genre_ids: []; })=> <SectionOneItem type="movie" key={item.id} arrId={arrGanre} arr={item}/> ) : null}
			    		{arrPopularReload.length === 0  ? (<p className="text-white transition ease-in-out cursor-pointer font-bold text-[18px] max-xl:text-[15px] w-full">К сожалению нричего не найденно😔</p>): null}
			    	</div>
			    	<div className="flex items-center justify-center text-white">
			    	    <Pagination count={20} variant="text" onChange={handleChange} size="large" color="primary" />
			    	</div>
			    </section>
			    <section className="section4 mb-[65px]">
			        <h1 className="text-white font-black text-[65px] max-[1580px]:text-[50px] max-xl:text-[40px] max-sm:text-[32px] mb-[30px]">Популярные персоны</h1>
			    	<div className="grid grid-cols-3 max-lg:grid-cols-2 gap-5 max-md:gap-3">
			    		<Link href={{pathname:`/actor/&`, query:{id:popularPersonsArr[0]?.id}}}>
			    			<div className={"h-[444px] overflow-hidden relative max-xl:h-[300px] max-lg:h-[300px] max-md:h-[321px] max-sm:h-[250px] max-[425px]:h-[180px] py-3 px-4 rounded-xl w-full  bg-no-repeat bg-cover bg-center flex flex-col items-start justify-between"}>
			    			    {popularPersonsArr.length > 1 ? 
			    			        <img className="w-full h-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-[1]" src={`https://www.themoviedb.org/t/p/w220_and_h330_face/${popularPersonsArr[0].profile_path}`} alt="" />
			    			    :
			    			        null
			    		        }
                                <p className="text-[#F2F60F] text-[15px] max-lg:text-[12px] font-medium">1-е место</p>
			    			    <div className="flex flex-col justify-start">
                                    <h1 className="text-white text-[27px] max-lg:text-[20px] max-sm:text-[17px] font-bold max-[425px]:font-medium">{popularPersonsArr.length >0 ? popularPersonsArr[0].name : "loading..."}</h1>
			    			    </div>
			    		    </div>
			    		</Link>
                        <Link href={{pathname:`/actor/&`, query:{id:popularPersonsArr[1]?.id}}}>
                            <div className={`h-[444px] overflow-hidden relative max-xl:h-[300px] max-lg:h-[300px] max-md:h-[321px] max-sm:h-[250px] max-[425px]:h-[180px] py-3 px-4 rounded-xl w-full bg-no-repeat bg-cover bg-center flex flex-col items-start justify-between`}>
			    		        {popularPersonsArr.length > 1 ? 
			    			        <img className="w-full h-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-[1]" src={`https://www.themoviedb.org/t/p/w220_and_h330_face/${popularPersonsArr[1]?.profile_path}`} alt="" />
			    			    :
			    			        null
			    		        }
                                <p className="text-[#F2F60F] text-[15px] max-lg:text-[12px] font-medium">2-е место</p>
			    			    <div className="flex flex-col justify-start">
                                    <h1 className="text-white text-[27px] max-lg:text-[20px] max-sm:text-[17px] max-[425px]:text-[15px] font-bold max-[425px]:font-medium">{popularPersonsArr.length >1 ? popularPersonsArr[1].name : "loading..."}</h1>
			    			    </div>
			    		    </div>
			    		</Link>
			    		<div className="h-[444px] max-xl:h-[300px] max-lg:h-auto bg-[#1B2133] rounded-xl p-[30px] max-xl:p-4 max-lg:col-start-1 max-lg:col-end-3 overflow-hidden"> 
			    			<div className="mb-[14px] max-xl:mb-2">
			    				<Link href={{pathname:`/actor/&`, query:{id:popularPersonsArr[2]?.id}}}>
			    					<div className="flex justify-between gap-2 items-center mb-3 max-xl:mb-2">
			    				        {popularPersonsArr.length > 1 ? 
			    			                <img className="w-[60px] h-[80px] rounded-md" src={`https://www.themoviedb.org/t/p/w220_and_h330_face/${popularPersonsArr[2].profile_path}`} alt="" />
			    			                :
			    			                null
			    		                }
			    				        <p className="text-[20px] text-white font-bold max-xl:text-[15px]">{popularPersonsArr.length >1 ? popularPersonsArr[2].name : "loading..."}</p>
			    				        <p className="text-[15px] text-[#F2F60F] font-semibold">3-е место</p>
			    			        </div>
			    				</Link>
			    			    <hr className="border-2 border-[#1E2538]"/>
			    			</div>
                            <div className="mb-[14px] max-xl:mb-2">
			    			    <Link href={{pathname:`/actor/&`, query:{id:popularPersonsArr[3]?.id}}}>
			    					<div className="flex gap-2 justify-between items-center mb-3 max-xl:mb-2">
			    				        {popularPersonsArr.length > 1 ? 
			    			                <img className="w-[60px] h-[80px] rounded-md" src={`https://www.themoviedb.org/t/p/w220_and_h330_face/${popularPersonsArr[3].profile_path}`} alt="" />
			    			                :
			    			                null
			    		                }
			    				        <p className="text-[20px] text-white font-bold max-xl:text-[15px]">{popularPersonsArr.length > 1 ? popularPersonsArr[3].name : "loading..."}</p>
			    				        <p className="text-[15px] text-[#F2F60F] font-semibold">4-е место</p>
			    			        </div>
			    				</Link>
			    			    <hr className="border-2 border-[#1E2538]"/>
			    			</div>
			    			<div className="mb-[14px] max-xl:mb-2">
			    			   <Link href={{pathname:`/actor/&`, query:{id:popularPersonsArr[4]?.id}}}>
			    				    <div className="flex gap-2 justify-between items-center mb-3 max-xl:mb-2">
			    				        {popularPersonsArr.length > 1 ? 
			    			                <img className="w-[60px] h-[80px] rounded-md" src={`https://www.themoviedb.org/t/p/w220_and_h330_face/${popularPersonsArr[4]?.profile_path}`} alt="" />
			    			                :
			    			                null
			    		                }
			    				        <p className="text-[20px] text-white font-bold max-xl:text-[15px]">{popularPersonsArr.length > 1 ? popularPersonsArr[4]?.name : "loading..."}</p>
			    				        <p className="text-[15px] text-[#F2F60F] font-semibold">5-е место</p>
			    			        </div>
			    			   </Link>
			    			    <hr className="border-2 border-[#1E2538]"/>
			    			</div>
			    			<Link href={{pathname:`/actor/&`, query:{id:popularPersonsArr[5]?.id}}}>
			    				<div className="flex gap-2 justify-between items-center mb-3 max-xl:mb-2">
			    			        {popularPersonsArr.length > 1 ? 
			    			            <img className="w-[60px] h-[80px] rounded-md" src={`https://www.themoviedb.org/t/p/w220_and_h330_face/${popularPersonsArr[5].profile_path}`} alt="" />
			    			            :
			    			            null
			    		            }
			    			        <p className="text-[20px] text-white font-bold max-xl:text-[15px]">{popularPersonsArr.length > 1 ? popularPersonsArr[5].name : "loading..."}</p>
			    			 	    <p className="text-[15px] text-[#F2F60F] font-semibold">6-е место</p>
			    			    </div>
			    			</Link>
			    			
			    		</div>
			    	</div>
			    </section>
			    {/* <section className="section5 mb-[65px]">
			        <div className="flex items-center justify-between mb-[40px] max-sm:flex-col max-sm:gap-2 max-sm:mb-2">
			    		<h1 className="text-white font-black text-[65px] max-[1580px]:text-[50px] max-xl:text-[40px] max-sm:text-[32px]">Последние новости</h1>
			    		<div className="flex items-center gap-5 cursor-pointer">
			    			<p className="text-white text-[22px] max-xl:text-[18px] font-bold">Все новости</p>
			    			<BsArrowRight color="white" size={26}/>
			    		</div>
			    	</div>
			    	<div className="grid grid-cols-7 gap-4">
                        <div className={"col-start-1 col-end-6 max-xl:col-end-8 rounded-[10px] h-auto bg-cover relative overflow-hidden flex items-center justify-center"}>
                            <Image src={"/image/main/Фото.svg"} alt="" height={100} width={100} className={"w-full h-full"}/>
			    			<p className="absolute top-[40px] max-lg:top-[30px] left-[30px] max-lg:left-[25px] text-white text-[15px] font-bold">15 Апр 2020</p>
			    			<div className="absolute bottom-[40px] max-lg:bottom-[30px] left-[30px] max-lg:left-[25px] max-md:bottom-3 w-[80%]">
			    				<h1 className="text-white text-[45px] max-xl:text-[36px] max-md:text-[30px] max-[460px]:text-[20px] font-black">Не время умирать. Перенос релиза фильма  </h1>
			    				<p className="text-white text-[20px] max-xl:text-[18px] font-medium max-md:text-[16px] max-sm:hidden">Но действия представителей оппозиции в равной степени предоставлены сами себе. В рамках спецификации современных стандартов, стремящиеся вытеснить традиционное производство, нанотехнологии указаны как претенденты на роль ключевых факторов.</p>
			    			</div>
			    		</div>
			    		<div className="row-start-1 max-xl:row-start-2 max-xl:row-end-6 row-end-auto col-start-6 col-end-8 max-xl:col-start-1 max-xl:col-end-8 grid grid-rows-3 max-xl:grid-rows-none max-xl:grid-cols-3 max-sm:grid-cols-2 gap-3 px-[37px] max-2xl:px-[30px] max-xl:p-0">
                            <SectionFiveItem/>
                            <SectionFiveItem/>
                            <SectionFiveItem/>
			    		</div>
			    	</div>
			    </section> */}
        </AppLayout>
	)
}