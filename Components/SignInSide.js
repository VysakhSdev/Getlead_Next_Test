import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { login } from '@/Services/api';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';





const defaultTheme = createTheme();
export default function SignInSide() {
 
  const router = useRouter();
  const [loginData,setLoginData]=useState({})
  const [errorMessage,setErrorMessage]=useState('')


  const handleLogin = async (e) => {
    e.preventDefault();
    if (!loginData || !loginData.username || !loginData.password) {
      toast.error("Please enter username and password");
      setErrorMessage("Please enter username and password");

      return;
    }

    try {
      const response = await login(loginData.username, loginData.password);
      console.log(response, "re");
      if (response.status === 'ok') {
        toast.success("Login successfull");
        localStorage.setItem("User_token", response?.data?.token?.access);
        localStorage.setItem("User_refresh", response?.data?.token?.refresh);
        router.push("/home");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
      setErrorMessage(error?.response?.data?.message);

    }
  };




  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url("/login2.jpg")',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'left',
          }}
          
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={handleLogin} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="user name"
                label="User Name"
                name="user"
                autoComplete="User name"
                autoFocus
                onChange={(e) => {
                  setLoginData({
                    ...loginData,
                    username: e.target.value,
                  });
                  setErrorMessage("");
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => {
                  setLoginData({
                    ...loginData,
                    password: e.target.value,
                  });
                  setErrorMessage("");
                }}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
  


<Typography variant="body2" color="error.main" align="center"  >
{errorMessage}

    </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}