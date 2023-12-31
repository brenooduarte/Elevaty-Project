import { useContext, useEffect, useState } from "react";
import { ProdutoContext } from "../context/ProdutoContext";

interface PaginacaoProps {
  limit: number;
  total: number;
  offset: number;
  setOffset: (offset: number) => void;
}

const MAX_ITEMS = 5;
const MAX_LEFT = (MAX_ITEMS - 1) / 2;

const Paginacao = ({ limit, total, offset, setOffset }: PaginacaoProps) => {
  const [paginaAtual, setPaginaAtual] = useState(1);

  const paginas = Math.ceil(total / limit);
  const primeiro = Math.max(paginaAtual - MAX_LEFT, 1);

  const context = useContext(ProdutoContext);

  const renderizarPaginas = () => {
    const ultimaPagina = Math.min(primeiro + MAX_ITEMS - 1, paginas);
  
    return Array.from({ length: ultimaPagina - primeiro + 1 })
      .map((_, index) => index + primeiro)
      .map((pagina) => (
        <li key={pagina}>
          <button
            className={`px-3 py-2 mx-1 bg-white border border-gray-400 ${
              pagina === paginaAtual ? "bg-gray-900 text-white border-0" : ""
            }`}
            onClick={() => handlePageClick(pagina)}
          >
            {pagina}
          </button>
        </li>
      ));
  };  

  const handlePageClick = (numeroPagina: number) => {
    
    const novoOffset = (numeroPagina - 1) * limit;
    const produtosDaPagina = context?.produtos.slice(novoOffset, novoOffset + limit) || [];

    context?.setProdutosDaPagina(produtosDaPagina) //rever essa situação de produtosDaPagina

    setPaginaAtual(numeroPagina);
    setOffset((numeroPagina - 1) * limit);
  };

  useEffect(() => {
    setPaginaAtual(Math.floor(offset / limit) + 1);
  }, [offset, limit]);

  return (
    <div className="my-10">
      <ul className="flex justify-center">
        <li>
          <button
            className="px-3 py-2 mx-1 bg-white border border-gray-400"
            onClick={() => handlePageClick(paginaAtual - 1)}
            disabled={paginaAtual === 1}
          >
            Anterior
          </button>
        </li>

        {renderizarPaginas()}

        <li>
          <button
            className="px-3 py-2 mx-1 bg-white border border-gray-400"
            onClick={() => handlePageClick(paginaAtual + 1)}
            disabled={paginaAtual === paginas}
          >
            Próximo
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Paginacao;
