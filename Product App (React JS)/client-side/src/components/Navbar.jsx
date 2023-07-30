import LogoHermes from '../assets/logo-hermes.png'
import { Link } from 'react-router-dom'
import { useState } from 'react'

export default function Navbar() {

   

    return (
        <>
            <nav style={{ backgroundColor: "#f6f1eb" }} className="navbar navbar-expand-lg fixed-top">
                <div className="container">

                    <div className="tool-bar">
                    <div className='burger'>
                    <i className="bi bi-list" style={{ fontSize: "2rem" }}></i>
                    </div>
                    </div>

                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav mx-auto">

                            <div className="container-search position-absolute top-2 start-0 mt-2" style={{ marginLeft: "350px" }}>
                                <input type="text" placeholder="Search" />
                                <div className="btn-search ">
                                    <i className="fa fa-search"></i>
                                </div>
                            </div>
                            <Link to={'/'} className="navbar-brand align-items-center" href="#">
                                <img style={{ width: "120px", marginLeft: "200px" }} src={LogoHermes} alt="" />
                            </Link>
                        </ul>
                        <div className='d-flex btnWrapper mt-lg-0 mt-5'>
                            <i className="bi bi-person" style={{ fontSize: "1.2rem" }}></i>
                            <Link className='w-100'>Account</Link>
                            <i className="bi bi-minecart-loaded" style={{ marginLeft: "50px", fontSize: "1.2rem" }}></i>
                            <Link className='w-100'>Cart</Link>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}