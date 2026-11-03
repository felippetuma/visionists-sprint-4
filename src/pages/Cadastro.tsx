import React, { useState, type FormEvent } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

const API_URL = "http://localhost:8000/api";

const Cadastro = () => {
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  if (localStorage.getItem("cliente_logado")) {
    return <Navigate to="/dashboard" replace />;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setErro("");

    if (senha.length < 6) {
      setErro("A senha deve ter pelo menos 6 caracteres");
      return;
    }

    setCarregando(true);

    try {
      const resCadastro = await fetch(`${API_URL}/clients`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, email, senha }),
      });

      if (!resCadastro.ok) {
        const dados = await resCadastro.json();
        setErro(typeof dados.detail === "string" ? dados.detail : "Dados inválidos");
        return;
      }

      const resLogin = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha }),
      });

      const dadosLogin = await resLogin.json();

      if (!resLogin.ok) {
        navigate("/login", { replace: true });
        return;
      }

      localStorage.setItem("cliente_logado", JSON.stringify(dadosLogin.cliente));
      navigate("/dashboard", { replace: true });
    } catch {
      setErro("Não foi possível conectar ao servidor.");
    } {
      setCarregando(false);
    }
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 select-none">
      <div className="w-full max-w-md bg-zinc-300 dark:bg-zinc-800 rounded-3xl border border-white/5 p-8 md:p-10 shadow-2xl text-zinc-900 dark:text-white">
        <div className="space-y-8">
          
          <div className="space-y-3">
            <div className="text-principal text-3xl font-light">*</div>
            <h2 className="text-3xl font-bold tracking-tight">
              Criar uma conta
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
              Junte-se aos Visionists para gerenciar recursos, analisar métricas e acompanhar a evolução da câmera inteligente JOVI.
            </p>
          </div>

          {erro && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl text-sm font-medium">
              {erro}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-medium block">
                Seu nome completo
              </label>
              <input
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Seu nome"
                className="w-full px-4 py-3 bg-zinc-400/20 dark:bg-zinc-700 border border-zinc-400/30 dark:border-white/10 rounded-xl text-zinc-900 dark:text-white placeholder-zinc-500 dark:placeholder-white/20 focus:outline-none focus:border-principal focus:ring-1 focus:ring-principal transition-all"
                required
                disabled={carregando}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium block">
                Seu e-mail
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="exemplo@visionists.com"
                className="w-full px-4 py-3 bg-zinc-400/20 dark:bg-zinc-700 border border-zinc-400/30 dark:border-white/10 rounded-xl text-zinc-900 dark:text-white placeholder-zinc-500 dark:placeholder-white/20 focus:outline-none focus:border-principal focus:ring-1 focus:ring-principal transition-all"
                required
                disabled={carregando}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium block">
                Crie uma senha
              </label>
              <input
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                placeholder="••••••••••••"
                className="w-full px-4 py-3 bg-zinc-400/20 dark:bg-zinc-700 border border-zinc-400/30 dark:border-white/10 rounded-xl text-zinc-900 dark:text-white placeholder-zinc-500 dark:placeholder-white/20 focus:outline-none focus:border-principal focus:ring-1 focus:ring-principal transition-all"
                required
                disabled={carregando}
              />
            </div>

            <button
              type="submit"
              disabled={carregando}
              className="w-full mt-2 py-3 px-4 bg-principal hover:opacity-90 disabled:opacity-50 text-white font-medium rounded-xl cursor-pointer disabled:cursor-not-allowed transition-all shadow-lg shadow-principal/20 active:scale-[0.98]"
            >
              {carregando ? "Cadastrando..." : "Cadastrar"}
            </button>
          </form>

          <p className="text-center text-sm text-zinc-600 dark:text-zinc-400">
            Já tem uma conta?{" "}
            <Link
              to="/login"
              className="text-[#985eff] hover:underline font-medium cursor-pointer transition-all"
            >
              Faça login
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
};

export default Cadastro;
