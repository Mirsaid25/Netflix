import React, { useState } from "react";
import Header from "@/Components/Header";
import { BsArrowUp} from 'react-icons/bs'
import HeaderModal from "@/Components/headerModal";
import Foother from "@/Components/Foother";


type AppLayoutProps = {
  children: React.ReactNode;
};

const AppLayout = ({ children }: AppLayoutProps) => {
    const [modalHandle, setModalHandle] = useState<boolean>(false)


  return (
    <div className="w-[75%] max-lg:w-[80%] max-md:w-[90%] content-center m-auto mt-7">
		<Header setModalHandle={setModalHandle}/>
        <main className="my-[50px] max-lg:my-[32px] max-sm:my-[26px]">{children}</main>
		<Foother/>
		{modalHandle? <HeaderModal setModalHandle={setModalHandle}/> : null}
		<div className="toTopIcon w-[73px] h-[73px] max-xl:w-[50px] max-xl:h-[50px] max-lg:w-[45px] max-lg:h-[45px] max-md:w-[40px] max-md:h-[40px] max-sm:w-[30px] max-sm:h-[30px] bg-[#100F14] rounded-xl max-md:rounded-md flex items-center justify-center fixed bottom-11 right-11 max-xl:bottom-8 max-xl:right-8 max-lg:bottom-5 max-lg:right-5 max-md:bottom-3 max-md:right-3 max-sm:bottom-2 max-sm:right-2 cursor-pointer">
			<BsArrowUp color="white" className="w-[35px] h-[35px] max-xl:w-[25px] max-xl:h-[25px] max-lg:w-[22px] max-lg:h-[22px] max-md:w-[20px] max-md:h-[20px] max-sm:w-[16px] max-sm:h-[16px]"/>
		</div>
    </div>
  );
};

export default AppLayout;
