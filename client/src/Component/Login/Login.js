import React, { useEffect } from 'react'
import { useFormik } from 'formik';
 import * as Yup from 'yup';
 import axios from 'axios';
 import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

const Login = () => {
    const navigate = useNavigate();
    const validation=Yup.object().shape({
        name:Yup.string(),
        email:Yup.string().email('Invalid Email').required("Email is required"),
        password:Yup.string().required("Password is required")
    })
    const formik = useFormik({
        initialValues : {
            email : "",
            password : ""
        },
        validationSchema : validation,
        onSubmit : (values)=>{
            axios({
                url : 'http://localhost:4000/login',
                method : "POST",
                data : values
            }).then((res)=>{
                    console.log("res",res)
                    if(res.data.auth){
                        Swal.fire({
                            position: 'centre',
                            icon: 'success',
                            title: 'Login successfully',
                            showConfirmButton: true,
                          }).then(()=>{
                            localStorage.setItem("user",JSON.stringify(res.data.user));
                            localStorage.setItem('token',JSON.stringify(res.data.auth))
                            navigate('/product/list')
                          })
                    }
            }).catch((err)=>{
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: err.response.data.message,
                  })})
        }
    })
    useEffect(() => {
        let auth = localStorage.getItem("user");
        if(auth){
            navigate('/product/list')
        }
    })
    
  return (
    <div className="signup">
        <h1>Login</h1>
        <form className="signup-form-display">
            <label>Enter Email : </label>
            <input className="inputBox" value={formik.values.email} onChange={formik.handleChange} type="email" placeholder="email" id="email" />
            <span className='validation mt-4'>{(formik.errors.email && formik.touched.email) ? formik.errors.email :""}</span>
            <label>Enter password : </label>
            <input className="inputBox" value={formik.values.password} onChange={formik.handleChange} type="password" placeholder="password" id="password"/>
            <span className='validation mt-4'>{(formik.errors.password && formik.touched.password) ? formik.errors.password :""}</span>
            <button className="sign-button" type="submit"  onClick={formik.handleSubmit}>Login</button>
        </form>
            
    </div>
  )
}

export default Login