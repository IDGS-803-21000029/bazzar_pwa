import { GET_PRODUCTS, GET_PRODUCT, BUY_PRODUCT, GET_SALES } from '../types';

export default (state, action) => {
    const { payload, type } = action;
    switch (type) {
        case GET_PRODUCTS:
            return {
                ...state,
                products: payload
            };
        case GET_PRODUCT:
            return {
                ...state,
                product: payload
            };
        case BUY_PRODUCT:
            return {
                ...state,
                product: payload
            };
        case GET_SALES:
            return {
                ...state,
                sales: payload
            };
        default:
            return state;
    }
}