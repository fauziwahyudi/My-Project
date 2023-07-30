import { FETCH_PRODUCTS_SUCCESS } from './actionType'
import { FETCH_CATEGORIES_SUCCESS } from './actionType'
import { DETAIL_IMAGES_SUCCESS } from './actionType'

const BASE_URL = "http://localhost:3002"

export function fetchProducts() {
    return async (dispatch) => {
        try {
            const response = await fetch(BASE_URL + "/products", {
                method: 'GET',
                headers: {
                    // 'Content-Type': 'application/json',
                    "access_token": localStorage.getItem("access_token")
                }
            })
            if (!response.ok) {
                throw new Error("something went wrong")
            }

            const jsonData = await response.json()

            dispatch({ type: FETCH_PRODUCTS_SUCCESS, payload: jsonData })

        } catch (error) {
            console.log(error);
        }
    }
}

export function fetchCategories() {
    return async (dispatch) => {
        try {
            const response = await fetch(BASE_URL + "/categories", {
                method: 'GET',
                headers: {
                    // 'Content-Type': 'application/json',
                    "access_token": localStorage.getItem("access_token")
                }
            })
            if (!response.ok) {
                throw new Error("something went wrong")
            }
            const jsonData = await response.json()

            dispatch({ type: FETCH_CATEGORIES_SUCCESS, payload: jsonData })

        } catch (error) {
            console.log(error);
        }
    }
}

export function addProduct(formProduct, handleClose) {
    return async (dispatch) => {

        try {
            const response = await fetch(BASE_URL + '/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "access_token": localStorage.getItem("access_token")
                },
                body: JSON.stringify(formProduct)
            })
// console.log(response, ">>>>>>>>>>>>>>>>>>>>>>>>>");
            const responseJson = await response.json()
            if (!response.ok) {
                throw new Error(responseJson.message)
            }

            dispatch(fetchProducts())
            handleClose()
            return responseJson
            //    dispatch(successAddProduct('Success Created'))

        } catch (error) {
            console.log(error);

        }
    }
}

export function editProduct(formProduct, id, handleClose) {
    return async (dispatch) => {

        try {
            const response = await fetch(BASE_URL + '/products/' + id, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    "access_token": localStorage.getItem("access_token")
                },
                body: JSON.stringify(formProduct)
            })

            const responseJson = await response.json()
            if (!response.ok) {
                throw new Error("responseJson.message")
            }

            dispatch(fetchProducts())
            handleClose()
            return responseJson
            //    dispatch(successAddProduct('Success Created'))

        } catch (error) {
            console.log(error);

        }
    }
}

export function detailImages(productId) {

    return async (dispatch) => {
        try {
            const response = await fetch(BASE_URL + "/images/" + productId, {
                method: 'GET',
                headers: {
                    // 'Content-Type': 'application/json',
                    "access_token": localStorage.getItem("access_token")
                }
            })
            if (!response.ok) {
                throw new Error("something went wrong")
            }
            const jsonData = await response.json()

            dispatch({ type: DETAIL_IMAGES_SUCCESS, payload: jsonData })

        } catch (error) {
            console.log(error);
        }
    }
}

export function destroyProduct(id) {

    return async (dispatch) => {

        try {
            const response = await fetch(BASE_URL + '/products/' + id, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    "access_token": localStorage.getItem("access_token")
                },
            })

            const jsonData = await response.json()
            if (!response.ok) {
                throw new Error(jsonData.message)
            }

            dispatch(fetchProducts())

        } catch (error) {
            console.log(error);
            // return dispatch(rejectDestroyProduct(error.error))

        }
    }
}

export function addCategory(formCategory, handleClose) {
    return async (dispatch) => {

        try {
            const response = await fetch(BASE_URL + '/categories', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "access_token": localStorage.getItem("access_token")
                },
                body: JSON.stringify(formCategory)
            })

            const responseJson = await response.json()
            if (!response.ok) {
                throw new Error("something went wrong")
            }

            dispatch(fetchCategories())
            handleClose()
            return responseJson
            //    dispatch(successAddProduct('Success Created'))

        } catch (error) {
            console.log(error);

        }
    }
}

export function editCategory(formCategory, id, handleClose) {
    return async (dispatch) => {

        try {
            const response = await fetch(BASE_URL + '/categories/' + id, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    "access_token": localStorage.getItem("access_token")
                },
                body: JSON.stringify(formCategory)
            })

            const responseJson = await response.json()
            if (!response.ok) {
                throw new Error("something went wrong")
            }

            dispatch(fetchCategories())
            handleClose()
            return responseJson
            //    dispatch(successAddProduct('Success Created'))

        } catch (error) {
            console.log(error);

        }
    }
}

export function destroyCategory(id) {

    return async (dispatch) => {

        try {
            const response = await fetch(BASE_URL + '/categories/' + id, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    "access_token": localStorage.getItem("access_token")
                },
            })

            const jsonData = await response.json()
            if (!response.ok) {
                throw new Error(jsonData.message)
            }

            dispatch(fetchCategories())

        } catch (error) {
            console.log(error);
            // return dispatch(rejectDestroyProduct(error.error))

        }
    }
}

export function registerUser(formRegister) {

    return async (dispatch) => {

        try {
            const response = await fetch(BASE_URL + '/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "access_token": localStorage.getItem("access_token")
                },
                body: JSON.stringify(formRegister)
            })
            // console.log(response);
            const responseJson = await response.json()
            // console.log(responseJson, '<<< action');
            if (!response.ok) {
                throw new Error(responseJson.message)
            }

            // dispatch(successRegister())
            return responseJson

        } catch (error) {
            console.log(error);
            dispatch(rejectRegister())
            // throw error

        }
    }
}






