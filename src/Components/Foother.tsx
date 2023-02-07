import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { BsInstagram } from 'react-icons/bs'
import { FaFacebookF, FaTwitter } from 'react-icons/fa'
import { GrYoutube } from 'react-icons/gr'
import { SlSocialVkontakte } from 'react-icons/sl'

export const Foother = () => {
  return (
    <footer className="flex flex-col justify-center pb-10 max-md:pb-8 max-sm:pb-5">
		    <div className="w-full flex items-center flex-col justify-center gap-[50px] bg-[url('/image/foother/foother_blue_fon.svg')] bg-no-repeat py-[100px] max-lg:py-[50px] max-md:py-[40px] max-sm:py-[25px] rounded-xl bg-cover mb-[61px] max-lg:mb-[50px] max-md:mb-[40px] max-sm:mb-[20px]">
                <Image 
				    src={"/image/header/Netflix_logo.svg.png"}
					width={136}
					height={31}
					className="w-[150px] h-[40px] max-xl:w-[136px] max-xl:h-[31px] max-md:w-[120px] max-md:h-[25px] "
					alt=""
				/>
				<div className="flex w-full items-center gap-5 flex-col justify-center">
					<h1 className="font-black text-white text-[50px] max-xl:text-[35px] max-sm:text-[25px] text-center">Подпишитесь на E-mail рассылку</h1>
					<p className="w-[57%] max-sm:w-[90%] font-medium text-white text-[22px] max-xl:text-[17px] max-sm:text-[15px] text-center">Если хотиет быть в курсе последних новостей и новинок кино - заполните форму ниже и оформите бесплатную E-mail рассылку! </p>
					<form name="footerForm" className="w-1/2 max-md:w-[60%] max-sm:w-[80%] flex items-center max-sm:flex-col gap-2">
						<input title={"email"} 
						       type={"email"} 
							   required placeholder="E-mail адрес" 
						       className={"py-[22px] px-[27px] max-lg:px-[19px] max-md:px-[15px] max-sm:px-[10px] max-lg:py-[18px] w-full rounded-xl font-medium outline-none text-[19px] max-xl:text-[18px] max-lg:text-[17px] max-md:text-[15px] max-sm:text-center"}/>
                        <button title="submit" type="submit" 
						       className="py-[22px] px-[27px] max-lg:px-[19px] max-md:px-[15px] max-sm:px-[10px] max-lg:py-[18px] max-sm:w-full bg-[#F2F60F] rounded-xl text-[#151A26] font-bold text-[17px] max-lg:text-[15px]">Подписаться</button>
					</form>
					<div className="flex m-auto justify-center items-center max-sm:items-start gap-3 max-sm:gap-1">
						<input type={"checkbox"} title="input" className="w-[17px] h-[17px] rounded-sm" />
						<p className="text-white text-[17px] max-sm:text-[14px] max-sm:text-center max-[515px]:w-[70%]">Соглашаюсь на условия <a href="#" className="text-[#F2F60F] underline">политики конфиденциальности</a> </p>
					</div>
				</div>
			</div>
			<div className="flex item-center gap-8 max-lg:gap-7 max-md:gap-5 max-sm:gap-4 content-center m-auto mb-[34px] max-lg:mb-[30px] max-md:mb-[23px] max-sm:mb-[20px]">
				<Link href={"/"}><BsInstagram size={30} className="w-[30px] max-lg:w-[27px] max-md:w-[25px] max-sm:w-[20px]" color="#3C4767FF"/></Link>
				<Link href={"/"}><FaTwitter size={30} className="w-[30px] max-lg:w-[27px] max-md:w-[25px] max-sm:w-[20px]" color="#3C4767FF"/></Link>
				<Link href={"/"}><GrYoutube size={30} className="w-[30px] max-lg:w-[27px] max-md:w-[25px] max-sm:w-[20px]" color="#3C4767FF"/></Link>
				<Link href={"/"}><FaFacebookF size={30} className="w-[30px] max-lg:w-[27px] max-md:w-[25px] max-sm:w-[20px] max-lg:h-[27px] max-md:h-[25px] max-sm:h-[20px]" color="#3C4767FF"/></Link>
				<Link href={"/"}><SlSocialVkontakte size={30} className="w-[30px] max-lg:w-[27px] max-md:w-[25px] max-sm:w-[20px]" color="#3C4767FF"/></Link>
			</div>
			<div className="flex max-sm:flex-col items-center gap-10 max-sm:gap-5 justify-center mb-[41px]">
			    <Link href="#"><p className="text-white text-[17px] max-lg:text-[13px] font-bold leading-5">Афиша</p></Link>
                <Link href="#"><p className="text-white text-[17px] max-lg:text-[13px] font-bold leading-5">Новости</p></Link>
                <Link href="#"><p className="text-white text-[17px] max-lg:text-[13px] font-bold leading-5">Персоны</p></Link>
                <Link href="#"><p className="text-white text-[17px] max-lg:text-[13px] font-bold leading-5">Рейтинги</p></Link>
                <Link href="#"><p className="text-white text-[17px] max-lg:text-[13px] font-bold leading-5">Рецензии</p></Link>
                <Link href="#"><p className="text-white text-[17px] max-lg:text-[13px] font-bold leading-5">Каталог фильмов</p></Link>
			</div>
			<p className="text-[#EBEDF4FF] text-[15px] max-lg:text-[13px] text-center mb-[26px] max-lg:mb-[20px] max-md:mb-[15px] max-sm:mb-[10px]">2023 © Netflix.  Все права защищены</p>
			<a href="#" className="text-[#EBEDF4FF] text-[15px] max-lg:text-[13px] text-center underline">Политика конфиденциальности</a>
	</footer>
  )
}


export default Foother