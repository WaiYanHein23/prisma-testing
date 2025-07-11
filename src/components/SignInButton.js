"use client";
import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { Avatar, Button, Box, Typography, Stack } from "@mui/material";

const SigninButton = () => {
  const { data: session } = useSession();

  if (session && session.user) {
    return (
      <Stack
        direction="row"
        alignItems="center"
        spacing={2}
        sx={{ ml: "auto" }}
      >
        <Typography
          variant="body1"
          color="primary.main"
          sx={{ fontWeight: 500 }}
        >
          {session.user.name}
        </Typography>

        <Avatar
          src={session.user.image || undefined}
          alt={session.user.name || "User avatar"}
          sx={{ width: 32, height: 32 }}
        />

        <Button
          onClick={() => signOut()}
          color="error"
          variant="text"
          size="small"
        >
          Sign Out
        </Button>
      </Stack>
    );
  }

  return (
    <Button
      onClick={() => signIn()}
      color="success"
      variant="contained"
      sx={{ ml: "auto" }}
    >
      Sign In
    </Button>
  );
};

export default SigninButton;
