import LogoHermes from '../assets/pngegg.png'
import HermesLogin from '../assets/hermeslogin.jpg'
import { useState,  } from "react"
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

export default function LoginPage() {
    const MySwal = withReactContent(Swal)
    const navigate = useNavigate();

    const [loginForm, setLoginForm] = useState({
        email : '',
        password : ''
    })
    
    const [loading, setLoading] = useState({
        isLoading : false
    })

    const henddlerFormInput = (e) => {
       
        const newLoginForm = {
            ...loginForm,
            [e.target.name] : e.target.value
        }
        setLoginForm(newLoginForm) 
    }

    console.log(loginForm);
   

    const henddlerLogin = async (e) => {
        
        e.preventDefault();
        try {
                const response = await fetch('http://localhost:3002/login',{
                method : 'POST',
                headers: {
                    'Content-Type': 'application/json'
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                body : JSON.stringify(loginForm)
                })
                const responseJson = await response.json()
                if(!response.ok){
                    throw new Error(responseJson.message)
                }
                
                localStorage.setItem('access_token', responseJson.access_token)
                setLoading({
                    isLoading : true
                })
                  
                const Toast = MySwal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                      toast.addEventListener('mouseenter', MySwal.stopTimer)
                      toast.addEventListener('mouseleave', MySwal.resumeTimer)
                    }
                  })
                  
                  Toast.fire({
                    icon: 'success',
                    title: 'Signed in successfully'
                  })
                  
                navigate('/') 
                
            } catch (error) {
               
                const Toast = MySwal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                      toast.addEventListener('mouseenter', MySwal.stopTimer)
                      toast.addEventListener('mouseleave', MySwal.resumeTimer)
                    }
                  })
                  
                  Toast.fire({
                    icon: 'error',
                    title: error
                  })
            }
    
        }
    return (
        <>
            <div className="container-custom-login">
                <div className="myform">
                    <form onSubmit={henddlerLogin}>
                        <img className="wave" width={150} style={{ marginLeft: "50px" }} src={LogoHermes} />
                        <h2>ADMIN LOGIN</h2>
                        <input value={loginForm.email} onChange={henddlerFormInput} name="email" type="text" placeholder="Admin Email" />
                        <input value={loginForm.password} onChange={henddlerFormInput} name="password" type="password" placeholder="Password" />
                        <button type="submit">LOGIN</button>
                    </form>
                </div>
                <div className="image">
                    <img src={HermesLogin} />
                </div>
            </div>
        </>

    )
}