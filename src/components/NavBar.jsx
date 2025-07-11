"use client";
import React from "react";

import Link from "next/link";
import { AppBar, Toolbar, Button, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import SigninButton from "./SignInButton";

const StyledLink = styled(Link)(({ theme }) => ({
  color: theme.palette.text.primary,
  textDecoration: "none",
  marginRight: theme.spacing(2),
  "&:hover": {
    color: theme.palette.primary.main,
  },
}));

const Appbar = () => {
  return (
    <AppBar
      position="static"
      sx={{
        background: "linear-gradient(to bottom, #ffffff, #e0e0e0)",
        boxShadow: 1,
        color: "text.primary",
      }}
    >
      <Toolbar>
        <Box sx={{ flexGrow: 1, display: "flex" }}>
          <StyledLink href="/">
            <Button color="inherit">Home</Button>
          </StyledLink>
          <StyledLink href="/user">
            <Button color="inherit">User Profile</Button>
          </StyledLink>
          <StyledLink href="/admin">
            <Button color="inherit">Admin Dashboard</Button>
          </StyledLink>
        </Box>
        <SigninButton />{" "}
      </Toolbar>
    </AppBar>
  );
};

export default Appbar;
