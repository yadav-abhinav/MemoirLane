import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import {
  Avatar,
  TextField,
  Link,
  Grid,
  Typography,
  Container,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Paper,
  Stack,
  useTheme,
  Box,
} from "@mui/material";
import {
  LockOutlined,
  Facebook,
  Google,
  GitHub,
  VisibilityOff,
  Visibility,
} from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import request from "../util/requestHandler";
import ApiError from "../util/apiError";

export default function SignUp() {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();
  const bgColor =
    theme.palette.mode === "light"
      ? "rgba(17, 153, 158, 0.3)"
      : "rgba(38, 80, 115, 0.3)";

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    try {
      await request.post<{ accessToken: string }>("register", {
        name: data.get("firstName") + " " + data.get("lastName"),
        email: data.get("email"),
        password: data.get("password"),
      });
      setTimeout(() => {
        setLoading(false);
        navigate("/login");
      }, 2000);
    } catch (err) {
      setLoading(false);
      toast.error((err as ApiError).message);
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword((show) => !show);
  };

  // const handleMouseDownPassword = (
  //   event: React.MouseEvent<HTMLButtonElement>
  // ) => {
  //   event.preventDefault();
  // };

  return (
    <Container
      maxWidth={false}
      sx={{
        // background: `radial-gradient(circle at 50%, ${bgColor}, transparent 150%)`,
        background: `radial-gradient(circle at 50%, transparent, ${bgColor} 80%)`,
        minHeight: "100svh",
        pb: "1rem",
      }}
    >
      <Container
        component="main"
        maxWidth="xs"
        disableGutters
        sx={{ pt: { xs: "6rem", md: "10rem" } }}
      >
        <Paper
          elevation={12}
          sx={{
            p: "2rem 3rem",
            borderRadius: "14px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar
            sx={{ m: 1, bgcolor: "primary.main" }}
            children={<LockOutlined />}
          />
          <Typography component="h1" variant="h5" children={"Sign Up"} />
          <Box
            component="form"
            // noValidate
            onSubmit={handleSubmit}
            sx={{ my: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl variant="outlined" fullWidth required>
                  <InputLabel children={"Create a password"} />
                  <OutlinedInput
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          // onMouseDown={handleMouseDownPassword}
                          edge="end"
                          children={
                            showPassword ? <VisibilityOff /> : <Visibility />
                          }
                        />
                      </InputAdornment>
                    }
                    label="Create a password"
                  />
                </FormControl>
              </Grid>
            </Grid>
            <FormControlLabel
              control={<Checkbox name="rememberMe" defaultChecked />}
              label="Remember me"
              sx={{ mt: 1.5 }}
            />
            <LoadingButton
              loading={isLoading}
              type="submit"
              fullWidth
              size="large"
              variant="contained"
              sx={{ mt: 1.5, mb: 2 }}
              children={<span>Sign Up</span>}
            />
          </Box>
          <Divider flexItem>OR</Divider>

          <Stack direction="row" spacing={5} mt={2}>
            <IconButton
              sx={{ border: "2px solid red" }}
              children={<Google color="error" />}
            />
            <IconButton
              sx={{ border: "2px solid #1877F2", color: "#1877F2" }}
              children={<Facebook />}
            />
            <IconButton
              sx={{
                border: `2px solid ${
                  theme.palette.mode === "light" ? "#707070" : "white"
                }`,
              }}
              children={<GitHub />}
            />
          </Stack>

          <Typography variant="body2" sx={{ mt: "1.5rem" }}>
            Already have an account?
            <Link
              href="\login"
              variant="body2"
              sx={{ ml: "0.5rem" }}
              children={"Login"}
            />
          </Typography>
        </Paper>
      </Container>
    </Container>
  );
}
