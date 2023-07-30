import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useState, useEffect } from 'react';
import { addProduct, editProduct } from '../store/actions/actionCreator';
import { fetchCategories } from '../store/actions/actionCreator';
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, } from "react-router"
import withReactContent from 'sweetalert2-react-content'
import Swal from 'sweetalert2'

function FormProduct({ product, isEdit, show, handleClose }) {

  const [loading, setLoading] = useState(true)
  const navigate = useNavigate();
  const categories = useSelector((state) => state.categoryReducer.categories)
  const dispatch = useDispatch()
  // console.log(categories);

  useEffect(() => {
    dispatch(fetchCategories())
      .then(() => {
        setLoading(false)
      })
  }, [])

  const initialState = {
    name: "",
    description: "",
    price: "",
    categoryId: "",
    mainImg: "",
    additionalImage1: "",
    additionalImage2: "",
    additionalImage3: ""
  }

  const [formProduct, setFormProduct] = useState(isEdit ? product : initialState)
console.log(formProduct);

  const handdleForm = (e) => {
    const newForm = {
      ...formProduct,
      [e.target.name]: e.target.value,
    }
    setFormProduct(newForm)
  }

  const MySwal = withReactContent(Swal)
  const handleSubmitProduct = async (e) => {
    e.preventDefault()
    try {
      if (isEdit) {
        await dispatch(editProduct(formProduct, product.id, handleClose))
        MySwal.fire({
          icon: 'success',
          title: 'Product Success Edited',
          showConfirmButton: false,
          timer: 1500
        })
        navigate('/')
      } else {
        await dispatch(addProduct(formProduct, handleClose))
        MySwal.fire({
          icon: 'success',
          title: 'Successful Product Created',
          showConfirmButton: false,
          timer: 1500
        })
        navigate('/')

      }
    } catch (error) {
      MySwal.fire({
        icon: 'error',
        title: error,
        showConfirmButton: false,
        timer: 1500
      })
    }

  }

  return (
    <>
      <Form onSubmit={handleSubmitProduct}>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Name</Form.Label>
            <Form.Control
              name='name'
              onChange={handdleForm} value={formProduct.name}
              type="text"
              autoFocus
            />
          </Form.Group>
          <Form.Group
            className="mb-3"
            controlId="exampleForm.ControlTextarea1"
          >
            <Form.Label>Description</Form.Label>
            <Form.Control
              name='description'
              onChange={handdleForm} value={formProduct.description} as="textarea" rows={3} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Price</Form.Label>
            <Form.Control
              name='price'
              onChange={handdleForm} value={formProduct.price}
              type="text"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Category</Form.Label>

            <Form.Select name='categoryId'
              onChange={handdleForm} value={formProduct.categoryId}>
               <option disabled>Choose a category</option>
              {
                categories.map((el, i) => {
                  return (
                    <option value={el.id} key={i}>{el.name}</option>
                  )
                })
              }
            </Form.Select>


          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Image Url</Form.Label>
            <Form.Control
              name='mainImg'
              onChange={handdleForm} value={formProduct.mainImg}
              type="text"
              placeholder="Main Image Url"
              
            />
            <Form.Control className="mt-3"
              name='additionalImage1'
              onChange={handdleForm} value={formProduct.additionalImage1}
              type="text"
              placeholder="Additional Image Url"
              
            />
            <Form.Control className="mt-3"
              name='additionalImage2'
              onChange={handdleForm} value={formProduct.additionalImage2}
              type="text"
              placeholder="Additional Image Url"
              
            />
            <Form.Control className="mt-3"
              name='additionalImage3'
              onChange={handdleForm} value={formProduct.additionalImage3}
              type="text"
              placeholder="Additional Image Url"
            
            />
          </Form.Group>

        </Modal.Body>
        <Modal.Footer>

          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" type='submit' >
            Submit
          </Button>
        </Modal.Footer>
      </Form>
    </>
  );
}

export default FormProduct;