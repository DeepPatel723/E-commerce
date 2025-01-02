import { ArrowRight, Loader, Lock, LogIn, Mail } from 'lucide-react';
import React, { useState } from 'react'
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useUserStore } from '../stores/useUserStore.js';

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, loading } = useUserStore();
  
  const handleSub = (e) => {
    e.preventDefault();
    console.log(email, password);
    login({ email, password });
  } 

  return (
    <div className="form-container">
      <motion.div className="animation-box"
        initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8 }}>
        <h2 className="title">Login Your Account</h2>
      </motion.div>
      <motion.div className="animation-box"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}>
        <div className="main-container">
          <form className="form-sec" onSubmit={handleSub}>
            <div className="field">
              <label htmlFor="email" className="field_label">Email Address</label>
              <div className="field_icon"><Mail className="icon icon-mail"/></div>
              <input className="field_input" id="email" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="field">
              <label htmlFor="password" className="field_label">Password</label>
              <div className="field_icon"><Lock className="icon icon-lock"/></div>
              <input className="field_input" id="password`" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <button type="submit" className="btn" disabled={loading}> 
              {loading ? (
              <>
              <Loader className="icon icon-loader"/>
              loading...
              </>
              ):(
              <>
              <LogIn className="icon icon-login"/>
              LogIn
              </>
              )}
            </button>
          </form>
          <p className="bottom__text">
            Not a member?{" "}
            <Link to={'/signup'} className="bottom__link">
            Sign up now <ArrowRight className="icon icon-arrow"/>
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  )
}

export default LoginPage;
