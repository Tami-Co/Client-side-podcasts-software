import React, { useState, useEffect, } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Box } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const defaultTheme = createTheme();

export default function ResponsesPodcast() {
    const [sortedSongs, setSortedSongs] = useState([]);
    const { podcastId } = useParams();
    const category = useSelector(state => state.categories.currentCategory)
    const podcast = category.lectures.find((lecture) => lecture.id == podcastId)
    console.log(podcast.responses, "logggg");


    useEffect(() => {
        const sortReaponse = async () => {
            await setSortedSongs([...podcast.responses].sort((a, b) => new Date(b.date) - new Date(a.date)));

        }
        sortReaponse();  
                  console.log("ooo", sortedSongs);

    }, []);
    return (
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', backgroundColor: 'transparent' }}>
        {console.log("nn",sortedSongs)}
            <Divider variant="inset" component="li" />
            {sortedSongs && sortedSongs.map((response, index) => {
                return (
                    <Box >
                        {response.user && (
                            <ListItem sx={{ direction: 'rtl' }} alignItems="flex-start">
                                <ListItemAvatar>
                                    <Avatar alt={response.user.firstName} src="/static/images/avatar/3.jpg" />
                                </ListItemAvatar>
                                {/* <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                            <Avatar alt={current.lastName} src="/static/images/avatar/2.jpg" />
                                 </IconButton> */}
                                <ListItemText
                                    sx={{ textAlign: 'right' }}
                                    primary={response.user.firstName + " " +
                                        new Date(response.date).toLocaleDateString('he-IL', {
                                            day: '2-digit',
                                            month: '2-digit',
                                            year: 'numeric',
                                        })
                                        //  response.date.split('T')[0].replace(/-/g, '/')

                                    }
                                    secondary={
                                        <React.Fragment >

                                            {/* {response.date.split('T')[0].replace(/-/g, '/')} */}
                                            <br />
                                            <Typography
                                                sx={{ display: 'inline' }}
                                                component="span"
                                                variant="body2"
                                                color="text.primary"
                                            >
                                                {response.contentOfResponse}
                                            </Typography>
                                        </React.Fragment>
                                    }
                                />
                            </ListItem>
                        )}
                    </Box>
                )
            })}
        </List>
    );
}

