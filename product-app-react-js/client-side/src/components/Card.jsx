import { Link } from 'react-router-dom'
import ProductDetailPage from '../views/ProductDetailPage'
import { rupiah } from '../helpers';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { detailProduct } from '../store/actions/actionCreator';

export default function Card(props) {

    const getDescription = () => {
        return props.product.description?.length > 50 ? props.product.description.substring(0, 50) + '...'
            : props.product.description
    }


    const dispatch = useDispatch()
    const handleShowProductDetail = () => {
        dispatch(detailProduct(props.product.id))
    }
    return (
        <>
            <div className="col-4">

                <Link to={'/product-detail/' + props.product.id} onClick={handleShowProductDetail}>
                    <img src={props.product.mainImg} alt="" />
                </Link>

                <span className='title-category mt-2'>{props.product.Category?.name}</span>
                <h4 className='mt-3'>{props.product.name}</h4>
                <span className='title-description mt-3' style={{ fontSize: "16px" }}>{getDescription(props.product.description)}</span>
                <div className="rating mt-3">
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star-o"></i>
                </div>
                <div className='price-wraper d-flex justify-content-between align-items-center mt-3'>
                    <span className='title-price'>{rupiah(props.product.price)}</span>
                    <button className='sm-btnprimary'>Buy <i className="bi bi-bag-plus"></i> </button>
                </div>

            </div>


        </>
    )
}