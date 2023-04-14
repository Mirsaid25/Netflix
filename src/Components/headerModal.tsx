import Image from 'next/image'
import Link from 'next/link'
import React, { SetStateAction } from 'react'
import { MdOutlineClose } from 'react-icons/md'

type HeaderModalProps = {
    setModalHandle: React.Dispatch<SetStateAction<boolean>>
}

const HeaderModal =({setModalHandle}:HeaderModalProps)=> {
  return (
    <div className="modal_515 fixed top-0 left-0 w-full transition ease-out duration-300 h-screen backdrop-blur-sm flex flex-col justify-start pt-5 gap-4 items-center">
			<MdOutlineClose onClick={()=> setModalHandle(false)} size={25} className="absolute top-3 right-3 cursor-pointer" color="white"/>
		    <Image
                src="/image/header/Netflix_logo.svg.png"
                alt="logo"
                width={100} 
                height={25}
            />
			<Link href="/movie"><p className="text-white text-[13px] font-bold leading-5">Фильмы</p></Link>
            <Link href="/actor"><p className="text-white text-[13px] font-bold leading-5">Актёры</p></Link>
            <Link href="/tv"><p className="text-white text-[13px] font-bold leading-5">Сериалы</p></Link>
        </div>
  )
}

export default HeaderModal