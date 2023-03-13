import React from 'react';
import classNames from 'classnames/bind';
import style from './style.module.scss';
import Image from 'next/image';
import { AiFillStar } from 'react-icons/ai';
import { ImFire } from 'react-icons/im';
import { BsCalendarWeek } from 'react-icons/bs';
import { SlLocationPin } from 'react-icons/sl';
import ChangeTextHTML from '@/hook/ChangetextHTML';
import { RandomBook } from '@/hook/random';
import { GetTourLength } from '@/hook/GetTourLength';
import Link from 'next/link';
import { da } from 'date-fns/locale';

const cx = classNames.bind(style);

const Tourcard2 = ({ data }) => {

    return (
        <div className={cx('card2')}>
            <div className={cx('img-card2')}>
                <Image src={`https://vnxpedia.3i.com.vn${data.HightlightImg}`} alt="Luxuryvietravel-tour-img" className={cx('img2')} width='1000' height='1000' />
                {data.Discount && data.Discount != 0 && data.Discount != 'null' &&
                    <div className={cx('salesticky')}>
                        <p className={cx('salenumber')}>
                            {data.Discount}
                            <span>%</span>
                        </p>
                        <p>OFF</p>
                    </div>
                }
            </div>

            <div className={cx('infor2')}>
                <h6 className={cx('title')}>{data.TourName.toUpperCase()}</h6>
                <p className={cx('rate')}>
                    <span className={cx('rating')}>
                        <AiFillStar /> {(Math.random() * (5 - 4) + 4).toFixed(1)}
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
                <div className={cx('highlight')}>
                    {ChangeTextHTML(data.Hightlight).map((d) => (
                        <p>
                            <button></button>
                            {d}
                        </p>
                    ))}
                </div>
                <Link href={`/tour-detail/${data.TourCode}`} className={cx('book')}>SEE MORE</Link>
            </div>


        </div>
    );
};

export default Tourcard2;
