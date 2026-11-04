import { useEffect, useRef, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { ChevronDown, LogOut } from "lucide-react";
import modopet from "../assets/imgs/modo-pet.png";
import dachshund from "../assets/slidesImgs/dachshund.jpg";
import pug from "../assets/slidesImgs/pug.jpg";
import modoDocs from "../assets/imgs/modo-docs.png";
import BuscarCep from "../components/BuscarCep";
import ChatBot from "../components/ChatBot";
import joviHelp from "../assets/joviHelp.png";

const slidesPet = [
    { src: dachshund, alt: "Cachorro dachshund" },
    { src: pug, alt: "Cachorro pug" },
    { src: modopet, alt: "Modo pet" },
];

interface Cliente {
    id: number;
    nome: string;
    email: string;
    active: boolean;
}

function iniciaisDe(nome: string): string {
    const partes = nome.trim().split(/\s+/).filter(Boolean);
    if (partes.length === 0) return "?";
    const primeira = partes[0][0];
    const ultima = partes.length > 1 ? partes[partes.length - 1][0] : "";
    return (primeira + ultima).toUpperCase();
}

function ClienteLogado(): Cliente | null {
    try {
        const save = localStorage.getItem("login");
        return save ? (JSON.parse(save) as Cliente) : null;
    } catch {
        return null;
    }
}

const Dashboard = () => {
    const navigate = useNavigate();
    const [client] = useState<Cliente | null>(ClienteLogado);
    const [menuAberto, setMenuAberto] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const [slideAtual, setSlideAtual] = useState(0);
    const [chatAberto, setChatAberto] = useState(false);

    // troca de slide sozinho; ao clicar numa bolinha o intervalo reinicia (slideAtual está nas dependências)
    useEffect(() => {
        const intervalo = setInterval(() => {
            setSlideAtual((atual) => (atual + 1) % slidesPet.length);
        }, 3000);
        return () => clearInterval(intervalo);
    }, [slideAtual]);

    useEffect(() => {
        const aoClicarFora = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuAberto(false);
        };
        const aoApertarEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") setMenuAberto(false);
        };
        document.addEventListener("mousedown", aoClicarFora);
        document.addEventListener("keydown", aoApertarEsc);
        return () => {
            document.removeEventListener("mousedown", aoClicarFora);
            document.removeEventListener("keydown", aoApertarEsc);
        };
    }, []);

    if (!client) {
        return <Navigate to="/login" replace />
    }

    const handleExit = () => {
        localStorage.removeItem("login");
        navigate("/login", { replace: true })
    }

    return (
        <div className="min-h-screen">
            <header className="flex items-center justify-between px-4 sm:px-6 py-4 shadow">
                <h1 className="text-lg sm:text-xl font-bold">Dashboard</h1>
                <div ref={menuRef} className="relative">
                    <button
                        type="button"
                        aria-haspopup="menu"
                        aria-expanded={menuAberto}
                        onClick={() => setMenuAberto(!menuAberto)}
                        className="group inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-semibold cursor-pointer"
                    >
                        <span className="flex size-7 items-center justify-center rounded-full bg-principal text-xs font-semibold text-white">
                            {iniciaisDe(client.nome)}
                        </span>
                        <span className="transition-colors group-hover:text-principal">{client.nome.split(" ")[0]}</span>
                        <ChevronDown size={16} className={`transition-all duration-200 group-hover:text-principal ${menuAberto ? "rotate-180" : ""}`} />
                    </button>

                    {menuAberto && (
                        <div
                            role="menu"
                            className="absolute right-0 top-full mt-2 w-60 z-50 overflow-hidden rounded-xl bg-zinc-300 dark:bg-zinc-800 shadow-lg border border-black/10 dark:border-white/10 text-sm"
                        >
                            <div className="px-4 py-3 border-b border-black/10 dark:border-white/10">
                                <p className="font-semibold truncate">{client.nome}</p>
                                <p className="text-xs opacity-70 truncate">{client.email}</p>
                            </div>
                            <button
                                type="button"
                                role="menuitem"
                                onClick={handleExit}
                                className="flex w-full items-center gap-2 px-4 py-3 text-left hover:bg-principal hover:text-white transition-colors cursor-pointer"
                            >
                                <LogOut size={15} /> Sair
                            </button>
                        </div>
                    )}
                </div>
            </header>

            <main className="flex flex-col gap-4 p-4 sm:p-6">
                <div className="rounded-xl bg-zinc-300 dark:bg-zinc-700 p-4 sm:p-6 shadow">
                    <h2 className="text-lg font-semibold ">
                        Olá, {client.nome}!
                    </h2>
                </div>
                <div className="flex flex-col md:flex-row md:flex-wrap items-center justify-center">

                    <div className="p-4 flex flex-col items-center gap-4">
                        <p className="bg-green-300 flex text-center rounded-md px-3 py-2 text-sm text-green-600">
                            Pet Detectado, Deseja Ativar o <span className="px-1 text-yellow-500">modo pet</span>?
                        </p>
                        <img
                            key={slideAtual}
                            src={slidesPet[slideAtual].src}
                            alt={slidesPet[slideAtual].alt}
                            className="block w-full max-w-80 aspect-4/3 object-cover rounded-3xl"
                        />
                        <div className="flex gap-2">
                            {slidesPet.map((slide, i) => (
                                <button
                                    key={slide.alt}
                                    type="button"
                                    aria-label={`Ir para o slide ${i + 1}`}
                                    aria-current={i === slideAtual}
                                    onClick={() => setSlideAtual(i)}
                                    className={`size-3 rounded-full cursor-pointer transition-colors ${i === slideAtual ? "bg-principal" : "bg-zinc-400 dark:bg-zinc-600"}`}
                                />
                            ))}
                        </div>
                    </div>
                    <div className="p-4 flex flex-col items-center gap-4">
                        <button
                            type="button"
                            disabled
                            className="w-full max-w-80 hover:opacity-90 cursor-pointer disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:opacity-50 hover:-translate-y-2 disabled:active:scale-100">
                            <img src={modoDocs} alt="previa modo documento" className="block w-full max-w-80 aspect-4/3 object-cover rounded-3xl" />
                        </button>
                        <p className="bg-red-300 flex text-center rounded-lg px-3 py-2 text-sm text-red-600">
                            Nenhum documento encontrado
                        </p>
                    </div>
                    <div className="p-4 flex flex-col items-center gap-4">
                        <button
                            type="button"
                            onClick={() => setChatAberto(true)}
                            aria-label="Abrir o JOVI Chatbot"
                            className="w-full max-w-80 cursor-pointer transition-transform hover:-translate-y-2"
                        >
                            <img src={joviHelp} alt="JOVI Chatbot" className="block w-full max-w-80 aspect-4/3 object-cover rounded-3xl" />
                        </button>
                        <p className="bg-green-300 flex text-center rounded-lg px-3 py-2 text-sm text-green-600">
                            Converse com o chatbot e jogue
                        </p>
                    </div>
                </div>
                <BuscarCep/>
            </main>
            <ChatBot aberto={chatAberto} aoFechar={() => setChatAberto(false)} />
        </div>
    )
}
export default Dashboard
