import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import About from './pages/about';
import Contacts from './pages/contacts';
import RegisterPage from './pages/req'
import LoginPage from './pages/signin'
import AuthPage from './pages/auth'

function App() {
  const telegram = window.Telegram.WebApp;

  // Получаем параметры темы один раз
  const themeParams = { ...telegram.themeParams };

  // Игнорируем изменения темы
  console.log('Текущая тема:', themeParams);

  // Ваш CSS: используйте themeParams для фиксации цвета, или ничего не меняйте.
  const frozenTheme = {
    bg_color: '#FFFFFF', // Используйте свои значения, если хотите фиксированный дизайн
    text_color: '#000000'
  };

  // Пример применения темы
  document.body.style.backgroundColor = frozenTheme.bg_color;
  document.body.style.color = frozenTheme.text_color;
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
