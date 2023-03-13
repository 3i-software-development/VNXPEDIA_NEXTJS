
import styles from '@/styles/aboutUs.module.scss';
import classNames from 'classnames/bind';
import { Section } from '@/components';
import icon2 from '@/public/icon/email.png';
import icon3 from '@/public/icon/phone.png';
import icon1 from '@/public/icon/vitri.png';
import { banners } from '@/public/images';
import { OutTeamAboutUs } from '@/views';
import History from '@/views/Aboutus/History';
import AboutVideo from '@/views/Aboutus/Video';
import BannerIMG from '@/views/BannerSlide/BannerIMG';
import Headpage from '@/components/Head/head';
import Background from '@/views/Background/Background';
import BnImg from '@/public/bn9.jpg';


import Image from 'next/image';


const cx = classNames.bind(styles)

const index = () => {
    return (
        <>
            <Headpage data='about us luxuryvietravel' />
            <div className={cx('wrapperBanner')}>
                <BannerIMG bg='bg' title={"about Luxuryvietravel"} descrip={"The tours featured throughout our website are intended to give you ideas for whats possible when you travel with us. Treat them simply as inspiration"} img={banners.banner4} crumb={{ title: 'About' }} crumbStyle2 />
                <div className={cx('boxInfo')}>
                    <div className={cx('box')}>
                        <div className={cx('icon')} >
                            <Image src={icon1} alt='icon' />
                        </div>
                        <h2>Address</h2>

                        <p>4, Road 10B, Trung Yen, Cau Giay District, Hanoi, 10000</p>

                    </div>
                    <div className={cx('box')}>
                        <div className={cx('icon')}>
                            <Image src={icon2} alt='icon' />
                        </div>
                        <h2>Email Address</h2>

                        <p>info@luxuryvietravel.com - sale@luxuryvietravel.com</p>

                    </div>
                    <div className={cx('box')}>
                        <div className={cx('icon')}>
                            <Image src={icon3} alt='icon' />
                        </div>
                        <h2>Contacts info</h2>
                        <p>+ 84 901591111</p>
                    </div>
                </div>

            </div>
            <History />
            {/* <AboutVideo /> */}
            <Background img={BnImg} />
            <div id='this' ></div>
            <Section notPadding>
                <OutTeamAboutUs />
            </Section>
        </>
    )
}

export default index