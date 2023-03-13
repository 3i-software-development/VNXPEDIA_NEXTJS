import React from 'react';
import classNames from 'classnames/bind';
import style from './style.module.scss';
import Link from 'next/link';

const cx = classNames.bind(style);

const Crumb = ({ text, type }) => {
    return (
        <div>
            <p className={cx('text')}>
                <Link href='/'>HOME</Link>
                {type && <Link href={`/way-to-travel/${type}`}> | {type.replace('TYPE_', '')}</Link>}
                {text && <span > | {text}</span>}
            </p>
        </div>
    )
}

export default Crumb