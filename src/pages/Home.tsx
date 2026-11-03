
import { ArrowDownIcon } from "lucide-react";
import smartphoneJovi from "../assets/smartphoneJovi.svg";
import Descubra from "../components/Descubra";

const Home = () => {
  return (
    <main className="flex-1 overflow-x-clip">
      <header className="flex flex-col lg:flex-row top-0 justify-between items-center w-full mt-34 sm:mt-16 lg:mt-0">
          <div className="flex flex-col items-center text-center px-4 sm:px-8 ">
            <h1 className="text-[13vw] sm:text-[min(14vw,8rem)] lg:text-[min(8vw,130px)] font-bold whitespace-nowrap leading-none">Cam <span className="text-principal">Sense</span></h1>
            <p className="text-sm sm:text-[17px] mt-3 lg:mt-0">Porque a melhor foto é sempre aquela que você consegue tirar sem dificuldades.</p>
          </div>
          <div className="">
            <img src={smartphoneJovi} alt="celular X300 Plus Jovi" className="hidden lg:block w-full lg:max-w-[833px] lg:w-[44vw] h-auto" />
            </div>
      </header>
      <div className="flex justify-center items-center mt-40 sm:mt-30 animate-pulse text-black dark:text-white">
          <ArrowDownIcon size={35}/>
      </div>
      <Descubra/>
    </main>
  )
}

export default Home
