import Image from "next/image";
import { type } from "os";
import React, { useState } from "react";
import { SwiperSlide } from "swiper/react";

type sectionTwoSwiperSlideProps ={}

const sectionTwoSwiperSlide: React.FC = () => {
    const [sectionTwoItem, setSectionTwoItem] = useState<boolean>(false)

  return (
    <SwiperSlide>
      <div
        onMouseEnter={() => setSectionTwoItem(true)}
        onMouseLeave={() => setSectionTwoItem(false)}
        className="w-full bg-[red] h-[250px] rounded-xl overflow-hidden mb-2 relative cursor-pointer"
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
          className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-[35px] h-[35px] z-10"
        />
        {sectionTwoItem ? (
          <div className="h-full w-full bg-[#3052ffa0] absolute top-0 left-0 z-[2]"></div>
        ) : null}
      </div>
      <p className="text-[20px] font-black text-white">Чёрная Вдова</p>
    </SwiperSlide>
  );
};

export default sectionTwoSwiperSlide;
