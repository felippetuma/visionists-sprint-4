import { useState, type SyntheticEvent } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [erro, setErro] = useState("");
    const [carregando, setCarregando] = useState(false);

    if (localStorage.getItem("login")) {
        return <Navigate to="/dashboard" replace />
    }

    async function handleSubmit(e: SyntheticEvent) {
        e.preventDefault();
        setErro("");
        setCarregando(true);

        try {
            const response = await fetch("http://localhost:8000/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, senha }),
            });

            const data = await response.json();

            if (!response.ok) {
                setErro(typeof data.detail === "string" ? data.detail : "Dados inválidos");
                return;
            }

            localStorage.setItem("login", JSON.stringify(data.cliente));
            navigate("/dashboard", { replace: true });
        } catch {
            setErro("Não foi possível conectar ao servidor.");
        } finally {
            setCarregando(false);
        }
    }

    return (
        <div className="min-h-screen w-full flex items-center justify-center  p-4 select-none">
            <div className="w-full max-w-md bg-zinc-300 dark:bg-zinc-800 rounded-3xl border border-white/5 p-8 md:p-10 shadow-2xl">
                <div className="space-y-8">

                    <div className="space-y-3">
                        <div className="text-principal text-3xl font-light">*</div>
                        <h2 className="text-3xl font-bold tracking-tight ">
                            Entrar na conta
                        </h2>
                        <p className="text-sm leading-relaxed">
                            Acesse a plataforma dos Visionists para gerenciar recursos, analisar métricas e acompanhar a evolução da câmera inteligente JOVI.
                        </p>
                    </div>

                    {erro && (
                        <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-600">
                            {erro}
                        </p>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium block">
                                Seu e-mail
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="exemplo@visionists.com"
                                className="w-full px-4 py-3 bg-zinc-400 dark:bg-zinc-700 border border-white/10 rounded-xl  placeholder-black/40 focus:outline-none focus:border-principal focus:ring-1 focus:ring-principal transition-all"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <label className="text-sm font-medium /70 block">
                                    Sua senha
                                </label>
                            </div>
                            <input
                                type="password"
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                                placeholder="••••••••••••"
                                className="w-full px-4 py-3  bg-zinc-400 dark:bg-zinc-700  border border-white/10 rounded-xl  placeholder-black/40 focus:outline-none focus:border-principal focus:ring-1 focus:ring-principal transition-all"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={carregando}
                            className="w-full py-3 px-4 bg-principal hover:opacity-90 font-medium rounded-xl cursor-pointer transition-all shadow-lg shadow-principal/20 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {carregando ? "Entrando..." : "Entrar"}
                        </button>
                    </form>

                    <p className="text-center text-sm /40">
                        Não tem uma conta?{" "}
                        <Link
                            to="/cadastro"
                            className="text-principal hover:underline font-medium cursor-pointer transition-all"
                        >
                            Cadastre-se
                        </Link>
                    </p>

                </div>
            </div>
        </div>
    );
};

export default Login;
