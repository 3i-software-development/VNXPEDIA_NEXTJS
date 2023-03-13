import React from 'react';
import classNames from 'classnames/bind';
import style from './style.module.scss';
import { Title } from '@/components';
import IMG from '@/public/images/15872.png'
import Image from 'next/image';

const cx = classNames.bind(style);

const History = () => {
    return (
        <div className={cx('container-history')}>
            <Title text='A BRIEF HISTORY' align='center' />
            <p className={cx('text-top')}>
                We are proud to be the branch company specialized in organizing in Indochina under Voyages Saigon – a travel company that was born and operated in the 1980s and officially brought the brand to customers in 1991. Voyages Saigon serves Serving delegations from North America, Canada with extremely selected and designed products to most destinations around the world.
            </p>
            <Image src={IMG} className={cx('img-history')} alt='imgHistory' />
            <div className={cx('text-bot')}>
                <div className={cx('text-bot-left')}>
                    <Title text='OUR VISION' align='start' />
                    <p className={cx('text-bot-left-p')}>We craft awesome stuff with great experiences</p>
                </div>
                <p className={cx('text-bot-right')}>
                    Mr. Dennis Chinh, the founder of Voyages Saigon, has two Vietnamese and French bloodlines. He settled in the United States in the 1970s, graduated from Oriental Culture and worked at Unesco. Because of those facilities, Dennis has an endless love and passion for culture, especially Oriental culture. He has had in-depth cultural studies with the lands he has visited. Partnering with Dennis is Tony Nguyen, a Vietnamese native tourist with 30 years of experience throughout Indochina. These two people have created Luxuryvietravel, a product full of passion and innovation Luxuryvietravel focuses on programs and products in mystical Indochina. Strengthened by community-oriented, environmentally responsible and local elements. Core values ​​in the company's products are culture and environment, community. The products are carefully surveyed and performed delicately - so that each customer when on the tour can feel the difference and uniqueness.<br /><br />
                    Going a step further – Luxuryvietravel is a reliable address in designing specialized programs, unique niche products in its diverse product range. These can be mentioned product brands MICE, Wellness, Luxury, Heritage, etc., which Luxuryvietravel has prepared and successfully implemented for many big customers in almost all countries.

                </p>
            </div>



        </div>
    )
}

export default History