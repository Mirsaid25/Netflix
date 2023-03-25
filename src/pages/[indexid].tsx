import AppLayout from "@/Layouts/AppLayout";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Link from "next/link";
import { BsArrowRight, BsChevronRight } from "react-icons/bs";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import Image from "next/image";
import { AiFillDislike, AiFillLike } from "react-icons/ai";
import { GetServerSideProps } from "next";
import { APIkey } from ".";
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
	  `https://api.themoviedb.org/3/movie/${router}?api_key=${APIkey}&page=1&`
	);
	const res2 = await fetch(
	  `https://api.themoviedb.org/3/movie/${router}/credits?api_key=${APIkey}&language=ru-RU`,
	)

	const res3 = await fetch(
		`https://api.themoviedb.org/3/movie/${router}/videos?api_key=${APIkey}&language=en-US`,
	  )



	const data = await res.json();
	const  crew = await res2.json();
	const  tralerKeys = await res3.json();



	return {
	  props: {
		 data: data,
		 crew: crew,
		 tralerKeys: tralerKeys
	   },
	};
  };

const indexid = ({data , crew, tralerKeys}: any) => {	
	console.log(tralerKeys);

    const tralerKey = tralerKeys.results.filter((item: any) => {
		if(item.type === "Trailer"){
		    return item	
		}
	})

	
  return (
    <AppLayout>
		<div className="absolute top-0 left-0 w-full h-[150%] overflow-hidden -z-[1]">
            <img src={`https://www.themoviedb.org/t/p/w220_and_h330_face/${data?.backdrop_path}`} className="w-full -z-[3] absolute -top-[30%] left-1/2 -translate-x-1/2" alt="" />
            <div className="w-full -z-[2] h-[100%] bg-gradient-to-t backdrop-blur-sm opacity-95 from-[#1E2538FF] to-transparent"></div>
		</div>
        <section className="section1 flex flex-col items-center justify-center mb-[75px]">
			<div className="w-[80%] bg-[red] flex justify-between gap-5">
                <img src={''} alt="" className="bg-[green] w-[400px] h-[500px] rounded-xl" />
			</div>
		</section>
        <section className="section2 mb-[75px]">
				<div className="flex items-center justify-between mb-[40px] max-sm:flex-col max-sm:gap-2 max-sm:mb-2">
					<h1 className="text-white font-black text-[65px] max-[1580px]:text-[50px] max-xl:text-[40px] max-sm:text-[32px]">Трейлер фильма</h1>
					<div className="flex items-center gap-5 cursor-pointer">
						<p className="text-white text-[22px] max-xl:text-[18px] font-bold">Все трейлеры</p>
						<BsArrowRight color="white" size={26}/>
					</div>
				</div>
				<div className="mb-[50px] max-lg:mb-[30px] max-md:mb-[25px] max-sm:mb-[20px]">
					<iframe title="trailer" src={`https://www.youtube.com/embed/${tralerKey.at(-1).key}`} frameBorder="0" className="w-full h-[800px] rounded-xl mb-5 max-xl:h-[511px] max-lg:h-[450px] max-md:h-[370px] max-sm:h-[250px] max-[425px]:h-[200px]"></iframe>
					<div className="flex items-center justify-between">
                        <h1 className="text-white text-[45px] max-lg:text-[35px] max-md:text-[30px] max-sm:text-[25px] font-black">{data.title}</h1>
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
		</section>
    </AppLayout>
  );
};

export default indexid;
