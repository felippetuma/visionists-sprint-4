import { Home } from "lucide-react"
import { Link } from "react-router-dom"

const Error = () => {
    return (
        <main className="grow flex flex-col items-center justify-center">
            <h1 className="font-bold text-principal text-[160px]">404</h1>
            <p className="text-2xl">Ops! Página não encontrada</p>
            <p className="text-gray-400 mb-8 max-w-md">A pagina que você procura não existe ou foi removida.</p>
            <Link to='/' className="bg-principal rounded-full p-4 mt-6 font-normal inline-flex items-center gap-2 shadow-lg hover:shadow-principal hover:-translate-y-1"><Home size={18}/> Voltar Para Página Inicial</Link>
        </main>
    )
}

export default Error
