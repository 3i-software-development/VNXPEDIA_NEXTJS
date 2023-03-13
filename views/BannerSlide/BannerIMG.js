import React from 'react';
import classNames from 'classnames/bind';
import Image from 'next/image';
import style from './bannerSlide.module.scss';
import TitleLine from '@/components/TitleLine';
import Icon1 from '@/public/icon/1.png';
import Icon2 from '@/public/icon/2.png';
import Icon3 from '@/public/icon/3.png';
import Icon4 from '@/public/icon/4.png';
import { BsArrowRightCircle } from 'react-icons/bs'
import Link from 'next/link';

const cx = classNames.bind(style);
const BannerIMG = ({ img, title, descrip, bg, type, date, by, number, crumb, crumbStyle2, className }) => {
    return (
        <div className={cx('container', { [className]: className })}>
            <Image src={img} alt='img tour Luxuryvietravel' className={cx('img')} layout="fill" loading='eager'></Image>
            <div className={cx('text-img')} id={bg}>
                {type && <TitleLine text={type} color='black' />}
                <h1>{title}</h1>
                {descrip && <p className={cx('text-des')}>{descrip}</p>}
                {date &&
                    <div className={cx('infor')}>
                        <div>
                            <Image src={Icon1} alt='icon-admin' />
                            <p>  <span>by</span>{by} </p>
                        </div>
                        <div className={cx('infor-center')}>
                            <Image src={Icon2} alt='icon-date' />
                            <p>{date} </p>
                        </div>
                        <div>
                            <Image src={Icon3} alt='icon-chat' />
                            <p>{number}</p></div>

                    </div>
                }
                {crumb &&
                    <div className={cx('crumb', { crumbStyle2: crumbStyle2 })}>
                        <Link href='/' className={cx('titleHome')}>HOME</Link>
                        <BsArrowRightCircle />
                        <p>{crumb.title}</p>
                    </div>}
            </div>
        </div>
    )
}

export default BannerIMG