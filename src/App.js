import React from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import Login from '../src/Pages/login';
import Header from '../src/components/header';
import Home from '../src/Pages/Home';
import SignUp from '../src/Pages/SignUp';
import Footer from '../src/components/footer';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <BrowserRouter>
      <ConditionalLayout />
      <ToastContainer position="top-right" autoClose={2000} />
    </BrowserRouter>
  );
}

const ConditionalLayout = () => {
  const location = useLocation();
  const showHeaderFooter = location.pathname !== '/login' && location.pathname !== '/signup';
  
  return (
    <>
      {showHeaderFooter && <Header />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<Home />} />
      </Routes>
      {showHeaderFooter && <Footer />}
    </>
  );
}

export default App;
