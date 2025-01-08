import React, { useState } from "react";
import { TextField, Button, Typography, Box, Link } from "@mui/material";
import Grid from '@mui/material/Grid2';
import {reg} from '../service/request';

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
              label="Email"
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
      </Box>
    </Box>
  );
};

export default RegisterPage;