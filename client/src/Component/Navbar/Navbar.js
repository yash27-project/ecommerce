import React from "react";
import './Navbar.css'
import { Link, useNavigate } from "react-router-dom";

const Navbar=()=>{
    const navigate = useNavigate();
    let auth=localStorage.getItem('user');
    const logout=()=>{
        localStorage.clear();
        navigate('/signup')
    }
    return(
        <>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5F9VJt_8A5QxDVHZXL8_11MvOhTYkJ9zPHg&usqp=CAU" alt="logo" className="logo"/>
            {auth ? 
                <ul className="nav-ul">
                    <li><Link to={`/product/list`}>Products</Link></li>
                    <li><Link to={`/product/add`}>Add Products</Link></li>
                    {/* <li><Link to={`/product/update`}>Update Products</Link></li> */}
                    <li><Link to={`/profile`}>Profile</Link></li>
                    <li> <Link onClick={logout} to={`/signup`}>logout ({JSON.parse(auth).name})</Link> </li>
                </ul> :
                <ul className="nav-ul nav-right">
                    <li> <Link to={`/signup`}>Signup</Link></li>
                    <li> <Link to={`/login`}>Login</Link></li>
                </ul>
            }
        </>
    )
};
export default Navbar;