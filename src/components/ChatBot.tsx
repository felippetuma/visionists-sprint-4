import { X } from "lucide-react";
import { useEffect, useRef, useState, type SyntheticEvent } from "react";
import { gerarQuestaoTabuada, lerNumero, numeroAleatorio, type QuestaoTabuada } from "../utils/jogos";

type Autor = "bot" | "usuario";
type Jogo = "adivinhacao" | "tabuada" | "parimpar";
type Tela = "menu" | "jogos" | "jogando" | "continuar";

interface Mensagem {
    id: number;
    autor: Autor;
    texto: string;
}

const JOGOS: Record<Jogo, { nome: string; descricao: string }> = {
    adivinhacao: { nome: "Jogo de Adivinhação", descricao: "Acerte qual é o número sorteado entre 1 e 100" },
    tabuada: { nome: "Jogo de Tabuada", descricao: "Sorteia dois números e uma operação, e acerte o resultado!" },
    parimpar: { nome: "Par ou Ímpar", descricao: "Acerte se o número é par ou ímpar!" },
};

const botaoOpcao = "w-full rounded-xl bg-principal px-4 py-2 text-left text-sm font-medium text-white cursor-pointer hover:opacity-90 transition-opacity";
const botaoSecundario = "w-full rounded-xl bg-zinc-400 dark:bg-zinc-700 px-4 py-2 text-left text-sm font-medium cursor-pointer hover:bg-zinc-500/40 transition-colors";

const Conversa = ({ aoFechar }: { aoFechar: () => void }) => {
    const proximoId = useRef(1);
    const fimRef = useRef<HTMLDivElement>(null);

    const [mensagens, setMensagens] = useState<Mensagem[]>([
        { id: 0, autor: "bot", texto: "Bem-vindo ao JOVI Chatbot! Escolha uma opção:" },
    ]);
    const [tela, setTela] = useState<Tela>("menu");
    const [jogo, setJogo] = useState<Jogo | null>(null);
    const [entrada, setEntrada] = useState("");

    const [numeroSorteado, setNumeroSorteado] = useState(0);
    const [tentativas, setTentativas] = useState(0);
    const [questao, setQuestao] = useState<QuestaoTabuada | null>(null);

    function falar(autor: Autor, texto: string) {
        setMensagens((atuais) => [...atuais, { id: proximoId.current++, autor, texto }]);
    }

    useEffect(() => {
        const aoApertarEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") aoFechar();
        };
        document.addEventListener("keydown", aoApertarEsc);
        return () => document.removeEventListener("keydown", aoApertarEsc);
    }, [aoFechar]);

    useEffect(() => {
        fimRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    }, [mensagens]);

    function voltarAoMenu() {
        setJogo(null);
        setEntrada("");
        setTela("menu");
        falar("bot", "Posso ajudar com mais alguma coisa?");
    }

    function escolherMenu(opcao: string, texto: string, resposta?: string) {
        falar("usuario", `${opcao}. ${texto}`);
        if (resposta) falar("bot", resposta);
    }

    function iniciarJogo(novoJogo: Jogo) {
        setJogo(novoJogo);
        setEntrada("");
        setTela("jogando");

        if (novoJogo === "adivinhacao") {
            setNumeroSorteado(numeroAleatorio(1, 100));
            setTentativas(0);
            falar("bot", "Um número aleatório foi gerado! Digite um número de 1 a 100:");
        } else if (novoJogo === "tabuada") {
            const nova = gerarQuestaoTabuada();
            setQuestao(nova);
            falar("bot", `Qual o resultado de ${nova.a} ${nova.operacao} ${nova.b}?`);
        } else {
            setNumeroSorteado(numeroAleatorio(1, 100));
            falar("bot", "O número sorteado é PAR ou ÍMPAR?");
        }
    }

    function enviarResposta(e: SyntheticEvent) {
        e.preventDefault();
        const texto = entrada.trim();
        const valor = lerNumero(texto);

        if (valor === null) {
            falar("bot", "Isso não é um número. Digite só números, por favor.");
            setEntrada("");
            return;
        }

        falar("usuario", texto);
        setEntrada("");

        if (jogo === "adivinhacao") {
            const total = tentativas + 1;
            setTentativas(total);

            if (valor < numeroSorteado) {
                falar("bot", `O número aleatório é MAIOR que ${valor}. Digite um novo número:`);
            } else if (valor > numeroSorteado) {
                falar("bot", `O número aleatório é MENOR que ${valor}. Digite um novo número:`);
            } else {
                falar("bot", `Você adivinhou! O número aleatório era ${numeroSorteado}, em ${total} ${total === 1 ? "tentativa" : "tentativas"}.`);
                setTela("continuar");
            }
        } else if (jogo === "tabuada" && questao) {
            if (valor === questao.resposta) {
                falar("bot", "Acertou! Parabéns!");
            } else {
                falar("bot", `Errou! A resposta correta era ${questao.resposta}.`);
            }
            setTela("continuar");
        }
    }

    function responderParImpar(escolha: "PAR" | "ÍMPAR") {
        falar("usuario", escolha);
        const ehPar = numeroSorteado % 2 === 0;
        const acertou = (escolha === "PAR") === ehPar;
        falar("bot", `Você ${acertou ? "acertou" : "errou"}! O número era ${numeroSorteado}.`);
        setTela("continuar");
    }

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
            onClick={aoFechar}
        >
            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="titulo-chatbot"
                onClick={(e) => e.stopPropagation()}
                className="relative flex max-h-[90vh] w-full max-w-md flex-col rounded-2xl bg-zinc-300 dark:bg-zinc-800 p-4 shadow-2xl"
            >
                <div className="flex items-center justify-between pb-3">
                    <h3 id="titulo-chatbot" className="text-lg font-semibold">JOVI Chatbot</h3>
                    <button
                        type="button"
                        aria-label="Fechar"
                        onClick={aoFechar}
                        className="rounded-full p-1 hover:text-principal cursor-pointer"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div aria-live="polite" className="flex min-h-40 flex-1 flex-col gap-2 overflow-y-auto rounded-xl bg-zinc-200 dark:bg-zinc-900 p-3">
                    {mensagens.map((m) => (
                        <p
                            key={m.id}
                            className={`max-w-[85%] whitespace-pre-line rounded-2xl px-3 py-2 text-sm ${
                                m.autor === "bot"
                                    ? "self-start bg-zinc-400 dark:bg-zinc-700"
                                    : "self-end bg-principal text-white"
                            }`}
                        >
                            {m.texto}
                        </p>
                    ))}
                    <div ref={fimRef} />
                </div>

                <div className="mt-3 flex flex-col gap-2">
                    {tela === "menu" && (
                        <>
                            <button type="button" className={botaoOpcao} onClick={() => { escolherMenu("1", "Jogos de Matemática"); falar("bot", "Escolha um dos jogos para participar:"); setTela("jogos"); }}>
                                1. Jogos de Matemática
                            </button>
                            <button type="button" className={botaoOpcao} onClick={() => escolherMenu("2", "O que o Modo Pet faz?", "O Modo Pet tenta chamar a atenção do seu animal, com opções predefinidas ou feitas pelo usuário!")}>
                                2. O que o Modo Pet faz?
                            </button>
                            <button type="button" className={botaoOpcao} onClick={() => escolherMenu("3", "Como funciona o Modo Documentos?", "Basta centralizar qualquer tipo de texto na câmera e você será exibido com algumas opções como: Digitalizar, Lembrete, Compartilhar, Traduzir e outros!")}>
                                3. Como funciona o Modo Documentos?
                            </button>
                            <button type="button" className={botaoOpcao} onClick={() => escolherMenu("4", "Falar com um humano", "O suporte está indisponível no momento, tente novamente mais tarde!")}>
                                4. Falar com um humano
                            </button>
                        </>
                    )}

                    {tela === "jogos" && (
                        <>
                            {(Object.keys(JOGOS) as Jogo[]).map((id) => (
                                <button
                                    key={id}
                                    type="button"
                                    className={botaoOpcao}
                                    onClick={() => { falar("usuario", JOGOS[id].nome); iniciarJogo(id); }}
                                >
                                    {JOGOS[id].nome}
                                    <span className="block text-xs font-normal opacity-80">{JOGOS[id].descricao}</span>
                                </button>
                            ))}
                            <button type="button" className={botaoSecundario} onClick={voltarAoMenu}>Voltar ao menu</button>
                        </>
                    )}

                    {tela === "jogando" && jogo !== "parimpar" && (
                        <form onSubmit={enviarResposta} className="flex gap-2">
                            <input
                                type="text"
                                inputMode={jogo === "adivinhacao" ? "numeric" : "text"}
                                autoComplete="off"
                                autoFocus
                                value={entrada}
                                onChange={(e) => setEntrada(e.target.value)}
                                placeholder="Digite sua resposta"
                                aria-label="Sua resposta"
                                required
                                className="min-w-0 flex-1 rounded-xl border-2 border-white/10 bg-zinc-400 dark:bg-zinc-700 px-3 py-2 placeholder-black/40 focus:border-principal focus:outline-none focus:ring-1 focus:ring-principal"
                            />
                            <button type="submit" className="rounded-xl bg-principal px-4 py-2 text-sm font-medium text-white cursor-pointer hover:opacity-90">
                                Enviar
                            </button>
                        </form>
                    )}

                    {tela === "jogando" && jogo === "parimpar" && (
                        <div className="flex gap-2">
                            <button type="button" className={botaoOpcao} onClick={() => responderParImpar("PAR")}>Par</button>
                            <button type="button" className={botaoOpcao} onClick={() => responderParImpar("ÍMPAR")}>Ímpar</button>
                        </div>
                    )}

                    {tela === "jogando" && (
                        <button type="button" className={botaoSecundario} onClick={() => { falar("usuario", "Sair do jogo"); voltarAoMenu(); }}>
                            Sair do jogo
                        </button>
                    )}

                    {tela === "continuar" && jogo && (
                        <>
                            <button type="button" className={botaoOpcao} onClick={() => { falar("usuario", "Jogar de novo"); iniciarJogo(jogo); }}>
                                Jogar de novo
                            </button>
                            <button type="button" className={botaoSecundario} onClick={() => { falar("usuario", "Voltar ao menu"); voltarAoMenu(); }}>
                                Voltar ao menu
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

interface ChatBotProps {
    aberto: boolean;
    aoFechar: () => void;
}
const ChatBot = ({ aberto, aoFechar }: ChatBotProps) => (aberto ? <Conversa aoFechar={aoFechar} /> : null);

export default ChatBot;
