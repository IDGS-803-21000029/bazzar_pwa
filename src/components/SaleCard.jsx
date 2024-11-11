import propTypes from 'prop-types';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import ProductsContext from '../context/Products/ProductsContext';
import { useContext } from 'react';

const SaleCard = (props) => {
    const { sale } = props;
    const { getProduct } = useContext(ProductsContext);
    const navigate = useNavigate();

    const handleClick = (id) => {
        getProduct(id);
        navigate(`/product?id=${id}`);
    };

    return (
        <div className="flex items-center p-4 border rounded shadow-sm hover:shadow-md" onClick={() => handleClick(sale.product.id)}>
            <img
                src={sale.product.thumbnail}
                alt={sale.product.title}
                className="w-24 h-24 bg-gray-200 rounded-full object-cover"
            />
            <div className="flex-1 ml-6">
                <div className="mb-2">
                    <h3 className="text-2xl font-semibold text-gray-800">{sale.product.title}</h3>
                    <p className="text-sm text-gray-500">{sale.product.category}</p>
                </div>
                <p className="text-gray-700 text-sm mb-4 line-clamp-3">{sale.product.description}</p>
                <div className="flex items-center justify-between">
                    <span className="font-bold text-xl text-blue-600">${sale.product.price}</span>
                    <div className="flex items-center">
                        {sale.product.rating && (
                            <>
                                {[...Array(Math.floor(sale.product.rating))].map((_, index) => (
                                    <FaStar key={index} className="w-5 h-5 text-yellow-400" />
                                ))}
                                {sale.product.rating % 1 !== 0 && (
                                    <FaStarHalfAlt className="w-5 h-5 text-yellow-400" />
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

SaleCard.propTypes = {
    sale: propTypes.shape({
        id: propTypes.number.isRequired,
        product_id: propTypes.number.isRequired,
        sale_date: propTypes.string.isRequired,
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
    }).isRequired,
    getProduct: propTypes.func.isRequired,
};

export default SaleCard

