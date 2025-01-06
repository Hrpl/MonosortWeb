import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import About from './pages/about';
import Contacts from './pages/contacts';
import LoginPage from './pages/signin';
import RegisterPage from "./pages/req.jsx";

function App() {

  return (
    <BrowserRouter>
      <Routes>
				<Route path="/home" element={<Home />} />
				<Route path="/about" element={<About />} />
				<Route path="/contacts" element={<Contacts />} />
        <Route path="/" element={<LoginPage />} />
        <Route path="/reg" element={<RegisterPage />} />
			</Routes>
    </BrowserRouter>
  )
}

export default App
