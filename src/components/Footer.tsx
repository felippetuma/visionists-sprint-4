
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-full border-t border-black/5 dark:border-white/10 py-8 px-4 sm:px-6 mt-auto text-black dark:text-white font-work-sans">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        
        <p className="text-sm font-light opacity-50 text-center sm:text-left">
          &copy; {new Date().getFullYear()} <span className="font-normal text-principal">Visionists</span>. Todos os direitos reservados.
        </p>

        <div className="flex gap-6 text-sm font-light opacity-60">
          <Link to="/" className="hover:text-principal hover:opacity-100 transition-all">Início</Link>
          <Link to="/projeto" className="hover:text-principal hover:opacity-100 transition-all">Projeto</Link>
          <Link to="/sobrenos" className="hover:text-principal hover:opacity-100 transition-all">Sobre Nós</Link>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
