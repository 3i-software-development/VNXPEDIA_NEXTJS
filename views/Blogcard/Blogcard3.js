import React from 'react';
import classNames from 'classnames/bind';
import style from './style.module.scss';
import Image from 'next/image';
import { BsChat } from 'react-icons/bs'

const cx = classNames.bind(style);

const Blogcard3 = ({ data }) => {
    return (
        <div className={cx('blogcard3')}>
            <Image src={data.banner} alt='blog-travel' />
            <div className={cx('blog-infor')}>
                <div className={cx('blog-type')}>
                    <div className={cx('text-line')}></div>
                    <p className={cx('text-type')}>
                        {data.type.toUpperCase()}
                    </p>
                </div>

                <h1 className={cx('blog-title')}>{data.title.toUpperCase()}</h1>
                <p className={cx('blog-by')}>by <span>{data.author}</span></p>
                <p className={cx('month')}>November</p>
                <h1 className={cx('day')}>30</h1>
                <p className={cx('num-cm')}><BsChat /> 20</p>
            </div>
        </div>
    )
}

export default Blogcard3