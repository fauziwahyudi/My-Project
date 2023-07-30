import { legacy_createStore as createStore, applyMiddleware  } from "redux";
import rootReducer from "./reducers/root";
import thunk from 'redux-thunk'
import { FETCH_PRODUCTS_SUCCESS } from './actions/actionType'
import { FETCH_CATEGORIES_SUCCESS } from './actions/actionType'
import { DETAIL_IMAGES_SUCCESS } from './actions/actionType'


function fetchProductsSuccess(products) {
    return { type: FETCH_PRODUCTS_SUCCESS, payload: products }
}

function fetchCategoriesSuccess(categories) {
    return { type: FETCH_CATEGORIES_SUCCESS, payload: categories }
    
}

function detailImagesSuccess(images) {
    return { type: DETAIL_IMAGES_SUCCESS, payload: images }
    
}

const store = createStore(rootReducer, applyMiddleware(thunk))

export default store