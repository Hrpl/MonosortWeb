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
  React.useEffect(() => {
    if (window.Telegram?.WebApp) {
      const tg = Telegram.WebApp;
      tg.ready();
      tg.expand(); // Пытаемся развернуть
      tg.setHeaderColor('#2b2d3a'); // Маскируем шапку
      tg.setBackgroundColor('#2b2d3a'); // Убираем белые границы
      tg.BackButton.hide(); // Скрываем кнопку "Назад"
    }
  }, []);
  
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
