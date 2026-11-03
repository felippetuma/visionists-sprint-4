import { useEffect, useRef, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { ChevronDown, LogOut } from "lucide-react";

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
            <header className="flex items-center justify-between px-6 py-4 shadow">
                <h1 className="text-xl font-bold">Dashboard</h1>
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

            <main className="p-6">
                <div className="rounded-xl bg-zinc-300 dark:bg-zinc-700 p-6 shadow">
                    <h2 className="text-lg font-semibold ">
                        Olá, {client.nome}!
                    </h2>
                </div>
            </main>
        </div>
    )
}
export default Dashboard
