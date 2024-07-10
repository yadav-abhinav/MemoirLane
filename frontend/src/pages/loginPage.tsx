import React, { useContext, useState } from "react";
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
  Login as LoginIcon,
  Facebook,
  Google,
  GitHub,
  VisibilityOff,
  Visibility,
} from "@mui/icons-material";
import axios, { isAxiosError } from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { authContext } from "../util/context";
import { ErrorResponse, LoginResponse } from "../util/types";
import { LoadingButton } from "@mui/lab";

export default function Login() {
  const [isLoading, setLoading] = useState<boolean>(false);
  const { setLoggedIn } = useContext(authContext);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const navigate = useNavigate();
  const theme = useTheme();
  const bgColor =
    theme.palette.mode === "light"
      ? "rgba(17, 153, 158, 0.3)"
      : "rgba(38, 80, 115, 0.3)";

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    const endpoint = import.meta.env["VITE_BACKEND_ENDPOINT"] + "/login";
    const fromData = new FormData(event.currentTarget);
    try {
      const {
        data: { success, payload },
      } = await axios.post<LoginResponse>(endpoint, {
        email: fromData.get("email"),
        password: fromData.get("password"),
      });

      if (!success) throw new Error();

      const storage: Storage =
        fromData.get("rememberMe") === "on" ? localStorage : sessionStorage;
      storage.setItem("token", payload.accessToken);

      setTimeout(() => {
        setLoggedIn(true);
        setLoading(false);
        navigate("/dashboard");
      }, 2000);
    } catch (err) {
      let msg = null;
      if (isAxiosError<ErrorResponse>(err)) msg = err.response?.data.error;
      toast.error(msg ?? "An error occured!");
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword((show) => !show);
  };

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
            xs: "8rem",
            md: "10rem",
          },
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
            <LoginIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ my: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl variant="outlined" fullWidth required>
                  <InputLabel>Password</InputLabel>
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
                    label="Password"
                  />
                </FormControl>
              </Grid>
            </Grid>
            <Grid
              container
              justifyContent="space-between"
              alignItems="center"
              sx={{ mt: 1.5 }}
            >
              <Grid item>
                <FormControlLabel
                  control={<Checkbox name="rememberMe" defaultChecked />}
                  label="Remember me"
                />
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
            </Grid>
            <LoadingButton
              loading={isLoading}
              type="submit"
              fullWidth
              size="large"
              variant="contained"
              sx={{ mt: 1.5, mb: 2 }}
            >
              <span>Login</span>
            </LoadingButton>
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
            Don't have an account?
            <Link href="\signup" variant="body2" sx={{ ml: "0.5rem" }}>
              Sign up
            </Link>
          </Typography>
        </Paper>
      </Container>
    </Container>
  );
}
