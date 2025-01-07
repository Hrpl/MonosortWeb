import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import RegisterPage from './req'
import LoginPage from './signin'

const AuthPage = () => {
  const [activeTab, setActiveTab] = useState('login');

  const handleTabChange = (view) => setActiveTab(view);

  return (
    <Box sx={{ textAlign: 'center', padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
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
          backgroundColor: '#F0F0F0',
          borderRadius: '20px',
          position: 'relative',
        }}
      >
        {/* Active tab indicator */}
        <Box
          sx={{
            position: 'absolute',
            height: '100%',
            width: '50%',
            left: activeTab === 'login' ? '50%' : '0',
            backgroundColor: '#FFFFFF',
            borderRadius: '20px',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
            transition: 'all 0.7s ease',
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
            color: activeTab === 'register' ? '#000' : '#666',
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
            color: activeTab === 'login' ? '#000' : '#666',
          }}
        >
          Вход
        </Box>
      </Box>

      {activeTab === 'login' ? <LoginForm /> : <RegisterForm />}
    </Box>
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