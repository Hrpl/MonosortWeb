import React, { useState } from "react";
import { TextField, Button, Typography, Box, Link } from "@mui/material";
import Grid from '@mui/material/Grid2';

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegistration = () => {
    console.log("Имя пользователя:", username);
    console.log("Пароль:", password);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
      }}
    >
      <Box
        sx={{
          width: { xs: "100%", sm: "400px" },
          p: 3,
          boxShadow: { xs: "none", sm: 3 },
          borderRadius: 2,
          backgroundColor: { xs: "none", sm: "#fff" },
        }}
      >
        <Typography variant="h5" component="h1" align="center" sx={{ mb: 3 }}>
          Регистрация
        </Typography>

        <Grid container spacing={2}>
          <Grid item size={{xs: 12}}>
            <TextField
              fullWidth
              label="Имя пользователя"
              variant="outlined"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
          <Grid item size={{xs: 12}}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleRegistration}
            >
              Зарегистрироваться
            </Button>
          </Grid>
        </Grid>

        <Typography size={{xs: 12}} align="center" marginTop={"1rem"}>
          <Link href="/" underline="hover">
            Уже зарегистрированы? Войти
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default RegisterPage;