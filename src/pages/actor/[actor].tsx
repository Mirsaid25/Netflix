import AppLayout from '@/Layouts/AppLayout'
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import React from 'react'
import { Doughnut } from 'react-chartjs-2';
import { AiFillDislike, AiFillLike } from 'react-icons/ai';
import { BsChevronRight } from 'react-icons/bs';
import { FaHeart } from 'react-icons/fa';
import { APIkey } from '..';

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
	const router = query.id;

	const res = await fetch(
		`https://api.themoviedb.org/3/person/${router}?api_key=${APIkey}&language=en-US`
	);
	

    const data = await res.json();

	return {
	    props: {
		    data:data
	    },
	};
};

const actor = ({data}:any) => {
	console.log(data);
	
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
						<Link href={"/"}>
                            <span className="text-[#4F5B7C] font-semibold max-lg:font-medium">Актёры </span>
						</Link>
						<BsChevronRight color="#4F5B7C"/>
						<p className="text-white font-semibold max-lg:font-medium">{data?.name}</p>
					</div>
					<h1 className="text-white text-[65px] max-xl:text-[40px] font-black">{data?.name}</h1>
					<div className="w-[100px] h-[100px] max-xl:w-[70px] max-xl:h-[70px] relative flex flex-col items-center gap-2 mb-10">
						<p className="text-white font-bold absolute top-[55%] left-1/2 -translate-x-1/2 -translate-y-1/2">{Math.floor(data?.vote_average *10) }</p>
						<span className="text-white max-xl:text-[15px] font-bold">Netflix</span>
					</div>
					<p className="text-white font-medium text-[20px] max-xl:text-[15px] mb-[30px] max-xl:mb-5">
						{data?.overview}
					</p>
					<Link href="#trailerBlock">
					    <div className="w-fit border-4 border-white rounded-xl flex items-center gap-4 justify-center px-[35px] max-xl:px-[30px] py-5 max-xl:py-[17px] cursor-pointer">  
					    	{/* <Image src={"/icons/play-icon.svg"} width={20} height={20 } className="max-xl:w-[15px] max-xl:h-[15px]" alt=""/> */}
					    	<p className="text-white text-[18px] max-xl:text-[15px] font-bold">Смотреть трейлер</p>
					    </div>
					</Link>
				</div>
			</div>
		</section>
    </AppLayout>
  )
}

export default actor