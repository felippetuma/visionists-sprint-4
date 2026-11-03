import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import NavBar from "./components/NavBar"
import Home from "./pages/Home"
import Projeto from "./pages/Projeto"
import Sobre from "./pages/Sobre"
import Login from "./pages/Login"
import Cadastro from "./pages/Cadastro" 
import HistJovi from "./pages/HistJovi"
import HistVisionists from "./pages/HistVisionists" // 1. Adicione a importação aqui
import Error from "./pages/Error"
import Dashboard from "./pages/Dashboard"

const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen text-black bg-white dark:text-white dark:bg-zinc-900">
        <NavBar/>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/projeto" element={<Projeto/>}/>
            <Route path="/sobrenos" element={<Sobre/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/cadastro" element={<Cadastro/>}/> 
            <Route path="/histjovi" element={<HistJovi/>}/>
            <Route path="/histvisionists" element={<HistVisionists/>}/>
            <Route path="/dashboard" element={<Dashboard/>}/>
            <Route path="/*" element={<Error/>}/>
          </Routes>
      </div>
    </Router>
  )
}

export default App
