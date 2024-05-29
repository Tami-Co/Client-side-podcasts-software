import { Route, Routes } from 'react-router';
import './App.css';
import ResponsiveAppBar from './NavBar';
import MediaCard from './Categories/AllCategories';
import SignInSide from './Users/SignIn';
import SignUp from './Users/SignUp';
import AllLecturers from './Lecturers/AllLecturers';
import AllPodcasts from './Podcasts/AllPodcasts';
import PersonalArea from './Users/personalArea'
import StickyFooter from './footer';
import PodcastsOfCategory from './Categories/singleCategory'
import { useSelector } from 'react-redux';
import Home from './home'
import SinglePodcast from './Podcasts/singlePodcast';
import AddResponse from './Response/addResponse';
import AddPodcast from './Podcasts/addPodcast';
import PodcastsOfLecturer from './Lecturers/singleLecturer';
import SinglePodcastLecturer from './Lecturers/singlePodcastLecturer';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AddCategory from './Manager/addCategory';
import AddLecturer from './Manager/addLecturer';
import { themeOptions } from './themeOptions';
import About from './about';
import ManagerArea from './Users/managerArea';


function App() {
  const theme = createTheme(themeOptions)
  return (
    <>
      <ThemeProvider theme={theme}>

        <div className="App">
          <ResponsiveAppBar />
          {/* <Link underline={false} to={'addPodcast'}>
        <Fab variant="extended" sx={{ position: 'absolute', top: '1%', left: '14%' }}>
          < AddIcon sx={{ mr: 1 }} />
          Upload a podcast
        </Fab>
      </Link> */}
          {/* <Checkout /> */}
          <Routes>
            <Route path='signIn' element={<SignInSide />} />
            <Route path='SignUp' element={<SignUp />} />
            <Route path='lecturers' element={<AllLecturers />} />
            <Route path='lecturers/:lecturerId' element={< PodcastsOfLecturer />} />
            <Route path='lecturers/:lecturerId/podcast/:podcastId/:categoryId' element={<SinglePodcastLecturer />} >
              <Route path='response/:podcastId' element={<AddResponse />} />
            </Route>
            <Route path='lecturers/:lecturerId/podcast/:podcastId/:categoryId/signIn' element={<SignInSide />} />

            <Route path='lecturers/:lecturerId/podcast/:podcastId/signIn' element={<SignInSide />} />
            <Route path='AllPodcasts' element={<AllPodcasts />} />
            <Route path='personalArea' element={<PersonalArea />} />
            <Route path='managerArea' element={<ManagerArea />} />
            <Route path='managerArea/addCategory' element={<AddCategory />} />
            <Route path='managerArea/addLecturer' element={<AddLecturer />} />
            <Route path='addPodcast' element={<AddPodcast />} />
            <Route path='' element={<Home />} />
            <Route path='categories' element={<MediaCard />} />
            <Route path='categories/:categoryId' element={<PodcastsOfCategory />} />
            <Route path='categories/:categoryId/podcast/:podcastId' element={<SinglePodcast />} >
              <Route path='response/:podcastId' element={<AddResponse />} />
            </Route>
            <Route path='categories/:categoryId/podcast/:podcastId/signIn' element={<SignInSide />} />
            <Route path='addPodcast/signIn' element={<SignInSide />} />
            <Route path='about' element={<About />} />
            <Route path='home' element={<Home />} />

          </Routes>
          {/* <StickyFooter /> */}
        </div>
      </ThemeProvider>
    </>


  );
}

export default App;



