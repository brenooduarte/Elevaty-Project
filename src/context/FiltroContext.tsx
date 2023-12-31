import { ReactNode, createContext, useState } from "react";
import { IProduto } from "../types/Produto";

export interface FiltroContextType {
    produtos: IProduto[];
    setProdutos: React.Dispatch<React.SetStateAction<IProduto[]>>;
}

export const FiltroContext = createContext<FiltroContextType | null>(null);

interface FiltrosProviderProps {
    children: ReactNode;
}

export const FiltroProvider = ({ children }: FiltrosProviderProps) => {
  const [produtos, setProdutos] = useState<IProduto[]>([]);

  return (
    <FiltroContext.Provider value={{ produtos, setProdutos }}>
      {children}
    </FiltroContext.Provider>
  );
};
