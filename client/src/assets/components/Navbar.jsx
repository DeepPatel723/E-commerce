import React from 'react'
import { Link } from 'react-router-dom';
import { ShoppingCart, UserPlus, LogIn, LogOut, Lock } from "lucide-react";
import { useUserStore } from '../stores/useUserStore';
import { useCartStore } from '../stores/useCartStore';

const Navbar = () => {
    const { user, logout } = useUserStore();
    const isAdmin = user?.role === "admin";
    const { cart } = useCartStore();

  return (
    <header>
        <div className='container'>
            <div className='main-wrapper'>
                <div className='logo-container'>
                    <Link to={'/'} className='logo'>E-commerce</Link>
                </div>
                <nav className='navbar nav-list'>
                    <Link to={'/'} className='nav-item'>Home</Link>
                    { user && (
                        <Link to={'/cart'} className='nav-item'>
                            <ShoppingCart size={20} className='icon icon-cart'/>
                            <span className='nav-item-text'>Cart</span>
                            <span className='bubble cart-item-num'>{cart.length}</span>
                        </Link>
                    )}
                    { isAdmin && (
                        <Link className='nav-item' to={'/admin'}>
                            <Lock size={18} className='icon icon-lock'/>
                            <span className='nav-item-text'>DashBoard</span>
                        </Link>
                    )}
                    { user ? (
                        <button onClick={logout}>
                            <LogOut size={18} className='icon icon-logOut'/>
                            <span className='nav-item-text'>Log Out</span>
                        </button>
                    ) : (
                        <>
                        <Link to={'/signup'} className='nav-item'>
                            <UserPlus size={18} className='icon icon-userplus'/>
                            <span className='nav-item-text'>Sign Up</span>
                        </Link>
                        <Link to={'/login'} className='nav-item'>
                            <LogIn size={18} className='icon icon-login'/>
                            <span className='nav-item-text'>Log In</span>
                        </Link>
                        </>
                    )}  
                </nav>
            </div>
        </div>
    </header>
  )
}

export default Navbar;
