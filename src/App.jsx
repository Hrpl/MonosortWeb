import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import About from './pages/about';
import Contacts from './pages/contacts';
import AuthPage from './pages/auth'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

function App() {
  const telegram = window.Telegram.WebApp;
  window.Telegram.WebApp.expand();
	telegram.requestFullscreen();
  
  return (
    <BrowserRouter>
      <Routes>
				<Route path="/" element={<Home />} />
				<Route path="/about" element={<About />} />
				<Route path="/contacts" element={<Contacts />} />
        <Route path="/sign" element={<AuthPage />} />
			</Routes>
    </BrowserRouter>
  )
}

export default App
