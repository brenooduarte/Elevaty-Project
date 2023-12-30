import { useNavigate } from "react-router-dom";
import BarraPesquisa from "./BarraPesquisa";
import Filtro from "./Filtro";
import { useState } from "react";
import { toast } from "react-toastify";

interface CabecalhoProps {
  search: (searchInput: string) => void;
}

const Cabecalho = ({ search }: CabecalhoProps) => {

  const navigate = useNavigate();
  const [mostrarFiltro, setMostrarFiltro] = useState(false);

  const handleToggleFiltro = () => {
    setMostrarFiltro((prev) => !prev);
  };

  return (
    <div className="flex bg-gray-800 pt-5 pb-5 border-b-4">
      <div className="w-2/3">
          <BarraPesquisa search={search} />
          <button
              className={`px-2 py-1 float-right mr-16 rounded-full ${mostrarFiltro ? 'transition duration-300 bg-mint-green text-gray-800' : 'transition duration-300 border border-green-300 text-white'}`}
              onClick={handleToggleFiltro}
          >
              <span className="inline-block mr-2">Filtro</span>
          </button>

          {mostrarFiltro && <Filtro />}

      </div>

      <div className="w-1/3">
        <button
          type="submit"
          className="text-white px-2 py-1 border rounded-full border-green-300"
          onClick={() => {
            toast.success("Logout realizado com sucesso");
            navigate("/login");
          }}
        >
          <span className="inline-block mr-2">Logout</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-4 h-4 inline-block"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Cabecalho;
