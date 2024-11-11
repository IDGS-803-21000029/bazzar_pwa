import { useState, useContext } from 'react';
import ProductsContext from '../context/Products/ProductsContext';
import { useNavigate } from "react-router-dom";

const HomePage = () => {
    const { searchProducts, getSales } = useContext(ProductsContext);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const handleSearch = (event) => {
        event.preventDefault();
        searchProducts(searchTerm);
        navigate(`/search?term=${searchTerm}`);
    };

    const handleSales = () => {
        getSales();
        navigate('/sales');
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="absolute top-0 right-0 m-4">
                <button className="bg-transparent text-blue-500 py-2 px-4 rounded hover:text-blue-700" onClick={() => handleSales()}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-2 8h14l-2-8M7 13L5.4 5M7 13h10M17 13l-1.4 8M7 13l1.4 8M5 21h14" />
                    </svg>
                </button>
            </div>
            <div className="w-full max-w-md">
                <header className="text-center">
                    <h1 className="text-4xl font-bold text-gray-800">Bazar Online</h1>
                </header>
                <div className="flex items-center justify-center">
                    <img src="./marketplace.png" className="w-24 h-24 mr-4" alt="VA Marketplace" onClick={() => navigate('/')} />
                </div>
                <form onSubmit={handleSearch} className="flex flex-col items-center">
                    <input
                        type="text"
                        placeholder="Buscar"
                        value={searchTerm}
                        onChange={(event) => setSearchTerm(event.target.value)}
                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <button className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">
                        Buscar Productos
                    </button>
                </form>
            </div>
        </div>
    );
};

export default HomePage;

