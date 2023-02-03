import classNames from "classnames/bind";
import style from './profile.module.scss'

import ItemInput from "./item";
import { useState } from "react";
const cx = classNames.bind(style);

const fakedata = {
    name: 'Nora Tsunoda',
    Gender: 'fermale',
    Birthday: '21.06.1998',
    Address: '160 minh khia, ha noi',
    phone: '0983548866',
    email: 'NoraTsunoda@gmail.com',
    about: 'asdas',
}

function InfoUser() {

    return (<div className={cx('wrapper')}>
        <h1 className={cx('title')}>profile infomation</h1>
        <ItemInput title={'name'} value={fakedata.name} />
        <ItemInput title={'gender'} value={fakedata.Gender} />
        <ItemInput title={'birthday'} value={fakedata.Birthday} />
        <ItemInput title={'address'} value={fakedata.Address} />
        <ItemInput title={'phone'} value={fakedata.phone} />
        <ItemInput title={'email'} value={fakedata.email} />
        <div className={cx('boxAboutInput')}>
            <h3 className={cx('titleItem')}>about:</h3>

            <textarea className={cx('input')} id="w3review" name="w3review" rows="4" cols="50" value={fakedata.about} />
        </div>
    </div>);
}

export default InfoUser;