import React from "react";
import { Link } from "react-router-dom";

const HistJovi = () => {
  const cronologia = [
    {
      ano: "1995",
      titulo: "Fundação da Companhia",
      descricao: "Início das atividades em Chang'an, Dongguan, estabelecendo as bases de engenharia e desenvolvimento que viriam a moldar a empresa.",
    },
    {
      ano: "2011",
      titulo: "Oficialização e Áudio Inovador",
      descricao: "O nome vivo Mobile Communication Co., Ltd. é oficializado. Lançamento do smartphone V1, trazendo pioneirismo com foco em música e tecnologia de áudio SRS.",
    },
    {
      ano: "2012 - 2013",
      titulo: "Ultrafino, Hi-Fi e Telas 2K",
      descricao: "Apresentação do icônico X1 com apenas 6,55 mm de espessura e áudio Hi-Fi. Logo em seguida, introdução do sistema Funtouch OS e lançamento do Xplay3s, o primeiro com tela de resolução 2K.",
    },
    {
      ano: "2015 - 2016",
      titulo: "Expansão Global e Pesquisa 5G",
      descricao: "Início da internacionalização com a abertura de um centro de produção inteligente na Índia. Em 2016, criação do instituto focado estritamente em pesquisa e desenvolvimento da tecnologia 5G.",
    },
    {
      ano: "2018 - 2019",
      titulo: "Biometria na Tela e Ecossistema Gamer",
      descricao: "Lançamento do X20Plus UD, o primeiro smartphone do mundo com leitor de digitais sob o display. Criação do Centro Global de P&D em Inteligência Artificial e nascimento da submarca de alta performance iQOO.",
    },
    {
      ano: "2020 - 2022",
      titulo: "Parceria ZEISS e Chips Próprios",
      descricao: "Aliança estratégica global com a gigante da óptica ZEISS para revolucionar a fotografia móvel. Introdução de chips de imagem dedicados (V1, V2, V3) e consolidação com o dobrável X Fold.",
    },
    {
      ano: "2025",
      titulo: "A Chegada ao Brasil como JOVI",
      descricao: "Chegada oficial ao mercado brasileiro unindo o legado internacional de inovação, design premium e o marco definitivo da fabricação nacional pronta para o público do país.",
    },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-8 mt-34 sm:mt-16 mb-32 md:mb-60 select-none text-black dark:text-white">
      
      {/* Botão de Voltar */}
      <Link 
        to="/" 
        className="inline-flex items-center gap-2 text-sm opacity-50 hover:text-principal hover:opacity-100 transition-all mb-12 group cursor-pointer"
      >
        <span className="group-hover:-translate-x-1 transition-transform">←</span> Voltar para o início
      </Link>

      {/* Cabeçalho */}
      <div className="flex flex-col items-center text-center px-4 mb-24">
        <h1 className="text-[10vw] sm:text-[min(11vw,6rem)] lg:text-[min(6vw,90px)] font-bold whitespace-nowrap leading-none">
          História <span className="text-principal">JOVI</span>
        </h1>
        <p className="text-sm sm:text-[17px] mt-4 max-w-2xl leading-relaxed">
          Conheça a trajetória da vivo Mobile Communication Co., Ltd., criadora da marca JOVI. Uma jornada de alta performance e inovações que moldaram o mercado mundial.
        </p>
      </div>

      {/* Linha do Tempo / Timeline */}
      <div className="relative border-l-2 border-zinc-200 dark:border-zinc-800 ml-4 md:ml-32 space-y-12 md:space-y-16">
        {cronologia.map((item, index) => (
          <div key={index} className="relative pl-8 group">
            
            {/* Ponto indicador na linha */}
            <div className="absolute -left-[10px] top-1.5 w-4 h-4 rounded-full bg-white dark:bg-zinc-900 border-2 border-zinc-300 dark:border-zinc-700 group-hover:border-principal transition-all duration-300" />
            
            {/* Ano posicionado à esquerda no desktop */}
            <div className="md:absolute md:-left-40 md:top-0 md:w-32 md:text-right mb-2 md:mb-0">
              <span className="text-2xl font-bold opacity-30 group-hover:opacity-100 group-hover:text-principal transition-all duration-300">
                {item.ano}
              </span>
            </div>

            {/* Caixa de Texto */}
            <div className="space-y-2 max-w-3xl p-6 bg-zinc-100/40 dark:bg-zinc-800/30 rounded-2xl border border-zinc-200/50 dark:border-zinc-800/50 group-hover:border-principal/20 transition-all duration-300">
              <h3 className="text-xl font-bold tracking-tight">
                {item.titulo}
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm sm:text-base leading-relaxed">
                {item.descricao}
              </p>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};

export default HistJovi;
