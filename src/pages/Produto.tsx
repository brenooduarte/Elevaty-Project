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

  const [produtoSelecionado, setProdutoSelecionado] = useState<IProduto>({description:"", ean:"", id:0, name:"", price:"", image:"", taxes:""});
  const [openClose, setOpenClose] = useState(false);
  const [offset, setOffset] = useState(0);

  const LIMIT = 10;
  const QUANTITY = 50;

  const context = useContext(ProdutoContext);

  const handleVoltar = () => {
    setOpenClose(!openClose);
  };

  const getProdutos = async () => {
    try {
      const response = await axios.get<{ data: IProduto[] }>(`https://fakerapi.it/api/v1/products?_quantity=${QUANTITY}`);
      
      const produtos = response.data.data;
      context?.setQuantidadeProdutosRecebidos(produtos.length);

      const offset = 0;
      const produtosDaPagina = produtos.slice(offset, offset + LIMIT) || [];
  
      context?.setProdutosDaPagina(produtosDaPagina) 
      context?.setProdutos(produtos);
      
    } catch (error) {
      toast.error(`Erro ao obter produtos: ${error}`)
    }
  };

  useEffect(() => {
    getProdutos();    
  }, []);

  const filtrarProdutos = (searchInput: string) => {
    
    if (searchInput) {
      const produtosEncontrados = context?.produtos.filter((produto) => {
        const nome = produto.name.toUpperCase();
        const busca = searchInput.toUpperCase();
        
        return nome.startsWith(busca)
      });

      if (produtosEncontrados) {
        context?.setProdutosDaPagina(produtosEncontrados);
        context?.setQuantidadeProdutosRecebidos(produtosEncontrados.length);

        if (produtosEncontrados.length == 0) {
          toast.error(`Nenhum resultado encontrado para: ${searchInput}`)
        }
      }
    }

  };

  const removerProduto = (idProduto: number) => {  
    const produtoEncontrado = context?.produtosDaPagina.find((produto) => produto.id === Number(idProduto));
  
    if (produtoEncontrado) {
      const listaProdutosDaPaginaAtualizada = context?.produtosDaPagina.filter((produto) => produto.id !== Number(idProduto));
      const listaProdutosAtualizada = context?.produtos.filter((produto) => produto.id !== Number(idProduto));

      if (listaProdutosDaPaginaAtualizada && listaProdutosAtualizada) {

        context?.setProdutos(listaProdutosAtualizada);
        context?.setProdutosDaPagina(listaProdutosDaPaginaAtualizada);
        context?.setQuantidadeProdutosRecebidos(context?.produtos.length);

      }
    }
  };
  
  const visualizarProduto = (idProduto: number) => {
    const produtoEncontrado = context?.produtosDaPagina.find((produto) => produto.id === Number(idProduto));
  
    if (produtoEncontrado) {
      setProdutoSelecionado(produtoEncontrado);
      setOpenClose(!openClose)
    }
    
  }

  return (
    <div className="min-h-screen flex flex-col">
      
      <Cabecalho search={filtrarProdutos} />
      
      <TabelaProduto produtos={context?.produtosDaPagina ? context?.produtosDaPagina : []} removerProduto={removerProduto} visualizarProduto={visualizarProduto}/>

      {openClose && <ProdutoDetalhado produto={produtoSelecionado} voltar={handleVoltar} />}
    
      <Paginacao limit={LIMIT} total={context?.quantidadeProdutosRecebidos ? context?.quantidadeProdutosRecebidos : 0} offset={offset} setOffset={setOffset} />
    </div>
  );
};

export default Produto;
