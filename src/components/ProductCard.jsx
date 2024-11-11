import propTypes from 'prop-types';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import ProductsContext from '../context/Products/ProductsContext';
import { useContext } from 'react';

const ProductCard = (props) => {
    const { product } = props;
    const { getProduct } = useContext(ProductsContext);
    const navigate = useNavigate();

    const handleClick = (id) => {
        getProduct(id);
        navigate(`/product?id=${id}`);
    };

    return (
        <div className="flex items-center p-4 border rounded shadow-sm hover:shadow-md" onClick={() => handleClick(product.id)}>
            <img
                src={product.thumbnail}
                alt={product.title}
                className="w-24 h-24 bg-gray-200 rounded-full object-cover"
            />
            <div className="flex-1 ml-6">
                <div className="mb-2">
                    <h3 className="text-2xl font-semibold text-gray-800">{product.title}</h3>
                    <p className="text-sm text-gray-500">{product.category}</p>
                </div>
                <p className="text-gray-700 text-sm mb-4 line-clamp-3">{product.description}</p>
                <div className="flex items-center justify-between">
                    <span className="font-bold text-xl text-blue-600">${product.price}</span>
                    <div className="flex items-center">
                        {product.rating && (
                            <>
                                {[...Array(Math.floor(product.rating))].map((_, index) => (
                                    <FaStar key={index} className="w-5 h-5 text-yellow-400" />
                                ))}
                                {product.rating % 1 !== 0 && (
                                    <FaStarHalfAlt className="w-5 h-5 text-yellow-400" />
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

ProductCard.propTypes = {
    product: propTypes.shape({
        id: propTypes.number.isRequired,
        title: propTypes.string.isRequired,
        category: propTypes.string.isRequired,
        description: propTypes.string.isRequired,
        price: propTypes.number.isRequired,
        thumbnail: propTypes.string.isRequired,
        rating: propTypes.shape({
            rate: propTypes.number,
        }),
    }).isRequired,
    getProduct: propTypes.func.isRequired,
};

export default ProductCard;
