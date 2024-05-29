import { Box, Button } from '@mui/material'
import React from 'react'
import { useEffect } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import './swiperStyle.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from './Categories/categorySlice';
import { fetchMaxViewsLecturers } from './Lecturers/lecturerSlice';
import { useNavigate } from 'react-router';
import { fetchMaxViewsLectures } from './Podcasts/podcastSlice';

function Home() {
  const categories = useSelector(state => state.categories.categories)
  const statusCategories = useSelector(state => state.categories.status)
  const lecturers = useSelector(state => state.lecturers.maxViewsLecturers)
  const statusLecturers = useSelector(state => state.lecturers.statusMaxViewsLecturers)
  const podcasts = useSelector(state => state.podcasts.maxViewsLectures)
  const statusPodcasts = useSelector(state => state.podcasts.statusMaxViewsLectures)
  const navigate = useNavigate()
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      if (statusCategories != 'fulfilled')
        await dispatch(fetchCategories())
      if (statusLecturers != 'fulfilled')
        await dispatch(fetchMaxViewsLecturers())
      if (statusPodcasts != 'fulfilled')
        await dispatch(fetchMaxViewsLectures())
      // setLoading(false)
    }
    fetchData();
    window.scrollTo(0, 0);
  }, [])
  const funcLecturer = (lecturerId) => {
    navigate(`/lecturers/${lecturerId}`);
  }
  const funcCategory = (categoryId) => {
    navigate(`/categories/${categoryId}`);
  }
  const funcPodcasts = (lecture) => {
    navigate(`/categories/${lecture.categoryId}/podcast/${lecture.id}`);
  }
  return (
    <>

      <Box sx={{ mt: 18, textAlign: 'right', mr: 2, mb: 6 }}>
        <h1>
          ברוכים הבאים לספרית הפודקאסטים <br />
          כאן תוכלו לשתף ולהאזין לפודקאסטים מובחרים
        </h1>
      </Box>
      <Box sx={{ width: '100%', height: "10vh", marginTop: '2%', display: 'flex', alignItems: 'center', backgroundColor: '#fefaff' }}>
        <h3 style={{ paddingRight: '1%', margin: 0, textAlign: 'right' }}>יוצרים <br />
          נבחרים
        </h3>
        <div style={{ flex: 1 }}>
          <Swiper
            spaceBetween={10}//30
            slidesPerView={'auto'}//3'auto'
            centeredSlides={true}
            /*autoplay={{
              delay: 3000,
            }}*/
            className='lecturerSwiper'
            loop={true}
            navigation={true}
            modules={[Navigation]}
          >
            {lecturers.map((lecturer, index) => (
              <SwiperSlide key={index} style={{ width: '280px' }}>
                <div style={{ width: '50%' }}> {/* Adjusted width to 50% */}
                  <Button sx={{ backgroundColor: 'transparent', opacity: 1, fontSize: '14pt' }} onClick={() => funcLecturer(lecturer.id)}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    # {lecturer.firstName} {lecturer.lastName}
                  </Button>
                </div>
              </SwiperSlide>


            ))}
          </Swiper>
        </div>
      </Box>

      <Box sx={{ mt: 3, textAlign: 'right', display: 'flex', flexDirection: 'row', width: '100wv', justifyContent: 'space-between', height: '14.5vh' }}>
        <h1 style={{ marginLeft: '4%', marginRight: '1.5%' }}>
          הקטגוריות <br />
          שלנו
        </h1>
        <h2 style={{ textAlign: 'left', marginLeft: '0.4%', paddingTop: '3.5%' }}>
          {/* <MaximizeIcon sx={{width:'100px'}}/> */}
          _______________________________________________________________________________________________________________________

        </h2>

      </Box>
      <Box sx={{ paddingTop: '0%' }}>
        <Swiper
          spaceBetween={30}
          slidesPerView={3}
          centeredSlides={true}
          autoplay={{
            delay: 2300,
            //disableOnInteraction: false,

          }}

          // pagination={{
          //   clickable: true,
          // }}
          loop={true}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          //onAutoplayTimeLeft={onAutoplayTimeLeft}
          className="mySwiper"

        >
          {categories.map((category, index) => (
            <SwiperSlide >
              <Button sx={{ backgroundColor: 'transparent' }} onClick={() => funcCategory(category.id)} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'transparent'} >
                <div style={{ width: "250px", height: "230px" }}>
                  <h2 key={index}>{category.nameOfCategory}</h2>
                  <img style={{ width: '100%', height: '100%', borderRadius: '2.5px' }} src={category.urlImage}>
                  </img>
                </div>
              </Button>

            </SwiperSlide>
          ))}
        </Swiper>
      </Box>


      <Box sx={{ mt: 5, textAlign: 'right', display: 'flex', flexDirection: 'row', width: '100wv', justifyContent: 'space-between', height: '16vh' }}>
        <h1 style={{ marginLeft: '4%', marginRight: '1.5%' }}>
          פרקים <br />
          אהובים
        </h1>
        <h2 style={{ textAlign: 'left', marginLeft: '0.4%', paddingTop: '4%' }}>
          {/* <MaximizeIcon sx={{width:'100px'}}/> */}
          _______________________________________________________________________________________________________________________

        </h2>

      </Box>
      <Swiper
        spaceBetween={30}
        slidesPerView={3}
        //centeredSlides={true}
        autoplay={{
          delay: 2300,
          //disableOnInteraction: false,
        }}

        // pagination={{
        //   clickable: true,
        // }}
        loop={true}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        //onAutoplayTimeLeft={onAutoplayTimeLeft}
        className="mySwiper"
      >
        {podcasts.map((podcast, index) => (
          <SwiperSlide>
            <Button onClick={() => funcPodcasts(podcast)} sx={{ backgroundColor: 'transparent' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'transparent'} >
              <div style={{ height: "150px", width: "250px", backgroundColor: '#ffffff', borderRadius: '2.5px' }}>
                <h3 style={{ paddingTop: '7%' }} key={index}>{podcast.nameLecture}</h3>
                {/* <img key={index} style={{ width: '100%', height: '100%', paddingTop: '1%' }} src={podcast.urlLectureFile}> */}
                {/* </img>  */}
              </div>
            </Button>
          </SwiperSlide>
        ))}
      </Swiper>

    </>
  )
}

export default Home