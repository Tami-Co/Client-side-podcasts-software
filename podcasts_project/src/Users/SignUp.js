import React, { useEffect, useRef, useState } from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { Alert } from '@mui/material';
import { addUser, checkUserIsExist, fetchUsers, updateUser, userById } from './userSlice';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router';

const validEmailDomains = [
  'gmail.com',
  'hotmail.com',
  'yahoo.com',
  'outlook.com',
  'icloud.com',
  'walla.co.il',
  '012.net.il',
  'bezeqint.net',
  'netvision.net.il',
  'partner.com',
];
const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'שם  חייב להכיל לפחות 2 תווים')
    .max(10, 'שם  יכול להכיל עד 10 תווים')
    // .matches(
    //   /^[a-zA-Zא-ת]+$/,
    //   'תווים לא חוקיים'
    // )
    .required('שדה חובה'),

  lastName: Yup.string()
    .min(2, 'שם חייב להכיל לפחות 2 תווים')
    .max(10, 'שם יכול להכיל עד 10 תווים')
    // .matches(
    //   /^[a-zA-Zא-ת]+$/,
    //   'תווים לא חוקיים'
    // )
    .required('שדה חובה'),

  email: Yup.string()
    .email('מייל לא חוקי')
    .test('valid-domain', 'סיומת דוא"ל לא חוקית', (value) => {
      const domain = value.split('@')[1];
      return validEmailDomains.includes(domain);
    })
    .required('שדה חובה'),

  password: Yup.string()
    .min(4, 'סיסמה חייבת להכיל לפחות 4 תווים ')
    .max(16, 'מקסימום 16 תווים בסיסמה')
    // .matches(/[A-Z]/, 'Password must contain at least one uppercase char')
    .required('שדה חובה'),
});

export default function SignUp() {

  const formik = useFormik({
    initialValues: { firstName: '', lastName: '', email: '', password: '' },
    validationSchema: SignupSchema,
  });
  let [emailExist, setEmailExist] = useState(false)
  const navigate = useNavigate();
  // const users = useSelector((state) => state.users.users)
  // const status = useSelector(state => state.users.status)
  const userExist = useSelector(state => state.users.isUserExist)
  const dispatch = useDispatch();
  const [myuser, setMyuser] = useState(undefined)
  useEffect(() => {
    // if (users.length === 0) {
    //   console.log("innn");
    //   dispatch(fetchUsers())
    // }
    window.scrollTo(0, 0);

  }, [])


  const handleSubmit = async (event) => {
    event.preventDefault();
    setEmailExist(false)
    const data = new FormData(event.currentTarget);
    let firstName = data.get('firstName')
    let lastName = data.get('lastName')
    let email = data.get('email')
    let password = data.get('password')
    dispatch(checkUserIsExist(email))
    // let checkEmailIsExist = users.find((user) => user.email === email)
    console.log("vvv",userExist);
    if (userExist === false) {
      debugger
      console.log("enter",userExist);
      await dispatch(addUser(firstName, lastName, email, password))
      setMyuser({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password
      })

    }
    else {
      console.log("no",userExist);

      setEmailExist(true)
    }

  }
  useEffect(() => {
    const update = async () => {
      if (myuser != undefined) {
        await dispatch(updateUser(myuser))
        navigate('/signIn')
      }
    }
    update()
  }, [myuser])

  return (
    <Container component="main" maxWidth="xs">
      {/* <CssBaseline /> */}
      <Box
        sx={{
          marginTop: 19,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >

        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          הי, נעים להכיר
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="שם פרטי"
                autoFocus
                {...formik.getFieldProps('firstName')}
                error={formik.touched.firstName && formik.errors.firstName}
                helperText={formik.touched.firstName && formik.errors.firstName}
              />
            </Grid>
            {/* {firstNameEmpty && (
                <Alert severity="error">המשתמש כבר קיים במערכת</Alert>)} */}
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="שם משפחה"
                name="lastName"
                autoComplete="family-name"
                {...formik.getFieldProps('lastName')}
                error={formik.touched.lastName && formik.errors.lastName}
                helperText={formik.touched.lastName && formik.errors.lastName}
              />
            </Grid>
            <Grid item xs={12} >

              <TextField
                required
                fullWidth
                id="email"
                label="מייל"
                name="email"
                autoComplete="email"
                {...formik.getFieldProps('email')}
                error={formik.touched.email && formik.errors.email}
                helperText={formik.touched.email && formik.errors.email}
              />

            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="סיסמה"
                type="password"
                id="password"
                autoComplete="new-password"
                {...formik.getFieldProps('password')}
                error={formik.touched.password && formik.errors.password}
                helperText={formik.touched.password && formik.errors.password}
              />

            </Grid>
            {/* <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid> */}
          </Grid>
          {emailExist && (
            <Alert severity="error">המשתמש כבר קיים במערכת</Alert>
          )}

          {formik.errors.password || formik.errors.email || formik.errors.firstName || formik.errors.lastName ? (
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={true}
              sx={{ mt: 3, mb: 2 }}
            >
              הרשמה
            </Button>) : (<Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={false}
              sx={{ mt: 3, mb: 2 }}
            >
              הרשמה
            </Button>)}

          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="signIn" variant="body2">
                כבר יש לך חשבון? להתחברות
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );

}