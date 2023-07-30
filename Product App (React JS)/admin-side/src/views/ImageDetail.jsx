import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { detailImages } from '../store/actions/actionCreator';

function ImageDetail({ productId, name, mainImg, show, handleClose }) {

    const [loading, setLoading] = useState(true)

    const images = useSelector((state) => state.imageReducer.images)
    const dispatch = useDispatch()
    // console.log(images);


    useEffect(() => {
        dispatch(detailImages(productId))
            .then(() => {
                setLoading(false)
            })
    }, [productId, show])

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{name} { productId }</Modal.Title>
                </Modal.Header>
                <Modal.Body className="show-grid">
                    <Container>
                        <Row>
                            <Col xs={12} md={12}>
                                <img src={mainImg} style={{width: "100%"}} alt="" />
                            </Col>

                        </Row>

                        <Row style={{ marginTop: "20px" }}>
                            {
                                images.map((el) => {
                                    return (
                                        <Col xs={6} md={4} key={el.id}>
                                            <img src={el.imgUrl} style={{width: "100%", margin: "0px auto"}} alt="" />
                                        </Col>
                                    )
                                })
                            }
                        </Row>
                    </Container>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default ImageDetail;