import * as React from "react";
import { Bounce, ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import {
  Avatar,
  Button,
  TextField,
  Link,
  Grid,
  Box,
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
} from "@mui/material";
import {
  LockOutlined,
  Facebook,
  Google,
  GitHub,
  VisibilityOff,
  Visibility,
} from "@mui/icons-material";
import axios, { AxiosError } from "axios";

export default function SignUp() {
  const [showPassword, setShowPassword] = React.useState(false);
  const navigate = useNavigate();
  const theme = useTheme();
  const bgColor =
    theme.palette.mode === "light"
      ? "rgba(17, 153, 158, 0.3)"
      : "rgba(38, 80, 115, 0.3)";

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const url = import.meta.env["VITE_BACKEND_ENDPOINT"];
    const endpoint = url + "/register";
    const data = new FormData(event.currentTarget);
    console.log(endpoint);
    try {
      await axios.post(endpoint, {
        name: data.get("firstName") + " " + data.get("lastName"),
        email: data.get("email"),
        password: data.get("password"),
      });
      console.log(data.get("rememberMe"));
      toast.success("User registered successfully! Redirecting to Login...", {
        position: "top-right",
        autoClose: 5000,
        theme: theme.palette.mode,
        transition: Bounce,
      });
      setTimeout(() => {
        navigate("/login");
      }, 5000);
    } catch (err) {
      console.log(err);
      let msg = null;
      if (err instanceof AxiosError) msg = err.response?.data?.error;
      toast.error(msg ?? "An error occured!", {
        position: "top-right",
        autoClose: 5000,
        theme: theme.palette.mode,
        transition: Bounce,
      });
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
        minHeight: "100vh",
        pb: "1rem",
      }}
    >
      <Container
        component="main"
        maxWidth="xs"
        sx={{
          paddingTop: {
            xs: "6rem",
            md: "10rem",
          },
          background: "radial-gradient",
        }}
        disableGutters
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
          <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
            <LockOutlined />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
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
                  <InputLabel>Create a password</InputLabel>
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
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
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
            <Button
              type="submit"
              fullWidth
              size="large"
              variant="contained"
              sx={{ mt: 1.5, mb: 2 }}
            >
              Sign Up
            </Button>
          </Box>
          <Divider flexItem>OR</Divider>

          <Stack direction="row" spacing={5} mt={2}>
            <IconButton sx={{ border: "2px solid red" }}>
              <Google color="error" />
            </IconButton>
            <IconButton sx={{ border: "2px solid #1877F2", color: "#1877F2" }}>
              <Facebook />
            </IconButton>
            <IconButton
              sx={{
                border: `2px solid ${
                  theme.palette.mode === "light" ? "#707070" : "white"
                }`,
              }}
            >
              <GitHub />
            </IconButton>
          </Stack>

          <Typography variant="body2" sx={{ mt: "1.5rem" }}>
            Already have an account?
            <Link href="\login" variant="body2" sx={{ ml: "0.5rem" }}>
              Login
            </Link>
          </Typography>
        </Paper>
      </Container>
      <ToastContainer />
    </Container>
  );
}
