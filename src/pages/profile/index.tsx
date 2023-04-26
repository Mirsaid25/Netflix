import { SessionIdContext } from '@/Contexts/SessionIdContext';
import AppLayout from '@/Layouts/AppLayout';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react'
import { BsInstagram, BsTwitter, BsYoutube } from 'react-icons/bs';
import { FaFacebookF } from 'react-icons/fa';
import { APIkey } from '../_app';

// export const getServerSideProps: GetServerSideProps = async ({ query }) => {
// 	const token = query.request_token;	

// 	// const session = await fetch(
// 	// 	`https://api.themoviedb.org/3/authentication/session/new?api_key=${APIkey}`, {request_token: token}
// 	// );

//     // https://api.themoviedb.org/3/authentication/session/new?api_key=<<api_key>>
	
// 	return {
// 	  props: {
// 		token: token
// 	   },
// 	};
//   };

function index() {

	const [sectionInfo, setSectionInfo] = useState("home")

	const [sectionTreeFilter, setSectionTreeFilter] = useState(true)

	const [filterHandleType, setFilterHandleType] = useState(false)
	const [filterHandleGanre, setFilterHandleGanre] = useState(false)

	const {userInfo}:any = useContext(SessionIdContext)

    
  return (
	<AppLayout>
		<div className='w-full relative'>
            <div className='w-auto flex flex-col gap-2 absolute top-0 left-0'>
				<div 
				    onClick={(e)=> setSectionInfo("home")} 
					className={`${sectionInfo === "home" ? "bg-[#3657CB]": "bg-[#191E2E]"} flex items-center justify-center p-9 rounded-xl cursor-pointer shadow-md`}>
                        <Image src={"/icons/user/home-run (1) 1.svg"} alt="" width={30} height={30}/>
				</div>
				<div 
				    onClick={(e)=> setSectionInfo("like")} 
					className={`${sectionInfo === "like" ? "bg-[#3657CB]": "bg-[#191E2E]"} flex items-center justify-center p-9 rounded-xl cursor-pointer shadow-md`}>
                        <Image src={"/icons/user/review (1) 1.svg"} alt="" width={30} height={30}/>
				</div>
				<div 
				    onClick={(e)=> setSectionInfo("film")} 
					className={`${sectionInfo === "film" ? "bg-[#3657CB]": "bg-[#191E2E]"} flex items-center justify-center p-9 rounded-xl cursor-pointer shadow-md`}>
                        <Image src={"/icons/user/film 1.svg"} alt="" width={30} height={30}/>
				</div>
				{/* <div 
				    onClick={(e)=> setSectionInfo("person")} 
					className={`${sectionInfo === "person" ? "bg-[#3657CB]": "bg-[#191E2E]"} flex items-center justify-center p-9 rounded-xl cursor-pointer shadow-md`}>
                        <Image src={"/icons/user/famous (1) 1.svg"} alt="" width={30} height={30}/>
				</div> */}
			</div>
			<div className='w-[91%] min-h-[435px] bg-[#191E2E] rounded-xl shadow-md ml-[9%]'>
				{
					sectionInfo === "home" ? (
						<div className='w-full px-[45px] pt-[35px] pb-[60px]'>
					        <div className='w-full flex items-center justify-between mb-5'>
                                <h2 className='text-white text-[30px] font-black'>Ваш профиль</h2>
					        </div>
					        <div className='w-full flex gap-[30px]'>
                                <div className='w-[40%]'>
                                    <img src={`https://image.tmdb.org/t/p/w500/${userInfo.avatar.tmdb.avatar_path}`} alt="" className='w-full h-auto rounded-xl' />
					        	</div>
					        	<div className='w-1/2'>
                                    <h1 className='text-[50px] mb-2 text-white font-black'>{userInfo.name}</h1>
					        		<div className='flex items-center gap-3 mb-4'>
					        			<Link href={"#"}>
					        				<div className='w-8 h-8 flex items-center justify-center rounded-full bg-[#1E2538] border-[#2B354E] border-2'>
                                                <BsYoutube color="#8F929C"/>
					        			    </div>
					        			</Link>
					        			<Link href={"#"}>
					        				<div className='w-8 h-8 flex items-center justify-center rounded-full bg-[#1E2538] border-[#2B354E] border-2'>
                                                <BsInstagram color="#8F929C"/>
					        			    </div>
					        			</Link>
					        			<Link href={"#"}>
					        				<div className='w-8 h-8 flex items-center justify-center rounded-full bg-[#1E2538] border-[#2B354E] border-2'>
                                                <BsTwitter color="#8F929C"/>
					        			    </div>
					        			</Link>
					        			<Link href={"#"}>
					        				<div className='w-8 h-8 flex items-center justify-center rounded-full bg-[#1E2538] border-[#2B354E] border-2'>
                                                <FaFacebookF color="#8F929C"/>
					        			    </div>
					        			</Link>
					        		</div>
					        		<p className='text-white text-[17px] mb-5'>Учитывая ключевые сценарии поведения, базовый вектор развития, а также свежий взгляд на привычные вещи - безусловно открывает новые горизонты для поставленных обществом задач.</p>
					        		<table className="w-auto text-sm text-left text-gray-500">
                                        <tbody>
                                            <tr>
                                                <th className="py-4 text-[18px] font-bold text-white pr-10">
					        	    			    Пол:
                                                </th>
                                                <td className="py-4 text-[18px] text-[#F2F60F] ">
                                                    Мужской
                                                </td>
                                            </tr>
				                    		<tr>
                                                <th className="py-4 text-[18px] font-bold text-white pr-10">
                                                    День рождения:
                                                </th>
                                                <td className="py-4 text-[18px] text-[#F2F60F] ">
				                    			    01.10.2005
                                                </td>
                                            </tr>
					        	    		<tr>
                                                <th className="py-4 text-[18px] font-bold text-white pr-10">
					        	    			    Страна:
                                                </th>
                                                <td className="py-4 text-[18px] text-[#F2F60F] ">
				                    			    {userInfo.iso_3166_1}
                                                </td>
                                            </tr>
					        				<tr>
                                                <th className="py-4 text-[18px] font-bold text-white pr-10">
												    Пользовательская имя:
                                                </th>
                                                <td className="py-4 text-[18px] text-[#F2F60F] ">
				                    			    {userInfo.username}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
					        	</div>
					        </div>
				        </div>
					)
					:
					null
				}
                {
					sectionInfo === "like" ? (
						<div className='w-full px-[45px] pt-[35px] pb-[60px]'>
					        <div className='w-full flex justify-between mb-5 relative'>
                                <h2 className='text-white text-[30px] font-black'>Ваши оценки</h2>
								<div className='flex absolute right-0 top-0 gap-8'>
								    <div className={`${filterHandleType ? "h-fit" : "h-[60px] max-xl:h-[50px] max-lg:h-[45px] max-md:h-[40px] max-sm:h-[33px]"} w-auto shadow-md bg-[#1B2133] rounded-xl p-5 max-xl:p-4 max-lg:p-3 max-sm:p-2 overflow-hidden transition-all ease-in`}>
                                        <div onClick={()=> setFilterHandleType(!filterHandleType)} className='flex items-center justify-between gap-3 max-sm:gap-2 mb-5 max-md:mb-3 cursor-pointer'>
				                    		<p className='text-[white] text-[14px] max-md:text-[12px] font-semibold'>Фильмы</p>
				                    		<img src="/icons/filter_icon.svg" alt="" className={filterHandleType ? 'w-[11px] h-[11px] max-md:w-[9px] max-md:h-[9px]' :'w-[11px] h-[11px] max-md:w-[9px] max-md:h-[9px] rotate-180' } />
				                    	</div>
				                    	<div className='flex flex-col gap-3 max-md:gap-2'>
				                    		    <div className='flex items-center gap-2 max-md:gap-1'>
				                    		        <input  type="radio" defaultChecked name={"radio"} title={""} id="" 
				                    		    	   className='w-4 h-4 max-md:w-3 max-md:h-3 cursor-pointer'/>
                                                    <p className='text-white text-[15px]'>Фильмы</p>
				                    		    </div>
												<div className='flex items-center gap-2 max-md:gap-1'>
				                    		        <input  type="radio" name={"radio"} title={""} id="" 
				                    		    	   className='w-4 h-4 max-md:w-3 max-md:h-3 cursor-pointer'/>
                                                    <p className='text-white text-[15px]'>Сериалы</p>
				                    		    </div>
				                    	</div>
				                    </div>
									<div className={`${filterHandleGanre ? "h-fit" : "h-[60px] max-xl:h-[50px] max-lg:h-[45px] max-md:h-[40px] max-sm:h-[33px]"} w-auto shadow-md bg-[#1B2133] rounded-xl p-5 max-xl:p-4 max-lg:p-3 max-sm:p-2 overflow-hidden transition-all ease-in`}>
                                        <div onClick={()=> setFilterHandleGanre(!filterHandleGanre)} className='flex items-center justify-between gap-3 max-sm:gap-2 mb-5 max-md:mb-3 cursor-pointer'>
				                    		<p className='text-[white] text-[14px] max-md:text-[12px] font-semibold'>Жанры</p>
				                    		<img src="/icons/filter_icon.svg" alt="" className={filterHandleGanre ? 'w-[11px] h-[11px] max-md:w-[9px] max-md:h-[9px]' :'w-[11px] h-[11px] max-md:w-[9px] max-md:h-[9px] rotate-180' } />
				                    	</div>
				                    	<div className='flex flex-col gap-3 max-md:gap-2'>
				                    		<div className='flex items-center gap-2 max-md:gap-1'>
				                    		    <input  type="checkbox" name={""} title={""} id="" 
				                    			   className='w-4 h-4 max-md:w-3 max-md:h-3 cursor-pointer'/>
                                                <p className='text-white max-xl:text-[14px] max-[900px]:text-[12px] max-[500px]:text-[10px] font-medium'>wertyuiop</p>
				                    		</div>
				                    	</div>
				                    </div>
								</div>
					        </div>
					        <div className='w-full flex flex-col gap-2'>
							    {/* <ActorFilms/> */}
							</div>
				        </div>
					)
					:
					null
				}
				{
					sectionInfo === "film" ? (
						<div className='w-full px-[45px] pt-[35px] pb-[60px]'>
					        <div className='w-full flex items-center justify-between mb-5'>
                                <h2 className='text-white text-[30px] font-black'>Список любимых фильмов и сериалов</h2>
								<div className='flex items-center gap-3'>
									<p onClick={(e)=> setSectionTreeFilter(true)} className={`${sectionTreeFilter ? "text-white" : "text-[#696D77]"}  text-[18px] cursor-pointer font-bold`}>Фильмы</p>
									<p onClick={(e)=> setSectionTreeFilter(false)} className={`${!sectionTreeFilter ? "text-white" : "text-[#696D77]"} text-[18px] cursor-pointer font-bold`}>Сериалы</p>
								</div>
					        </div>
					        <div className='w-full flex flex-col gap-2'>
							    {/* <ActorFilms/> */}
					        </div>
				        </div>
					)
					:
					null
				}
			</div>
		</div>
	</AppLayout> 
  )
}

export default index