import React from 'react';
import classNames from 'classnames/bind';
import style from './style.module.scss';
import Image from 'next/image';
import IMG from '@/public/images/video.jpg';
import { BiVideo } from 'react-icons/bi';

const cx = classNames.bind(style);

const AboutVideo = () => {

    return (
        <div className={cx('video')}>
            <Image src={IMG} alt='videoAbout' />

            <div className={cx('video-button')}>
                <BiVideo />
                <p>WATCH VIDEO</p>
            </div>
        </div>

    )
}

export default AboutVideo