import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { Link } from 'react-router-dom'
import { registerUser } from '../store/actions/actionCreator';
import { useNavigate, } from "react-router"


export default function RegisterPage() {
    const initialState = {
        username: "",
        email: "",
        password: "",
        phoneNumber: "",
        address: "",
    }

    const [formRegister, setFormRegister] = useState(initialState)
    // console.log(formRegister);

    const handdleForm = (e) => {
        const newForm = {
            ...formRegister,
            [e.target.name]: e.target.value,
        }
        setFormRegister(newForm)
    }
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const MySwal = withReactContent(Swal)
    const handleSubmitRegister = async (e) => {
        e.preventDefault()
        try {
            await dispatch(registerUser(formRegister))
            MySwal.fire({
                icon: 'success',
                title: 'Successful Account Created',
                showConfirmButton: false,
                timer: 1500
            })
            navigate('/')

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
            {/* REGISTER */}
            <div className="container mt-5">
                <h1 className="display-2" style={{ fontSize: "30px", marginLeft: "50px" }}>Register New Admin</h1>
                <h1 className="display-2" style={{ fontSize: "20px", marginLeft: "50px", marginTop: "20px" }}>Personal Information</h1>
                <h1 className="display-2" style={{ fontSize: "15px", marginLeft: "50px", marginBottom: "30px" }}>Use a permanent address where you can receive mail.</h1>

                <form onSubmit={handleSubmitRegister}>
                    <div className="form-group row">
                        <label style={{ marginLeft: "50px" }} htmlFor="" className="col-sm-2 col-form-label">Username</label>
                        <div className="col-sm-8">
                            <input name='username' onChange={handdleForm} value={formRegister.username} type="text" className="form-control" id="inputUsername3" required="" />
                        </div>
                    </div>
                    <div className="form-group row mt-5">
                        <label style={{ marginLeft: "50px" }} htmlFor="" className="col-sm-2 col-form-label">Email</label>
                        <div className="col-sm-8">
                            <input name='email' onChange={handdleForm} value={formRegister.email} type="email" className="form-control" id="inputEmail3" required="" />
                        </div>
                    </div>
                    <div className="form-group row mt-5">
                        <label style={{ marginLeft: "50px" }} htmlFor="" className="col-sm-2 col-form-label">Password</label>
                        <div className="col-sm-8">
                            <input name='password' onChange={handdleForm} value={formRegister.password} type="password" className="form-control" id="inputPassword3" required="" />
                        </div>
                    </div>
                    <div className="form-group row mt-5">
                        <label style={{ marginLeft: "50px" }} htmlFor="" className="col-sm-2 col-form-label">Phone Number</label>
                        <div className="col-sm-8">
                            <input name='phoneNumber' onChange={handdleForm} value={formRegister.phoneNumber} type="text" className="form-control" id="inputPhoneNumber3" required="" />
                        </div>
                    </div>
                    <div className="form-group row mt-5">
                        <label style={{ marginLeft: "50px" }} htmlFor="" className="col-sm-2 col-form-label">Address</label>
                        <div className="col-sm-8">
                            <input name='address' onChange={handdleForm} value={formRegister.address} type="text" className="form-control" id="inputAddress3" required="" />
                        </div>
                    </div>

                    <div className="form-group row mt-5 mb-5">
                        <div style={{ marginLeft: "50px" }} className="col-sm-10 d-flex justify-content-end">
                            <Link to='/'>
                                <button type="submit" className="btn btn-outline-dark">Cancel</button>
                            </Link>
                            <button type="submit" className="btn btn-primary" style={{ marginLeft: "20px" }}>Save</button>
                        </div>
                    </div>
                </form>
            </div>


            {/* REGISTER END */}
        </>
    )
}