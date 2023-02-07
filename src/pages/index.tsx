import SectionOneItem from "@/Components/index_child/sectionOneItem";
import AppLayout from "@/Layouts/AppLayout";
import { Inter } from "@next/font/google";
import { useState } from "react";
import { AiOutlineMinus } from 'react-icons/ai';
import { IoMdMenu } from "react-icons/io";
import { MdOutlineClose } from "react-icons/md";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
    const [filterModal, setFilterModal] = useState(false)

    return (
        <AppLayout>
			<section className="flex flex-col justify-center">
				<div className="flex relative items-center justify-between gap-20 mb-10 max-lg:mb-5 max-sm:mb-3 max-2xl:flex-col max-2xl:items-start max-2xl:gap-1 max-sm:items-center max-sm:justify-center max-sm:flex-row max-sm:gap-4">
					<h1 className="text-white font-black text-[65px] max-[1580px]:text-[50px] max-xl:text-[40px] max-sm:text-[32px]">Сейчас в кино</h1>
					<AiOutlineMinus size={60} color="white" className="max-[1765px]:hidden"/>
					<div className="flex items-center gap-[25px] max-xl:gap-5 max-sm:hidden">
						<span className="text-white cursor-pointer font-bold text-[18px] max-xl:text-[15px]">Все</span>
						<span className="text-[grey] cursor-pointer font-bold text-[18px] max-xl:text-[15px]">Боевики</span>
						<span className="text-[grey] cursor-pointer font-bold text-[18px] max-xl:text-[15px]">Приключения</span>
						<span className="text-[grey] cursor-pointer font-bold text-[18px] max-xl:text-[15px]">Комедии</span>
						<span className="text-[grey] cursor-pointer font-bold text-[18px] max-xl:text-[15px]">Фантастика</span>
						<span className="text-[grey] cursor-pointer font-bold text-[18px] max-xl:text-[15px]">Триллеры</span>
						<span className="text-[grey] cursor-pointer font-bold text-[18px] max-xl:text-[15px]">Драма</span>
					</div>
					<IoMdMenu color="white" onClick={()=> setFilterModal(true)} size={25} className="hidden max-sm:block cursor-pointer"/>
					{filterModal ? 
					    <div className="absolute top-0 right-0 backdrop-blur-xl p-3 border-2 border-white flex flex-col gap-2 rounded-md z-10">
					        <MdOutlineClose onClick={()=> setFilterModal(false)} size={25} className="absolute top-1 right-1 cursor-pointer" color="white"/>
					        <span className="text-white cursor-pointer font-bold text-[15px]">Все</span>
					    	<span className="text-[grey] cursor-pointer font-bold text-[15px]">Боевики</span>
					    	<span className="text-[grey] cursor-pointer font-bold text-[15px]">Приключения</span>
					    	<span className="text-[grey] cursor-pointer font-bold text-[15px]">Комедии</span>
					    	<span className="text-[grey] cursor-pointer font-bold text-[15px]">Фантастика</span>
					    	<span className="text-[grey] cursor-pointer font-bold text-[15px]">Триллеры</span>
					    	<span className="text-[grey] cursor-pointer font-bold text-[15px]">Драма</span>
					    </div> 
						: null
					}
				</div>
				<div className="w-full grid grid-cols-4 max-[830px]:grid-cols-3 max-sm:grid-cols-2 gap-5 mb-[50px] max-lg:mb-[40px] max-md:mb-[30px] max-sm:mb-5">
                    <SectionOneItem/>
                    <SectionOneItem/>
                    <SectionOneItem/>
                    <SectionOneItem/>
                    <SectionOneItem/>
                    <SectionOneItem/>
                    <SectionOneItem/>
                    <SectionOneItem/>
				</div>
				<button className="border-2 border-white px-11 max-lg:px-[34px] max-md:px-[32px] py-5 max-lg:py-[16px] max-md:py-[11px] rounded-xl text-white text-lg max-lg:text-base font-bold m-auto" title="Все новинки">Все новинки</button>
			</section>
        </AppLayout>
  );
}
