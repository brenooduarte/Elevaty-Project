import { ReactNode, createContext, useState } from "react";
import { IProduto } from "../types/Produto";

export interface ProdutoContextType {
  produtos: IProduto[];
  setProdutos: React.Dispatch<React.SetStateAction<IProduto[]>>;

  produtosDaPagina: IProduto[];
  setProdutosDaPagina: React.Dispatch<React.SetStateAction<IProduto[]>>;

  quantidadeProdutosRecebidos: number;
  setQuantidadeProdutosRecebidos: React.Dispatch<React.SetStateAction<number>>;
}

export const ProdutoContext = createContext<ProdutoContextType | null>(null);

interface ProdutosProviderProps {
  children: ReactNode;
}

export const ProdutoProvider = ({ children }: ProdutosProviderProps) => {
  const [produtos, setProdutos] = useState<IProduto[]>([]);
  const [produtosDaPagina, setProdutosDaPagina] = useState<IProduto[]>([]);
  const [quantidadeProdutosRecebidos, setQuantidadeProdutosRecebidos] = useState(0);

  return (
    <ProdutoContext.Provider value={{ produtos, setProdutos, produtosDaPagina, setProdutosDaPagina, quantidadeProdutosRecebidos, setQuantidadeProdutosRecebidos }}>
      {children}
    </ProdutoContext.Provider>
  );
};
