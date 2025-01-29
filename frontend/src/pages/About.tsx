import { Container, Typography, Box } from "@mui/material";

const About = () => {
  return (
    <Container>
      <Box sx={{ mt: 5 }}>
        <Typography variant="h4" gutterBottom>
          О проекте
        </Typography>
        <Typography variant="body1" paragraph>
          Wood Tracking – это система учёта и отслеживания древесины. Она позволяет эффективно управлять поставками, контролировать перемещение и вести учёт материалов.
        </Typography>
        <Typography variant="body1">
          В проекте используются современные технологии, включая React, FastAPI и PostgreSQL.
        </Typography>
      </Box>
    </Container>
  );
};

export default About;
