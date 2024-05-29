import React, { useEffect, useState } from 'react';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { Box, CircularProgress } from '@mui/material';
import './singleLecturerCSS.css'
import Button from '@mui/material/Button';
import { Outlet, useNavigate, useParams } from 'react-router';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import { fetchPodcastsOfLecturer, lecturerById, updateNumberViews } from './lecturerSlice';
import { categoryById, } from '../Categories/categorySlice';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


export default function PodcastsOfLecturer() {
    const { lecturerId } = useParams();
    // const lecturer = useSelector(state => state.lecturers.currentLecturerOfPodcast)
    const podcastsLecturer = useSelector(state => state.lecturers.podcastsOfLecturer)
    const statusOfUpdate = useSelector(state => state.lecturers.statusUpdate)
    const [isLoading, setIsLoading] = useState(true); // Add loading state
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [sortedLecturers, setSortedLecturers] = useState([]); // State to hold sorted lectures

    //     let length;
    //    let nameLecturer;
    // const l = podcastsLecturer.map(() => length++)
    // console.log("66", length);

    useEffect(() => {
        const func = async () => {
            // await dispatch(lecturerById(lecturerId))
            await dispatch(fetchPodcastsOfLecturer(lecturerId));
            // if (statusOfUpdate === 'idle') {
            //     await dispatch(updateNumberViews(lecturerId))
            // }
            setIsLoading(false)

            //  nameLecturer = podcastsLecturer.find((x) => x.lecturerId == lecturerId)
            // console.log("nameLecturer",nameLecturer);
        }
        func();

    }, [dispatch, lecturerId])

    useEffect(() => {
        window.scrollTo(0, 0);
    }
        , []);
    const func = async (podcast) => {
        console.log("func", podcast);
        await dispatch(categoryById(podcast.categoryId))
        navigate(`podcast/${podcast.id}/${podcast.categoryId}`);
    }

    const sortLecturers = (value) => {
        let sortedArray = [...podcastsLecturer];
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
        setSortedLecturers(sortedArray);
    };

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
                    <div className='mainLecturer' >

                        <CardContent sx={{ backgroundColor: '#e4e3e3', width: '100%', height: '100%', display: 'flex', flexDirection: 'row', pr: 2, alignItems: 'center', justifyContent: 'space-between' }}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', textAlign: 'center', paddingRight: '4%' }}>
                                {/* <Typography variant="body2" color="text.secondary" sx={{ fontSize: '18pt' }}>
                                        פודקאסטים בהגשת:
                                    </Typography> */}
                                {console.log("zzz", podcastsLecturer)}
                                <Typography variant="body2" color="text.secondary" sx={{ fontSize: '22pt' }}>
                                    {podcastsLecturer[0] !== undefined && (
                                        podcastsLecturer[0].lecturer.firstName + " " + podcastsLecturer[0].lecturer.lastName
                                    )}

                                </Typography>
                            </Box>
                            {podcastsLecturer && (

                                <Box sx={{ display: 'flex', flexDirection: 'row', textAlign: 'right' }}>
                                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: '42pt' }}>
                                        {podcastsLecturer.length}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: '12pt', mt: '12%', mr: '8%' }}>
                                        פודקאסטים <br />
                                        נמצאו
                                    </Typography>
                                </Box>

                            )}

                        </CardContent>
                    </div>

                    <div style={{ paddingTop: '1%;', textAlign: 'right', paddingRight: '3.5%' }}>
                        {/* {category.lectures.length == 0 && ( */}
                        <>
                            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                                <InputLabel id="demo-select-small-label">סנן לפי...</InputLabel>
                                <Select
                                    labelId="demo-select-small-label"
                                    id="demo-select-small"
                                    // value={age}
                                    label="סנן לפי"
                                    onChange={(e) => sortLecturers(e.target.value)}
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
                    {podcastsLecturer.length == 0 && (
                        <>
                            <Box sx={{ pr: '4%', pt: '1%' }}>
                                <p>לא נמצאו פודקאסטים </p>
                            </Box>
                        </>
                    )}

                    {/* הצגת כל הפודקאסטים */}


                    <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', pr: '3%', pt: '1%' }}>
                        {(sortedLecturers.length ? sortedLecturers : podcastsLecturer).map((podcast, index) => {
                            return (
                                // < Link to={`podcast/${podcast.id}`} style={{ marginLeft: '2%' }}>
                                <Button
                                    onClick={() => func(podcast)}
                                    sx={{ width: '30vw', marginLeft: '2%', mb: '2%', backgroundColor: '#e4e3e3' }} >
                                    {/* <Outlet /> */}
                                    {/* {category.lectures.lecturer && ( */}
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
                                    {/* )} */}
                                    {/* )} */}
                                </Button>
                                // </Link>
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


