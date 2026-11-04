import { Link } from "react-router-dom";

const HistVisionists = () => {
  const secoes = [
    {
      numero: "01",
      titulo: "O Desafio",
      subtitulo: "Um problema real entregue pela JOVI",
      descricao:
        "No início do ano, a JOVI nos entregou um problema que parece simples: melhorar a usabilidade da câmera. A luz some, o momento passa, e você ainda está procurando o modo certo para fotografar. Câmeras de celular têm cada vez mais recursos, mas cada recurso vira mais um menu para aprender. Nós decidimos que a resposta não era adicionar mais opções. Era fazer a câmera precisar de menos.",
    },
    {
      numero: "02",
      titulo: "A Pergunta Certa",
      subtitulo: "Ouvir o problema antes de desenhar telas",
      descricao:
        "Passamos a primeira sprint imersos em pesquisa, analisando o comportamento dos utilizadores e mapeando as suas maiores dores. Descobrimos o que o utilizador realmente quer: tirar a foto e ter o resultado certo, sem decidir nada no meio do caminho. Daí nasceu o CamSense, uma câmera que lê o ambiente e se ajusta sozinha.",
    },
    {
      numero: "03",
      titulo: "Cinco Disciplinas, Um Só Produto",
      subtitulo: "A união de frentes estratégicas",
      descricao:
        "O CamSense foi construído de forma integrada por cinco áreas: Software & Total Experience Design definiu o escopo e casos de uso; Storytelling deu voz e propósito ao produto; Front-End Design transformou a ideia em interface; Web Development colocou o protótipo no ar; e Computational Thinking com Python explorou a lógica do processamento de imagem.",
    },
    {
      numero: "04",
      titulo: "Do Rascunho ao Plano",
      subtitulo: "Estrutura, Casos de Uso e MoSCoW",
      descricao:
        "Na terceira sprint, a ideia ganhou forma de projeto. Fechamos o escopo definitivo, o backlog final priorizado pelo método MoSCoW e o diagrama de casos de uso. Cada funcionalidade — como o modo noturno automático e o processamento com fidelidade de cor — responde à mesma pergunta: isso deixa a câmera mais fácil de usar?",
    },
    {
      numero: "05",
      titulo: "A Tecnologia por Trás",
      subtitulo: "Inteligência artificial no próprio aparelho",
      descricao:
        "Por baixo da simplicidade existe uma base técnica robusta pensada para o contexto móvel: utilizamos o CameraX para o acesso nativo à câmera, TensorFlow Lite para o reconhecimento de cena em tempo real no próprio dispositivo e a Gemini Flash API para análises contextuais mais avançadas.",
    },
    {
      numero: "06",
      titulo: "Para Onde Vamos",
      subtitulo: "O futuro do CamSense",
      descricao:
        "O CamSense está em constante evolução através da nossa Sprint 4. Estamos a refinar os modelos de inteligência artificial e a polir a experiência de uso para entregar uma solução que entende a cena antes mesmo de abrir as configurações.",
    },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-8 mt-34 sm:mt-16 mb-32 md:mb-60 select-none text-black dark:text-white">
      {/* Botão de Voltar */}
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-sm opacity-50 hover:text-principal hover:opacity-100 transition-all mb-12 group cursor-pointer"
      >
        <span className="group-hover:-translate-x-1 transition-transform">
          ←
        </span>{" "}
        Voltar para o início
      </Link>

      <div className="flex flex-col items-center text-center px-4 mb-24">
        <h1 className="text-4xl sm:text-6xl lg:text-[min(6vw,90px)] font-bold leading-tight lg:leading-none text-balance uppercase">
          A Trajetória do <span className="text-principal">CamSense</span>
        </h1>
        <p className="text-sm sm:text-[17px] mt-4 max-w-2xl leading-relaxed opacity-80">
          Uma câmera que entende a cena antes de você abrir as configurações.
          Conheça a jornada dos Visionists para solucionar o desafio de
          usabilidade da JOVI.
        </p>
      </div>

      <div className="space-y-20">
        {secoes.map((secao, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row gap-6 md:gap-12 pt-12 border-t border-zinc-200 dark:border-zinc-800 group"
          >
            <div className="w-full md:w-1/3 space-y-2">
              <span className="text-4xl md:text-5xl font-extrabold text-zinc-300 dark:text-zinc-700 group-hover:text-principal transition-colors duration-300 block">
                {secao.numero}
              </span>
              <h2 className="text-2xl font-bold tracking-tight text-black dark:text-white">
                {secao.titulo}
              </h2>
              <p className="text-sm text-principal font-medium tracking-wide">
                {secao.subtitulo}
              </p>
            </div>

            <div className="w-full md:w-2/3">
              <p className="text-zinc-600 dark:text-zinc-400 text-base sm:text-lg leading-relaxed pt-1">
                {secao.descricao}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistVisionists;
