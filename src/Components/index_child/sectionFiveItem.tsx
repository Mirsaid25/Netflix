import Image from 'next/image'
import React from 'react'

const sectionFiveItem: React.FC =()=> {
  return (
    <div className='bg-[red] w-full relative overflow-hidden rounded-xl'>
        <Image src={"/image/main/Фото.svg"} alt="" height={100} width={100} className={"w-[100%] h-full"}/>
		<p className='absolute top-[9px] left-5 max-md:left-4 text-white text-[15px] max-lg:text-[13px] font-bold'>15 Апр 2020</p>
		<p className='absolute bottom-5 max-lg:bottom-3 max-md:bottom-2 left-5 max-md:left-4 text-white text-[18px] max-lg:text-[15px] max-sm:text-[13px] font-black'>От этой новости вы будете шокированы до завтра</p>
    </div>
  )
}

export default sectionFiveItem