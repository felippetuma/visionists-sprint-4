export type Operacao = "x" | "-" | "+" | "/";

export interface QuestaoTabuada {
    a: number;
    b: number;
    operacao: Operacao;
    resposta: number;
}

export function numeroAleatorio(min: number, max: number): number {
    const minimo = Math.ceil(min);
    const maximo = Math.floor(max);
    return Math.floor(Math.random() * (maximo - minimo + 1)) + minimo;
}

export function calcularResposta(a: number, b: number, operacao: Operacao): number {
    switch (operacao) {
        case "x":
            return a * b;
        case "-":
            return a - b;
        case "+":
            return a + b;
        case "/":
            return a / b;
    }
}

const OPERACOES: Operacao[] = ["x", "-", "+", "/"];

export function gerarQuestaoTabuada(): QuestaoTabuada {
    const operacao = OPERACOES[numeroAleatorio(0, OPERACOES.length - 1)];
    const b = numeroAleatorio(1, 10);
    let a = numeroAleatorio(1, 10);

    if (operacao === "/") a = b * numeroAleatorio(1, 10);

    return { a, b, operacao, resposta: calcularResposta(a, b, operacao) };
}

export function lerNumero(texto: string): number | null {
    const limpo = texto.trim().replace(",", ".");
    if (limpo === "") return null;
    const numero = Number(limpo);
    return Number.isFinite(numero) ? numero : null;
}
