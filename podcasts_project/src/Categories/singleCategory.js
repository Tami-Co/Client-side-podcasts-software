import React, { useEffect, useState } from 'react';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { categoryById } from './categorySlice';
import { Box, CircularProgress } from '@mui/material';
import './singleCategoryCSS.css'
import { updateNumberViews } from '../Podcasts/podcastSlice';
import Button from '@mui/material/Button';
import { useNavigate, useParams } from 'react-router';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


export default function PodcastsOfCategory() {
  const { categoryId } = useParams();
  const category = useSelector(state => state.categories.currentCategory)
  const [isLoading, setIsLoading] = useState(true); // Add loading state
  const dispatch = useDispatch();
  const [sortedLectures, setSortedLectures] = useState([]); // State to hold sorted lectures
  const navigate = useNavigate();
  useEffect(() => {
    const func = async () => {
      await dispatch(categoryById(categoryId));
      setIsLoading(false)
    }
    func();
    window.scrollTo(0, 0);

  }, [])

  const sortLectures = (value) => {
    let sortedArray = [...category.lectures];
    if (value === 10) {
      // Sort by newest uploading date
      sortedArray.sort((a, b) => new Date(b.uploadingDate) - new Date(a.uploadingDate));
    } else if (value === 20) {
      // Sort by oldest uploading date
      sortedArray.sort((a, b) => new Date(a.uploadingDate) - new Date(b.uploadingDate));
    }
    else if (value === 30) {
      // Sort by oldest uploading date
      sortedArray.sort((a, b) => b.numberViews - a.numberViews); // Sort descending
    }
    setSortedLectures(sortedArray);
  };

  const funcUpdateViewsPodcast = async (podcast) => {
    await dispatch(updateNumberViews(podcast))
    navigate(`podcast/${podcast.id}`);
  }
  return (
    <div>
      {isLoading ? (
        <Box sx={{ pt: 40, pr: 90, width: '100%', height: '100%' }}>
          <Box sx={{ display: 'flex', width: '100vw', height: '100vh' }}>
            <CircularProgress />
          </Box>
        </Box>
      ) : (
        <Box>
          <div className='mainCategory' >
            <div className='imgDiv'>
              <img className='imgCategory' src={`${category.urlImage}`}></img>
            </div>
            <CardContent sx={{ backgroundColor: '#e4e3e3', width: '100%', height: '100%', display: 'flex', flexDirection: 'row', pr: 2, alignItems: 'center', justifyContent: 'space-between' }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary" sx={{ fontSize: '18pt' }}>
                  פודקאסטים בנושא:
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ fontSize: '22pt' }}>
                  {category.nameOfCategory}
                </Typography>
              </Box>

              {category.lectures && (
                <>
                  <Box sx={{ display: 'flex', flexDirection: 'row', textAlign: 'right' }}>
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: '42pt' }}>
                      {category.lectures.length}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: '12pt', mt: '12%', mr: '8%' }}>
                      פודקאסטים <br />
                      נמצאו
                    </Typography>
                  </Box>
                </>
              )}

            </CardContent>
          </div>

          <div style={{ paddingTop: '1%;', textAlign: 'right', paddingRight: '3.5%' }}>
            <>
              <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <InputLabel id="demo-select-small-label">סנן לפי...</InputLabel>
                <Select
                  labelId="demo-select-small-label"
                  id="demo-select-small"
                  label="סנן לפי"
                  onChange={(e) => sortLectures(e.target.value)}
                >
                  <MenuItem value={10}>החדש ביותר</MenuItem>
                  <MenuItem value={20}>הישן ביותר</MenuItem>
                  <MenuItem value={30}>הנצפה ביותר</MenuItem>
                </Select>
              </FormControl>
            </>
            {/* )} */}

          </div>
          {/* אם לא קימיים פודקאסטים */}
          {category.lectures.length == 0 && (
            <>
              <Box sx={{ pr: '4%', pt: '1%' }}>
                <p>לא נמצאו פודקאסטים </p>
              </Box>
            </>
          )}


          {/* show podcasts*/}

          <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', pr: '3%', pt: '1%' }}>
            {(sortedLectures.length ? sortedLectures : category.lectures).map((podcast, index) => {
              return (
                <Button
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e4e3e3'}
                  onClick={() => funcUpdateViewsPodcast(podcast)}
                  sx={{ width: '30vw', marginLeft: '2%', mb: '2%', backgroundColor: '#e4e3e3' }} >
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                      {podcast.lecturer.firstName && (
                        <Typography color="text.secondary" sx={{ ml: 1 }}>
                          {podcast.lecturer.firstName}
                        </Typography>
                      )}
                      {podcast.lecturer.lastName && (
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                          {" " + podcast.lecturer.lastName}
                        </Typography>
                      )}
                    </Box>
                    <CardContent>

                      <Typography variant="h5" component="div">
                        {podcast.nameLecture}
                      </Typography>
                    </CardContent>
                  </Box>


                </Button>
              )
            }
            )}
          </Box>
        </Box>
      )
      }
    </div >

  );
}
