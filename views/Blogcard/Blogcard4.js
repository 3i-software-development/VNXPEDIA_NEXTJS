import React from 'react';
import classNames from 'classnames/bind';
import style from './style.module.scss';
import Image from 'next/image';
import { BsChat } from 'react-icons/bs';
import TitleLine from '@/components/TitleLine';

const cx = classNames.bind(style);

const Blogcard4 = ({ data }) => {
    return (
        <div className={cx('blogcard4')}>
            <Image src={data.img} alt="blog-Luxuryvietravel" />
            <div className={cx('text-box')}>
                <p className={cx('title')}>{data.title.toUpperCase()}</p>
                <p className={cx('content')}>{data.content}</p>
            </div>
        </div>
    )
}

export default Blogcard4