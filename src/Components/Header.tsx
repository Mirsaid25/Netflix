import Image from 'next/image'
import Link from 'next/link'
import React, { SetStateAction } from 'react'
import { BsInstagram } from 'react-icons/bs'
import { FaFacebookF, FaTwitter } from 'react-icons/fa'
import { IoMdMenu, IoMdSearch} from 'react-icons/io'
import { SlSocialVkontakte } from 'react-icons/sl'

type HeadeerProps = {
    setModalHandle: React.Dispatch<SetStateAction<boolean>>
}

const Header=({setModalHandle}:HeadeerProps)=> {
  return (
    <header className="flex w-full items-center max-xl:items-start max-[515px]:items-center justify-between backdrop-blur-md">
            <div className='flex flex-col gap-[10px] items-center max-[515px]:flex-row'>
                <Link href={"/"} className="hidden xl:block">
                    <Image
                      src="/image/header/Netflix_logo.svg.png"
                      alt="Picture of the author"
                      width={130} 
                      height={30}
                    />
                </Link>
                <div className="items-center gap-3 hidden xl:flex">
                    <Link href={"/"}><BsInstagram size={20} color="#3C4767FF"/></Link>
				    <Link href={"/"}><FaTwitter size={20} color="#3C4767FF"/></Link>
                    <Link href={"/"}><FaFacebookF size={20} color="#3C4767FF"/></Link>
				    <Link href={"/"}><SlSocialVkontakte size={20} color="#3C4767FF"/></Link>
                </div>
                <div onClick={()=>setModalHandle(true)} className="flex bg-white rounded-[10px] w-[33px] h-[33px] max-[426px]:h-[27px] max-[426px]:w-[27px] items-center justify-center min-[515px]:hidden cursor-pointer">
                    <IoMdMenu size={22} color="#3657CB"/>
			    </div>
                <div className="w-[41px] h-[41px] max-md:w-[39px] max-md:h-[39px] max-sm:h-[33px] max-sm:w-[33px] max-[426px]:h-[27px] max-[426px]:w-[27px] bg-white rounded-[10px] items-center justify-center cursor-pointer flex xl:hidden">
                    <IoMdSearch size={22} className="max-md:w-[20px] max-md:h-[20px] max-sm:w-[17px] max-sm:h-[17px]" color="#3657CB"/>
			    </div>
            </div>
            <div className="flex flex-col gap-5">
                <div className='flex flex-col gap-[10px] items-center xl:hidden'>
                    <Link href={"/"}>
                        <Image
                          src="/image/header/Netflix_logo.svg.png"
                          alt="Picture of the author"
                          width={95} 
                          height={24}
                          className="w-[85px] lg:w-[95px]"
                        />
                    </Link>
                    <div className="items-center gap-3 flex">
                        <Link href={"/"}><BsInstagram size={17} color="#3C4767FF"/></Link>
			    	    <Link href={"/"}><FaTwitter size={17} color="#3C4767FF"/></Link>
                        <Link href={"/"}><FaFacebookF size={17} color="#3C4767FF"/></Link>
			    	    <Link href={"/"}><SlSocialVkontakte size={17} color="#3C4767FF"/></Link>
                    </div>
                </div>
                <div className="flex items-center gap-10 max-xl:gap-8 max-lg:gap-6 max-md:gap-4 max-sm:gap-2 max-[515px]:hidden">
                    <Link href="/movie"><p className="text-white text-[17px] max-lg:text-[13px] max-md:text-[12px] font-bold  max-md:font-semibold leading-5">Афиша</p></Link>
                    <Link href="#"><p className="text-white text-[17px] max-lg:text-[13px] max-md:text-[12px] font-bold  max-md:font-semibold leading-5">Медиа</p></Link>
                    <Link href="#"><p className="text-white text-[17px] max-lg:text-[13px] max-md:text-[12px] font-bold  max-md:font-semibold leading-5">Фильмы</p></Link>
                    <Link href="#"><p className="text-white text-[17px] max-lg:text-[13px] max-md:text-[12px] font-bold  max-md:font-semibold leading-5">Актёры </p></Link>
                    <Link href="#"><p className="text-white text-[17px] max-lg:text-[13px] max-md:text-[12px] font-bold  max-md:font-semibold leading-5">Новости</p></Link>
                    <Link href="#"><p className="text-white text-[17px] max-lg:text-[13px] max-md:text-[12px] font-bold  max-md:font-semibold leading-5">Подборки</p></Link>
                    <Link href="#"><p className="text-white text-[17px] max-lg:text-[13px] max-md:text-[12px] font-bold  max-md:font-semibold leading-5">Категории</p></Link>
                </div>
            </div>
            <div className="flex item-center gap-3">
                <div className="w-[55px] h-[55px] bg-white rounded-[10px] items-center justify-center cursor-pointer hidden xl:flex">
                    <IoMdSearch size={30} color="#3657CB"/>
			    </div>
			    <button type="button" className="text-white py-[13px] px-[45px]  max-xl:px-[30px] max-xl:py-[10px] max-md:py-[8px] max-md:px-[26px] max-[426px]:py-[6px] max-[426px]:px-[13px] bg-[#3657CB] rounded-[10px] font-bold max-lg:font-medium text-[16px] max-lg:[14px] max-sm:text-[11px] cursor-pointer hover:drop-shadow-[0px_0px_15px_rgba(72,113,255,0.8)] ease-in-out duration-300">Войти</button>
                {/* <div className='userInfo flex items-center gap-5 max-md:gap-2'>
                    <div className='flex items-center gap-2'>
                        <p className='text-white text-[15px] font-semibold max-md:text-[13px]'>Евгений</p>
                    </div>
                    <div className='bg-red-600 w-[56px] h-[56px] rounded-full max-md:w-[37px] max-md:h-[37px]'></div>
                </div> */}
		    </div>
    </header>
  )
}

export default Header