import React, { useEffect } from "react";
import './Signup.css';
import { useNavigate } from "react-router-dom";
import { useFormik } from 'formik';
 import * as Yup from 'yup';
 import axios from 'axios';
import Swal from "sweetalert2";
const Signup=()=>{
    const navigate = useNavigate()
    useEffect(() => {
     let auth=localStorage.getItem('user');
     if(auth){
        navigate('/product/list')
     }
    })
    
    const validation=Yup.object().shape({
        name:Yup.string().required("Name is required"),
        email:Yup.string().email('Invalid Email').required("Email is required"),
        password:Yup.string().required("Password is required")
    })
    const formik = useFormik({
        initialValues:{
            name:"",
            email:"",
            password:""
        },
          validationSchema:validation,
          onSubmit:(values)=>{
            console.log(values)
            axios({
                url : 'http://localhost:4000/register',
                method : "POST",
                data : values
            }).then((res)=>{
                    if(res.data.auth){
                        Swal.fire({
                            position: 'centre',
                            icon: 'success',
                            title: 'SignUp successfully',
                            showConfirmButton: true,
                          }).then(()=>{
                            localStorage.setItem("user",JSON.stringify(res.data.result));
                            localStorage.setItem("token",JSON.stringify(res.data.auth))
                            navigate('/product/list')
                          }) 
                    }
            }).catch((err)=>{
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: err.response.data.message,
                  })
            })
          }
    })
    return (
        <div className="signup">
            <h1>Register</h1>
            <form className="signup-form-display">
                <label>Enter Name : </label>
                <input className="inputBox" value={formik.values.name} onChange={formik.handleChange} type="text" placeholder="name" id="name"/>
                <span className='validation mt-4'>{(formik.errors.name && formik.touched.name) ? formik.errors.name :""}</span>

                <label>Enter Email : </label>
                <input className="inputBox" value={formik.values.email} onChange={formik.handleChange} type="email" placeholder="email" id="email" />
                <span className='validation mt-4'>{(formik.errors.email && formik.touched.email) ? formik.errors.email :""}</span>

                <label>Enter password : </label>
                <input className="inputBox" value={formik.values.password} onChange={formik.handleChange} type="password" placeholder="password" id="password"/>
                <span className='validation mt-4'>{(formik.errors.password && formik.touched.password) ? formik.errors.password :""}</span>

                <button className="sign-button" type="submit"  onClick={formik.handleSubmit}>Sign Up</button>
            </form>
            
        </div>
    )
}
export default Signup;