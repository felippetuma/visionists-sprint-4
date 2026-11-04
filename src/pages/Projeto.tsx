import { Link } from "react-router-dom";

import modoNoturnoImg from "../assets/Modo Noturno.png";
import imagemPetImg from "../assets/imagemPet.png";
import modoDocumentoImg from "../assets/Modo documento.png";
import chatBotImg from "../assets/ChatBot.png";

const Projeto = () => {
  const funcionalidades = [
    {
      titulo: "Modo Noturno Inteligente",
      descricao:
        "A câmera identifica cenários de baixa luminosidade em tempo real e sugere a ativação automática da otimização noturna, capturando detalhes urbanos complexos.",
      img: modoNoturnoImg,
      alt: "Demonstração do Modo Noturno CamSense",
    },
    {
      titulo: "Reconhecimento de Pets",
      descricao:
        "Algoritmos de detecção identificam animais de estimação na cena de forma instantânea, facilitando o foco e capturando a atenção do pet de forma nativa.",
      img: imagemPetImg,
      alt: "Interface de Detecção Computacional de Pets",
    },
    {
      titulo: "Modo Documento e Produtividade",
      descricao:
        "Ao apontar o dispositivo para papéis, planilhas ou tabelas, o sistema reconhece as linhas estruturais e disponibiliza atalhos imediatos para digitalização.",
      img: modoDocumentoImg,
      alt: "Scanner e Digitalizador de Documentos Inteligente",
    },
    {
      titulo: "Assistente Conversacional JoviHelp",
      descricao:
        "Um hub inteligente em formato de chatbot integrado à interface fotográfica para auxiliar os utilizadores a explorar recursos sem poluir a tela principal.",
      img: chatBotImg,
      alt: "Interface do ChatBot integrado JoviHelp",
    },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-8 mt-34 sm:mt-16 mb-32 md:mb-60 select-none text-black dark:text-white font-work-sans">
      {/* Botão de Voltar */}
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-sm font-light opacity-50 hover:text-principal hover:font-normal hover:opacity-100 transition-all mb-12 group cursor-pointer"
      >
        <span className="group-hover:-translate-x-1 transition-transform">
          ←
        </span>{" "}
        Voltar para o início
      </Link>

      <div className="flex flex-col items-center text-center px-4 mb-24">
        <h1 className="text-[10vw] sm:text-[min(11vw,6rem)] lg:text-[min(6vw,90px)] font-bold whitespace-nowrap leading-none uppercase">
          O Projeto <span className="text-principal">CamSense</span>
        </h1>
        <p className="text-sm sm:text-[17px] mt-4 max-w-2xl font-light leading-relaxed opacity-80">
          Nossa resposta ao desafio de usabilidade da JOVI. Uma camada de
          software inteligente projetada para tornar a fotografia móvel
          intuitiva, ágil e focada no momento.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-28 p-8 bg-zinc-100/40 dark:bg-zinc-800/30 rounded-3xl border border-zinc-200/50 dark:border-zinc-800/50">
        <div className="space-y-4">
          <span className="text-xs font-medium tracking-widest text-principal uppercase block">
            Abordagem Técnica
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Menos menus. Mais fotografia.
          </h2>
        </div>
        <div>
          <p className="text-zinc-600 dark:text-zinc-400 text-sm sm:text-base font-light leading-relaxed">
            Desenvolvido sob o pilar de cinco disciplinas acadêmicas, o
            protótipo do CamSense utiliza a infraestrutura de ponta do{" "}
            <strong className="font-normal text-black dark:text-white">
              CameraX
            </strong>{" "}
            acoplada a modelos locais de classificação do{" "}
            <strong className="font-normal text-black dark:text-white">
              TensorFlow Lite
            </strong>
            . O resultado é um ecossistema fluido capaz de ler e entender
            contextos complexos sem sobrecarregar o hardware do smartphone.
          </p>
        </div>
      </div>

      <div className="space-y-8">
        <h3 className="text-xl font-bold tracking-tight mb-6 opacity-40 uppercase tracking-wider text-center md:text-left">
          Recursos do Ecossistema
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {funcionalidades.map((item, index) => (
            <div
              key={index}
              className="bg-zinc-100/40 dark:bg-zinc-800/30 rounded-3xl border border-zinc-200/50 dark:border-zinc-800/50 overflow-hidden hover:border-principal/30 dark:hover:border-principal/20 transition-all duration-300 flex flex-col group"
            >
              <div className="w-full h-52 sm:h-64 overflow-hidden bg-zinc-200/50 dark:bg-zinc-900/50 border-b border-zinc-200/50 dark:border-zinc-800/50">
                <img
                  src={item.img}
                  alt={item.alt}
                  className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                />
              </div>

              <div className="p-6 md:p-8 space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <h4 className="text-xl font-bold tracking-tight group-hover:text-principal transition-colors duration-300">
                    {item.titulo}
                  </h4>
                  <p className="text-zinc-600 dark:text-zinc-400 text-sm font-light leading-relaxed pt-1">
                    {item.descricao}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projeto;
