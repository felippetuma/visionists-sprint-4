import { ExternalLink } from "lucide-react"
import { useState } from "react"

const membros = [
  {
    nome: "Davi Toyota",
    iniciais: "DT",
    rm: "569557",
    cargo: "Desenvolvedor",
    descricao: "Integrante da equipe Visionists",
    linkedin: "https://www.linkedin.com/in/davitoyota/",
    github: "https://github.com/davitoyota",
  },
  {
    nome: "Felippe Tuma",
    iniciais: "FT",
    rm: "569459",
    cargo: "Tech Lead",
    descricao: "Integrante da equipe Visionists",
    linkedin: "https://www.linkedin.com/in/felippetuma/",
    github: "https://github.com/felippetuma",
  },
  {
    nome: "Felipe Motta",
    iniciais: "FM",
    rm: "",
    cargo: "Desenvolvedor",
    descricao: "Integrante da equipe Visionists",
    linkedin: "https://www.linkedin.com/in/felipe-motta-8967933b4/",
    github: "",
  },
  {
    nome: "Renan Silva",
    iniciais: "RS",
    rm: "",
    cargo: "Desenvolvedor",
    descricao: "Integrante da equipe Visionists",
    linkedin: "https://www.linkedin.com/in/renansilvaa/",
    github: "",
  },
  {
    nome: "Yan da Silva",
    iniciais: "YS",
    rm: "",
    cargo: "Desenvolvedor",
    descricao: "Integrante da equipe Visionists",
    linkedin: "https://www.linkedin.com/in/yan-silva-609803371/",
    github: "",
  },
]

const Sobre = () => {
  const [membroSelecionado, setMembroSelecionado] = useState(1)

  const membro = membros[membroSelecionado]
  return (
    <div>
      <div className="flex items-center justify-center">
          <h2 className="text-[25px]">Conheça um pouco da nossa equipe</h2>
      </div>
    <div className="grid grid-cols-3 gap-4 mt-6 ml-5 mr-5">
      {/* Lista de membros */}
      <div className="flex flex-col gap-4">

        {membros.map((item, index) => (
          <button
            key={item.nome}
            type="button"
            onClick={() => setMembroSelecionado(index)}
            className={`text-left p-4 rounded-2xl transition-all duration-300 hover:-translate-y-1
              ${membroSelecionado === index
                ? "bg-principal text-white shadow-lg shadow-principal/30"
                : "bg-zinc-400 text-zinc-900 dark:bg-zinc-800 dark:text-white hover:bg-zinc-300 dark:hover:bg-zinc-600"
              }`}
          >
            <h1 className="text-lg font-semibold">{item.nome}</h1>
            <p className="mt-3 text-sm">Integrante da equipe Visionists</p>
          </button>
        ))}

      </div>

      {/* Card de perfil selecionado */}
      <div className="col-span-2 dark:bg-zinc-700 bg-zinc-300 p-4 rounded-2xl flex items-center justify-center flex-col shadow-lg transition-all duration-300">

        <div className="flex mt-4 size-15 items-center justify-center rounded-full text-white bg-principal text-2xl font-semibold shadow-md shadow-principal">
          {membro.iniciais}
        </div>

        <h1 className="text-lg mt-3 font-bold">
          {membro.nome}
        </h1>

        {membro.rm && (
          <p className="text-sm">RM.: {membro.rm}</p>
        )}

        <p className="text-md font-bold p-1 text-principal dark:text-principal">
          {membro.cargo}
        </p>

        <p className="m-1">{membro.descricao}</p>

        <div className="flex justify-center items-center gap-6 m-3">

          {membro.github && (
            <a
              href={membro.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 justify-center bg-principal px-4 py-2 rounded-full shadow-md hover:-translate-y-1 hover:shadow-principal transition-all"
            >
              GitHub <ExternalLink size={18} />
            </a>
          )}

          <a
            href={membro.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 justify-center bg-principal px-4 py-2 rounded-full shadow-md hover:-translate-y-1 hover:shadow-principal transition-all"
          >
            LinkedIn <ExternalLink size={18} />
          </a>

        </div>

      </div>

    </div>
    </div>
  )
}

export default Sobre
