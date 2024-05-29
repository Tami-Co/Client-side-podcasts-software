
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

export default function AddCategory() {
  const categories = useSelector(state => state.categories.categories)
  const current_User = useSelector(state => state.users.currentUser);
  const statusAdd = useSelector(state => state.categories.statusAddCategory);
  const statusCategory = useSelector(state => state.categories.status)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [nameCategory, setNameCategory] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileEmpty, setFileEmpty] = useState(false);
  const [typeFile, setTypeFile] = useState(false);
  const [open, setOpen] = React.useState(true);
  const [openAddPodcast, setOpenAddPodcast] = React.useState(true);
  const nameRef = useRef(null);
  let [isEmptyName, setIsEmptyName] = useState(false);
  let [nameIsExist, setNameIsExist] = useState(false)
  const [allCategory, setallCategory] = useState(undefined)

  useEffect(() => {
    if (current_User !== 'התחברות') {
      nameRef.current.focus();
    }
  }, []);

  const handleClose = () => setOpen(false);

  useEffect(() => {
    const fetchAllCategories = async () => {
      if (statusCategory !== 'fulfilled') {
        await dispatch(fetchCategories());
      }
    };
    fetchAllCategories()
  }, [statusCategory, dispatch]);

  useEffect(() => {
    if (statusAdd === 'fulfilled') {
      const timeoutId = setTimeout(() => {
        console.log("navigate");
        navigate("/personalArea");
        dispatch(updateAddCategoryStatus('idle'))
      }, 2000);

      return () => clearTimeout(timeoutId);
    }
  }, [statusAdd]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }
    , []);
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    setNameIsExist(false)
    if (!file) {
      setSelectedFile(null);
      setFileEmpty(true);
      setTypeFile(false);
      return;
    }

    const extension = file.name.split('.').pop().toLowerCase();

    if (SUPPORTED_AUDIO_EXTENSIONS.includes(extension)) {
      setSelectedFile(file);
      setFileEmpty(false);
      setTypeFile(false);
    } else {
      setSelectedFile(file);
      setFileEmpty(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    dispatch(updateAddCategoryStatus('idle'))
    console.log("statusAdd", statusAdd);
    const currentCategory = categories.find((c) => { return c.nameOfCategory === nameCategory })
    console.log("currentCategory", currentCategory);
    setIsEmptyName(false);
    setNameIsExist(false)
    console.log("eeekkk", nameCategory);
    switch (true) {
      case selectedFile == null:
        setFileEmpty(true);
        break;
      case !['webp', 'png', 'jpg', 'jpeg', 'svg'].includes(selectedFile.name.split('.').pop().toLowerCase()):
        setTypeFile(true);
        break;
      case currentCategory !== undefined:
        setNameIsExist(true)
        break;
      case nameCategory.trim() === '':
        setIsEmptyName(true);
        break;

      default:
        setallCategory({
          name1: nameCategory,
          selectedFile1: selectedFile,

        });
        break;
    }

  }

  useEffect(() => {
    if (allCategory != undefined) {
      console.log("effectallCategory", allCategory);
      dispatch(addCategory(allCategory))
    }
  }, [allCategory])

  const handleCloseMassege = () => {
    setOpen(false);
    window.history.back();

  }
  return (
    <Container component="main" maxWidth="sm" sx={{ mb: 4, paddingTop: "10%" }}>
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
              הוספת קטגוריה
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
                        הקטגוריה נוספה בהצלחה
                      </Typography>
                    </Box>
                  </Modal>
                </Box>
              )}

              <Box sx={{ display: 'flex', alignItems: 'center', paddingBottom: '5%' }}>
                <Typography variant="h6" gutterBottom sx={{ mr: 1, my: 3 }}>
                  *שם הקטגוריה:
                </Typography>
                <TextField
                  id="standard-basic"
                  variant="standard"
                  value={nameCategory}
                  onChange={(e) => { setNameCategory(e.target.value) }}
                  sx={{ paddingRight: '4%' }}
                  inputRef={nameRef}
                  error={isEmptyName}
                  helperText={isEmptyName && 'שדה חובה'}
                />
              </Box>
              {nameIsExist && (
                <Alert severity="error">
                  קטגוריה זו קיימת
                </Alert>
              )}
              <Box sx={{ display: 'flex', alignItems: 'center', paddingBottom: '5%', mt: 1 }}>
                <Button
                  component="label"
                  sx={{ direction: 'rtl' }}
                  role={undefined}
                  variant="contained"
                  tabIndex={-1}
                  startIcon={<CloudUploadIcon />}
                  onClick={() => {
                    setFileEmpty(false);
                    setTypeFile(false);
                  }}
                >
                  העלה תמונת קטגוריה
                  <VisuallyHiddenInput type="file" onChange={handleFileChange} />
                </Button>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ fontSize: 12, mr: 1 }}
                >
                  {selectedFile && selectedFile.name}
                </Typography>
              </Box>
              {fileEmpty && (
                <Alert severity="error">יש לצרף תמונה</Alert>
              )}
              {typeFile && (
                <Alert severity="error">
                  יש לצרף תמונה בלבד.
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