import React, { useState } from "react";
import { TextField, Button, Typography, Box, Link } from "@mui/material";
import Grid from '@mui/material/Grid2';
import {authorize} from '../service/request';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {

    var token = await authorize(login, password);
    if(token != null) {
      navigate("/")
    }
  };

  return (
    <Box
    >
      <Box
        sx={{
          width: { xs: "100wv", sm: "400px" },
          p: 3,
          boxShadow: { xs: "none", sm: 3 },
          borderRadius: 2,
          backgroundColor: { xs: "none", sm: "#fff" },
        }}
      >

        <Grid container spacing={2}>
          <Grid item size={{xs: 12}}>
            <TextField
              fullWidth
              label="Логин"
              variant="outlined"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
            />
          </Grid>
          <Grid item size={{xs: 12}}>
            <TextField
              fullWidth
              label="Пароль"
              type="password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Grid>
          <Grid item size={{xs: 12}} >
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleSubmit}
            >
              Войти
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default LoginPage;
