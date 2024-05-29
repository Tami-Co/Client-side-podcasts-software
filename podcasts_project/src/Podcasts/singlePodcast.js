import { BottomNavigationAction, Box, CircularProgress, Fab, Modal, TextField } from '@mui/material';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router'
import { fetchFilePodcast, fetchHandleDownloadNow, fetchImgPodcast, fetchPodcastsOfCategory, fetchSinglePodcast, updateCurrentPodcast, updateNumberViews } from './podcastSlice';
import Button from '@mui/material/Button';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Typography from '@mui/material/Typography';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DateRangeIcon from '@mui/icons-material/DateRange';
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import ResponsesPodcast from '../Response/responsesPodcast';
import DownloadIcon from '@mui/icons-material/Download';
import { format } from 'date-fns';
import SendIcon from '@mui/icons-material/Send';
import { addResponse, updateAddResponseStatus } from '../Response/responseSlice';
import './singlePodcastCSS.css'
import ErrorIcon from '@mui/icons-material/Error';
import { categoryById } from '../Categories/categorySlice';

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
  alignItems: 'center'
};
export default function SinglePodcast() {

  const { podcastId } = useParams();
  const { categoryId } = useParams();
  console.log("categoryId5ppp", categoryId);
  const dispatch = useDispatch();
  // const podcastStatus = useSelector(state => state.podcasts.statusCurrentPodcast)
  const currentImgPod = useSelector(state => state.podcasts.currentImgPodcast)
  const statusCurrentCat = useSelector(state => state.categories.statusCurrentCategory)
  // const category = useSelector(state => state.categories.currentCategory)
  // const currentPodcast2 = category.lectures.find((lecture) => lecture.id == podcastId)
  const currentUser = useSelector(state => state.users.currentUser)

  const file = useSelector(state => state.podcasts.podcastFile)
  // const statusOfUpdate = useSelector(state => state.podcasts.statusUpdate)
  const statusImg = useSelector(state => state.podcasts.currentImgStatus)
  const [loading, setLoading] = useState(true)
  const [addRes, setAddRes] = useState(false)
  const [statusOfUpdate, setStatusOfUpdate] = useState(true)
  const navigate = useNavigate();
  let [contentResponse, setContentResponse] = useState('')
  // let [isEmptyImg, setisEmptyImg] = useState('')
  const myUser = localStorage.getItem('idUser')
  const addStatus = useSelector(state => state.responses.statusAdd)
  let [isEmpty, setIsEmpty] = useState(false)
  let [response, setResponse] = useState(undefined)
  const [date, setDate] = useState(new Date().toISOString())
  const [fetchDataStep, setfetchDataStep] = useState(1);

  const category = useSelector(state => state.categories.currentCategory)
  const currentPodcast2 = category?.lectures?.find((lecture) => lecture.id == podcastId)


  useEffect(() => {

    const funcCategory = async () => {
      console.log("bbb");
      await dispatch(categoryById(categoryId))
    }
    window.scrollTo(0, 0);
    if (statusCurrentCat == 'idle') {
      funcCategory();
    }
  }, [])

  const fetchData = useCallback(async () => {
    try {
      console.log("bb");
      await dispatch(updateAddResponseStatus('idle'));
      await dispatch(fetchFilePodcast(currentPodcast2));
      if (currentPodcast2.isVideo === false) {
        await dispatch(fetchImgPodcast(currentPodcast2.urlLectureFile));
      }
      // if (currentImgPod.length < 50) {
      //   console.log("currentImgPod.lengt", currentImgPod.length);
      //   setisEmptyImg(true)
      // }
      setLoading(false);
      console.log("useEffectsetLoading", loading);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [currentPodcast2]); // Make sure to include all dependencies

  // Replace the useEffect with the useCallback call
  useMemo(() => {
    fetchData();
  }, [fetchData]); // Include fetchData as a dependency



  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    if (myUser === 'null')
      setOpen(true);
    else {
      setAddRes(true)

    }

  }
  const handleClose = () => setOpen(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(date);
    setIsEmpty(false)

    if (contentResponse.trim() === '') {
      console.log("enter");
      setIsEmpty(true);
    }
    else {
      setResponse(
        {
          contentResponse1: contentResponse,
          lecture1: currentPodcast2.id,
          user1: myUser,
          date1: date
        })
    }
  }
  useEffect(() => {
    const func = async () => {
      if (response != undefined) {
        console.log("add effect", response);
        setAddRes(false)
        await dispatch(addResponse(response))
        // await dispatch(updateAddResponseStatus('idle'))
      }
    }
    func();

  }, [response])



  const getFormattedDate = (dateTime) => {
    if (!dateTime) {
      return ''; // Handle cases where dateTime is null or undefined
    }
    return format(new Date(dateTime), 'yyyy-MM-dd'); // Format as YYYY-MM-DD
  };

  const download = async () => {
    await dispatch(fetchHandleDownloadNow(currentPodcast2))
  }
  return (

    <div className="single-podcast-container">
      {loading ? (
        <Box sx={{ pt: 40, pr: 90, width: '100%', height: '100%' }}>
          <Box sx={{ display: 'flex', width: '100vw', height: '100vh' }}>
            <CircularProgress />
          </Box>
        </Box>
      ) : (
        <div>
          {file && (
            <Box sx={{ textAlign: 'right', paddingTop: '2%', pr: '2%', display: 'flex', flexDirection: 'column' }}>
              <Typography gutterBottom variant="h5" component="div" sx={{ mt: 15 }}>
                {currentPodcast2.nameLecture}
                {console.log("7777")}

              </Typography>
              <Typography variant="body2" color="text.secondary" fontSize='14pt' width='50vw'>
                {currentPodcast2.content}
              </Typography>

              <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2, pb: 1 }}>
                {currentPodcast2.lecturer.firstName && (
                  <Typography color="text.secondary" sx={{ ml: 1 }}>
                    מגיש/ה: {currentPodcast2.lecturer.firstName}
                  </Typography>
                )}
                {currentPodcast2.lecturer.lastName && (
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {currentPodcast2.lecturer.lastName}
                  </Typography>
                )}
              </Box>

              {/* <img src={`${currentImgPodcast}`} ></img> */}
              {/* {currentImgPodcast && (
        <img src={getImageUrl(currentImgPodcast)} alt="Podcast Image" />
      )} */}
              <Box>
                {console.log("qq", currentImgPod)}

                {/* {podcast.podcastFile} */}

                {file
                  // podcast.podcastFile 
                  &&
                  <Box>

                    {currentPodcast2.isVideo && file && (
                      <video
                        controls
                        title="podcast"
                        style={{ width: '40vw' }}
                        controlsList="nodownload"
                      >
                        <source src={file} type="video/mp4" />
                        {console.log("comeeeeeee")}

                      </video>
                    )}
                    {!currentPodcast2.isVideo &&

                      // <audio controls src={podcast.podcastFile} type="audio/mp3" style={{ width: '40vw' }} />
                      <video controls

                        poster={ currentImgPod}
                        // src={getImageUrl(currentImgPodcast)}
                        // src=''
                        // alt='podcast image'
                        controlsList="nodownload"
                        style={{ width: '40vw', height: '44vh', 'aspect-ratio': 16 / 9, }}>
                        <source src={file}
                          type="audio/mp3"
                        //type="application/x-mpegURL"
                        />
                      </video>

                      // <audio controls
                      //   src={getImageUrl(currentImgPodcast)}
                      //   type="audio/mp3" style={{ width: '40vw' }} >
                      //   <source src={podcast.podcastFile}
                      //     type="video/mp4"
                      //   // type="application/x-mpegURL"
                      //   />                 </audio>
                    }
                  </Box>
                }

              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'row' ,paddingRight:'10%',pb:1}}>
                {/* <BottomNavigationAction sx={{ pt: 5 }} label="Favorites" icon={<FavoriteIcon />} />
                <BottomNavigationAction sx={{ pt: 5 }} label="Favorites" icon={<FavoriteBorderIcon />} /> */}
                {/* <BottomNavigationAction sx={{ pt: 5 }} label="views" icon={<VisibilityIcon />} /> */}
                {/* <BottomNavigationAction sx={{ pt: 5 }} label="Favorites" icon={<DateRangeIcon />} /> */}
                <Box sx={{ paddingTop: '1%', display: 'flex', flexDirection: 'row', paddingLeft: '2%' }}> <VisibilityIcon /> {currentPodcast2.numberViews}</Box>
                {currentPodcast2.uploadingDate && (
                  <Box sx={{ pt: 1, display: 'flex', alignItems: 'center', paddingLeft: '2%' }}>
                    <DateRangeIcon />
                    <span>
                      {new Date(currentPodcast2.uploadingDate).toLocaleDateString('he-IL', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                      })}
                    </span>
                  </Box>
                )}

                <Button onClick={() => download()} sx={{ pt: 2, display: 'flex', alignItems: 'center' ,color:'#7d677d'}} >
                  <DownloadIcon />
                  <span style={{ marginLeft: '0.5em', fontSize: 'inherit', lineHeight: '1' }}>הורדה</span>
                </Button>

                {/* )} */}
              </Box>

              <Button variant="contained" sx={{ width: '48.5vw', mb: 1 }}
                // onClick={() => { navigate(`response/${podcast.id}`) }}
                onClick={handleOpen}
              >
                < AddIcon sx={{ mr: 1 }} />
                הוסף תגובה
              </Button>
              <div>
                <Modal
                  sx={{ textAlign: 'center' }}
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
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
              {addRes && (
                <Box>
                  {/* {addStatus !== 'fulfilled' && */}
                  <Box>

                    <TextField
                      id="outlined-multiline-static"
                      label="*כתוב כאן את התגובה שלך"
                      multiline
                      rows={4}
                      sx={{ width: '50%', mb: 1 }}
                      value={contentResponse}
                      onChange={(e) => setContentResponse(e.target.value)}
                      error={isEmpty}
                      helperText={isEmpty ? 'יש לכתוב תגובה' : ''}
                    // error
                    //   defaultValue="כתוב כאן את התגובה שלך"
                    />
                    <br />
                    <Button onClick={handleSubmit} sx={{ direction: 'ltr', width: '48.5vw', height: '3.5vh', mb: 2 }} variant="contained" endIcon={<SendIcon />}>
                      שלח
                    </Button>
                  </Box>
                  {/* } */}

                </Box>

              )}
              {addStatus == 'fulfilled' &&
                <h3>התגובה נשלחה</h3>
              }
              <ResponsesPodcast />
            </Box >
          )}
        </div>
      )}
    </div>

  );
}



