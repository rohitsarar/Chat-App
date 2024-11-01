import { useState } from 'react';
import './App.css';
import Home from './pages/home/Home';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import { Toaster } from 'react-hot-toast';
import { useAuthContext } from './components/context/AuthContext';



function App() {
const {authUser}=useAuthContext();

  return (
    <div className='p-4 h-screen flex items-center justify-center'>
      <Routes>
        {/* Define unique paths for each route */}
        <Route path='/' element={authUser ? <Home /> : <Navigate to={'/login'}/>} />
        <Route path='/signup' element= {authUser ? <Navigate to='/'/> : <Signup />} />
        <Route path='/login' element={authUser ? <Navigate to='/'/> : <Login />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
