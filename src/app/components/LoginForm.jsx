"use client";

import { Box, Button, TextField, Typography, Paper } from "@mui/material";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Login data:", data);
    // TODO: Replace with your login logic (e.g., next-auth signIn)
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      sx={{ backgroundColor: "#f4f6f8" }}
    >
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{
          backgroundColor: "#f4f6f8",
          width: "500px",
          borderRadius: 3,
          p: 2,
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Paper elevation={3} sx={{ p: 4, borderRadius: 3, minWidth: 320 }}>
            <Typography variant="h5" mb={2} textAlign="center">
              Login
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <TextField
                label="Email"
                type="email"
                fullWidth
                margin="normal"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^@]+@[^@]+\.[^@]+$/,
                    message: "Invalid email address",
                  },
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
              <TextField
                label="Password"
                type="password"
                fullWidth
                margin="normal"
                {...register("password", {
                  required: "Password is required",
                })}
                error={!!errors.password}
                helperText={errors.password?.message}
              />
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{ mt: 2, py: 1 }}
              >
                Sign In
              </Button>
            </form>
          </Paper>
        </motion.div>
      </Box>
    </Box>
  );
}
