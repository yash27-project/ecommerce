import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate, useParams } from "react-router-dom";
import Swal from 'sweetalert2';

const AddProduct = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [productData, setProductData] = useState({})

    useEffect(() => {
     if(id){
        axios({
            url : `http://localhost:4000/getProductData/${id}`,
            method : 'GET'
         }).then((res)=>{
                setProductData(res.data);
         })
     }
    }, [])
    

    const validation=Yup.object().shape({
        name:Yup.string().required("Name is required"),
        price:Yup.string().required("Price is required"),
        category:Yup.string().required("Category is required"),
        company:Yup.string().required("Company is required")
    })
    const formik = useFormik({
        enableReinitialize:true,
        initialValues:{
            name : productData && productData.name ? productData.name : "",
            price : productData && productData.price ? productData.price : "",
            category : productData && productData.category ? productData.category : "",
            company : productData && productData.company ? productData.company : "",
        },
        validationSchema : validation,
        onSubmit : (values)=>{
            let user = JSON.parse(localStorage.getItem("user"))._id;
            let data = {...values,userId:user};
            if(id){
                axios({
                    url : `http://localhost:4000/updateProduct/${id}`,
                    method : 'PUT',
                    data : data
                }).then((res)=>{
                    Swal.fire({
                        position: 'centre',
                        icon: 'success',
                        title: 'Updated successfully',
                        showConfirmButton: true,
                      }).then(()=>{
                        navigate('/product/list')
                      })
                    
                }).catch(err=>console.log(err))
            } else {
                axios({
                    url : 'http://localhost:4000/add-product',
                    method : "POST",
                    data : data
                }).then((res)=>{
                        console.log("res",res)
                        if(res){
                            Swal.fire({
                                position: 'centre',
                                icon: 'success',
                                title: 'Added successfully',
                                showConfirmButton: true,
                              }).then(()=>{
                                navigate('/product/list')
                              }) 
                        }
                }).catch((err)=>{console.log(err)})
            }
            
        }
    })
  return (
    <div className="signup">
        <h1>Add Product</h1>
        <form className="signup-form-display">
            <label>Enter Name : </label>
            <input className="inputBox" value={formik.values.name} onChange={formik.handleChange} type="text" placeholder="name" id="name"/>
            <span className='validation mt-4'>{(formik.errors.name && formik.touched.name) ? formik.errors.name :""}</span>
            <label>Enter Price : </label>
            <input className="inputBox" value={formik.values.price} onChange={formik.handleChange} type="price" placeholder="price" id="price" />
            <span className='validation'>{(formik.errors.price && formik.touched.price) ? formik.errors.price :""}</span>

            <label>Enter category : </label>
            <input className="inputBox" value={formik.values.category} onChange={formik.handleChange} type="category" placeholder="category" id="category"/>
            <span className='validation'>{(formik.errors.category && formik.touched.category) ? formik.errors.category :""}</span>
            <label>Enter company : </label>
            <input className="inputBox" value={formik.values.company} onChange={formik.handleChange} type="company" placeholder="company" id="company"/>
            <span className='validation'>{(formik.errors.company && formik.touched.company) ? formik.errors.company :""}</span>
            <button className="sign-button" type="submit"  onClick={formik.handleSubmit}>Save</button>
        </form>
            
    </div>
  )
}

export default AddProduct
