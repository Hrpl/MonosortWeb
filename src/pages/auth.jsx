import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import RegisterPage from './req';
import LoginPage from './signin';
import logo from "../assets/logo.svg";
import "../styles/auth.css";

const AuthPage = () => {
  const [activeTab, setActiveTab] = useState('login');

  const handleTabChange = (view) => setActiveTab(view);

  return (
    <div className='auth__wrapper'>
    	<Box sx={{ textAlign: 'center', padding: '20px' }}>
	      <img className='auth__logo' src={logo} alt="МоноСорт" />
	
	      {/* Элемент переключения */}
	      <Box
	        sx={{
	          display: 'flex',
	          justifyContent: 'center',
	          alignItems: 'center',
	          width: '300px',
	          margin: '0 auto',
						height: 50,
	          padding: '4px',
	          backgroundColor: '#242826',
	          borderRadius: '20px',
	          position: 'relative',
						marginBottom: '32px',
	        }}
	      >
	        {/* Active tab indicator */}
	        <Box
	          sx={{
	            position: 'absolute',
	            height: '100%',
	            width: '50%',
	            left: activeTab === 'login' ? '50%' : '0',
	            backgroundColor: '#2c5c4f',
	            borderRadius: '20px',
	            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
	            transition: 'all 0.2s ease',
	          }}
	        />
	
	        {/* Tabs */}
	        <Box
	          onClick={() => handleTabChange('register')}
	          sx={{
	            flex: 1,
	            textAlign: 'center',
	            zIndex: 1,
	            padding: '10px 0',
	            cursor: 'pointer',
	            fontWeight: activeTab === 'register' ? 'bold' : 'normal',
	            color: activeTab === 'register' ? '#fff' : '#fff',
							transition: ".2s"
	          }}
	        >
	          <Typography style={{userSelect: "none"}} className='auth__button-text'>Регистрация</Typography>
	        </Box>
	        <Box
	          onClick={() => handleTabChange('login')}
	          sx={{
	            flex: 1,
	            textAlign: 'center',
	            zIndex: 1,
	            padding: '10px 0',
	            cursor: 'pointer',
	            fontWeight: activeTab === 'login' ? 'bold' : 'normal',
	            color: activeTab === 'login' ? '#fff' : '#fff',
							transition: ".2s"
	          }}
	        >
	          <Typography style={{userSelect: "none"}} className='auth__button-text'>Вход</Typography>
	        </Box>
	      </Box>
	
	      {activeTab === 'login' ? <LoginForm /> : <RegisterForm />}
	    </Box>
    </div>
  );
};

const LoginForm = () => {
  return (
    <Box sx={{ textAlign: 'left', marginTop: '20px' }}>
      <LoginPage/>
      {/* Поля ввода */}
    </Box>
  );
};

const RegisterForm = () => {
  return (
    <Box sx={{ textAlign: 'left', marginTop: '20px' }}>
      <RegisterPage/>
      {/* Поля ввода */}
    </Box>
  );
};

export default AuthPage;