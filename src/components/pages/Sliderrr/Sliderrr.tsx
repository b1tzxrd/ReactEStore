import React, { useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

import '../../../styles/carousell.css'

// import required modules
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';

import { Image } from '@chakra-ui/react';

interface ISliderrr {
    gallery: string[]
}

const Sliderrr: React.FC<ISliderrr> = ({gallery}) => {
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

    // const images = [
    //     gtaPicsOne, gtaPicsTwo, gtaPicsThree, gtaPicsFour
    // ]

    return (
        <>
            <Swiper
                style={{
                    '--swiper-navigation-color': '#67e8f9',
                    '--swiper-pagination-color': '#fff',
                } as React.CSSProperties}
                loop={true}
                spaceBetween={10}
                navigation={true}
                thumbs={{ swiper: thumbsSwiper }}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper2"
            >
                {gallery.map((item) => (
                    <SwiperSlide>
                        <Image  rounded={20} objectFit="contain" src={item} />
                    </SwiperSlide>

                ))}
            </Swiper>
            <Swiper
                onSwiper={setThumbsSwiper}
                loop={true}
                spaceBetween={4}
                slidesPerView={4}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper"
            >
                {gallery.map((item) => (
                    <SwiperSlide>
                        <Image rounded={10} maxH="140px" src={item} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    );
}

export default Sliderrr