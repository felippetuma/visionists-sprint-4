
import { ArrowDownIcon } from "lucide-react";
import smartphoneJovi from "../assets/smartphoneJovi.svg";
import Descubra from "../components/Descubra";

const Home = () => {
  return (
    <main className="flex-1">
      <header className="flex top-0 justify-between items-center w-full -mt-50">
          <div className="flex flex-col items-center p-5">
            <h1 className="text-[130px] font-bold whitespace-nowrap leading-none">Cam <span className="text-jovi">Sense</span></h1>
            <p className="text-[17px] ">Porque a melhor foto é sempre aquela que você consegue tirar sem dificuldades.</p>
          </div>
          <div className="">
            <img src={smartphoneJovi} alt="celular X300 Plus Jovi" className="w-[833px] h-[1030px]" />
            </div>
      </header>
      <div className="flex justify-center items-center -mt-1 animate-pulse text-black dark:text-white">
          <ArrowDownIcon size={35}/>
      </div>
      <Descubra/>
    </main>
  )
}

export default Home
