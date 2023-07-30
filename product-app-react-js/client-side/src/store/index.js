import { legacy_createStore as createStore, applyMiddleware  } from "redux";
import rootReducer from "./reducers/root";
import thunk from 'redux-thunk'
import { FETCH_PRODUCTS_SUCCESS } from './actions/actionType'
import { DETAIL_PRODUCT_SUCCESS } from './actions/actionType'


function fetchProductsSuccess(products) {
    return { type: FETCH_PRODUCTS_SUCCESS, payload: products }
}

function detailImagesSuccess(detailProduct) {
    return { type: DETAIL_PRODUCT_SUCCESS, payload: detailProduct }
    
}

const store = createStore(rootReducer, applyMiddleware(thunk))

export default store