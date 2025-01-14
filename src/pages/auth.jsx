import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import RegisterPage from './req';
import LoginPage from './signin';
import "../styles/auth.css";

const AuthPage = () => {
  const [activeTab, setActiveTab] = useState('login');

  const handleTabChange = (view) => setActiveTab(view);

  return (
    <div className='auth__wrapper'>
    	<Box sx={{ textAlign: 'center', padding: '20px' }}>
	      <Typography variant="h4" gutterBottom className='auth__logo'>
	        MonoSort
	      </Typography>
	
	      {/* Элемент переключения */}
	      <Box
	        sx={{
	          display: 'flex',
	          justifyContent: 'center',
	          alignItems: 'center',
	          width: '300px',
	          margin: '0 auto',
	          padding: '4px',
	          backgroundColor: '#bbb',
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
	            backgroundColor: '#dfdfdf',
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
	            color: activeTab === 'register' ? '#000' : '#444',
							transition: ".2s"
	          }}
	        >
	          Регистрация
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
	            color: activeTab === 'login' ? '#000' : '#444',
							transition: ".2s"
	          }}
	        >
	          Вход
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