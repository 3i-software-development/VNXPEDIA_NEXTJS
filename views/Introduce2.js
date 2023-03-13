import React from 'react';
import style from './Introduce2.module.scss';
import classNames from 'classnames/bind';
import Image from 'next/image';
import gt2 from '../public/gt2.png';

const cx = classNames.bind(style);

const Introduce2 = () => {
    return (
        <div className={cx('container')}>
            <Image src={gt2} className={cx('img')} alt='img-Introduce' />

            <div className={cx('h2')}>
                <h2> WE OFFER LUXURY PRIVATE TOURS TO SOUTHEAST ASIA</h2>
            </div>
            <div className={cx('text')}>
                <p>
                    <span>Luxuryvietravel </span>specializes in <span>Private Tours & Tailor-Made Holiday Packages</span> by
                    Inside Travel Experts.
                    <br /> We are proudly the Best Inside Travel DMCs & Tour Operators in each destination where you
                    travel to, our local professional team is always by your side & take care of your trip from start to
                    end to make your tour incredible & unforgettable experiences...
                </p>

            </div>
        </div>
    );
};

export default Introduce2;

