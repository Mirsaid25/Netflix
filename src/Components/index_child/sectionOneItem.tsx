import Image from "next/image";
import React, { useState } from "react";

const SectionOneItem: React.FC = () => {
  const [hover, setHover] = useState(false);

  return (
    <div className="move_card">
        <div
          onMouseLeave={() => setHover(false)}
          onMouseEnter={() => setHover(true)}
          className="relative rounded-xl mb-[9px] overflow-hidden transition-all ease-in-out"
        >
            <Image
              alt=""
              src={"image/main/image 1.svg"}
              width={20}
              height={20}
              className="w-full"
            />
            {hover ? (
          <div className="w-full h-full transition-all ease-in-out bg-[#3658ff8f] absolute top-0 left-0 flex items-center justify-center">
            <button
              title="move_card"
              className="bg-white cursor-pointer px-[40px] py-[20px] max-xl:px-[17px] max-xl:py-[13px] max-sm:px-[14px] max-sm:py-[11px]  rounded-[10px] text-[#3657CB] text-[18px] max-xl:text-[15px] max-sm:text-[13px] max-[330px]:text-[11px] font-bold"
            >
              Карточка фильма
            </button>
          </div>
            ) : null} 
            <div className="bg-[#89CB36] px-[13px] py-[5px] max-lg:px-[7px] max-lg:py-[4px] max-sm:px-[5px] rounded-md absolute top-3 right-3 max-md:top-[10px] max-md:right-[10px] max-sm:top-[8px] max-sm:right-[8px]">
            <p className="text-white text-[18px] max-lg:text-[12px] font-bold text-center">6.70</p>
            </div>
        </div>
        <p className="text-white text-[18px] max-lg:text-[15px] font-bold mb-1">кино</p>
        <p className="text-[#F2F60F] text-[15px] max-lg:text-[12px]">Триллер</p>
    </div>
  );
};

export default SectionOneItem;
