import { useState } from 'react';

interface BarraPesquisaProps {
  search: (searchInput: string) => void;
}

const BarraPesquisa = ({ search }: BarraPesquisaProps) => {
  const [searchInput, setSearchInput] = useState('');

  const handleSearch = () => {
    search(searchInput);
  };

  return (
    <div className="flex items-center float-right mr-10 w-96 mx-auto bg-white rounded-full" >
      <div className="w-full">
        <input
          type="search"
          className="w-full px-4 py-1 text-gray-800 rounded-full focus:outline-none"
          placeholder="Pesquisar pelo nome do produto..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </div>
      <div>
        <button
          onClick={handleSearch}
          className={`flex items-center bg-gray-800 border border-mint-green justify-center w-12 h-12 text-white rounded-r-full ${
            searchInput.length > 0 ? 'bg-mint-green' : 'bg-gray-800 cursor-not-allowed'
          }`}
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </button>
      </div>
    </div>
   );
};

export default BarraPesquisa