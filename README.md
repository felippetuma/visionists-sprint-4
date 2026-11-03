# CamSense (Visionists)

Site do CamSense, a câmera inteligente da JOVI, feito pela equipe Visionists. O front-end é em React e a API de cadastro e login é em Python.

## Deploy

https://visionists-five.vercel.app

## Tecnologias utilizadas

Front-end:
- React e TypeScript
- Vite
- React Router 7
- Tailwind CSS 4
- lucide-react (ícones)

API:
- Python com FastAPI
- Pydantic
- bcrypt (hash das senhas)

Hospedagem: Vercel.

## Como instalar as dependências

Você precisa de Node.js 20 ou mais novo e de Python 3.9 ou mais novo. Na raiz do projeto:

```bash
npm install
pip install -r requirements.txt uvicorn
```

O `requirements.txt` lista o FastAPI e o bcrypt. O `uvicorn` é o servidor que roda a API e fica de fora do arquivo porque só é usado localmente.

## Como executar o projeto

São dois processos, cada um em um terminal. Os dois comandos rodam na raiz do projeto.

API, na porta 8000:

```bash
uvicorn api.main:app --reload --port 8000
```

Front-end, na porta 5173:

```bash
npm run dev
```

Depois abra http://localhost:5173. Use esse endereço com `http://`, porque é a origem que a API aceita no CORS.

A API guarda os dados na memória. Quando ela reinicia, e isso inclui o `--reload` toda vez que você salva um arquivo `.py`, as contas cadastradas somem e só o usuário de teste abaixo continua existindo.

Outros comandos:

| Comando | O que faz |
|---|---|
| `npm run build` | Confere os tipos e gera o build em `dist/` |
| `npm run preview` | Serve o build localmente |
| `npm run lint` | Roda o ESLint |

O build falha se houver import ou variável sem uso. Vale rodá-lo antes de subir para a Vercel.

## Usuários e senhas para teste

| E-mail | Senha |
|---|---|
| `admin@visionists.dev` | `123456` |

Você também pode criar uma conta em `/cadastro`. A senha precisa ter pelo menos 6 caracteres.

## Páginas

| Rota | Arquivo | Conteúdo |
|---|---|---|
| `/` | `src/pages/Home.tsx` | Página inicial. A seção "Descubra" liga às quatro páginas institucionais (sobre nós, projeto e as duas histórias) |
| `/projeto` | `src/pages/Projeto.tsx` | Apresentação do projeto, com imagens dos modos do app |
| `/sobrenos` | `src/pages/Sobre.tsx` | Equipe, com seletor de integrantes |
| `/histjovi` | `src/pages/HistJovi.tsx` | Trajetória e marcos da Jovi |
| `/histvisionists` | `src/pages/HistVisionists.tsx` | Como a equipe Visionists começou |
| `/login` | `src/pages/Login.tsx` | Login |
| `/cadastro` | `src/pages/Cadastro.tsx` | Cadastro, que já entra na conta ao terminar |
| `/dashboard` | `src/pages/Dashboard.tsx` | Área logada, com o menu da conta |
| qualquer outra | `src/pages/Error.tsx` | Página 404 |

As rotas ficam em `src/App.tsx`. A barra de navegação mostra "Login" ou "Dashboard", dependendo de a pessoa estar logada.

## Tema e estilo

O tema claro e o escuro são controlados por `src/components/SelectTheme.tsx`, e a escolha fica salva no `localStorage`. As cores do projeto estão no bloco `@theme` de `src/index.css`: `principal` (`#5364D4`) é a cor de destaque e `jovi` (`#0000ee`) é a cor da marca JOVI.

Os layouts são responsivos. Classes sem prefixo valem para celular, e `sm:` (640px), `md:` (768px) e `lg:` (1024px) valem dali para cima.

## API

Endereço local: `http://localhost:8000`. O CORS aceita `http://localhost:5173` e o domínio da Vercel.

| Método | Rota | Corpo | Resposta |
|---|---|---|---|
| `GET` | `/api/clientes` | | `200` com a lista de clientes, sem senha |
| `POST` | `/api/clientes` | `{ nome, email, senha }` | `201` com o cliente criado |
| `POST` | `/api/login` | `{ email, senha }` | `200` com `{ mensagem, cliente }` |

Erros (a mensagem vem no campo `detail`):

| Código | Quando |
|---|---|
| `400` | Senha com menos de 6 caracteres, ou e-mail ou senha errados no login |
| `403` | Conta desativada |
| `409` | E-mail já cadastrado |

Exemplo:

```bash
curl -X POST http://localhost:8000/api/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@visionists.dev","senha":"123456"}'
```

## Como o login funciona

Ao entrar, o navegador guarda o cliente devolvido pela API em `localStorage["login"]`. O Dashboard e a barra de navegação leem essa chave, e o botão "Sair" a apaga. Não existe token nem sessão no servidor, então isso serve para a demonstração e não protege dados reais.

## Estrutura

```
api/main.py         API FastAPI
requirements.txt    Dependências Python
src/
  App.tsx           Rotas
  pages/            Uma página por rota (Home, Projeto, Sobre, HistJovi, HistVisionists, Login, Cadastro, Dashboard e Error)
  components/       NavBar, SelectTheme e Descubra
  assets/           Logo e imagens usadas nas páginas
    imgs/           Imagens novas dos modos do app (ainda não usadas no código)
    slidesImgs/     Fotos de cachorros (ainda não usadas no código)
  index.css         Tailwind e cores do tema
```

## Limitações conhecidas

- Os dados da API ficam na memória e se perdem a cada reinício.
- `Login.tsx` e `Cadastro.tsx` chamam `http://localhost:8000` direto. Na Vercel essas chamadas não alcançam a API, e o endereço precisa virar um caminho relativo (`/api/...`) ou uma variável de ambiente.

## Equipe

Davi Toyota, Felippe Tuma (Tech Lead), Felipe Motta, Renan Silva e Yan da Silva.
