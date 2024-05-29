
import React, { useEffect, useRef, useState } from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, updateUser, userById, userLogin } from './userSlice';
import { Alert } from '@mui/material';
import { useLocation, useNavigate, useParams } from 'react-router';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'


// const defaultTheme = createTheme();

export default function SignInSide() {
  const { categoryId } = useParams();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  console.log("location", pathname);
  const users = useSelector(state => state.users.users)
  const status = useSelector(state => state.users.status)
  const current_User = useSelector(state => state.users.currentUser);
  // const current_IdUserLogin = useSelector(state => state.users.idUserLogin);
  const currentUserById = useSelector(state => state.users.userById);
  let [userNotExist, setUserNotExist] = useState(false)
  // let [passwordNotValid, setPasswordNotValid] = useState(false)
  let [emailError, setEmailError] = useState(false);
  let [passwordError, setPasswordError] = useState(false);
  const dispatch = useDispatch();
  let idUserLogin;
  let current_IdUserLogin;

  useEffect(() => {
    // if (users.length === 0) {
    // dispatch(fetchUsers())
    // }
    window.scrollTo(0, 0);

  }, [])
  const userLogin = async (user) => {
    try {
      console.log("userLogin", user);
      const response = await axios.post('https://localhost:7051/api/User/Login', {
        FirstName: 'aaa',
        LastName: 'aaa',
        Email: user.em,
        Password: user.pa
      })
      idUserLogin = response.data
      console.log("idUserLogin", idUserLogin);
    } catch (error) {
      console.log("errorAddCategory", error);
      // return isRejectedWithValue(error)

    }
  }

  const userById = async (id) => {
    try {
      console.log('in userById');
      const response = await axios.get(`https://localhost:7051/api/User/${id}`)
      console.log(response.data);
      current_IdUserLogin = response.data
    } catch (error) {
      console.log("errorUserById", error);
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email')
    const password = data.get('password')
    setEmailError(false);
    setPasswordError(false);
    setUserNotExist(false);
    switch (true) {
      case !email.trim():
        setEmailError(true);
        console.log("emailError1", emailError);
        break;
      case email.trim():
        setEmailError(false);
        console.log(emailError);
        break;
      case !password.trim():
        setPasswordError(true);
        console.log("passwordError", passwordError);
        break;
      case password.trim():
        setPasswordError(false);
        console.log(passwordError);
        break;
      default:
        console.log(emailError);
        console.log(passwordError);
        const user = { em: email, pa: password }
        await userLogin(user)
        console.log("current_IdUserLogin1", idUserLogin);
        if (idUserLogin !== 'worng') {
          setUserNotExist(false)
          await userById(idUserLogin)
          console.log("currentUserById", current_IdUserLogin);
          localStorage.setItem('idUser', current_IdUserLogin.id)
          localStorage.setItem('firstNameUser', current_IdUserLogin.firstName)
          localStorage.setItem('lastNameUser', current_IdUserLogin.lastName)

          dispatch(updateUser(current_IdUserLogin.id))
          if (categoryId !== undefined || pathname === '/addPodcast/signIn') {
            console.log("yesEnter", categoryId, pathname);
            window.history.back();

          }
          else {
            navigate('/home')
          }
        }
        else {
          setUserNotExist(true)
        }

        break;
    }

  };
  function log1() {
    console.log("change1");
  }
  function log2() {
    console.log("change2");
  }

  return (
    <Grid container component="main" sx={{ height: '100vh', mt: 8 }}>
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: `url('podcast.jpg')`,
          backgroundRepeat: 'no-repeat',
          backgroundColor: (t) =>
            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '90vh'

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
            paddingTop: '13%'
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            התחברות
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              //onChange={(event) => setEmailError(false)} 
              onChange={log1()}
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />

            <TextField
              onChange={log2()}
              //   onChange={(event) => setPasswordError(false)} // Clear error on change
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />


            {emailError && (
              <Alert severity="error">נא להכניס אימייל </Alert>
            )}
            {passwordError && (
              <Alert severity="error"> נא להכניס סיסמה</Alert>
            )}
            {userNotExist && (
              <Alert severity="error">המשתמש לא קיים במערכת</Alert>
            )}
            <Button
              // onClick={() => checkUserExist()}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              התחברות
            </Button>
            <Grid container>
              {/* <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid> */}
              <Grid item>
                <Link href="SignUp" variant="body2">
                  {"אין לך חשבון? להרשמה"}
                </Link>
              </Grid>
            </Grid>
            {/* <Copyright sx={{ mt: 5 }} /> */}
          </Box>
        </Box>
      </Grid>
    </Grid>
    // </ThemeProvider>
  );
}

