import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import AuthPage from './pages/auth'

function App() {

  React.useEffect(() => {
		if (!window.Telegram?.WebApp) return;
	
		const tgWebApp = window.Telegram.WebApp;
		const isOldVersion = parseFloat(tgWebApp.version) < 6.0;
	
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
        <Route path="/sign" element={<AuthPage />} />
			</Routes>
    </BrowserRouter>
  )
}

export default App
