import React from 'react';
import { useEffect } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import About from './pages/about';
import Contacts from './pages/contacts';
import axios from 'axios';
import { retrieveLaunchParams } from '@telegram-apps/sdk';
import { isTMA } from '@telegram-apps/bridge';


const api = axios.create({
  baseURL: `http://85.208.87.10:80/api/`
});

async function tg_auth(userId) {
  try {
      await api.post(`auth/login/${userId}`); 

  } catch (error) {
      console.log('Ошибка при авторизации:', error.message);
      return null;
  }
}
function App() {

  useEffect(() => {
    const urlSP = new URLSearchParams(initData);
    console.log(urlSP);
    tg_auth(urlSP);
    
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
