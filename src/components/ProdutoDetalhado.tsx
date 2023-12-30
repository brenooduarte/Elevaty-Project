import { IProduto } from '../types/Produto';

interface ProdutoDetalhadoProps {
  produto: IProduto;
  voltar: () => void
}

const ProdutoDetalhado = ({produto, voltar}: ProdutoDetalhadoProps) => {

  const handleVoltarClick = () => {
    voltar()
  };

  return (
    <div className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50 py-10">
      <div className="max-h-full w-3/5 overflow-y-auto sm:rounded-2xl bg-gray-100">
        <div className="m-8 my-20 max-w-[700px] mx-auto flex flex-col items-center space-y-4">
          <div className="flex w-full">
            <div className="w-1/2 flex-wrap">
              <img src={'https://encurtador.com.br/MTZ27'} alt="Produto" className="w-full h-auto rounded" />
            </div>
            <div className="w-1/2 pl-10 flex-wrap">
              <h1 className="mb-4 text-3xl font-extrabold">{produto.name}</h1>
              <p className="mb-4 text-gray-700">{produto.description}</p>
              <p>
                <span className="mb-4 font-extrabold">Preço: </span>
                <span className=" font-extrabold text-2xl text-orange-400">R$ {produto.price}</span>
              </p>
              <p>
                <span className="font-extrabold">Taxa: </span>{produto.taxes}%
              </p>
              <p>
                <span className="font-extrabold">Código de Rastreamento EAN: </span>{produto.ean}
              </p>
            </div>
          </div>
          <div className="w-[15rem]">
            <button
              onClick={handleVoltarClick}
              className="p-2 bg-white border border-gray-400 shadow-xl mt-10 rounded-full w-full font-semibold transition duration-300 hover:bg-black hover:text-white"
            >
              Voltar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProdutoDetalhado;
