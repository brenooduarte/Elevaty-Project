import { IconEye, IconTrash } from "@tabler/icons-react";
import { useContext } from "react";
import { FiltroContext } from "../context/FiltroContext";

interface TabelaProdutoProps {
    removerProduto: (idProduto: number) => void 
    visualizarProduto: (idProduto: number) => void 
}

const TabelaProduto = ({removerProduto, visualizarProduto}: TabelaProdutoProps) => {

    const context = useContext(FiltroContext);

  return (
    <div className="mt-5 drop-shadow-xl">
        <div className="flex flex-col">
            <div className="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
                <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                <div className="overflow-hidden">
                    <table className="min-w-full">
                    <thead className="bg-gray-200 border-b">
                        <tr>
                        <th scope="col" colSpan={3} className="text-sm font-medium text-gray-900 px-6 py-4 text-left rounded-tl-lg" style={{ width: '8%' }}>
                            Id
                        </th>
                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left" style={{ width: '30%' }}>
                            Nome
                        </th>
                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left" style={{ width: '15%' }}>
                            Preço
                        </th>
                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left" style={{ width: '15%' }}>
                            Taxa
                        </th>
                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left rounded-tr-lg" style={{ width: '32%' }}>
                            Ações
                        </th>
                        </tr>
                    </thead>
                    <tbody>
                        {context?.produtos.map((produto, index) => (
                        <TableRow
                            key={index}
                            Id={produto.id}
                            Nome={produto.name}
                            Preco={produto.price}
                            Taxa={produto.taxes}
                            Acoes={
                                <div className="flex gap-3">
                                <IconEye onClick={() => { visualizarProduto(produto.id) }} className='text-green-800 hover:text-green-600 hover:scale-110' />
                                <IconTrash onClick={() => { removerProduto(produto.id) }} className='text-red-900 hover:text-red-600 hover:scale-110' />
                                </div>
                            }
                            colspan={"3"}
                        />
                        ))}
                    </tbody>
                    </table>
                </div>
                </div>
            </div>
        </div>
    </div>
  );
};

const TableRow = (props: { Id: number; Nome: string; Preco: string; Taxa: string; Acoes: React.ReactNode; colspan: any; }) => {

    const { Id, Nome, Preco, Taxa, Acoes, colspan } = props;
    return (
        <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{Id}</td>
        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap" colSpan={colspan}>
            {Nome}
        </td>
        {colspan !== 2 && (
            <>
            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">R$ {Preco}</td>
            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{Taxa}%</td>
            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{Acoes}</td>
            </>
        )}
        </tr>
    );
};

export default TabelaProduto
