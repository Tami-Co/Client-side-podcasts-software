
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { Alert, Box, Button, CircularProgress, Container, Paper } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete'; // Import Autocomplete
import { useTheme } from '@mui/material';
import { fetchCategories } from '../Categories/categorySlice';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLecturers } from '../Lecturers/lecturerSlice';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { addPodcast, updateAddPodcastStatus } from './podcastSlice';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import ErrorIcon from '@mui/icons-material/Error';
import { createTheme, ThemeProvider } from '@mui/material/styles';


const SUPPORTED_AUDIO_EXTENSIONS = ['mp3']; // List of supported audio extensions

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
// const addPodcastSchema = Yup.object().shape({
//   name: Yup.string()
//     .min(2, 'שם חייב להכיל לפחות 2 תווים')
//     .max(100, 'שם יכול להכיל עד 100 תווים')
//     .required('שדה חובה')
//   // .matches(
//   //   /^[a-zA-Zא-ת]+$/,
//   //   'תווים לא חוקיים'
//   // )
//   ,

//   content: Yup.string()
//     // .min(2, 'השם חייב להכיל לפחות 2 תווים')
//     .max(400, 'השם יכול להכיל עד 400 תווים')
//   // .matches(
//   //   /^[a-zA-Zא-ת]+$/,
//   //   'תווים לא חוקיים'
//   // )
//   // .required('שדה חובה')
//   ,
//   // lecturer: Yup.string()
//   //   .required(' יש לבחור מרצה'),
//   // category: Yup.string()
//   //   .required('יש לבחור קטגוריה'),
//   // file: Yup.string()
//   //   .required('יש לבחור קובץ'),
// });
export default function AddPodcast() {
  // const formik = useFormik({
  //   initialValues: { name:'', content:'' },
  //   validationSchema: addPodcastSchema,
  // });
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

  const theme = useTheme();
  const categories = useSelector(state => state.categories.categories)
  const statusCategory = useSelector(state => state.categories.status)
  const lecturers = useSelector(state => state.lecturers.lecturers)
  const statusLecturer = useSelector(state => state.lecturers.status)
  const current_User = useSelector(state => state.users.currentUser);
  const statusAdd = useSelector(state => state.podcasts.statusAddPodcast);
  const currentIdUser=localStorage.getItem('idUser') 

  const dispatch = useDispatch();
  const navigate = useNavigate();
  let LecturerNames = lecturers.map((lecturer) => lecturer.firstName + " " + lecturer.lastName + " ");
  let CategoryNames = categories.map((category) => category.nameOfCategory);
  const [nameLecture, setNameLecture] = useState('');
  let [contentLecture, setContentLecture] = useState('');
  let [lecturer, setLecturer] = useState('');
  let [category, setCategory] = useState('');
  let [isVideoPodcast, setIsVideoPodcast] = useState(true);
  let [length, setLength] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileEmpty, setFileEmpty] = useState(false);
  const [typeFile, setTypeFile] = useState(false);
  const [open, setOpen] = React.useState(true);
  const [openAddPodcast, setOpenAddPodcast] = React.useState(true);
  const nameRef = useRef(null);
  let [isEmptyName, setIsEmptyName] = useState(false);
  let [isEmptyCategory, setIsEmptyCategory] = useState(false);
  let [isEmptyLecturer, setIsEmptyLecturer] = useState(false)
  let [fileSize, setFileSize] = useState(false)

  useEffect(() => {
    if (currentIdUser !== 'null') {
      nameRef.current.focus();
    }
  }, []);

  const handleClose = () => setOpen(false);
  const [allPodcast, setallPodcast] = useState(undefined)

  useEffect(() => {
    const fetchCategoriesAfterLecturers = () => {
      if (statusCategory !== 'fulfilled') {
        dispatch(fetchCategories());
      }
    };

    if (statusLecturer !== 'fulfilled') {
      console.log("if");
      dispatch(fetchLecturers());
    } else {
      console.log("else");
      fetchCategoriesAfterLecturers();
    }

  }, [statusCategory, statusLecturer, dispatch]);

  useEffect(() => {
    if (statusAdd === 'fulfilled') {
      const timeoutId = setTimeout(() => {
        console.log("navigate");
        navigate("/home");
        dispatch(updateAddPodcastStatus('idle'))
      }, 2000);

      return () => clearTimeout(timeoutId);
    }
  }, [statusAdd]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }
    , []);
  const handleFileChange = async (event) => {
    setFileSize(false)
    const file = event.target.files[0];
    console.log("cc", file.type);

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
      setIsVideoPodcast(false); // Update to audio if supported audio extension
    } else {
      setSelectedFile(file);
      setFileEmpty(false);
      setIsVideoPodcast(true)
    }


  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    dispatch(updateAddPodcastStatus('idle'))
    console.log("statusAdd", statusAdd);

    const currentCategory = categories.find((c) => { return c.nameOfCategory === category })
    const currentLecturer = lecturers.find((l) => { return l.firstName + " " + l.lastName + " " === lecturer })

    setIsEmptyName(false);
    setIsEmptyCategory(false);
    setIsEmptyLecturer(false);
    setFileSize(false);
    const fileSizeInBytes = selectedFile?.size;

    // המרת גודל הקובץ ל-MB
    const fileSizeInMB = fileSizeInBytes / (1024 * 1024);

    // עיגול גודל הקובץ למספר שלם
    const roundedFileSizeInMB = Math.floor(fileSizeInMB);

    console.log("roundedFileSizeInMB", roundedFileSizeInMB);
    // החזרת גודל הקובץ
    // return `${roundedFileSizeInMB} MB`;

    console.log("eeekkk", nameLecture, lecturer, category,currentIdUser);
    switch (true) {
      case selectedFile == null:
        setFileEmpty(true);
        break;
      case !['mp3', 'mp4', 'mkv'].includes(selectedFile.name.split('.').pop().toLowerCase()):
        setTypeFile(true);
        break;
      case roundedFileSizeInMB > 300:
        setFileSize(true);
        break;
      case nameLecture.trim() === '':
        setIsEmptyName(true);
        break;
      case lecturer === '' || lecturer === null:
        setIsEmptyLecturer(true);
        break;
      case category === '' || category === null:
        setIsEmptyCategory(true);
        break;
      default:
        setallPodcast({
          name1: nameLecture,
          content1: contentLecture,
          selectedFile1: selectedFile,
          isVideoPodcast1: isVideoPodcast,
          length1: 3,
          uploadingDate1: new Date().toLocaleDateString(),
          category1: currentCategory.id,
          lecturer1: currentLecturer.id,
          user1: currentIdUser,
          responses1: []
        });
        break;
    }

  }

  useEffect(() => {
    if (allPodcast != undefined) {
      console.log("effectallPodcast", allPodcast);
      dispatch(addPodcast(allPodcast))
    }
  }, [allPodcast])

  function onSelect(args) {
    var uploadObj = document.getElementById("UploadFiles").ej2_instances[0];
    var totalSize = 0;
    for (var i = 0; i < args.filesData.length; i++) {
      var file = args.filesData[i];
      totalSize = totalSize + file.size;
    }
    var size = uploadObj.bytesToSize(totalSize);
    alert("Total select file's size is " + size);
  }

  const getFileSize = (file) => {
    // בדיקה שהקובץ קיים
    if (!file) {
      return null;
    }

    // קבלת גודל הקובץ בבתים
    const fileSizeInBytes = file.size;

    // המרת גודל הקובץ ל-MB
    const fileSizeInMB = fileSizeInBytes / (1024 * 1024);

    // עיגול גודל הקובץ למספר שלם
    const roundedFileSizeInMB = Math.floor(fileSizeInMB);

    // החזרת גודל הקובץ
    return `${roundedFileSizeInMB} MB`;
  };

  async function getDuration(file, isVideoPodcast) {
    try {
      const reader = new FileReader();
      reader.readAsArrayBuffer(file);
      await new Promise((resolve) => reader.onload = resolve);

      const audioContext = new AudioContext();

      if (isVideoPodcast) {
        const video = document.createElement("video");
        video.src = URL.createObjectURL(file);
        return new Promise((resolve) => {
          video.addEventListener("loadedmetadata", () => {
            const frameRate = video.videoTracks[0].frameRate;
            const duration = video.duration;
            resolve(duration / 60);
          });
        });
      } else {
        const audioFile = await audioContext.decodeAudioData(reader.result);
        const sampleRate = audioFile.sampleRate;
        return (file.size / (sampleRate * 2 * 8)) / 60;
      }
    } catch (error) {
      console.error("Error getting duration:", error);
    }
  }

  const handleCloseMassege = () => {
    setOpen(false);
    window.history.back();

  }
  return (
    <Box sx={{ paddingTop: '7%' }}>
      <Container component="main" maxWidth="sm" sx={{ mb: 4, }}>
        <div>
          {currentIdUser === 'null' ? (
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
            <Paper variant="outlined" sx={{ backgroundColor: 'white', my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
              <Typography component="h1" variant="h4" align="center">
                Sharing a Podcast
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
                          הפודקאסט עלה בהצלחה<br />
                          תודה על השיתוף
                        </Typography>
                      </Box>
                    </Modal>
                  </Box>
                )}

                <Typography variant="h6" gutterBottom>
                  היי, תודה שבחרת לשתף פודקאסט עם כולם
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'flex-end', paddingBottom: '1%' }}>
                  <Typography variant="h6" gutterBottom sx={{ mr: 1, my: 3 }}>
                    *שם הפודקאסט:
                  </Typography>
                  <TextField
                    id="standard-basic"
                    variant="standard"
                    value={nameLecture}
                    onChange={(e) => { setNameLecture(e.target.value) }}
                    sx={{ paddingRight: '5%' }}
                    inputRef={nameRef}
                    error={isEmptyName}
                    helperText={isEmptyName ? 'שדה חובה' : 'יופיע ככותרת של הפודקאסט שלך'}
                  // {...formik.getFieldProps('name')}
                  // error={formik.touched.name && formik.errors.name}  
                  // helperText={formik.touched.name && formik.errors.name}

                  // helperText={
                  //   formik.touched.name && formik.errors.name
                  //     ? formik.errors.name
                  //     : "יופיע ככותרת של הפודקאסט שלך"
                  // }
                  />

                </Box>

                <Box sx={{ display: 'flex', alignItems: 'flex-end', paddingBottom: '1%' }}>
                  <Typography variant="h6" gutterBottom sx={{ mr: 1, my: 9 }}>
                    תוכן הפודקאסט:
                  </Typography>

                  <TextField

                    id="outlined-multiline-static"
                    multiline
                    rows={4}
                    value={contentLecture}
                    onChange={(e) => setContentLecture(e.target.value)}
                    label="טקסט חופשי"
                    sx={{ paddingRight: '4%' }}

                    helperText="*אופציונלי-תיאור קצר על תוכן הפודקאסט"
                  // {...formik.getFieldProps('content')}
                  // error={formik.touched.content && formik.errors.content}
                  // helperText={
                  //   formik.touched.content && formik.errors.content
                  //     ? formik.errors.content
                  //     : "*אופציונלי-תיאור קצר על תוכן הפודקאסט"
                  // }
                  />
                </ Box>


                <Box sx={{ display: 'flex', alignItems: 'flex-end', paddingBottom: '1%' }}>
                  <Typography variant="h6" gutterBottom sx={{ mr: 1, my: 3 }}>
                    *מרצה/מגיש:
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', paddingRight: '9.5%' }}>
                    <Autocomplete
                      sx={{ width: '15.5vw' }}
                      value={lecturer}
                      onChange={(event, newValue) => {
                        console.log("newValue", newValue);

                        setLecturer(newValue);
                      }}
                      options={LecturerNames}
                      renderInput={(params) => <TextField {...params} label="בחירת מרצה/מגיש" />}
                    // error={isEmptyLecturer}
                    // helperText={isEmptyLecturer ? 'יש לבחור מרצה' : ''}
                    // {...formik.getFieldProps('lecturer')}
                    // error={formik.touched.lecturer && formik.errors.lecturer}
                    // helperText={formik.touched.lecturer && formik.errors.lecturer}
                    />
                    {isEmptyLecturer && (
                      <Box >
                        <p style={{ color: '#d32f2f', fontSize: '0.75rem' }}>יש לבחור מרצה</p>
                      </Box>

                    )}
                  </Box>

                </Box>

                <Box sx={{ display: 'flex', alignItems: 'flex-end', paddingBottom: '5%' }}>
                  <Typography variant="h6" gutterBottom sx={{ mr: 1, my: 3 }}>
                    *קטגוריה:
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', paddingRight: '15%' }}>
                    <Autocomplete
                      value={category}
                      sx={{ width: '15.5vw' }}
                      onChange={(event, newValue) => {
                        setCategory(newValue);
                      }}
                      options={CategoryNames}
                      renderInput={(params) => <TextField {...params} label="בחירת קטגוריה" />}
                      error={isEmptyCategory}
                      helperText={isEmptyCategory ? 'יש לבחור קטגוריה' : ''}
                    // {...formik.getFieldProps('category')}
                    // error={formik.touched.category && formik.errors.category}
                    // helperText={formik.touched.category && formik.errors.category}
                    />
                    {isEmptyCategory && (
                      <Box >
                        <p style={{ color: '#d32f2f', fontSize: '0.75rem' }}>יש לבחור קטגוריה</p>
                      </Box>

                    )}
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'flex-end', paddingBottom: '1%' }}>
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
                    העלה פודקסאסט
                    <VisuallyHiddenInput type="file" sx={{paddingLeft:'10px'}} onChange={handleFileChange} />
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
                  <Alert severity="error">יש לצרף קובץ</Alert>
                )}
                {typeFile && (
                  <Alert severity="error">
                    יש לצרף קובץ וידאו או שמע בלבד.
                  </Alert>
                )}
                {fileSize && (
                  <Alert severity="error">
                    גודל מירבי של קובץ עד 300 MB.
                  </Alert>
                )}
                {/* {formik.errors.name || formik.errors.content ? (
                <Button
                  variant="contained"
                  sx={{ mt: 3, ml: 1 }}
                  onClick={handleSubmit}
                  disabled={true}
                >
                  אישור
                </Button>) : (
                <Button
                  variant="contained"
                  sx={{ mt: 3, ml: 1 }}
                  onClick={handleSubmit}
                  disabled={false}
                >
                  אישור
                </Button>
              )} */}
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
    </Box>


  );
}