import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Container, Card, CardContent, Typography, Button } from "@mui/material";

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) return <Typography align="center">Загрузка...</Typography>;

  return (
    <Container maxWidth="sm">
      <Card sx={{ mt: 8, p: 3, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Профиль
          </Typography>
          <Typography>
            <strong>Email:</strong> {user.email}
          </Typography>
          <Button
            onClick={() => { logout(); navigate("/login"); }}
            variant="contained"
            color="error"
            fullWidth
            sx={{ mt: 3 }}
          >
            Выйти
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Profile;
