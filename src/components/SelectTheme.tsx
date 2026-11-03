import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

type Theme = "light" | "dark";

function temaInicial(): Theme {
    const salvo = localStorage.getItem("theme");
    if (salvo === 'light' || salvo === "dark") return salvo;

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? "dark" : "light";
}

const SelectTheme = () => {
    const [theme, setTheme] = useState<Theme>(temaInicial);

    useEffect(() => {
        document.documentElement.classList.toggle("dark", theme === "dark");

        localStorage.setItem('theme', theme);
    }, [theme]);

    return (
        <label className='relative inline-flex cursor-pointer items-center gap-3 rounded-full p-1'>
            <input type="checkbox" role="switch" aria-label="Alterar Tema" checked={theme === "dark"} onChange={(e) => setTheme(e.target.checked ? "dark" : "light")} className="peer sr-only" />
            <div className="absolute left-1 top-1 h-8 w-8 rounded-full border-2 border-principal bg-white shadow-sm transition-transform duration-300 ease-out peer-checked:translate-x-11 peer-focus-visible:ring-2 peer-focus-visible:ring-jovi dark:bg-zinc-700" />
            <div className="relative z-10 flex h-8 w-8 items-center justify-center text-principal transition-colors duration-300 peer-checked:text-zinc-500"> <Sun size={18} fill={theme === "dark" ? "none":"currentColor"}/> </div>
            <div className="relative z-10 flex h-8 w-8 items-center justify-center text-zinc-500 transition-colors duration-300 peer-checked:text-principal"> <Moon size={18} fill={theme === "dark" ? "currentColor": "none"}/> </div>
        </label>
    )
}

export default SelectTheme
