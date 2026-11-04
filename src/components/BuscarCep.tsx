import { X } from "lucide-react";
import { useEffect, useState, type SyntheticEvent } from "react";

interface Endereco {
    cep: string;
    bairro: string;
    localidade: string;
    uf: string;
}

function formatarCep(valor: string): string {
    const digitos = valor.replace(/\D/g, "").slice(0, 8);
    return digitos.length > 5 ? `${digitos.slice(0, 5)}-${digitos.slice(5)}` : digitos;
}

const BuscarCep = () => {
    const [cep, setCep] = useState("");
    const [buscandoCep, setBuscandoCep] = useState(false);
    const [modalAberto, setModalAberto] = useState(false);
    const [endereco, setEndereco] = useState<Endereco | null>(null);
    const [erroCep, setErroCep] = useState("");
    useEffect(() => {
        if (!modalAberto) return;
        const aoApertarEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") setModalAberto(false);
        };
        document.addEventListener("keydown", aoApertarEsc);
        return () => document.removeEventListener("keydown", aoApertarEsc);
    }, [modalAberto]);


    async function buscarCep(e: SyntheticEvent) {
        e.preventDefault();
        setEndereco(null);
        setErroCep("");

        const digitos = cep.replace(/\D/g, "");
        if (digitos.length !== 8) {
            setErroCep("Digite um CEP com 8 números.");
            setModalAberto(true);
            return;
        }

        setBuscandoCep(true);
        try {
            const response = await fetch(`https://viacep.com.br/ws/${digitos}/json/`);
            if (!response.ok) throw new Error("falha na consulta");
            const data = await response.json();

            // o ViaCEP responde 200 com { erro: true } quando o CEP tem formato válido mas não existe
            if (data.erro) {
                setErroCep("CEP não encontrado.");
            } else {
                setEndereco(data as Endereco);
            }
        } catch {
            setErroCep("Não foi possível consultar o CEP agora. Tente de novo em instantes.");
        } finally {
            setBuscandoCep(false);
            setModalAberto(true);
        }
    }
    return (
        <div className="rounded-xl bg-zinc-300 dark:bg-zinc-700 p-4 sm:p-6 shadow">
            <h2 className="text-lg font-semibold">Assistência Técnica</h2>
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mt-2">
                <p>Busque uma assistência técnica especializada mais perto de você</p>
                <div>
                    <form onSubmit={buscarCep} className="flex flex-col sm:flex-row sm:items-center gap-2">
                        <label className="font-medium block">
                            Informe seu CEP:
                        </label>
                        <input
                            type="text"
                            inputMode="numeric"
                            autoComplete="postal-code"
                            placeholder="00000-000"
                            value={cep}
                            onChange={(e) => setCep(formatarCep(e.target.value))}
                            required
                            className="w-full sm:w-auto bg-zinc-400 dark:bg-zinc-700  border-2 text-center border-white/10 rounded-3xl py-2 placeholder-black/40 focus:outline-none focus:border-principal focus:ring-1 focus:ring-principal transition-all"
                        />

                        <button
                            type="submit"
                            disabled={buscandoCep}
                            className="bg-principal text-white px-6 shadow-md hover:shadow-principal py-3 rounded-4xl cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {buscandoCep ? "Buscando..." : "Enviar"}
                        </button>
                    </form>
                </div>
                {modalAberto && (
                    <div
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
                        onClick={() => setModalAberto(false)}
                    >
                        <div
                            role="dialog"
                            aria-modal="true"
                            aria-labelledby="titulo-modal-cep"
                            onClick={(e) => e.stopPropagation()}
                            className="relative w-full max-w-md rounded-2xl bg-zinc-300 dark:bg-zinc-800 p-6 shadow-2xl"
                        >
                            <button
                                type="button"
                                aria-label="Fechar"
                                onClick={() => setModalAberto(false)}
                                className="absolute right-3 top-3 rounded-full p-1 hover:text-principal cursor-pointer"
                            >
                                <X size={20} />
                            </button>

                            <h3 id="titulo-modal-cep" className="text-lg font-semibold pr-8">
                                {endereco ? "Endereço encontrado" : "Não foi possível buscar"}
                            </h3>

                            {endereco ? (
                                <dl className="mt-4 space-y-2 text-sm">
                                    <div><dt className="opacity-60">CEP</dt><dd>{endereco.cep}</dd></div>
                                    <div><dt className="opacity-60">Bairro</dt><dd>{endereco.bairro || "Não informado"}</dd></div>
                                    <div><dt className="opacity-60">Cidade</dt><dd>{endereco.localidade} - {endereco.uf}</dd></div>
                                </dl>
                            ) : (
                                <p className="mt-4 rounded-lg bg-red-300 px-3 py-2 text-sm text-red-600">{erroCep}</p>
                            )}

                            <button
                                type="button"
                                onClick={() => setModalAberto(false)}
                                className="mt-6 w-full rounded-xl bg-principal py-2 text-white font-medium cursor-pointer hover:opacity-90"
                            >
                                Fechar
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default BuscarCep
