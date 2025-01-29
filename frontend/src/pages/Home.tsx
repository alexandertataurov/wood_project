import { Container, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Box sx={{ textAlign: "center", mt: 5 }}>
        <Typography variant="h3" gutterBottom>
          Добро пожаловать в Wood Tracking
        </Typography>
        <Typography variant="h6" color="textSecondary" paragraph>
          Это система отслеживания древесины, помогающая вести учёт и контролировать процессы.
        </Typography>
        <Button variant="contained" color="primary" onClick={() => navigate("/register")}>
          Начать работу
        </Button>
      </Box>
    </Container>
  );
};

export default Home;
