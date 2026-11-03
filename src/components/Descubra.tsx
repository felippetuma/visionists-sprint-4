import { useState } from "react";
import { Link } from "react-router-dom";

const Descubra = () => {
  const [itemFocado, definirItemFocado] = useState<number | null>(null);

  const itens = [
    {
      numero: "01",
      titulo: "Sobre Nós",
      conteudo:
        "Conheça os integrantes dedicados que uniram talentos e tornaram este projeto possível.",
      to: "/sobrenos",
    },
    {
      numero: "02",
      titulo: "O Projeto",
      conteudo:
        "Uma visão aprofundada sobre o nosso propósito, inovação e os objetivos que queremos alcançar.",
      to: "/projeto",
    },
    {
      numero: "03",
      titulo: "História Jovi",
      conteudo:
        "A trajetória completa, os principais marcos e o legado construído pela Jovi até aqui.",
      to: "/histjovi",
    },
    {
      numero: "04",
      titulo: "História Visionists",
      conteudo:
        "Como tudo começou. Descubra a história, a evolução e os valores que movem os Visionists.",
      to: "/histvisionists",
    },
  ];

  return (
   
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 mt-20 md:mt-40 mb-32 md:mb-60 select-none">
      <h2 className="text-4xl sm:text-5xl md:text-[54px] font-light tracking-tight mb-8 md:mb-14 uppercase opacity-90">
        Descubra
      </h2>

      <div className="flex flex-col border-t border-white/10">
        {itens.map((item, index) => {
          const oItemEstaAtivo = itemFocado === index;

          return (
            <Link 
              key={index} 
              to={item.to}
              className="block"
            >
              <div
                onMouseEnter={() => definirItemFocado(index)}
                onMouseLeave={() => definirItemFocado(null)}
                className="border-b border-black/10 dark:border-white/10 cursor-pointer"
              >
                <div className="flex items-center gap-4 sm:gap-8 py-4 md:py-6 transition-all duration-300">
                  <span
                    className={`text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-wider transition-all duration-300 ${
                      oItemEstaAtivo
                        ? "text-principal translate-x-1"
                        : "text-black/30 dark:text-white/30"
                    }`}
                  >
                    {item.numero}
                  </span>
                  <span
                    className={`text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight transition-all duration-300 ${
                      oItemEstaAtivo ? "text-black dark:text-white translate-x-2" : "text-black/70 dark:text-white/70"
                    }`}
                  >
                    {item.titulo}
                  </span>
                </div>

                <div
                  className={`grid transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${
                    oItemEstaAtivo ? "grid-rows-[1fr] visible" : "grid-rows-[0fr] invisible"
                  }`}
                  aria-hidden={!oItemEstaAtivo}
                >
                  <div className="overflow-hidden">
                    <p
                      className={`pl-12 sm:pl-16 pb-4 md:pb-6 text-black/50 dark:text-white/50 max-w-2xl text-sm sm:text-base leading-relaxed transition-all duration-500 ease-out ${
                        oItemEstaAtivo ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
                      }`}
                    >
                      {item.conteudo}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Descubra;
