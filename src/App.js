import React from 'react';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Login from '../src/Pages/login';
import Header from '../src/components/header';
import Home from '../src/Pages/Home';
import Tournament from '../src/Pages/Tournament';
import TournamentDetail from '../src/Pages/TournamentDetail';
import CreateTournament from "../src/Pages/createTournament"
import SignUp from '../src/Pages/SignUp';
import Bracket from './Pages/Bracket';
import Footer from '../src/components/footer';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import '@fontsource/roboto/300.css';
import Manager from "../src/Pages/Manager"
import { UserProvider } from './context/UserContext';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './ProtectedRoute';
import News from './Pages/News';

const App = () => {
  return (
    <AuthProvider>
      <UserProvider>
        <BrowserRouter>
          <ConditionalLayout />
          <ToastContainer position="top-right" autoClose={2000} />
        </BrowserRouter>
      </UserProvider>
    </AuthProvider>
  );
};

const ConditionalLayout = () => {
  const location = useLocation();
  const showHeaderFooter = location.pathname !== '/login' && location.pathname !== '/manager';

  return (
    <>
      {showHeaderFooter && <Header />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/bracket/:bracketId" element={<Bracket />} />
        <Route path="/findTournament" element={<Tournament />} />
        <Route path="/createTournament" element={
          // <ProtectedRoute requiredRole="Manager">
          <CreateTournament />
          // </ProtectedRoute>
          } />
        <Route path="/tournamentDetail/:id" element={<TournamentDetail />} />
        <Route 
          path="/manager" 
          element={
            // <ProtectedRoute requiredRole="Manager">
              <Manager />
            // </ProtectedRoute>
          } 
        />
        <Route path="/news" element={<News />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      {showHeaderFooter && <Footer />}
    </>
  );
};

export default App;
