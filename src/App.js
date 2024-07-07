import React from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import Login from '../src/Pages/login';
import Header from '../src/components/header';
import Home from '../src/Pages/Home';
import Tournament from '../src/Pages/Tournament';
import TournamentDetail from '../src/Pages/TournamentDetail';
import CreateTournament from "../src/Pages/createTournament"
import SignUp from '../src/Pages/SignUp';
import Test from '../src/Pages/test';
import Footer from '../src/components/footer';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import '@fontsource/roboto/300.css';
import Manager from "../src/Pages/Manager"
import { UserProvider } from './UserContext';

const App = () => {
  return (
    <UserProvider>
    <BrowserRouter>
      <ConditionalLayout />
      <ToastContainer position="top-right" autoClose={2000} />
    </BrowserRouter>
    </UserProvider>
  );
}

const ConditionalLayout = () => {
  const location = useLocation();
  const showHeaderFooter = location.pathname !== '/login' && location.pathname !=='/manager';
  
  return (
     <>
      {showHeaderFooter && <Header />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/test/:tournamentId" element={<Test />} />
        <Route path="/findTournament" element={ <Tournament/>} />
        <Route path="/createTournament" element={ <CreateTournament/>} />
        <Route path="/tournamentDetail/:id" element={ <TournamentDetail/>} />
        <Route path="/manager" element={ <Manager/>} />
      </Routes>
      {showHeaderFooter && <Footer />}
    </>
  );
}

export default App;
