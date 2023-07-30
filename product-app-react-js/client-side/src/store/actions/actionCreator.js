import { FETCH_PRODUCTS_SUCCESS } from './actionType'
import { DETAIL_PRODUCT_SUCCESS } from './actionType'

const BASE_URL = "http://localhost:3002"

export function fetchProducts() {
    return async (dispatch) => {
        try {
            const response = await fetch(BASE_URL + "/customers" + "/products")
            if (!response.ok) {
                throw new Error("something went wrong")
            }

            const jsonData = await response.json()
            // console.log(jsonData, "INIIII >>>>>>>>>>>");

            dispatch({ type: FETCH_PRODUCTS_SUCCESS, payload: jsonData })

        } catch (error) {
            console.log(error);
        }
    }
}

export function detailProduct(id){
    return async (dispatch) => {
        try {
            const response = await fetch(BASE_URL + "/customers" + "/products/" + id)
            if (!response.ok) {
                throw new Error("something went wrong")
            }

            const jsonData = await response.json()
            // console.log(jsonData, "ini di action >>>>>>>>>>>>>>>>");

            dispatch({ type: DETAIL_PRODUCT_SUCCESS, payload: jsonData })
            
        } catch (error) {
            console.log(error);
        }
    }
}










