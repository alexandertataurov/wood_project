import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, TextField, Button, Typography, Box } from "@mui/material";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      await axios.post("http://localhost:8000/auth/register", {
        email,
        password,
      });

      setSuccess("Регистрация успешна! Переход на страницу входа...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError("Ошибка регистрации. Возможно, пользователь уже существует.");
    }
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 8, p: 3, bgcolor: "white", borderRadius: 2, boxShadow: 3 }}>
        <Typography variant="h5" align="center" gutterBottom>Регистрация</Typography>
        {error && <Typography color="error">{error}</Typography>}
        {success && <Typography color="success.main">{success}</Typography>}
        <form onSubmit={handleRegister}>
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Пароль"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" variant="contained" color="secondary" fullWidth sx={{ mt: 2 }}>
            Зарегистрироваться
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Register;
