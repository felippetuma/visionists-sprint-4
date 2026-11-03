import React, { useState } from "react";
import { Link } from "react-router-dom";

const Cadastro = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const lidarComEnvio = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 select-none">
      <div className="w-full max-w-md bg-zinc-300 dark:bg-zinc-800 rounded-3xl border border-white/5 p-8 md:p-10 shadow-2xl">
        <div className="space-y-8">
          
          <div className="space-y-3">
            <div className="text-principal text-3xl font-light">*</div>
            <h2 className="text-3xl font-bold tracking-tight ">
              Criar uma conta
            </h2>
            <p className=" text-sm leading-relaxed">
              Junte-se aos Visionists para gerenciar recursos, analisar métricas e acompanhar a evolução da câmera inteligente JOVI.
            </p>
          </div>

          <form onSubmit={lidarComEnvio} className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-medium  block">
                Seu nome completo
              </label>
              <input
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Seu nome"
                className="w-full px-4 py-3 bg-zinc-400 dark:bg-zinc-700 border border-white/10 rounded-xl text-white placeholder-black/40 focus:outline-none focus:border-principal focus:ring-1 focus:ring-principal transition-all"
                required
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
                className="w-full px-4 py-3  bg-zinc-400 dark:bg-zinc-700 border border-white/10 rounded-xl text-white placeholder-black/40 focus:outline-none focus:border-principal focus:ring-1 focus:ring-principal transition-all"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium 70 block">
                Crie uma senha
              </label>
              <input
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                placeholder="••••••••••••"
                className="w-full px-4 py-3  bg-zinc-400 dark:bg-zinc-700 border border-white/10 rounded-xl text-white placeholder-black/40 focus:outline-none focus:border-principal focus:ring-1 focus:ring-principal transition-all"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full mt-2 py-3 px-4 bg-principal hover:opacity-90 text-white font-medium rounded-xl cursor-pointer transition-all shadow-lg shadow-principal/20 active:scale-[0.98]"
            >
              Cadastrar
            </button>
          </form>

          <p className="text-center text-sm 40">
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
