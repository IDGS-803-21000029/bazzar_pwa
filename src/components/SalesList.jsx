import SaleCard from './SaleCard';
import ProductsContext from '../context/Products/ProductsContext';
import { useContext, useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

const SalesList = () => {
    const { sales, getProduct, searchProducts } = useContext(ProductsContext);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Verificar si sales está presente o inicializarlo
        if (!sales) {
            console.warn("Sales no está disponible, asegúrate de que la información esté cargada correctamente.");
        }
    }, [sales]);

    const handleSearch = (event) => {
        event.preventDefault();
        if (searchTerm.trim() !== '') {
            searchProducts(searchTerm);
            navigate(`/search?term=${searchTerm}`);
        }
    };

    return (
        <>
            <div className="w-full flex items-center gap-4 p-4 flex-nowrap">
                <img
                    src="./marketplace.png"
                    className="w-12 h-12 cursor-pointer flex-shrink-0"
                    alt="VA Marketplace"
                    onClick={() => navigate('/')}
                />

                <form onSubmit={handleSearch} className="flex-grow flex items-center">
                    <input
                        type="text"
                        placeholder="Buscar"
                        value={searchTerm}
                        onChange={(event) => setSearchTerm(event.target.value)}
                        className="w-full p-2 border rounded-l focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <button
                        type="submit"
                        className="bg-blue-500 text-white py-2 px-4 rounded-r hover:bg-blue-700 flex items-center justify-center"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </button>
                </form>

                <button
                    className="bg-transparent text-blue-500 p-2 rounded hover:text-blue-700 flex-shrink-0"
                    onClick={() => navigate('/sales')}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-2 8h14l-2-8M7 13L5.4 5M7 13h10M17 13l-1.4 8M7 13l1.4 8M5 21h14" />
                    </svg>
                </button>
            </div>
            <div className="my-8">
                <h2 className="font-semibold text-gray-800 mb-4 text-center">Tus Compras</h2>
                <hr />
                <div className="overflow-y-auto h-screen">
                    {Array.isArray(sales) && sales.length === 0 ? (
                        <p className="text-center text-gray-600">No hay compras</p>
                    ) : (
                        <div className="grid grid-cols-1 gap-4">
                            {Array.isArray(sales) ? (
                                sales.map((item) => (
                                    <SaleCard key={item.id} sale={item} getProduct={getProduct} />
                                ))
                            ) : (
                                <p className="text-center text-gray-600">No se pudieron cargar las ventas</p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default SalesList;
