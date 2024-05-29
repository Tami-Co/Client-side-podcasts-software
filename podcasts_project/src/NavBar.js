import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Link, useNavigate } from "react-router-dom";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import './NavBarStyle.css'
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from './Users/userSlice';
import { CssBaseline, Fab, Grid, Modal } from '@mui/material';
import logo from './logo.png'
import AddIcon from '@mui/icons-material/Add';

const pages = ['פודקאסטים', 'מרצים', 'קטגוריות', 'כניסה', 'התחברות'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
// const defaultTheme = createTheme();

function ResponsiveAppBar() {
    const dispatch = useDispatch()
    const [anchorEl, setAnchorEl] = React.useState(null);
    const currentUser = localStorage.getItem('idUser');
    const currentFirstNameUser = localStorage.getItem('firstNameUser');
    const navigate = useNavigate()
    const current_User = useSelector(state => state.users.currentUser);
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    useEffect(() => {
        const userId = localStorage.getItem('idUser')
        console.log(userId, "999");
        if (userId == 'null') {
            console.log("yes");
            dispatch(updateUser(null))
        }

        else {
            dispatch(updateUser(userId))
        }

    }, [])
    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        event.preventDefault();
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleMenu = (event) => {
        event.preventDefault();
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        console.log("handleClose");
        setAnchorEl(null);
    };
    const logOut = () => {
        dispatch(updateUser(null));
        localStorage.setItem('idUser', null)
        localStorage.setItem('firstNameUser', null)
        // await setCurrentIdUser(null)
    };
    const funcPersonalArea = () => {
        if (currentUser === '6')
            navigate('managerArea')
        else
            navigate('personalArea')
    }
    // const [open, setOpen] = React.useState(false);
    // const handleOpenMassege = () => {
    //     if (current_User == 'התחברות')
    //         setOpen(true);
    //     else {
    //         navigate(`addPodcast`); 

    //     }

    // }
    // const handleCloseMassege = () => setOpen(false);
    // useEffect(() => {
    //     if (current_User == '') {
    //         console.log("login");
    //         setCurrentUser('התחברות');
    //     }
    //     else {
    //         setCurrentUser(current_User.firstName);
    //         console.log("firstname");
    //     }
    // }, [current_User]);

    return (

        <AppBar className='allNavBar'
            position="static"

            sx={{
                position: 'relative',
                position: 'fixed',
                top: '0',
                left: '0',
                width: '100%',
                height: '18%',
                zIndex: '100',
            }}>
            <CssBaseline />
            <Container className='css-dqe57j-MuiContainer-root' maxWidth="xl" sx={{ paddingLeft: '0%', paddingRight: '0%', }}>
                <Toolbar disableGutters>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, paddingRight: '0%', paddingTop: '0%' }}>
                        <Link to={'lecturers'} className='link'>
                            <Button variant="outlined" sx={{ color: 'white', display: 'block', fontSize: '15pt' }}>מרצים</Button>
                        </Link>
                        <Link to={'categories'} className='link'>
                            <Button variant="outlined" sx={{ color: 'white', display: 'block', fontSize: '15pt' }} >קטגוריות</Button>
                        </Link>
                        <Link underline={false} className='link' to={'about'}>
                            <Button variant="outlined" sx={{ color: 'white', display: 'block', fontSize: '15pt' }}>אודות</Button>
                        </Link>
                    </Box>
                    <Box sx={{ marginLeft:'25%'}}>
                        <Link underline={false} to={'home'}>
                            <img src={logo} alt="Logo" style={{ width: '10vw', height: '20vh' }} />
                        </Link>
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip >
                            <Link underline={false} to={'signIn'}
                                onMouseEnter={handleMenu}
                                onMouseDown={handleClose}
                            >
                                <Button
                                    // onMouseEnter={handleMenu}
                                    // onMouseLeave={handleClose} // Add this line
                                    variant="text"
                                    sx={{ color: 'white', paddingLeft: '24px', fontSize: '15pt' }}
                                >
                                    <AccountCircleIcon />
                                    {console.log("qqq", currentUser)}
                                    {currentUser == 'null' ? 'התחברות' : currentFirstNameUser}
                                </Button>
                            </Link>
                            {current_User !== null && (
                                <Menu
                                    sx={{ position: 'absolute', top: '4.5%' }}
                                    id="menu-appbar"
                                    anchorEl={anchorEl}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(anchorEl)}
                                    onClose={handleClose}
                                >
                                    <MenuItem onClick={funcPersonalArea}>אזור אישי</MenuItem>
                                    <MenuItem onClick={logOut}>התנתקות</MenuItem>
                                </Menu>
                            )}
                            {current_User === null && (<Link underline={false} to={'SignUp'} >
                                <Button variant="outlined" sx={{ color: 'white', fontSize: '15pt' }}>הרשמה</Button>
                            </Link>)}
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {settings.map((setting) => (
                                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                    <Typography textAlign="center">{setting}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                        <Link underline={false} to={'addPodcast'}>
                            <Fab variant="extended"
                                sx={{ direction: 'ltr' }}
                            > שתף פודקאסט
                                < AddIcon sx={{ mr: 1 }} />

                            </Fab>
                        </Link>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
        // </ThemeProvider>

    );
}
export default ResponsiveAppBar;

