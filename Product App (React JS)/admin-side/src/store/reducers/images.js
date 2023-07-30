import { DETAIL_IMAGES_SUCCESS } from '../actions/actionType'

const initialState = {
    images: []
}

function imageReducer(currentState = initialState, action) {
    if (action.type === DETAIL_IMAGES_SUCCESS ) {
        return { ...currentState, images: action.payload}
    }

    return currentState
}

export default imageReducer