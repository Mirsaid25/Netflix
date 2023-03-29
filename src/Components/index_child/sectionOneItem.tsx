import Image from "next/image";
import Link from "next/link";
import { type } from "os";
import React, { useState } from "react";

type SectionOneItemProps= {
  arr:{
	popularity: number;
	backdrop_path: string,
	original_title: string,
	genre_ids:[],
  id:number
  },
  arrId:[]
}

const SectionOneItem: React.FC<SectionOneItemProps> = ({arr, arrId}) => {
  const [hover, setHover] = useState<boolean>(false);

    const ganre =  arrId.filter((item: any) => {
	    for(let items of arr.genre_ids){
			if(item.id === items){
				return item
	    	}
	    }
    })
    
  return (
    <div className="move_card">
        <div
          onMouseLeave={() => setHover(false)}
          onMouseEnter={() => setHover(true)}
          className="relative rounded-xl mb-[9px] overflow-hidden transition-all ease-in-out"
        >
			<img width={100} height={10} src={arr?.backdrop_path !== null ?  `https://www.themoviedb.org/t/p/w220_and_h330_face/${arr?.backdrop_path}` : "/image/[indexId]/posterError.svg"} className="w-full" alt="" />
            {hover ? (
                <div className="w-full h-full transition-all ease-in-out bg-[#3658ff8f] absolute top-0 left-0 flex items-center justify-center">
            <Link href={{
              pathname: `/${arr.id}`,
              query: { id: arr.id },
            }}>
                <button
                  title="move_card"
                  className="bg-white cursor-pointer px-[40px] py-[20px] max-xl:px-[17px] max-xl:py-[13px] max-sm:px-[14px] max-sm:py-[11px]  rounded-[10px] text-[#3657CB] text-[18px] max-xl:text-[15px] max-sm:text-[13px] max-[330px]:text-[11px] font-bold"
                >
                  Карточка фильма
                </button>
            </Link>
                </div>
            ) : null} 
            <div className="bg-[#89CB36] px-[13px] py-[5px] max-lg:px-[7px] max-lg:py-[4px] max-sm:px-[5px] rounded-md absolute top-3 right-3 max-md:top-[10px] max-md:right-[10px] max-sm:top-[8px] max-sm:right-[8px]">
            <p className="text-white text-[18px] max-lg:text-[12px] font-bold text-center">{Math.round(arr?.popularity)}</p>
            </div>
        </div>
        <p className="text-white text-[18px] max-lg:text-[15px] font-bold mb-1">{arr?.original_title}</p>
        <p className="text-[#F2F60F] text-[15px] max-lg:text-[12px]">{ganre.map((item:{name:string}) => `${item?.name[0].toUpperCase() + item?.name.slice(1)}, `)}</p>
    </div>
  );
};

export default SectionOneItem;
