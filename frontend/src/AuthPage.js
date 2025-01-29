import React, { useState } from "react";
import axios from "axios";
import { TextField, Button, Box, Typography, Alert, Container, Link } from "@mui/material";

const AuthPage = () => {
    const [isRegister, setIsRegister] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        try {
            const endpoint = isRegister ? "/auth/register" : "/auth/token";
            const response = await axios.post(`http://127.0.0.1:8000${endpoint}`, {
                username,
                password,
            });

            if (response.status === 200) {
                setSuccess(isRegister ? "User registered!" : "Login successful!");
            }
        } catch (err) {
            setError("Invalid username or password");
        }
    };

    return (
        <Container maxWidth="xs">
            <Box sx={{ mt: 8, display: "flex", flexDirection: "column", alignItems: "center" }}>
                <Typography variant="h5">{isRegister ? "Register" : "Login"}</Typography>
                {error && <Alert severity="error">{error}</Alert>}
                {success && <Alert severity="success">{success}</Alert>}
                <form onSubmit={handleSubmit} style={{ width: "100%" }}>
                    <TextField label="Username" fullWidth margin="normal" value={username} onChange={(e) => setUsername(e.target.value)} required />
                    <TextField label="Password" type="password" fullWidth margin="normal" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    <Button type="submit" fullWidth variant="contained">{isRegister ? "Register" : "Login"}</Button>
                </form>
                <Typography variant="body2">
                    {isRegister ? (
                        <Link component="button" onClick={() => setIsRegister(false)}>Already have an account? Login</Link>
                    ) : (
                        <Link component="button" onClick={() => setIsRegister(true)}>Don't have an account? Register</Link>
                    )}
                </Typography>
            </Box>
        </Container>
    );
};

export default AuthPage;
