import { ReactNode, createContext, useState } from "react";
import { IProduto } from "../types/Produto";

export interface ProdutoContextType {
    produtos: IProduto[];
    setProdutos: React.Dispatch<React.SetStateAction<IProduto[]>>;
}

export const ProdutoContext = createContext<ProdutoContextType | null>(null);

interface ProdutosProviderProps {
    children: ReactNode;
}

export const ProdutoProvider = ({ children }: ProdutosProviderProps) => {
  const [produtos, setProdutos] = useState<IProduto[]>([]);

  return (
    <ProdutoContext.Provider value={{ produtos, setProdutos }}>
      {children}
    </ProdutoContext.Provider>
  );
};
