import { combineReducers } from "redux";
import productReducer from './products'
import categoryReducer from "./categories";
import imageReducer from "./images";

const rootReducer = combineReducers({
    productReducer,
    categoryReducer,
    imageReducer
})

export default rootReducer