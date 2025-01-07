import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import About from './pages/about';
import Contacts from './pages/contacts';
import RegisterPage from './pages/req'
import LoginPage from './pages/signin'

function App() {
  return (
    <BrowserRouter>
      <Routes>
				<Route path="/" element={<Home />} />
				<Route path="/about" element={<About />} />
				<Route path="/contacts" element={<Contacts />} />
        <Route path="/reg" element={<RegisterPage />} />
        <Route path="/sign" element={<LoginPage />} />
			</Routes>
    </BrowserRouter>
  )
}

export default App
