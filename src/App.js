import React from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import Login from '../src/Pages/login';
import Header from '../src/components/header';
import Home from '../src/Pages/Home';
import Tournament from '../src/Pages/Tournament';
import SignUp from '../src/Pages/SignUp';
import Test from '../src/Pages/test';
import Footer from '../src/components/footer';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import '@fontsource/roboto/300.css';

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
  const showHeaderFooter = location.pathname !== '/login';
  
  return (
    <>
      {showHeaderFooter && <Header />}
      <Routes>
        <Route path="/login" element={<Login />} />
        
        <Route path="/" element={<Home />} />
        <Route path="/test" element={<Test />} />
        <Route path="/findTournament" element={ <Tournament/>} />
      </Routes>
      {showHeaderFooter && <Footer />}
    </>
  );
}

export default App;
