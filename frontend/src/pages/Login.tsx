import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useSnackbar } from "../context/SnackbarContext";
import { Container, TextField, Button, Typography, Box } from "@mui/material";

const Login = () => {
  const { login } = useAuth();
  const { showMessage } = useSnackbar();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const formData = new URLSearchParams();
      formData.append("username", email);
      formData.append("password", password);

      const response = await axios.post("http://localhost:8000/auth/token", formData, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });

      login(response.data.access_token);
      showMessage("Вход выполнен успешно!", "success");
      navigate("/profile");
    } catch (err) {
      showMessage("Ошибка входа. Проверьте логин и пароль.", "error");
    }
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 8, p: 3, bgcolor: "white", borderRadius: 2, boxShadow: 3 }}>
        <Typography variant="h5" align="center" gutterBottom>Вход</Typography>
        <form onSubmit={handleLogin}>
          <TextField label="Email" fullWidth margin="normal" value={email} onChange={(e) => setEmail(e.target.value)} />
          <TextField label="Пароль" type="password" fullWidth margin="normal" value={password} onChange={(e) => setPassword(e.target.value)} />
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            Войти
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Login;
