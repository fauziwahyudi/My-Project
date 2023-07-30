import { combineReducers } from "redux";
import productReducer from './products'
import detailProductReducer from './detailProduct'

const rootReducer = combineReducers({
   productReducer,
    detailProductReducer
})

export default rootReducer