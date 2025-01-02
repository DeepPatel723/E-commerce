import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import HomePage from './assets/pages/HomePage'
import SignUpPage from './assets/pages/SignUpPage'
import LoginPage from './assets/pages/LoginPage'
import Navbar from './assets/components/Navbar'
import { Toaster } from 'react-hot-toast'
import { useUserStore } from './assets/stores/useUserStore'
import LoadingSpinner from './assets/components/LoadingSpinner'
import AdminPage from './assets/pages/AdminPage'
import CategoryPage from './assets/pages/CategoryPage'

function App() {
  const { user, checkAuth, checkingAuth } = useUserStore();

  useEffect (()=>{
    checkAuth();
  }, [checkAuth]);

  if (checkingAuth) {
    return <LoadingSpinner/>
  }

  return (
    <>
      <div>
        <Navbar/>
        <Routes>
          <Route path='/' element={<HomePage />}/>
          <Route path='/signup' element={!user ? <SignUpPage/> : <Navigate to={'/'}/>}/>
          <Route path='/login' element={!user ? <LoginPage />: <Navigate to={'/'}/>}/>
          <Route path='/admin' element={user?.role === "admin" ? <AdminPage />: <Navigate to={'/login'}/>}/>
          <Route path='/category/:category' element={<CategoryPage />} />
        </Routes>
      </div>
      <Toaster/>
      
    </>
  )
}

export default App