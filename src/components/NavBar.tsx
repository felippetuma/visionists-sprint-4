import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.svg"
import SelectTheme from "./SelectTheme";
import { LayoutDashboard, LogIn, Menu } from "lucide-react";
import { useState } from "react";

const NavBar = () => {
    const [open, setOpen] = useState(false);

    useLocation();
    const logado = !!localStorage.getItem("login");

    return (
        <nav className="relative m-3 md:m-5 max-w-full">
            <div className="flex items-center justify-between md:justify-center">
                <Link to="/" className="md:absolute md:left-5">
                    <img src={logo} alt="logo visionists" className="w-12 h-12 md:w-16 md:h-16 dark:brightness-0 dark:invert hover:rotate-8" />
                </Link>
                <div className="hidden md:flex gap-10 md:gap-20 text-base font-light">
                    <Link to="/" className="hover:text-principal hover:font-normal">Início</Link>
                    <Link to="/projeto" className="hover:text-principal hover:font-normal">Projeto</Link>
                    <Link to="/sobrenos" className="hover:text-principal hover:font-normal">Sobre Nós</Link>
                    {logado
                        ? <Link to="/dashboard" className="inline-flex items-center gap-2 border-2 rounded-full px-4 border-principal hover:text-principal hover:font-normal"><LayoutDashboard size={15} /> Dashboard</Link>
                        : <Link to="/login" className="inline-flex items-center gap-2 border-2 rounded-full px-4 border-principal hover:text-principal hover:font-normal"><LogIn size={15} /> Login</Link>}
                </div>
                <div className="flex items-center gap-3 md:absolute md:right-5">
                    <SelectTheme />
                    <button type="button" className="md:hidden p-2" aria-label="Abrir Menu" aria-expanded={open} onClick={() => setOpen(!open)}>
                        <Menu />
                    </button>
                </div>
            </div>
            {open && (
                <div className="md:hidden flex flex-col items-center gap-4 pt-4 text-base font-light">
                    <Link to="/" className="hover:text-principal hover:font-normal">Início</Link>
                    <Link to="/projeto" className="hover:text-principal hover:font-normal">Projeto</Link>
                    <Link to="/sobrenos" className="hover:text-principal hover:font-normal">Sobre Nós</Link>
                    {logado
                        ? <Link to="/dashboard" onClick={() => setOpen(false)} className="inline-flex items-center gap-2 border-2 rounded-full px-4 mt-3 border-principal hover:text-principal hover:font-normal"><LayoutDashboard size={15} /> Dashboard</Link>
                        : <Link to="/login" onClick={() => setOpen(false)} className="inline-flex items-center gap-2 border-2 rounded-full px-4 mt-3 border-principal hover:text-principal hover:font-normal"><LogIn size={15} /> Login</Link>}
                </div>
            )}
        </nav>
    )
}

export default NavBar