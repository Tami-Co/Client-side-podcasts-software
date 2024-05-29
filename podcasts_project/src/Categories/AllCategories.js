import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from "react-redux"
import { fetchCategories, updateCurrentCategory } from './categorySlice';
import './AllCategoryiesStyle.css'
import { Link } from 'react-router-dom';
import { Box, CircularProgress, CssBaseline, TextField } from '@mui/material';

export default function MediaCard() {
  const categories = useSelector(state => state.categories.categories)
  const status = useSelector(state => state.categories.status)
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true)
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      if (status != 'fulfilled')
        await dispatch(fetchCategories())
      setLoading(false)
    }
    fetchData();
    window.scrollTo(0, 0);
  }, [])
  const filteredCategories = searchInput
    ? categories.filter(category =>
      category.nameOfCategory.toLowerCase().includes(searchInput.toLowerCase())
    )
    : categories;

  const noResultsFound = searchInput && filteredCategories.length === 0;

  return (

    <div >
      <div style={{ marginTop: '12%', textAlign: 'end', marginLeft: '4%' }} className="searchContainer">
        <TextField
          label="חיפוש קטגוריה"
          variant="outlined"
          value={searchInput}
          onChange={e => setSearchInput(e.target.value)}
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
            filteredCategories.map(category => (
              <div className="divCategory" key={category.id}>
                <Card sx={{ maxWidth: 345, backgroundColor: ' #2d2d2d', borderRadius: '3px' }}>
                  <CardMedia
                    sx={{ height: '32vh', width: '19vw', objectFit: 'cover' }}
                    image={category.urlImage}
                    title={category.nameOfCategory}
                  />
                  <CardContent>
                    <Typography sx={{ fontSize: '20pt' }} gutterBottom variant="h5" component="div">
                      {category.nameOfCategory}
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ textAlign: 'center', justifyContent: 'center' }}>
                    <Link to={`/categories/${category.id}`}>
                      <Box sx={{ paddingBottom: '5%', backgroundColor: '#5c595c99', width: '18vw' }} >
                        <Button
                          onClick={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                          sx={{ fontSize: '13pt', height: '0vh', paddingTop: '4%' }} size="small">לפרקים המלאים</Button>
                      </Box>

                    </Link>
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



