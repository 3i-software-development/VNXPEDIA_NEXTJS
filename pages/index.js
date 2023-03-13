import styles from '@/styles/Home.module.scss';
import BlogHome from '@/views/BlogHome';
import Hottour from '@/views/Tour/Hottour';
import classNames from 'classnames/bind';
import Head from 'next/head';

import Logo from '@/asset/iconlogo.png';
import { banners } from '@/public/images';
import { BannerSlide, ItemInfoHome } from '@/views';
import Country from '@/views/Country/Country';
import Feedback from '@/views/Feedback';
import Introduce2 from '@/views/Introduce2';


const cx = classNames.bind(styles);

export default function Home() {
    return (
        <>
            <Head>
                <title>Tailor-Made Tours, Luxury Holidays I Wellness I Adventure I Incentive I Luxury Vietravel</title>
                <meta name="description" content="Luxury Vietravel specialises in tailor-made holidays & private tours for travellers seeking the real and authentic experiences in Vietnam and Indochina ( Laos, Cambodia). We are leading Vietnam Travel & DMC that offering full travel services" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" type="image/png" sizes="20x20" href={Logo.src} />
                <link rel="canonical" href="https://www.luxuryvietravel.com/" />
                <link rel="stylesheet" href="https://unpkg.com/swiper/swiper-bundle.min.css" />
                <link rel="stylesheet" href="https://unpkg.com/swiper/modules/effect-cube/effect-cube.min.css" />

            </Head>
            <div className={cx('wrapperBanner')}>
                <BannerSlide
                    className={cx('bodyBanner')}
                    titleBanner={'Adventure - Wellness - Incentive - Heritages Tours VietNam'}
                    textTop={'Luxury tailor-made'}
                    imgBanner={[banners.banner4, banners.banner6, banners.banner7, banners.banner8]}
                />
                <ItemInfoHome className={cx('boxInfo')} />
            </div>

            <Introduce2 />
            <Country />
            <Hottour />
            <BlogHome />
            <Feedback />
        </>
    );
}

