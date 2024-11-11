import ProductsContext from '../context/Products/ProductsContext';
import { useContext, useState } from 'react';
import { useNavigate } from "react-router-dom"
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';

const ProductDetail = () => {
    const { searchProducts, productSelected, buyProduct } = useContext(ProductsContext);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    if (!productSelected) {
        return null;
    }

    const handleSearch = (event) => {
        event.preventDefault();
        searchProducts(searchTerm);
        navigate(`/search?term=${searchTerm}`);
    };

    const handleBuy = () => {
        buyProduct(productSelected.id);
        navigate('/');
    };

    const imageUrls = productSelected.images ? productSelected.images.split(',') : [];

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
            <div className="my-10 p-4">
                {/* Galería de imágenes deslizante */}
                <div className="my-6">
                    <div className="flex overflow-x-auto gap-4 snap-x snap-mandatory scrollbar-hide">
                        {imageUrls.map((url, index) => (
                            <div key={index} className="w-64 h-64 flex-shrink-0 snap-center overflow-hidden rounded-lg shadow-md">
                                <img
                                    src={url.trim()}
                                    alt={`Producto Imagen ${index + 1}`}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="text-center mt-8">
                    <h1 className="text-3xl font-bold text-gray-700">{productSelected.title}</h1>
                    <p className="text-gray-500 mt-2">{productSelected.category}</p>
                    <p className="mt-4 text-gray-700">{productSelected.description}</p>
                    <div className="flex items-center justify-center mt-6">
                        <span className="font-bold text-lg text-blue-600 mr-2">${productSelected.price}</span>
                        <span className="text-gray-500">
                            {productSelected.discountPercentage > 0 ? `-${productSelected.discountPercentage}%` : ''}
                        </span>
                    </div>
                    <div className="flex items-center justify-center mt-6">
                        <div className="flex">
                            {productSelected.rating && (
                                <>
                                    {[...Array(Math.floor(productSelected.rating))].map((_, index) => (
                                        <FaStar key={index} className="w-5 h-5 text-yellow-400" />
                                    ))}
                                    {productSelected.rating % 1 !== 0 && (
                                        <FaStarHalfAlt className="w-5 h-5 text-yellow-400" />
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                    <p className="mt-4 text-gray-700">Stock: {productSelected.stock}</p>
                    <p className="mt-4 text-gray-700">Marca: {productSelected.brand}</p>
                    <button
                        className="mt-6 w-full max-w-xs bg-green-500 text-white py-3 px-6 rounded hover:bg-green-700"
                        onClick={handleBuy}
                    >
                        Comprar
                    </button>
                </div>
            </div>
        </>

    )
}

export default ProductDetail
