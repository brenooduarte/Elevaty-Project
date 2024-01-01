import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { toast } from 'react-toastify';
import { IProduto } from "../types/Produto";
import ProdutoDetalhado from "../components/ProdutoDetalhado";
import TabelaProduto from "../components/TabelaProduto";
import Paginacao from "../components/Paginacao";
import Cabecalho from "../components/Cabecalho";
import { ProdutoContext } from "../context/ProdutoContext";

const Produto = () => {

  const [produtosFiltrados, setProdutoFiltrados] = useState<IProduto[]>([]);
  const [produtoSelecionado, setProdutoSelecionado] = useState<IProduto>({description:"", ean:"", id:0, name:"", price:"", image:"", taxes:""});
  const [openClose, setOpenClose] = useState(false);
  const [offset, setOffset] = useState(0);

  const LIMIT = 10;
  const QUANTITY = 50;

  const context = useContext(ProdutoContext);

  const handleVoltar = () => {
    setOpenClose(!openClose);
  };

  useEffect(() => {
    const getProdutos = async () => {
      try {
        const response = await axios.get<{ data: IProduto[] }>(`https://fakerapi.it/api/v1/products?_quantity=${QUANTITY}`);
        context?.setProdutos(response.data.data);
        
      } catch (error) {
        toast.error(`Erro ao obter produtos: ${error}`)
      }
    };

    getProdutos();    
  }, []);

  const filtrarProdutos = (searchInput: string) => {
    
    const produtosEncontrados = context?.produtos.filter((produto) => {
      const nome = produto.name.toUpperCase();
      const busca = searchInput.toUpperCase();
      
      return nome.startsWith(busca)
    });

    if (produtosEncontrados) {
      setProdutoFiltrados(produtosEncontrados);
      if (produtosEncontrados.length == 0) {
        toast.error(`Nenhum resultado encontrado para: ${searchInput}`)
      }
    }

  };

  const removerProduto = (idProduto: number) => {  
    const produtoEncontrado = context?.produtos.find((produto) => produto.id === Number(idProduto));
  
    if (produtoEncontrado) {
      const listaAtualizada = context?.produtos.filter((produto) => produto.id !== Number(idProduto));
  
      if (listaAtualizada) {
        context?.setProdutos(listaAtualizada);
    
        if (produtosFiltrados && produtosFiltrados.length > 0) {
          setProdutoFiltrados(listaAtualizada);
        }
      }
    }
  };
  
  const visualizarProduto = (idProduto: number) => {
    const produtoEncontrado = context?.produtos.find((produto) => produto.id === Number(idProduto));
  
    if (produtoEncontrado) {
      setProdutoSelecionado(produtoEncontrado);
      setOpenClose(!openClose)
    }
    
  }

  return (
    <div className="min-h-screen flex flex-col">
      
      <Cabecalho search={filtrarProdutos} />
      
      {produtosFiltrados.length > 0 

      ? <TabelaProduto produtos={produtosFiltrados} removerProduto={removerProduto} visualizarProduto={visualizarProduto}/>
      : <TabelaProduto produtos={context?.produtos ? context?.produtos : []} removerProduto={removerProduto} visualizarProduto={visualizarProduto}/>
      
      }

      {openClose && <ProdutoDetalhado produto={produtoSelecionado} voltar={handleVoltar} />}
    
      <Paginacao limit={LIMIT} total={context?.produtos ? context?.produtos.length : 0} offset={offset} setOffset={setOffset} />
    </div>
  );
};

export default Produto;
