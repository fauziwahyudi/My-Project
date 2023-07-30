
import { createBrowserRouter, redirect } from 'react-router-dom'
import HomePage from '../views/HomePage'
import ProductDetailPage from '../views/ProductDetailPage'
import Layout from '../components/Layout'

const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <HomePage />
            },
            {
                path: "/product-detail/:id",
                element: <ProductDetailPage />
            }
        ]
    }
])

export default router