import React from 'react';
import classNames from 'classnames/bind';
import style from './style.module.scss';
import Image from 'next/image';
import { AiFillStar } from 'react-icons/ai';
import { ImFire } from 'react-icons/im';
import { BsCalendarWeek } from 'react-icons/bs';
import { SlLocationPin } from 'react-icons/sl';
import ChangeTextHTML from '@/hook/ChangetextHTML';
import Link from 'next/link';
import { RandomBook } from '@/hook/random';
import { GetTourLength } from '@/hook/GetTourLength';

const cx = classNames.bind(style);

const Tourcard1 = ({ data }) => {
    return (
        <Link href={`/tour-detail/${data.TourCode}`} className={cx('card')}>
            <div className={cx('card-img')}>
                <Image src={`https://vnxpedia.3i.com.vn${data.HightlightImg}`} alt="Luxuryvietravel-tour-img" className={cx('img')} width='1000' height='1000' />
            </div>
            <div className={cx('infor')}>
                <h6 className={cx('title')}>{data.TourName.toUpperCase()}</h6>
                <p className={cx('rate')}>
                    <span className={cx('rating')}>
                        <AiFillStar />  {(Math.random() * (5 - 4) + 4).toFixed(1)}
                    </span>
                    <span className={cx('ratecount')}>
                        ({RandomBook(50, 200)} rate) | {RandomBook(50, 200)} book
                    </span>
                </p>

                <p className={cx('length')}>
                    <BsCalendarWeek /> {GetTourLength(data.DETAIL)} Day
                </p>
                <p className={cx('price-type')}>
                    <span className={cx('price')}>$ {Math.floor(data.PRICE[0].price - ((data.PRICE[0].price * data.Discount) / 100))}</span>
                    {data.Discount && data.Discount != 0 &&
                        <span> <ImFire />${' '}
                            <span className={cx('real-price')}>{data.PRICE[0].price}</span></span>}
                </p>
                <p className={cx('place')}>
                    <SlLocationPin />
                    {ChangeTextHTML(data.Destination)}
                </p>
            </div>
        </Link>
    );
};

export default Tourcard1;
