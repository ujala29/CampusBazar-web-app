import Signup from './pages/signup'
import Login from './pages/login'
import Logout from './pages/logout'
import React from 'react'
import Home from './pages/Home'
import { Routes, Route } from 'react-router-dom'
import Navbar from './pages/Navbar'
import AddProduct from './pages/AddProduct'
import Electronics from './components/Electronics'
import Allproduct from './components/Allproduct'
import Cosmetics from './components/Cosmetics'
import StudyMaterial from './components/StudyMaterial'
import Clothes from './components/Clothes'
import Others from './components/Others'
import SearchResults from './pages/SearchResults'
import Profile from './components/Profile'
import Order from './pages/Order'
import VerifyOtp from './pages/VerifyOtp'
import Cart from './components/Cart'
import ProtectedRoute from './components/ProtectedRoute'   // <-- Import

function App() {
  return (
    <>
      <Navbar/>

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home/>} />
        <Route path="/signup"   element={<Signup/>} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/login"    element={<Login/>} />
        <Route path="/logout"   element={<Logout/>} />

        {/* Protected Routes */}
        <Route path="/addProduct" element={
          <ProtectedRoute><AddProduct /></ProtectedRoute>
        } />

        <Route path="/electronics" element={
          <ProtectedRoute><Electronics /></ProtectedRoute>
        } />

        <Route path="/allproducts" element={
          <ProtectedRoute><Allproduct /></ProtectedRoute>
        } />

        <Route path="/cosmetics" element={
          <ProtectedRoute><Cosmetics /></ProtectedRoute>
        } />

        <Route path="/studymaterial" element={
          <ProtectedRoute><StudyMaterial /></ProtectedRoute>
        } />

        <Route path="/clothes" element={
          <ProtectedRoute><Clothes /></ProtectedRoute>
        } />

        <Route path="/others" element={
          <ProtectedRoute><Others /></ProtectedRoute>
        } />

        <Route path="/search" element={
          <ProtectedRoute><SearchResults /></ProtectedRoute>
        } />

        <Route path="/profile" element={
          <ProtectedRoute><Profile /></ProtectedRoute>
        } />

        <Route path="/order/:productId" element={
          <ProtectedRoute><Order /></ProtectedRoute>
        } />
          <Route path="/cart" element={
          <ProtectedRoute><Cart /></ProtectedRoute>
        } />

      </Routes>

    </>
  )
}

export default App
