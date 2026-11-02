import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import NavBar from "./components/NavBar"
import Home from "./pages/Home"
import Projeto from "./pages/Projeto"
import Sobre from "./pages/Sobre"

const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <NavBar/>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/projeto" element={<Projeto/>}/>
            <Route path="/sobrenos" element={<Sobre/>}/>
          </Routes>
      </div>
    </Router>
  )
}

export default App
