
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { Alert, Box, Button, CircularProgress, Container, Paper } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { addCategory, fetchCategories, updateAddCategoryStatus } from '../Categories/categorySlice';
import { useDispatch, useSelector } from 'react-redux';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import ErrorIcon from '@mui/icons-material/Error';
import { addLecturer, fetchLecturers, updateAddLecturerStatus } from '../Lecturers/lecturerSlice';


const SUPPORTED_AUDIO_EXTENSIONS = ['webp', 'png', 'jpg', 'jpeg', 'svg'];

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
    textAlign: 'center'
});

export default function AddLecturer() {
    const lecturers = useSelector(state => state.lecturers.lecturers)
    const current_User = useSelector(state => state.users.currentUser);
    const statusAdd = useSelector(state => state.lecturers.statusAddLecturer);
    const statusLecturer = useSelector(state => state.lecturers.status)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState('');
    const [lastName, setlastName] = useState('');
    const [open, setOpen] = React.useState(true);
    const [openAddPodcast, setOpenAddPodcast] = React.useState(true);
    const nameRef = useRef(null);
    let [isEmptyFirstName, setIsEmptyFirstName] = useState(false);
    let [isEmptylastName, setIsEmptylastName] = useState(false);
    let [LecturerIsExist, setLecturerIsExist] = useState(false)
    const [allLecturer, setAllLecturer] = useState(undefined)

    useEffect(() => {
        if (current_User !== 'התחברות') {
            nameRef.current.focus();
        }
    }, []);

    const handleClose = () => setOpen(false);

    useEffect(() => {
        const fetchAllLecturers = async () => {
            if (statusLecturer !== 'fulfilled') {
                await dispatch(fetchLecturers());
            }
        };
        fetchAllLecturers()
    }, [statusLecturer, dispatch]);

    useEffect(() => {
        if (statusAdd === 'fulfilled') {
            const timeoutId = setTimeout(() => {
                console.log("navigate");
                navigate("/personalArea");
                dispatch(updateAddLecturerStatus('idle'))
            }, 2000);

            return () => clearTimeout(timeoutId);
        }
    }, [statusAdd]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }
        , []);


    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent default form submission behavior
        dispatch(updateAddLecturerStatus('idle'))
        console.log("statusAdd", statusAdd);
        const currentLecturer = lecturers.find((c) => { return c.firstName === firstName && c.lastName === lastName })
        console.log("currentCategory", currentLecturer);
        setIsEmptyFirstName(false);
        setIsEmptylastName(false);
        setLecturerIsExist(false)
        console.log("eeekkk", firstName, lastName);
        switch (true) {
            case currentLecturer !== undefined:
                setLecturerIsExist(true)
                break;
            case firstName.trim() === '':
                setIsEmptyFirstName(true);
                break;
            case lastName.trim() === '':
                setIsEmptylastName(true);
                break;

            default:
                setAllLecturer({
                    firstName1: firstName,
                    lastName1: lastName,
                });
                break;
        }

    }

    useEffect(() => {
        if (allLecturer != undefined) {
            console.log("effectallCategory", allLecturer);
            dispatch(addLecturer(allLecturer))
        }
    }, [allLecturer])

    const handleCloseMassege = () => {
        setOpen(false);
        window.history.back();

    }
    return (
        <Container component="main" maxWidth="sm" sx={{ mb: 4, marginTop: "15%" }}>
            <div>
                {current_User == 'התחברות' ? (
                    <div >
                        <Modal
                            sx={{ textAlign: 'center' }}
                            open={openAddPodcast}
                            onClose={handleCloseMassege}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={style} >
                                <ErrorIcon sx={{ width: '20vw', height: '20vh' }} />
                                <Typography id="modal-modal-title" variant="h6" component="h2">
                                    ,אינך מחובר <br />
                                    עליך להתחבר
                                </Typography>

                                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                    <Link to={'signIn'} variant="body2">
                                        להתחברות
                                    </Link>
                                </Typography>
                            </Box>
                        </Modal>
                    </div>
                ) : (
               
               <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                        <Typography component="h1" variant="h4" align="center">
                            הוספת מרצה
                        </Typography>
                        <React.Fragment>

                            {statusAdd === 'pending' && (
                                <Box >
                                    <Backdrop
                                        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                                        open={true}
                                    // onClick={handleClose}
                                    >
                                        <CircularProgress color="inherit" />
                                    </Backdrop>
                                </Box>
                            )}

                            {statusAdd === 'fulfilled' && (
                                <Box>
                                    <Modal
                                        open={open}
                                        onClose={handleClose}
                                        aria-labelledby="modal-modal-title"
                                        aria-describedby="modal-modal-description"
                                    >
                                        <Box sx={style}>
                                            <Typography id="modal-modal-description" sx={{ mt: 2, textAlign: 'center' }}>
                                                המרצה נוספה בהצלחה
                                            </Typography>
                                        </Box>
                                    </Modal>
                                </Box>
                            )}

                            <Box sx={{ display: 'flex', alignItems: 'center', paddingBottom: '5%' }}>
                                <Typography variant="h6" gutterBottom sx={{ mr: 1, my: 3 }}>
                                    *שם פרטי:
                                </Typography>
                                <TextField
                                    id="standard-basic"
                                    variant="standard"
                                    value={firstName}
                                    onChange={(e) => { setFirstName(e.target.value) }}
                                    sx={{ paddingRight: '4%' }}
                                    inputRef={nameRef}
                                    error={isEmptyFirstName}
                                    helperText={isEmptyFirstName && 'שדה חובה'}
                                />
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', paddingBottom: '5%' }}>
                                <Typography variant="h6" gutterBottom sx={{ mr: 1, my: 3 }}>
                                    *שם משפחה:
                                </Typography>
                                <TextField
                                    id="standard-basic"
                                    variant="standard"
                                    value={lastName}
                                    onChange={(e) => { setlastName(e.target.value) }}
                                    sx={{ paddingRight: '4%' }}
                                    inputRef={nameRef}
                                    error={isEmptylastName}
                                    helperText={isEmptylastName && 'שדה חובה'}
                                />
                            </Box>
                            {LecturerIsExist && (
                                <Alert severity="error">
                                    מרצה זה קיים
                                </Alert>
                            )}

                            <Button
                                variant="contained"
                                sx={{ mt: 3, ml: 1 }}
                                onClick={handleSubmit}
                            >
                                אישור
                            </Button>
                        </React.Fragment>
                    </Paper>
                )}
            </div>
        </Container>
    );
}