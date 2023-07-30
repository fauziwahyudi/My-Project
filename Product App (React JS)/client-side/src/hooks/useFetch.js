// import { useEffect, useState } from "react";

// export function useFetch(url) {
//     const [error, setError] = useState('')
//     const [loading, setLoading] = useState(true)
//     const [data, setData] = useState([])

//     const BASE_URL = "http://localhost:3000/"

//     async function fetchData() {
//         try {
//             const response = await fetch(BASE_URL + url)
//             if (!response.ok) {
//                 throw new Error("something went wrong")
//             }
//             const jsonData = await response.json()
//             setData(jsonData)
//         } catch (error) {
//             setError(error)
//         } finally {
//             setLoading(false)
//         }
//     }

//     useEffect(() => {
//         fetchData()
//     }, [])

//     console.log(data)
//     return {
//         data,
//         loading,
//         error
//     }
// }