import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import style from '@/styles/Tourdetail.module.scss';
import { Title } from '@/components';
import Tourcard1 from '../Tourcard/Tourcard1';
import { Tourtype } from '@/pages/api/CallAPI';

const cx = classNames.bind(style);

const Tourrecomment = ({ type }) => {
    const [Data, setdata] = useState();
    const CAllAPI = async () => {
        const response = await Tourtype(type);
        if (response.status == 200) {
            setdata(response.data.Object.slice(0, 3));
        }
    }
    useEffect(() => {
        CAllAPI();
    }, [])

    return (
        <div className={cx('tour-rcm')}>
            <Title text='Tour recomment' align='start' />
            <div className={cx('tour-list')}>
                {Data && Data.map(d =>
                    <Tourcard1 data={d} />)}

            </div>
        </div>
    )
}

export default Tourrecomment