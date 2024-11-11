import axios from 'axios'
import { useReducer } from 'react'
import ProductContext from './ProductsContext'
import ProductsReducer from './ProductsReducer'
import Swal from 'sweetalert2'
import propTypes from 'prop-types'

const ProductsState = (props) => {
    const initialState = {
        products: [],
        productSelected: null,
        search: ''
    }

    const [state, dispatch] = useReducer(ProductsReducer, initialState);

    const searchProducts = async (value) => {
        try {
            const response = await axios.get('https://mysite-uqa4.onrender.com/api/items?q=' + value)
            console.log(response.data)
            dispatch({
                type: "GET_PRODUCTS",
                payload: response.data,
                search: value
            })
        } catch (error) {
            console.log(error)
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Ha ocurrido un error al buscar productos'
            })
        }
    }

    const getProduct = async (id) => {
        try {
            const response = await axios.get('https://mysite-uqa4.onrender.com/api/items/' + id)
            console.log(response.data)
            dispatch({
                type: "GET_PRODUCT",
                payload: response.data
            })
        } catch (error) {
            console.log(error)
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Ha ocurrido un error al obtener el producto'
            })
        }
    }

    const buyProduct = async (id) => {
        const data = { product_id: id }

        try {
            const response = await axios.post('https://mysite-uqa4.onrender.com/api/addSale', data)
            console.log(response.data)
            dispatch({
                type: "BUY_PRODUCT",
                payload: response.data
            })
            Swal.fire({
                icon: 'success',
                title: 'Éxito',
                text: 'Se ha comprado el producto'
            })
        } catch (error) {
            console.log(error)
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Ha ocurrido un error al comprar el producto'
            })
        }
    }

    const getSales = async () => {
        try {
            const response = await axios.get('https://mysite-uqa4.onrender.com/api/sales')
            console.log(response.data)
            dispatch({
                type: "GET_SALES",
                payload: response.data
            })
        } catch (error) {
            console.log(error)
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Ha ocurrido un error al obtener las ventas'
            })
        }
    }

    return (
        <ProductContext.Provider
            value={{
                products: state.products,
                sales: state.sales,
                productSelected: state.product,
                search: state.search,
                searchProducts,
                getProduct,
                buyProduct,
                getSales
            }}
        >
            {props.children}
        </ProductContext.Provider>
    )
}

ProductsState.propTypes = {
    children: propTypes.node.isRequired
}


export default ProductsState
