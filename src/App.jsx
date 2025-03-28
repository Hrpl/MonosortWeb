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
