import React, {useEffect, useState } from "react";
import Header from "@/Components/Header";
import { BsArrowUp} from 'react-icons/bs'
import HeaderModal from "@/Components/headerModal";
import Foother from "@/Components/Foother";
import Link from "next/link";
import Preloader from "@/Components/Preloader";
import { IoMdSearch } from "react-icons/io";
import { MdClose } from "react-icons/md";
import ActorFilms from "@/Components/actor_childs/ActorFilmsComponent";
import axios from "axios";
import { APIkey } from "@/pages";
import SearchComponent from "@/Components/SearchComponent";
import { useForm, SubmitHandler } from "react-hook-form";

type AppLayoutProps = {
  children: React.ReactNode;
};

type Inputs = {
	value: string,
	exampleRequired: string,
  };

const AppLayout = ({ children }: AppLayoutProps) => {
    const [modalHandle, setModalHandle] = useState<boolean>(false)
    const [loading, setLoading] = useState(false)

    const [searchHandle, setSearchHandle] = useState(false)
    const [searchArrPerson, setSearchArrPerson] = useState([])
    const [searchArrMovie, setSearchArrMovie] = useState([])
    const [searchArrTV, setSearchArrTV] = useState([])

    useEffect(()=>{
        setTimeout(()=> setLoading(true) , 3000)
    }, [])

	const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = data => {
		axios.get(`https://api.themoviedb.org/3/search/multi?api_key=${APIkey}&language=en-US&query=${data.value}&page=1&include_adult=false`)
		    .then(res => {
				if(res.status === 200 || res.status === 201){
					setSearchArrPerson(
						res?.data?.results?.filter((item: any)=>{
						    if(item?.media_type === "person"){
						    	return item
						    }
					    })
					)
					setSearchArrMovie(
						res?.data?.results.filter((item: any)=>{
						    if(item?.media_type === "movie"){
						    	return item
						    }
					    })
					)
					setSearchArrTV(
						res?.data?.results.filter((item: any)=>{
						    if(item?.media_type === "tv"){
						    	return item
						    }
					    })
					)
				}
			})
	};
	
  return (
	<>
        {
		    loading? (
            <div className="w-[75%] max-lg:w-[80%] max-md:w-[90%] content-center m-auto mt-7" id="toStart">
	        	<Header setModalHandle={setModalHandle} setSearchHandle={setSearchHandle}/>
                <main className="my-[50px] max-lg:my-[32px] max-sm:my-[26px]">{children}</main>
	        	<Foother/>
	        	{modalHandle? <HeaderModal setModalHandle={setModalHandle}/> : null}
                <Link href="#toStart">
	        	    <div className="toTopIcon z-50 w-[73px] h-[73px] max-xl:w-[50px] max-xl:h-[50px] max-lg:w-[45px] max-lg:h-[45px] max-md:w-[40px] max-md:h-[40px] max-sm:w-[30px] max-sm:h-[30px] bg-[#100F14] rounded-xl max-md:rounded-md flex items-center justify-center fixed bottom-11 right-11 max-xl:bottom-8 max-xl:right-8 max-lg:bottom-5 max-lg:right-5 max-md:bottom-3 max-md:right-3 max-sm:bottom-2 max-sm:right-2 cursor-pointer">
	        	    	<BsArrowUp color="white" className="w-[35px] h-[35px] max-xl:w-[25px] max-xl:h-[25px] max-lg:w-[22px] max-lg:h-[22px] max-md:w-[20px] max-md:h-[20px] max-sm:w-[16px] max-sm:h-[16px]"/>
	        	    </div>
                </Link>
            </div>
		    )
		    :
		    (<Preloader/>)
		}
		{
			searchHandle ? (
				<div className='absolute left-0 top-0 z-10 w-full h-fit backdrop-blur-sm '>
			        <div className="contener relative w-[70%] h-full m-auto pt-10">
                        <div className="">
							<form onSubmit={handleSubmit(onSubmit)}>
						        <div className="bg-white rounded-xl p-[10px] pl-5 flex items-center justify-between gap-5 mb-5">
                                    <input {...register("value")} type="text" className="h-10 w-full text-[20px] font-medium outline-none"/>
			        		        <button type="submit" title="search" className="w-[55px] h-[55px] bg-[#F2F60F] rounded-[10px] items-center justify-center cursor-pointer hidden xl:flex">
                                        <IoMdSearch size={30} color="#000000"/>
			                        </button>
							        <MdClose onClick={()=> setSearchHandle(false)} size={40} className="cursor-pointer"/>
			                    </div>
							</form>
						    <div className="flex flex-col gap-5 overflow-hidden">
								{
									searchArrMovie.length > 0 ? (
                                        <div className="rounded-xl border-2 border-white bg-[#1E2538] overflow-hidden">
								        	<p className="text-white text-[22px] ml-3 mt-3 font-semibold">Фильмы</p>
								        	{
							                    searchArrMovie.map((item:any)=> <SearchComponent key={item.id} type={"movie"} data={item}/>)
							                }
								        </div>
									):null
								}
								{
									searchArrPerson.length > 0 ? (
                                        <div className="rounded-xl border-2 border-white bg-[#1E2538] overflow-hidden">
								        	<p className="text-white text-[22px] ml-3 mt-3 font-semibold">Актёры</p>
								        	{
							                    searchArrPerson.map((item:any)=> <SearchComponent key={item.id} type={"actor"} data={item}/>)
							                }
								        </div>
									):null
								}
								{
									searchArrTV.length > 0 ? (
                                        <div className="rounded-xl border-2 border-white bg-[#1E2538] overflow-hidden">
								        	<p className="text-white text-[22px] ml-3 mt-3 font-semibold">Сериалы</p>
								        	{
							                    searchArrTV.map((item:any)=> <SearchComponent key={item.id} type={"tv"} data={item}/>)
							                }
								        </div>
									):null
								}
						    </div>
						</div>
			        </div>
                </div>
			)
			:
			null
		}
        
	</>
    
  );
};

export default AppLayout;
