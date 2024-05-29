
// // import React, { useEffect, useState } from 'react';
// // import Box from '@mui/material/Box';
// // import TextField from '@mui/material/TextField';
// // import SendIcon from '@mui/icons-material/Send';
// // import { Button } from '@mui/material';
// // import { useDispatch, useSelector } from 'react-redux';
// // import { addResponse } from './responseSlice';
// // import { useFormik } from 'formik';
// // import * as Yup from 'yup';

// // export default function AddResponse() {
// //     const myUser = useSelector(state => state.users.currentUser);
// //     const podcast = useSelector(state => state.podcasts.currentPodcast);
// //     const addStatus = useSelector(state => state.responses.statusAdd);
// //     const dispatch = useDispatch();

// //     const [date, setDate] = useState(new Date().toISOString());

// //     const formik = useFormik({
// //         initialValues: {
// //             contentResponse: '',
// //         },
// //         validationSchema: Yup.object({
// //             contentResponse: Yup.string().required('יש למלא תגובה'),
// //         }),
// //         onSubmit: values => {
// //             handleSubmit(values.contentResponse);
// //         },
// //     });

// //     const handleSubmit = (contentResponse) => {
// //         const response = {
// //             contentResponse1: contentResponse,
// //             lecture1: podcast.id,
// //             user1: myUser.id,
// //             date1: date
// //         };
// //         dispatch(addResponse(response));
// //     };

// //     return (
// //         <Box>
// //             <form onSubmit={formik.handleSubmit}>
// //                 <Box>
// //                     <TextField
// //                         id="contentResponse"
// //                         name="contentResponse"
// //                         label="*כתוב כאן את התגובה שלך"
// //                         multiline
// //                         rows={4}
// //                         sx={{ width: '50%', mb: 1 }}
// //                         value={formik.values.contentResponse}
// //                         onChange={formik.handleChange}
// //                         error={formik.touched.contentResponse && Boolean(formik.errors.contentResponse)}
// //                         helperText={formik.touched.contentResponse && formik.errors.contentResponse}
// //                     />
// //                     <br />
// //                     <Button
// //                         type="submit"
// //                         sx={{ direction: 'ltr', width: '48.5vw', height: '3.5vh', mb: 2 }}
// //                         variant="contained"
// //                         endIcon={<SendIcon />}
// //                         disabled={!formik.dirty || formik.isSubmitting || !formik.isValid}
// //                     >
// //                         Send
// //                     </Button>
// //                 </Box>
// //             </form>
// //             {addStatus === 'fulfilled' &&
// //                 <h1>התגובה נשלחה</h1>
// //             }
// //         </Box>
// //     );
// // }
