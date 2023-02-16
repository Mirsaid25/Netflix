import SectionOneItem from "@/Components/index_child/sectionOneItem";
import AppLayout from "@/Layouts/AppLayout";
import { Inter } from "@next/font/google";
import {useState } from "react";
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
import { createTheme, Pagination } from '@mui/material';

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
    const [filterModalOne, setFilterModalOne] = useState(false)
    const [filterModalTwo, setFilterModalTwo] = useState(false)
	
	const size:number|null = useWindowSize().innerWidth


    return (
        <AppLayout>
			<section className="section1 flex flex-col justify-center mb-14 max-md:mb-6 max-sm:mb-8">
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
					<IoMdMenu color="white" onClick={()=> setFilterModalOne(true)} size={25} className="hidden max-sm:block cursor-pointer"/>
					{filterModalOne ? 
					    <div className="absolute top-0 right-0 backdrop-blur-xl p-3 border-2 border-white flex flex-col gap-2 rounded-md z-10">
					        <MdOutlineClose onClick={()=> setFilterModalOne(false)} size={25} className="absolute top-1 right-1 cursor-pointer" color="white"/>
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
                    
				</div>
				<button className="border-2 border-white px-11 max-lg:px-[34px] max-md:px-[32px] py-5 max-lg:py-[16px] max-md:py-[11px] rounded-xl text-white text-lg max-lg:text-base font-bold m-auto" title="Все новинки">Все новинки</button>
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
                    <video src="" className="w-full h-[800px] rounded-xl mb-5 max-xl:h-[511px] max-lg:h-[450px] max-md:h-[370px] max-sm:h-[250px] max-[425px]:h-[200px]" controls></video>
					<div className="flex items-center justify-between">
                        <h1 className="text-white text-[45px] max-lg:text-[35px] max-md:text-[30px] max-sm:text-[25px] font-black">Форсаж 9</h1>
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
                      slidesPerView={size !== null && size < 426 ? 2 : 4}
                      scrollbar={{ draggable:true }}
                    >
						<SwiperSlide>
                            <div className="w-full h-[250px] max-xl:h-[150px] max-lg:h-[135px] max-md:h-[110px] max-[640px]:h-[95px] max-sm:h-[130px] rounded-xl overflow-hidden mb-2 relative cursor-pointer"
                            >
                              <Image
                                src={"/image/main/image 4.svg"}
                                alt=""
                                width={100}
                                height={100}
                                className="w-full h-full"
                              />
                              <img
                                src={"/image/main/play_icon.svg"}
                                alt=""
                                className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-[35px] h-[35px] max-lg:w-[20px] max-lg:h-[20px] max-md:w-[16px] max-md:h-[16px] max-[226px]:h-[18px] max-[226px]:w-[18px]"
                              />
                            </div>
                            <p className="text-[20px] max-lg:text-[15px] max-md:text-[13px] font-black text-white">Чёрная Вдова</p>
                        </SwiperSlide>
						<SwiperSlide>
                            <div className="w-full h-[250px] max-xl:h-[150px] max-lg:h-[135px] max-md:h-[110px] max-[640px]:h-[95px] max-sm:h-[130px] rounded-xl overflow-hidden mb-2 relative cursor-pointer"
                            >
                              <Image
                                src={"/image/main/image 4.svg"}
                                alt=""
                                width={100}
                                height={100}
                                className="w-full h-full"
                              />
                              <img
                                src={"/image/main/play_icon.svg"}
                                alt=""
                                className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-[35px] h-[35px] max-lg:w-[20px] max-lg:h-[20px] max-md:w-[16px] max-md:h-[16px] max-[226px]:h-[18px] max-[226px]:w-[18px]"
                              />
                            </div>
                            <p className="text-[20px] max-lg:text-[15px] max-md:text-[13px] font-black text-white">Чёрная Вдова</p>
                        </SwiperSlide>
						<SwiperSlide>
                            <div className="w-full h-[250px] max-xl:h-[150px] max-lg:h-[135px] max-md:h-[110px] max-[640px]:h-[95px] max-sm:h-[130px] rounded-xl overflow-hidden mb-2 relative cursor-pointer"
                            >
                              <Image
                                src={"/image/main/image 4.svg"}
                                alt=""
                                width={100}
                                height={100}
                                className="w-full h-full"
                              />
                              <img
                                src={"/image/main/play_icon.svg"}
                                alt=""
                                className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-[35px] h-[35px] max-lg:w-[20px] max-lg:h-[20px] max-md:w-[16px] max-md:h-[16px] max-[226px]:h-[18px] max-[226px]:w-[18px]"
                              />
                            </div>
                            <p className="text-[20px] max-lg:text-[15px] max-md:text-[13px] font-black text-white">Чёрная Вдова</p>
                        </SwiperSlide>
						<SwiperSlide>
                            <div className="w-full h-[250px] max-xl:h-[150px] max-lg:h-[135px] max-md:h-[110px] max-[640px]:h-[95px] max-sm:h-[130px] rounded-xl overflow-hidden mb-2 relative cursor-pointer"
                            >
                              <Image
                                src={"/image/main/image 4.svg"}
                                alt=""
                                width={100}
                                height={100}
                                className="w-full h-full"
                              />
                              <img
                                src={"/image/main/play_icon.svg"}
                                alt=""
                                className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-[35px] h-[35px] max-lg:w-[20px] max-lg:h-[20px] max-md:w-[16px] max-md:h-[16px] max-[226px]:h-[18px] max-[226px]:w-[18px]"
                              />
                            </div>
                            <p className="text-[20px] max-lg:text-[15px] max-md:text-[13px] font-black text-white">Чёрная Вдова</p>
                        </SwiperSlide>
						<SwiperSlide>
                            <div className="w-full h-[250px] max-xl:h-[150px] max-lg:h-[135px] max-md:h-[110px] max-[640px]:h-[95px] max-sm:h-[130px] rounded-xl overflow-hidden mb-2 relative cursor-pointer"
                            >
                              <Image
                                src={"/image/main/image 4.svg"}
                                alt=""
                                width={100}
                                height={100}
                                className="w-full h-full"
                              />
                              <img
                                src={"/image/main/play_icon.svg"}
                                alt=""
                                className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-[35px] h-[35px] max-lg:w-[20px] max-lg:h-[20px] max-md:w-[16px] max-md:h-[16px] max-[226px]:h-[18px] max-[226px]:w-[18px]"
                              />
                            </div>
                            <p className="text-[20px] max-lg:text-[15px] max-md:text-[13px] font-black text-white">Чёрная Вдова</p>
                        </SwiperSlide>
						<SwiperSlide>
                            <div className="w-full h-[250px] max-xl:h-[150px] max-lg:h-[135px] max-md:h-[110px] max-[640px]:h-[95px] max-sm:h-[130px] rounded-xl overflow-hidden mb-2 relative cursor-pointer"
                            >
                              <Image
                                src={"/image/main/image 4.svg"}
                                alt=""
                                width={100}
                                height={100}
                                className="w-full h-full"
                              />
                              <img
                                src={"/image/main/play_icon.svg"}
                                alt=""
                                className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-[35px] h-[35px] max-lg:w-[20px] max-lg:h-[20px] max-md:w-[16px] max-md:h-[16px] max-[226px]:h-[18px] max-[226px]:w-[18px]"
                              />
                            </div>
                            <p className="text-[20px] max-lg:text-[15px] max-md:text-[13px] font-black text-white">Чёрная Вдова</p>
                        </SwiperSlide>
						<SwiperSlide>
                            <div className="w-full h-[250px] max-xl:h-[150px] max-lg:h-[135px] max-md:h-[110px] max-[640px]:h-[95px] max-sm:h-[130px] rounded-xl overflow-hidden mb-2 relative cursor-pointer"
                            >
                              <Image
                                src={"/image/main/image 4.svg"}
                                alt=""
                                width={100}
                                height={100}
                                className="w-full h-full"
                              />
                              <img
                                src={"/image/main/play_icon.svg"}
                                alt=""
                                className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-[35px] h-[35px] max-lg:w-[20px] max-lg:h-[20px] max-md:w-[16px] max-md:h-[16px] max-[226px]:h-[18px] max-[226px]:w-[18px]"
                              />
                            </div>
                            <p className="text-[20px] max-lg:text-[15px] max-md:text-[13px] font-black text-white">Чёрная Вдова</p>
                        </SwiperSlide>
                      ...
                </Swiper>
			</section>
			<section className="section2 mb-[65px]">
			    <div className="flex relative items-center justify-between gap-20 mb-10 max-lg:mb-5 max-sm:mb-3 max-2xl:flex-col max-2xl:items-start max-2xl:gap-1 max-sm:items-center max-sm:justify-center max-sm:flex-row max-sm:gap-4">
			    		<h1 className="text-white font-black text-[65px] max-[1580px]:text-[50px] max-xl:text-[40px] max-sm:text-[32px]">Популярные фильмы</h1>
			    		<AiOutlineMinus size={60} color="white" className="max-[1765px]:hidden"/>
			    		<div className="flex items-center gap-[25px] max-xl:gap-5 max-sm:hidden">
			    			<span className="text-white cursor-pointer font-bold text-[18px] max-xl:text-[15px]">Всё время</span>
			    			<span className="text-[grey] cursor-pointer font-bold text-[18px] max-xl:text-[15px]">2023</span>
			    			<span className="text-[grey] cursor-pointer font-bold text-[18px] max-xl:text-[15px]">2022</span>
			    			<span className="text-[grey] cursor-pointer font-bold text-[18px] max-xl:text-[15px]">2021</span>
			    			<span className="text-[grey] cursor-pointer font-bold text-[18px] max-xl:text-[15px]">2020</span>
			    			<span className="text-[grey] cursor-pointer font-bold text-[18px] max-xl:text-[15px]">2019</span>
			    			<span className="text-[grey] cursor-pointer font-bold text-[18px] max-xl:text-[15px]">2018</span>
			    		</div>
			    		<IoMdMenu color="white" onClick={()=> setFilterModalTwo(true)} size={25} className="hidden max-sm:block cursor-pointer"/>
			    		{filterModalTwo ? 
			    		    <div className="absolute top-0 right-0 backdrop-blur-xl p-5 pr-8 border-2 border-white flex flex-col gap-2 rounded-md z-10">
			    		        <MdOutlineClose onClick={()=> setFilterModalTwo(false)} size={25} className="absolute top-1 right-1 cursor-pointer" color="white"/>
			    		        <span className="text-white cursor-pointer font-bold text-[15px]">Всё</span>
			    		    	<span className="text-[grey] cursor-pointer font-bold text-[15px]">2023</span>
			    		    	<span className="text-[grey] cursor-pointer font-bold text-[15px]">2022</span>
			    		    	<span className="text-[grey] cursor-pointer font-bold text-[15px]">2021</span>
			    		    	<span className="text-[grey] cursor-pointer font-bold text-[15px]">2020</span>
			    		    	<span className="text-[grey] cursor-pointer font-bold text-[15px]">2019</span>
			    		    	<span className="text-[grey] cursor-pointer font-bold text-[15px]">2018</span>
			    		    </div> 
			    			: null
			    		}
				</div>
				<div className="flex justify-between mb-5 gap-3">
					<SectionOneItem/>
					<SectionOneItem/>
					<SectionOneItem/>
					<SectionOneItem/>
				</div>
				<div className="flex items-center justify-center">
				    <Pagination count={10} variant="text" size="large" color="primary" />
				</div>
			</section>
			<section>
			    <h1 className="text-white font-black text-[65px] max-[1580px]:text-[50px] max-xl:text-[40px] max-sm:text-[32px] mb-[30px]">Популярные персоны</h1>
				<div className="grid grid-cols-3 max-md:grid-cols-2 gap-5 max-md:gap-3">
                    <div className="h-[444px] max-xl:h-[300px] max-lg:h-[265px] max-md:h-[321px] max-sm:h-[250px] max-[425px]:h-[180px] py-3 px-4 rounded-xl w-full bg-[url('/image/main/opularPerson1.jpg')] bg-no-repeat bg-cover bg-center flex flex-col items-start justify-between">
                        <p className="text-[#F2F60F] text-[15px] max-lg:text-[12px] font-medium">1-е место</p>
						<div className="flex flex-col justify-start">
                            <h1 className="text-white text-[27px] max-lg:text-[20px] max-sm:text-[17px] font-bold max-[425px]:font-medium">Дженна Ортега</h1>
							<p className="text-[#5A5B5CFF] text-[27px] max-lg:text-[15px] max-[425px]:text-[11px] font-bold max-[425px]:font-semibold">Jenna Ortega</p>
							<span className="text-[#F2F60F] text-[15px] max-lg:text-[12px] max-[425px]:text-[10px] font-medium">20 лет</span>
						</div>
					</div>
					<div className="h-[444px] max-xl:h-[300px] max-lg:h-[265px] max-md:h-[321px] max-sm:h-[250px] max-[425px]:h-[180px] py-3 px-4 rounded-xl w-full bg-[url('/image/main/popularPerson2.jpg')] bg-no-repeat bg-cover bg-center flex flex-col items-start justify-between">
                        <p className="text-[#F2F60F] text-[15px] max-lg:text-[12px] font-medium">2-е место</p>
						<div className="flex flex-col justify-start">
                            <h1 className="text-white text-[27px] max-lg:text-[20px] max-sm:text-[17px] max-[425px]:text-[15px] font-bold max-[425px]:font-medium">Джейсон Стейтем</h1>
							<p className="text-[#5A5B5CFF] text-[27px] max-lg:text-[15px] max-[425px]:text-[11px] font-bold max-[425px]:font-semibold">Jason Statham</p>
							<span className="text-[#F2F60F] text-[15px] max-lg:text-[12px] max-[425px]:text-[10px] font-medium">52 года</span>
						</div>
					</div>
					<div className="h-[444px] max-xl:h-[300px] max-lg:h-[265px] max-md:h-auto bg-[#1B2133] rounded-xl p-[30px] max-xl:p-4 max-md:col-start-1 max-md:col-end-3 overflow-hidden">
						<div className="mb-[14px] max-xl:mb-2">
							<div className="flex justify-between items-center mb-3 max-xl:mb-2">
                                <div>
							    	<p className="text-[20px] text-white font-bold max-xl:text-[15px]">Ольга Павловец</p>
							    	<p className="text-[15px] text-[#3B486B] font-semibold max-xl:text-[11px]">Olga Pavlovets</p>
							    	<p className="text-[14px] text-[#F2F60F] max-xl:text-[11px]">41 лет</p>
							    </div>
							    <p className="text-[15px] text-[#F2F60F] font-semibold">3-е место</p>
						    </div>
						    <hr className="border-2 border-[#1E2538]"/>
						</div>
                        <div className="mb-[14px] max-xl:mb-2">
							<div className="flex justify-between items-center mb-3 max-xl:mb-2">
                                <div>
							    	<p className="text-[20px] text-white font-bold max-xl:text-[15px]">Павел Прилучный</p>
							    	<p className="text-[15px] text-[#3B486B] font-semibold max-xl:text-[11px]">Pavel Priluchnyy</p>
							    	<p className="text-[14px] text-[#F2F60F] max-xl:text-[11px]">35 лет</p>
							    </div>
							    <p className="text-[15px] text-[#F2F60F] font-semibold">4-е место</p>
						    </div>
						    <hr className="border-2 border-[#1E2538]"/>
						</div>
						<div className="mb-[14px] max-xl:mb-2">
							<div className="flex justify-between items-center mb-3 max-xl:mb-2">
                                <div>
							    	<p className="text-[20px] text-white font-bold max-xl:text-[15px]">Джеки Чан</p>
							    	<p className="text-[15px] text-[#3B486B] font-semibold max-xl:text-[11px]">Jackie Chan</p>
							    	<p className="text-[14px] text-[#F2F60F] max-xl:text-[11px]">68 лет</p>
							    </div>
							    	<p className="text-[15px] text-[#F2F60F] font-semibold">5-е место</p>
						    </div>
						    <hr className="border-2 border-[#1E2538]"/>
						</div>
						<div>
							<div className="flex justify-between items-center mb-3 max-xl:mb-2">
                                <div>
							    	<p className="text-[20px] text-white font-bold max-xl:text-[15px]">Шах Рукх Кхан</p>
							    	<p className="text-[15px] text-[#3B486B] font-semibold max-xl:text-[11px]">Shah Rukh Khan</p>
							    	<p className="text-[14px] text-[#F2F60F] max-xl:text-[11px]">57 лет</p>
							    </div>
							<p className="text-[15px] text-[#F2F60F] font-semibold">6-е место</p>
						    </div>
						</div>
					</div>
				</div>
			</section>
        </AppLayout>
  );
}