import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { IProduto } from "../types/Produto";

const Filtro = () => {

    const [produtos, setProdutos] = useState<IProduto[]>([]);
    const [precoMinimo, setprecoMinimo] = useState(0);
    const [precoMaximo, setprecoMaximo] = useState(0);

    const getProdutosPorPrecoMinimoEMaximo = async (e: React.SyntheticEvent) => {
        try {
            e.preventDefault()

            const response = await axios.get<{ data: IProduto[] }>
                (`https://fakerapi.it/api/v1/products?_price_min=${precoMinimo}&_price_max=${precoMaximo}`);
            setProdutos(response.data.data);

            if (produtos.length == 0) {
                toast.error("Nenhum resultado encontrado")
            }
          
        } catch (error) {
          toast.error(`Erro ao obter produtos: ${error}`)
        }
    };

    return (
        <div className="fixed left-0 top-0 flex items-center py-10 ml-20">
            <div className="h-[280px] w-[220px] overflow-y-auto sm:rounded-2xl bg-gray-100">
                <div className="m-8 max-w-[700px] mx-auto flex flex-col items-center space-y-4">
                    <div className="">
                        <form className="items-center mx-auto">
                            <label className="font-semibold text-sm text-black pb-1 mr-10 flex">Preço Máximo</label>
                            <input type="text" onChange={(e)=>{setprecoMinimo(Number.parseInt(e.target.value))}} className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-28" />
                            <label className="font-semibold text-sm text-black pb-1  mr-10 flex ">Preço Mínimo</label>
                            <input type="text" onChange={(e)=>{setprecoMaximo(Number.parseInt(e.target.value))}} className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-28" />
                            <button
                                type="submit"
                                className="p-2  bg-black text-white border border-gray-400 shadow-xl rounded-full flex font-semibold transition duration-300 hover:bg-white hover:text-black"
                                onClick={() => getProdutosPorPrecoMinimoEMaximo}
                            >
                                <span className="inline-block mr-2">Filtrar</span>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Filtro;