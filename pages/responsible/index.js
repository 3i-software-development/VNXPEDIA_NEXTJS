import style from '@/styles/responsible.module.scss';
import classNames from 'classnames/bind';
import anh1 from '@/public/anh1.png';
import anh2 from '@/public/anh2.png';
import anh3 from '@/public/anh3.png';
import anh4 from '@/public/images/bn3.jpg';
import anh5 from '@/public/anh5.png';
import anh6 from '@/public/anh6.png';
import anh7 from '@/public/anh7.png';
import anh8 from '@/public/images/bn5.webp';
import Image from 'next/image';
import BannerIMG from '@/views/BannerSlide/BannerIMG';
import Headpage from '@/components/Head/head';
import Background from '@/views/Background/Background';

const cx = classNames.bind(style);

const Responsible = () => {
    return (
        <div className={cx('container')}>
            <Headpage />
            <BannerIMG img={anh1} title='OUR FOCUS ON SUSTAINABILITY' bg='bg' />
            <div className={cx('text1')}>
                <p>At LuxuryVietTravel, we strongly believe in the transformative power of travel. It's not just about personal experiences, but also about the impact it can have on the destinations we visit and the world as a whole.
                    <br />
                    <br />
                    Travel has always been a significant contributor to local economies, and in recent times, it has become even more critical in promoting the preservation of cultures and the conservation of natural environments. Travel fosters empathy and understanding, inspires and educates, and creates connections between people and the natural world. These connections are more important now than ever before.


                </p>
            </div>
            {/* <BannerIMG img={anh2} title='CARBON OFFSETTING' /> */}
            <Background img={anh2} text='CARBON OFFSETTING' />
            <div className={cx('text2')}>
                <div className={cx('img')}>
                    <Image src={anh3} alt="img" />
                </div>
                <div className={cx('text')}>
                    <p>We - Luxuryvietravel always aim for responsible tourism, environmental protection, economic support, and community development. With a long-term vision, we not only take tourists to beautiful and unique destinations but also want to help Vietnam's tourism develop sustainably and be friendly to the environment.
                        <br />
                        <br />
                        We understand that tourism is an industry that has a significant impact on the environment. Therefore, we respect and protect the environment by offering sustainable tourism products that aim to minimize the impact of tourism activities on the environment. We focus on special tourism programs where tourists can experience and participate in environmental protection activities such as gardening, garbage collection, recycling, and using sustainable products.
                        <br />
                        <br />
                        In addition to environmental protection, we also care about economic support and community development. We always seek potential local economic development destinations and build special tourism programs to increase economic value for local areas. At the same time, we also work with local organizations to support educational programs and community development in the area.
                        <br />
                        <br />
                        With all our activities, we always ensure that tourists will have an excellent tourism experience with the highest satisfaction. We commit to providing the best tourism services with a professional, friendly, and culturally aware staff.


                    </p>
                </div>
            </div>
            {/* <BannerIMG img={anh4} title='COMMUNITY IMPACT' /> */}
            <Background img={anh4} text='COMMUNITY IMPACT' />
            <div className={cx('image')}>
                <div className={cx('img1')}>
                    <Image src={anh5} alt="img-children" />
                </div>
                {/* <div className={cx('img2')}>
                    <Image src={anh6} alt='img-person' />
                </div> */}
                <div className={cx('img3')}>
                    <Image src={anh8} alt='img-elephant' layout='responsive' />
                </div>

            </div>
            <div className={cx('text1')}>
                <p> In conclusion, we hope to contribute to the sustainable development of tourism in Vietnam and the world. We hope that through our activities, tourism can become a sustainable and responsible industry for the environment while preserving and developing local cultural values.
                    <br />
                    <br />
                    We thank our customers for trusting and choosing Luxuryvietravel as their tourism partner. We commit to continuing to strive to provide customers with excellent tourism experiences while aiming for sustainable and responsible development goals.</p>
            </div>

        </div>
    )
}

export default Responsible