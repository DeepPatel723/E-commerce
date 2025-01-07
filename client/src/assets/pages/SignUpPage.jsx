import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Loader, Lock, Mail, User, UserPlus } from "lucide-react";
import { Link } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";


const SignUpPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { signup, loading } = useUserStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(formData);
  }

  return (
    <div className="form-container container">
      <motion.div className="animation-box"
        initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8 }}>
        <h2 className="title">Create Your Account</h2>
      </motion.div>
      <motion.div className="animation-box"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}>
        <div className="main-container">
          <form className="form-sec" onSubmit={handleSubmit}>
            <div className="field">
              <label htmlFor="name" className="field_label">Full Name</label>
              <div className="field_icon"><User className="icon icon-user"/></div>
              <input className="field_input" id="name" type="text" placeholder="Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value })} required />
            </div>
            <div className="field">
              <label htmlFor="email" className="field_label">Email Address</label>
              <div className="field_icon"><Mail className="icon icon-mail"/></div>
              <input className="field_input" id="email" type="email" placeholder="Email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value })} required />
            </div>
            <div className="field">
              <label htmlFor="password" className="field_label">Password</label>
              <div className="field_icon"><Lock className="icon icon-lock"/></div>
              <input className="field_input" id="password" type="password" placeholder="Password" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value })} required />
            </div>
            <div className="field">
              <label htmlFor="confirmPassword" className="field_label">Confirm Password</label>
              <div className="field_icon"><Lock className="icon icon-lock"/></div>
              <input className="field_input" id="confirmpassword" type="password" placeholder="Confirm Password" value={formData.confirmPassword} onChange={(e) => setFormData({...formData, confirmPassword: e.target.value })} required />
            </div>
            <button type="submit" className="btn" disabled={loading}> 
              {loading ? (
              <>
              <Loader className="icon icon-loader"/>
              loading...
              </>
              ):(
              <>
              <UserPlus className="icon icon-userplus"/>
              Sign Up
              </>
              )}
            </button>
          </form>
          <p className="bottom__text">
            Already have an account?{" "}
            <Link to={'/login'} className="bottom__link">
            Login here <ArrowRight className="icon icon-arrow"/>
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  )
}

export default SignUpPage;
