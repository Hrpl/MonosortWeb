import React, { useState } from "react";
import { TextField, Button, Typography, Box, Link } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { authorize } from "../service/request";
import { useNavigate } from "react-router-dom";
import "../styles/auth.css";

const LoginPage = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    var token = await authorize(login, password);
    if (token != null) {
      navigate("/");
    }
  };

  return (
    <Box>
      <Box
        sx={{
          width: { xs: "100wv", sm: "400px" },
        }}
      >
        <Grid container spacing={3}>
          <Grid item size={{ xs: 12 }}>
            <input
              fullWidth
              placeholder="Email"
              value={login}
              className="auth__input"
              autoComplete="off"
              onChange={(e) => setLogin(e.target.value)}
            />
          </Grid>
          <Grid item size={{ xs: 12 }}>
            <input
              fullWidth
              placeholder="Пароль"
              type="password"
              autoComplete="off"
              value={password}
              className="auth__input"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Grid>
          <Grid item size={{ xs: 12 }}>
            <button
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              className="auth__button"
            >
              Войти
            </button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default LoginPage;
