import { DETAIL_PRODUCT_SUCCESS } from '../actions/actionType'

const initialState = {
    detailProduct: []
}

function detailProductReducer(currentState = initialState, action) {
    if (action.type === DETAIL_PRODUCT_SUCCESS ) {
        return { ...currentState, detailProduct: action.payload}
    }

    return currentState
}

export default detailProductReducer