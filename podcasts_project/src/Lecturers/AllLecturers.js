import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchLecturers, updateNumberViews } from './lecturerSlice';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './AllLecturers.css'
import { useNavigate } from 'react-router-dom';
import { TextField, CircularProgress, Box } from '@mui/material';




function AllLecturers() {
  const lecturers = useSelector(state => state.lecturers.lecturers)
  const status = useSelector(state => state.lecturers.status)
  const [searchQuery, setSearchQuery] = useState('');
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  useEffect(() => {
    if (lecturers.length === 0 && status != 'fulfilled') {

      dispatch(fetchLecturers())
    }
    setLoading(false)

    window.scrollTo(0, 0);

  }, [])
  const filteredLecturers = searchQuery
    ? lecturers.filter(l =>
      l.firstName.toLowerCase().includes(searchQuery.toLowerCase())
      ||
      l.lastName.toLowerCase().includes(searchQuery.toLowerCase())

    )
    : lecturers;

  const noResultsFound = searchQuery && filteredLecturers.length === 0;
  const updateViewLecturer = async (lecturerId) => {
    await dispatch(updateNumberViews(lecturerId))
    navigate(`${lecturerId}`);
  }
  return (

    <div >
      <div style={{ marginTop: '12%', textAlign: 'end', marginLeft: '4%' }} className="searchContainer">
        <TextField
          label="חיפוש מרצה"
          variant="outlined"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />
      </div>
      {loading ? (
        <Box sx={{ pt: 40, pr: 90, width: '100%', height: '100%' }}>
          <Box sx={{ display: 'flex', width: '100vw', height: '100vh' }}>
            <CircularProgress />
          </Box>
        </Box>
      ) : (
        <div className='mainDiv'>
          {noResultsFound ? (
            <Typography variant="h6" align="center">
              לא נמצאו תוצאות
            </Typography>
          ) : (
            filteredLecturers.map(lecturer => (
              <div className="divCategory" key={lecturer.id}>
                <Card sx={{ height: '20vh', maxWidth: 345, backgroundColor: ' #2d2d2d', borderRadius: '3px' }}>

                  <CardContent>
                    <Typography sx={{ fontSize: '20pt' }} gutterBottom variant="h5" component="div">
                      {lecturer.firstName + " " + lecturer.lastName}
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ textAlign: 'center', justifyContent: 'center' }} >
                    <Button sx={{ fontSize: '13pt', height: '3vh', paddingTop: '4%', paddingBottom: '5%', backgroundColor: '#5c595c99', width: '18vw' }} onClick={() => updateViewLecturer(lecturer.id)} size="small">לפרקים המלאים</Button>
                  </CardActions>
                </Card>
              </div>
            ))
          )}
        </div>

      )}
    </div>

  )
}

export default AllLecturers
