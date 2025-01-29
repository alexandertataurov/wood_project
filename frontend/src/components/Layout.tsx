import { ReactNode } from "react";
import { AppBar, Toolbar, Typography, Container, Box } from "@mui/material";
import Sidebar from "./Sidebar";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Sidebar />
          <Typography variant="h6" sx={{ flexGrow: 1, textAlign: "center" }}>
            Wood Tracking
          </Typography>
        </Toolbar>
      </AppBar>
      <Container>
        <Box sx={{ mt: 4 }}>{children}</Box>
      </Container>
    </>
  );
};

export default Layout;
