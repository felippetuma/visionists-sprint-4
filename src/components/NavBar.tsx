import { Link } from "react-router-dom";
import logo from "../assets/logo.svg"
import SelectTheme from "./SelectTheme";

const NavBar = () => {
    return (
        <nav className="relative flex m-5 max-w-full items-center justify-center gap-4">
            <div className="absolute left-5">
                <img src={logo} alt="logo visionists" className="w-16 h-16 dark:brightness-0 dark:invert" />
            </div>
            <div className="flex gap-20 text-base font-light">
                <Link to="/" className="hover:text-principal hover:font-normal">Início</Link>
                <Link to="/projeto" className="hover:text-principal hover:font-normal">Projeto</Link>
                <Link to="/sobrenos" className="hover:text-principal hover:font-normal"> Sobre Nós</Link>
            </div>
            <div className="absolute right-5">
                <SelectTheme />
            </div>
        </nav>
    )
}

export default NavBar
