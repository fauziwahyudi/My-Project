import Edit from '../assets/pen.svg'
import Delete from '../assets/trash.svg'
import { Link } from 'react-router-dom'
import ImageDetail from '../views/ImageDetail';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import EditProductPage from '../views/EditProductPage';
import { useDispatch } from 'react-redux';
import { destroyProduct } from '../store/actions/actionCreator';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

export default function TableRowProduct(props) {

    const rupiah = (number) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR"
        }).format(number);
    }

    const [showImage, setShowImage] = useState(false);

    const handleCloseImage = () => setShowImage(false);
    const handleShowImage = () => setShowImage(true);

    const [showEdit, setShowEdit] = useState(false);

    const handleCloseEdit = () => setShowEdit(false);
    const handleShowEdit = () => setShowEdit(true);

    const dispatch = useDispatch()

    const MySwal = withReactContent(Swal)
    const handleShowDelete = () => {
        MySwal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(destroyProduct(props.product.id))
                MySwal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
            }
        })

    }

    return (
        <tr>
            <td scope="row">{props.product.id}</td>
            <td className="fw-bold">{props.product.name}</td>
            <td>{props.product.Category.name}</td>
            <td className="fw-bold">{rupiah(props.product.price)}</td>
            <td>{props.product.User.username}</td>
            <td>
                <img src={props.product.mainImg} style={{ width: "100px" }} className="img-fluid" />
            </td>
            <td>
                <Button variant="secondary" onClick={handleShowImage}>
                    show images
                </Button>

                <ImageDetail productId={props.product.id} name={props.product.name} mainImg={props.product.mainImg} show={showImage} handleClose={handleCloseImage} />

            </td>
            <td>
                <div className="list-item">
                    <Link onClick={handleShowEdit}>
                        <img src={Edit} alt="" className="icon" />
                        <span className="description"></span>
                    </Link>

                    <EditProductPage product={props.product} show={showEdit} handleClose={handleCloseEdit} />

                    <Link onClick={handleShowDelete} style={{ marginLeft: "20px" }}>
                        <img src={Delete} alt="" className="icon" />
                        <span className="description"></span>
                    </Link>
                </div>

            </td>
        </tr>
    )
}