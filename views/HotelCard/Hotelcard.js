import React from 'react';
import classNames from 'classnames/bind';
import style from './style.module.scss';
import Image from 'next/image';
import { AiFillStar } from 'react-icons/ai';
import { ImFire } from 'react-icons/im';
import { GetlistImg } from '@/hook/GetListImg';

import Link from 'next/link';

const cx = classNames.bind(style);

const Hotelcard = ({ data }) => {
    return (
        <Link href={`/hotel-detail/${data.id}`} className={cx('card')}>
            <div className={cx('card-img')}>
                <Image src={GetlistImg(data.gallery)[0]} alt="Luxuryvietravel-tour-img" className={cx('img')} width='1000' height='1000' />
            </div>
            <div className={cx('infor')}>
                <h6 className={cx('title')}>{data.title.toUpperCase()}</h6>
                <p className={cx('rate')}>
                    <span className={cx('rating')}>
                        <AiFillStar /> 4.8
                    </span>
                    <span className={cx('ratecount')}>
                        (1000 rate) | {data.featured_ordering} book
                    </span>
                </p>
                <p className={cx('price-type')}>
                    <span className={cx('price')}>$ {1500 - ((1500 * 0.1) / 100)}</span> <ImFire />${' '}
                    <span className={cx('real-price')}>1500</span>
                </p>
            </div>
        </Link>
    )
}

export default Hotelcard