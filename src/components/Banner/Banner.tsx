// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-flip';
import 'swiper/css/pagination';


import "../../styles/carousel.css"

import bannerFirst from "../../assets/slider1.webp"
import bannerSecond from "../../assets/slider2.webp"
import bannerThrid from "../../assets/slider3.webp"

// import required modules
import { Badge, Box, IconButton, Image } from '@chakra-ui/react';
import { EffectFlip, Pagination, Navigation, Autoplay } from 'swiper/modules';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa6';



const Banner = () => {
    return (
        <Box>
            <Swiper
                style={{ position: "relative" }}
                loop={true}
                grabCursor={true}
                pagination={{
                    clickable: true
                }}
                navigation={{
                    prevEl: '.swiper-button-previos',
                    nextEl: '.swiper-button-nextt',
                }}
                modules={[EffectFlip, Pagination, Navigation, Autoplay]}
                className="mySwiper-banner"
                effect="flip"
                autoplay={{
                    delay: 10000,
                    disableOnInteraction: false,
                }}
            >
                <Box
                    className='swiper-button-previos'
                    display={{ base: "none", md: "inline-flex" }}
                    left={{ md: "0", xl: "-30px" }} >
                    <IconButton
                        aria-label="Previous Slide"
                        variant="solid"
                        position="absolute"
                        top="50%"
                        left="10px"
                        transform="translateY(-50%)"
                        zIndex={10}
                        size="2xl"
                        colorPalette="teal" >
                        <FaArrowLeft />
                    </IconButton>
                </Box>
                <Box
                    className='swiper-button-nextt'
                    display={{ base: "none", md: "inline-flex" }}
                    right={{ md: "0", xl: "-30px" }} >
                    <IconButton
                        aria-label="Next Slide"
                        variant="solid"
                        position="absolute"
                        top="50%"
                        right="10px"
                        transform="translateY(-50%)"
                        zIndex={10}
                        size="2xl"
                        colorPalette="teal" >
                        <FaArrowRight fontSize="30px" />
                    </IconButton>
                </Box>



                <SwiperSlide>
                    <Image borderRadius="15px" src={bannerFirst} />
                </SwiperSlide>
                <SwiperSlide>
                    <Image borderRadius="15px" src={bannerSecond} />
                </SwiperSlide>
                <SwiperSlide>
                    <Image borderRadius="15px" src={bannerThrid} />
                </SwiperSlide>
                <Badge colorPalette="teal" pos="absolute" bottom="-30px" right={0} zIndex={11} >сгенерировано ии</Badge>
            </Swiper>
        </Box>
    )
}

export default Banner