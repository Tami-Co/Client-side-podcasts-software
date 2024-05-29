import { Box, Button, CardContent, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { getPodcastsOfUser, updateNumberViews } from '../Podcasts/podcastSlice';

function PersonalArea() {
  const navigate=useNavigate();
  const dispatch = useDispatch();
  const podcasts = useSelector(state => state.podcasts.podcastsOfUser)
  const currentUser = localStorage.getItem('idUser');
  const currentFirstNameUser = localStorage.getItem('firstNameUser');
  useEffect(() => {
    const fetchPodcastUser = async () => {
      await dispatch(getPodcastsOfUser(currentUser))
    }
    fetchPodcastUser();
  },[])
  const funcUpdateViewsPodcast = async (podcast) => {
    await dispatch(updateNumberViews(podcast))
    navigate(`/categories/${podcast.categoryId}/podcast/${podcast.id}`);
  }
  return (
    <div style={{ marginTop: '10%', textAlign: 'right', paddingRight: '3%' }}>
      <Box sx={{ fontSize: '20pt' }}>
        <p>שלום {currentFirstNameUser}</p>
      </Box>
      <Box sx={{ fontSize: '20pt' }}>
        <p>רשימת הפודקאסטים שהעלת:</p>
      </Box>
      {podcasts.length == 0 && (
        <>
          <Box sx={{ pr: '4%', pt: '1%' }}>
            <p>לא נמצאו פודקאסטים </p>
          </Box>
        </>
      )}
      <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', pr: '3%', pt: '1%' }}>
        {podcasts && podcasts.map((pod, index) => {
          return (

            // < Link to={`podcast/${podcast.id}`} style={{ marginLeft: '2%' }}>
            <Button
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e4e3e3'}
              onClick={() => funcUpdateViewsPodcast(pod)}
              sx={{ width: '30vw', marginLeft: '2%', mb: '2%', backgroundColor: '#e4e3e3' }} >

              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                  {pod.lecturer.firstName && (
                    <Typography color="text.secondary" sx={{ ml: 1 }}>
                      {pod.lecturer.firstName}
                    </Typography>
                  )}
                  {pod.lecturer.lastName && (
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                      {" " + pod.lecturer.lastName}
                    </Typography>
                  )}
                </Box>
                <CardContent>

                  <Typography variant="h5" component="div">
                    {pod.nameLecture}
                  </Typography>
                </CardContent>
              </Box>


            </Button>
            // </Link>
          )
        }
        )}
      </Box>

    </div>

  )
}

export default PersonalArea