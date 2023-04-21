import AppLayout from "@/Layouts/AppLayout";
import React, { useState } from "react";
import Link from "next/link";
import { BsArrowRight, BsChevronRight } from "react-icons/bs";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import Image from "next/image";
import { AiFillDislike, AiFillLike } from "react-icons/ai";
import {FaHeart } from "react-icons/fa";
import { GetServerSideProps } from "next";
import { APIkey } from "../_app"; 
import Actiors from "@/Components/[indexId]_child/Actior";
import { Swiper, SwiperSlide } from 'swiper/react'; 
import {Scrollbar } from "swiper";
import useWindowSize from "@rooks/use-window-size";
import SectionOneItem from "@/Components/index_child/sectionOneItem";
import { useRouter } from "next/router";
ChartJS.register(ArcElement, Tooltip, Legend);

type moveInfoT = {
  backdrop_path: string;
  id: number;
  original_title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  production_countries: [{ name: string }];
  genres: [{ name: string }];
};

type moveCrewT = {
  cast: [
    {
      name: string;
      profile_path: string;
      known_for_department: string;
    }
  ];
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
	const router = query.id;

	const res = await fetch(
	  `https://api.themoviedb.org/3/tv/${router}?api_key=${APIkey}&page=1&`
	);
	const res2 = await fetch(
	  `https://api.themoviedb.org/3/tv/${router}/credits?api_key=${APIkey}&language=en-US`,
	)

	const res3 = await fetch(
		`https://api.themoviedb.org/3/tv/${router}/videos?api_key=${APIkey}&language=en-US`,
	  )

	const res4 = await fetch(
		`https://api.themoviedb.org/3/tv/${router}/similar?api_key=${APIkey}&language=en-US&page=1`,
	)

	const res5 = await fetch(
		`https://api.themoviedb.org/3/genre/tv/list?api_key=${APIkey}&language=en-US`,
	)

	const data = await res.json();
	const  crew = await res2.json();
	const  tralerKeys = await res3.json();
	const  similar = await res4.json();
	const  ganreArr = await res5.json();


	// 
	return {
	  props: {
		 data: data,
		 crew: crew,
		 tralerKeys: tralerKeys,
		 similar: similar?.results,
		 ganreArr: ganreArr?.genres
	   },
	};
  };

const indexid = ({data , crew, tralerKeys, similar, ganreArr}: any) => {	

	console.log();

	const [like, setLike] = useState(false)

    const tralerKey = tralerKeys?.results?.filter((item: any) => {
		if(item?.type === "Trailer"){
		    return item	
		}
	})


	// chart reating
	const data1 = {
		value: 30,
		datasets: [
		  {
			label: "",
			data: [data.vote_average, 10 - data.vote_average],
			backgroundColor: [
				data.vote_average < 5 ? "red" : "rgba(137, 203, 54, 1)",
				data.vote_average < 5 ? "#FF6C6CFF" :"rgba(137, 203, 54, 0.3)",
			],
			borderColor: "transparent",
			hoverOffset: 2,
		  },
		],
	  };

	const options = {
		cutoutPercentage: 88,
		animation: {
		  animationRotate: true,
		  duration: 2000,
		},
		legend: {
		  display: false,
		},
		tooltips: {
		  enabled: false,
		},
	  };
	//  *

	const size:number|null = useWindowSize().innerWidth

	function likeClick(){
		setLike(!like)
	}

	const actiorArr = crew?.cast?.filter((item:any)=>{
		if(item?.known_for_department === "Acting"){
			return item
		} 
	  })

  return (
    <AppLayout>
		<div className="absolute top-0 left-0 w-full h-[130%] overflow-hidden -z-[1]">
            <img src={`https://www.themoviedb.org/t/p/w220_and_h330_face/${data?.backdrop_path}`} className="w-full -z-[3] absolute -top-[30%] left-1/2 -translate-x-1/2" alt="" />
            <div className="w-full -z-[2] h-[100%] bg-gradient-to-t backdrop-blur-sm  from-[#1E2538FF] to-transparent"></div>
		</div>
        <section className="section1 flex flex-col items-start w-[80%] m-auto justify-center mb-[75px] max-xl:mb-[50px] max-lg:mb-[45px]">
			<div className="flex justify-between gap-[50px] mb-5">
                <img src={data?.poster_path !== undefined ? `https://www.themoviedb.org/t/p/w220_and_h330_face/${data?.poster_path}` : "/image/[indexId]/posterError.svg"} alt="" 
				    className="w-[400px] h-[550px] max-lg:w-[300px] max-lg:h-[400px] max rounded-xl " />
				<div className="flex flex-col items-start w-full">
                    <div className="flex items-center gap-2 mb-1">
						<Link href={"/"}>
                            <span className="text-[#4F5B7C] font-semibold max-lg:font-medium">Главная </span>
						</Link>
						<BsChevronRight color="#4F5B7C"/>
						<Link href={"/"}>
                            <span className="text-[#4F5B7C] font-semibold max-lg:font-medium">Фильмы </span>
						</Link>
						<BsChevronRight color="#4F5B7C"/>
						<p className="text-white font-semibold max-lg:font-medium">{data?.name}</p>
					</div>
					<h1 className="text-white text-[65px] max-xl:text-[40px] font-black">{data?.name}</h1>
					<div className="w-[100px] h-[100px] max-xl:w-[70px] max-xl:h-[70px] relative flex flex-col items-center gap-2 mb-10">
					    <Doughnut
                            data={data1}
                            options={options}
                         ></Doughnut>
						<p className="text-white font-bold absolute top-[55%] left-1/2 -translate-x-1/2 -translate-y-1/2">{Math.floor(data?.vote_average *10) }</p>
						<span className="text-white max-xl:text-[15px] font-bold">Netflix</span>
					</div>
					<p className="text-white font-medium text-[20px] max-xl:text-[15px] mb-[30px] max-xl:mb-5">
						{data?.overview}
					</p>
				</div>
			</div>
			<div className="flex items-center justify-start gap-5 mb-10">
				<div className="p-5 max-xl:p-4 rounded-xl max-xl:rounded-[10px] bg-[#1B2133] cursor-pointer">
					<AiFillLike color="white" size={26} className="max-lg:w-[17px] max-lg:h-[17px] max-md:w-[13px] max-md:h-[13px] "/>
				</div>
				<div className="p-5 max-xl:p-4 rounded-xl max-xl:rounded-[10px] bg-[#1B2133] cursor-pointer">
					<AiFillDislike color="white" size={26} className="max-lg:w-[17px] max-lg:h-[17px] max-md:w-[13px] max-md:h-[13px] "/>
				</div>
				<div className="h-[64px] max-xl:h-[52px] w-[300px] max-xl:w-[200px] rounded-xl bg-[#1B2133] relative">
					<p className="text-[14px] text-white font-light text-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">{`Рейтинг ожиданий ${(data.vote_average * 10).toFixed()}%`}</p>
					<div className={`bg-[#2E6125] w-[${data.vote_average * 10}%] h-full rounded-xl`}></div>
				</div>
				<div onClick={likeClick} className="p-5 max-xl:p-4 rounded-xl max-xl:rounded-[10px] bg-[#1B2133] cursor-pointer">
					<FaHeart color={like ?"red" : "white"} size={26} className="max-lg:w-[17px] max-lg:h-[17px] max-md:w-[13px] max-md:h-[13px] "/>
				</div>
			</div>
            <div className="relative flex w-full justify-between gap-[60px]">
                <table className="w-full text-sm text-left text-gray-500">
                    <tbody>
                        <tr>
                            <th className="py-4 text-[18px] font-medium text-white pr-10">
                                Год:
                            </th>
                            <td className="py-4 text-[18px] font-medium text-[#F2F60F] ">
                                {data?.first_air_date !== undefined ? data?.first_air_date : "null" }
                            </td>
                        </tr>
						<tr>
                            <th className="py-4 text-[18px] font-medium text-white pr-10">
                                Страна:
                            </th>
                            <td className="py-4 text-[18px] font-medium text-[#F2F60F] ">
                                {data?.origin_country[0]  !== undefined ? data?.origin_country[0] : "null"}
                            </td>
                        </tr>
						<tr>
                            <th className="py-4 text-[18px] font-medium text-white pr-10">
                                Слоган:
                            </th>
                            <td className="py-4 text-[18px] font-medium text-[#F2F60F] ">
							    {data?.tagline !== undefined && data?.tagline.length > 0 ? data?.tagline : "null" }
                            </td>
                        </tr>
                    </tbody>
                </table>
				<table className="w-full text-sm text-left text-gray-500">
                    <tbody>
						<tr>
                            <th className="py-4 text-[18px] font-medium text-white pr-10">
							    Режиссер:
                            </th>
                            <td className="py-4 text-[18px] font-medium text-[#F2F60F] ">
                                {data?.created_by !== null  && data?.created_by.length>0  ? data?.created_by?.at(-1)?.name : null }
                            </td>
                        </tr>
						<tr>
                            <th className="py-4 text-[18px] font-medium text-white pr-10">
							    Жанр:
                            </th>
                            <td className="py-4 text-[18px] font-medium text-[#F2F60F] ">
							    {data?.genres?.at(1)?.name !== undefined ? data?.genres?.at(1)?.name : "null" }
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
		</section>
		{
			actiorArr.length > 0 ? (
				<section className="section2 mb-[75px] max-xl:mb-[50px] max-lg:mb-[45px]">
		            <div className="flex items-center justify-between mb-[40px] max-sm:flex-col max-sm:gap-2 max-sm:mb-2">
		        		<h1 className="text-white font-black text-[65px] max-[1580px]:text-[50px] max-xl:text-[40px] max-sm:text-[32px]">В главных ролях:</h1>
						<Link href={"/actor"}>
		        		    <div className="flex items-center gap-5 cursor-pointer">
		        		    	<p className="text-white text-[22px] max-xl:text-[18px] font-bold">Все актёры</p>
		        		    	<BsArrowRight color="white" size={26}/>
		        		    </div>
						</Link>
		        	</div>
                    <div className="grid grid-cols-5 max-xl:grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 gap-12 max-xl:gap-[40px]">
		        		{actiorArr?.slice(0 , 10)?.map((item:any)=> <Actiors data={item}/>)}
		        	</div>
		        </section>
			)
			:
			null
		}
        
		{similar.length > 0 ? 
			<section className="section4 mb-[75px] max-xl:mb-[50px] max-lg:mb-[45px]">
		    <div className="flex justify-center mb-[40px] max-sm:mb-2">
				<h1 className="text-white font-black text-[65px] max-[1580px]:text-[50px] max-xl:text-[40px] max-sm:text-[32px]">Похожие фильмы:</h1>
			</div>
			<Swiper
				  modules={[Scrollbar]}
                  spaceBetween={20}
                  slidesPerView={size !== null && size < 600 ? 3 : 5}
                  scrollbar={{ draggable:true }}
                >
					{similar?.map((item: any)=> (
						<SwiperSlide key={item.id} 
						>
							<SectionOneItem key={item.id} arr={item} type="tv" arrId={ganreArr}/> 
                        </SwiperSlide>
					))}
                  ...
            </Swiper>
		    </section>
		: 
			null
		}
    </AppLayout>
  );
};

export default indexid;
