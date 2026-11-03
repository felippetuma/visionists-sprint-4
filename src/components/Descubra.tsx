import React, { useState } from "react";
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
    <div className="w-full max-w-5xl mx-auto px-6 mt-40 select-none">
      <h2 className="text-[54px] font-light tracking-tight mb-14 uppercase opacity-90">
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
                className="border-b border-white/10 cursor-pointer overflow-hidden flex flex-col justify-center transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]"
                style={{ height: oItemEstaAtivo ? "220px" : "110px" }}
              >
                <div className="flex items-center gap-8 py-6 transition-all duration-300">
                  <span
                    className={`text-3xl md:text-4xl font-extrabold tracking-wider transition-all duration-300 ${
                      oItemEstaAtivo
                        ? "text-white translate-x-1"
                        : "text-white/30"
                    }`}
                  >
                    {item.numero}
                  </span>
                  <span
                    className={`text-3xl md:text-4xl font-bold tracking-tight transition-all duration-300 ${
                      oItemEstaAtivo ? "text-white translate-x-2" : "text-white/70"
                    }`}
                  >
                    {item.titulo}
                  </span>
                </div>

                <div
                  className={`transition-all duration-500 ease-out pl-16 text-white/50 max-w-2xl text-base leading-relaxed  ${
                    oItemEstaAtivo
                      ? "opacity-100 translate-y-0 pb-8"
                      : "opacity-0 -translate-y-4 pointer-events-none pb-0"
                  }`}
                >
                  <p>{item.conteudo}</p>
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
