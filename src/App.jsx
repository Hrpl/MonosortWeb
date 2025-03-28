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
	
	function setSafeArea() {
		const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
		
		if (isIOS) {
			document.body.style.paddingTop = '44px';
			document.body.style.paddingBottom = '34px';
			document.body.style.minHeight = 'calc(100vh - 78px)'; // 44 + 34
		} else {
			document.body.style.paddingTop = '0';
			document.body.style.paddingBottom = '0';
			document.body.style.minHeight = '100vh';
		}
	}
	
	// Вызываем при загрузке
	setSafeArea();
	
	// Обновляем при изменении размера
	window.addEventListener('resize', setSafeArea);
	
	// Для Telegram WebApp - обновляем при изменении режима
	if (window.Telegram?.WebApp) {
		Telegram.WebApp.onEvent('viewportChanged', setSafeArea);
	}

  React.useEffect(() => {
		if (!window.Telegram?.WebApp) return;
	
		const tgWebApp = window.Telegram.WebApp;
		const isOldVersion = parseFloat(tgWebApp.version) < 6.0;
	
		tgWebApp.ready();
		tgWebApp.expand();
	
		if (isOldVersion) {
			// Старый метод (до 6.0)
			tgWebApp.enableClosingConfirmation?.();
		} else {
			// Новый метод (6.0+)
			tgWebApp.onEvent('backButtonClicked', () => {
				if (confirm('Вы уверены, что хотите выйти?')) {
					tgWebApp.close();
				}
			});
			tgWebApp.BackButton.show();
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
