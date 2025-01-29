import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useSnackbar } from "../context/SnackbarContext";
import axios from "axios";
import { Container, TextField, Button, Typography, Box } from "@mui/material";

const Settings = () => {
  const { user } = useAuth();
  const { showMessage } = useSnackbar();
  const [email, setEmail] = useState(user?.email || "");
  const [password, setPassword] = useState("");

  const handleUpdateEmail = async () => {
    try {
      const token = localStorage.getItem("access_token");
      await axios.put(
        "http://localhost:8000/auth/update-email",
        { email },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      showMessage("Email успешно обновлён!", "success");
    } catch (err) {
      showMessage("Ошибка при обновлении email.", "error");
    }
  };

  const handleChangePassword = async () => {
    try {
      const token = localStorage.getItem("access_token");
      await axios.put(
        "http://localhost:8000/auth/change-password",
        { password },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      showMessage("Пароль успешно изменён!", "success");
    } catch (err) {
      showMessage("Ошибка при смене пароля.", "error");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 5, p: 3, bgcolor: "white", borderRadius: 2, boxShadow: 3 }}>
        <Typography variant="h5" gutterBottom>
          Настройки профиля
        </Typography>

        <TextField
          label="Email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button variant="contained" color="primary" fullWidth onClick={handleUpdateEmail}>
          Обновить Email
        </Button>

        <TextField
          label="Новый пароль"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button variant="contained" color="secondary" fullWidth onClick={handleChangePassword}>
          Сменить пароль
        </Button>
      </Box>
    </Container>
  );
};

export default Settings;
