import { rupiah } from "../helpers"
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { useParams } from "react-router-dom"
import { detailProduct } from '../store/actions/actionCreator'
import { Link } from 'react-router-dom'


export default function ProductDetailPage() {
    const { id } = useParams()
    const [loading, setLoading] = useState(true)

    const products = useSelector((state) => state.detailProductReducer.detailProduct)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(detailProduct(id))
            .then(() => {
                setLoading(false)
            })
    }, [dispatch, id])

    return (
        <>
            <div className="small-container single-product mb-5" style={{ marginTop: "120px" }}>
                <div className="row">
                    <div className="col-2">
                        <img src={products.mainImg} width="100%" id="ProductImg" alt="Product" />
                        <div className="small-img-row mt-2">{
                            products.Images?.map((el) => {
                                return (
                                    <div className="small-img-col" key={el.id}>
                                        <img src={el.imgUrl} className="small-img" width="100%" />
                                    </div>

                                )
                            })
                        }
                        </div>

                    </div>
                    <div className="col-2">
                        <p>
                            <Link to={"/"}>Home</Link> / {products.Category?.name}
                        </p>
                        <h1>{products.name}</h1>
                        <h4>{rupiah(products.price)}</h4>

                        <select>
                            <option>Select Size</option>
                            <option>XXL</option>
                            <option>XL</option>
                            <option>Large</option>
                            <option>Midium</option>
                            <option>Small</option>
                        </select>

                        <input type="number" defaultValue="1" />
                        <a href="cart.html" className="btn">Add To Cart</a>

                        <h3>PRODUCT DETAILS <i className="fa fa-indent"></i></h3>

                        <p>{products.description}</p>
                    </div>
                </div>
            </div>




        </>

    )
}

