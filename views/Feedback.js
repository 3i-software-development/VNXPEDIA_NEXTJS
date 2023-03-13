import Image from 'next/image';
import React from 'react';
import fb3 from '../public/fb3.png';
import fb1 from '@/public/fb1.jpg';
import fb2 from '@/public/fb2.jpg';
import style from './feedback.module.scss';
import classNames from 'classnames/bind';
import { EffectCreative, Pagination, Autoplay, Navigation } from 'swiper';
import { SwiperSlide, Swiper } from 'swiper/react';
import "swiper/css";
import "swiper/css/effect-creative";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import SwiperCore, { EffectFade } from 'swiper/core';

// SwiperCore.use([EffectFade]);

const dataList = [
    {
        Text: "It was a great experience! Must visit place, helpful guide . Christie our guide was amazing and kept us entertained and gave us many knowledgeable information about the Vietnamese culture and Cu Chi tunnel.",
        Name: 'JOHN SMITH',
        Img: fb3
    },
    {
        Text: "Absolutely worth the money. This tour covered a huge variety of local knowledge, customs and trades. Our guide VNXpedia was fantastic, he has a great knowledge of the history, great English and also a great sense of humour.",
        Name: 'ANNA',
        Img: fb1
    },
    {
        Text: "Had the best day! Tom was amazing and we learnt much about the country, history and he is full of fun facts and laughs. The Mekong Delta was the highlight of the trip. Bicycle ride through the village and row boat on the river was amazing. Would highly recommend this trip",
        Name: 'SCARLET',
        Img: fb2
    }
]

const cx = classNames.bind(style);


const Feedback = () => {
    return (<>
        <Swiper
            // modules={[EffectCube, Autoplay]}
            // spaceBetween={30}


            // cubeEffect={{
            //     slideShadows: true,
            //     shadow: true,
            //     shadowOffset: 20,
            //     shadowScale: 0.94,
            // }}
            loop={true}
            autoplay={{
                delay: 3000,

            }}
            speed={1000}
            grabCursor={true}
            effect={"creative"}
            creativeEffect={{
                prev: {
                    shadow: true,
                    translate: [0, 0, -400],
                },
                next: {
                    translate: ["100%", 0, 0],
                },
            }}
            modules={[EffectCreative, Autoplay]}

            className={cx('wrapper')}
        >
            {dataList.map((d, index) =>
                <SwiperSlide >
                    <div className={cx('container')}>
                        <div className={cx('text')}>
                            <div> &ldquo;</div>

                            <p>
                                {d.Text}
                            </p>
                            <h5 className={cx('text-title')}>{d.Name}</h5>
                        </div>
                        <div className={cx('img')}>
                            <Image src={d.Img} alt='img-feedback' />
                        </div>
                    </div>
                </SwiperSlide>
            )}

        </Swiper>

    </>

    );
};

export default Feedback;
