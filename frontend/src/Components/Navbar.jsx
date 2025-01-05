import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import AuthContext from './context/authcontext'
const Navbar = () => {
    const {auth}=useContext(AuthContext);
    useEffect(()=>{
        console.log(auth);
    });
    return (
        <div className="navbar bg-base-100 mb-2">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 text-xl">
                        <li><a href='/'>Homeaaa</a></li>
                        <li><a href='/profile'>Profile</a></li>
                        <li><a href='/contact'>Contact Us</a></li>
                    </ul>
                </div>
                <a href='/' className="btn btn-ghost text-xl">GradeMaster</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 text-lg">
                    <li><Link to='/'>Home</Link></li>
                    {!auth.roles?.includes(100)||[].includes(100)?<li><Link to='/profile'>Profile</Link></li>:<></>}
                    <li><Link to='/contact'>Contact Us</Link></li>
                </ul>
            </div>
            <div className="navbar-end">
                <Link className="btn btn-primary text-lg" to='/login'>Register / Login</Link>
            </div>
        </div>
    )
}

export default Navbar
