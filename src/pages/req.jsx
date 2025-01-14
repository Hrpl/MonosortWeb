import React, { useState } from "react";
import { TextField, Button, Typography, Box, Link } from "@mui/material";
import Grid from '@mui/material/Grid2';
import {reg} from '../service/request';
import "../styles/auth.css";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegistration = async () => {
    await reg(username, password);
  };

  return (
    <Box>
      <Box
        sx={{
          width: { xs: "100wv", sm: "400px" },
        }}
      >
        <Grid container spacing={3}>
          <Grid item size={{xs: 12}}>
            <input
              fullWidth
              placeholder="Email"
              variant="outlined"
              value={username}
							className="auth__input"
              onChange={(e) => setUsername(e.target.value)}
            />
          </Grid>
          <Grid item size={{xs: 12}}>
            <input
              fullWidth
              placeholder="Пароль"
              type="password"
              value={password}
							className="auth__input"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Grid>
          <Grid item size={{xs: 12}}>
            <button
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleRegistration}
							className="auth__button"
            >
              Зарегистрироваться
            </button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default RegisterPage;