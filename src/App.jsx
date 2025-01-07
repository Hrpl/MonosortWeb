import React from 'react';
import { useEffect } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import About from './pages/about';
import Contacts from './pages/contacts';
import axios from 'axios';
import LoginPage from './pages/signin';
import RegisterPage from "./pages/req.jsx";

const api = axios.create({
  baseURL: `http://85.208.87.10:80/api/`
});

async function tg_auth(userId) {
  try {
      // Отправляем POST-запрос с userId на сервер
      await api.post(`auth/login/${userId}`); // Правильное форматирование строки
  
  } catch (error) {
      console.log('Ошибка при авторизации:', error.message);
      return null;
  }
}
function App() {
  useEffect(() => {
    // Убедимся, что Telegram API доступен
    if (window.Telegram?.WebApp) {
        window.Telegram.WebApp.ready();

        const userId = window.Telegram.WebApp.initDataUnsafe?.user?.id;

        if (userId) {
            // Выполняем функцию tg_auth с userId, если он доступен
            tg_auth(userId);
        } else {
            console.log('Не удалось получить ID пользователя');
        }
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
				<Route path="/" element={<Home />} />
				<Route path="/about" element={<About />} />
				<Route path="/contacts" element={<Contacts />} />
			</Routes>
    </BrowserRouter>
  )
}

export default App
