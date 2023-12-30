interface PaginacaoProps {
    limit: number;
    total: number;
    offset: number;
    setOffset: (offset: number) => void;
  }

const MAX_ITEMS = 10;
const MAX_LEFT = (MAX_ITEMS - 2) / 2;

const Paginacao = ({ limit, total, offset, setOffset }: PaginacaoProps) => {

    const atual = offset ? Math.floor(offset / limit) + 1 : 1;
    const paginas = total / limit
    const primeiro = Math.max(atual - MAX_LEFT, 1)

  return (
    <div className='my-10 '>
        <ul className='flex justify-center' >
            {Array.from({ length: paginas })
                .map((_, index) => index + primeiro)
                .map((pagina) => (
                    <li className=''>
                        <button 
                            className='px-3 py-2 mx-1 bg-white border border-gray-400' 
                            onClick={() => setOffset((pagina - 1) * limit)} 
                        >
                            {pagina}
                        </button>
                    </li>
                ))
            }
        </ul>
    </div>

  )
}

export default Paginacao
