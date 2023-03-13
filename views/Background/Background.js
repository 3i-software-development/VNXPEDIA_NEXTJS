import React from 'react';
import style from './bg.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(style);

const Background = ({ img, text }) => {
    console.log(img)
    return (
        <div style={{
            backgroundImage: `url(${img.src})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
        }} className={cx('bg')}>
            <h6 > {text}</h6 >
        </div >
    )
}

export default Background
