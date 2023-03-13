import Image from 'next/image';
import classNames from "classnames/bind";
import styles from './outTeam.module.scss';

import IMG from '@/public/avatar_default.jpg'
const cx = classNames.bind(styles)

function Item({ avatar, name, position, intro }) {
    return (<div className={cx('wrapperItem')}>

        <div className={cx('avatar')}>
            <Image src={avatar || IMG} alt='avatar' className={cx('img')} />
        </div>
        <h3 className={cx('name')}>{name}</h3>
        <p className={cx('position')}>{position}</p>

        <div className={cx('intro-triangle')}></div>
        <div className={cx('intro')}>
            {intro}</div>


        {/* <div className={cx('wrapperItem-hover')}>
            <div className={cx('div-main')}>
                <div className={cx('avatar')}>
                    <Image src={avatar || IMG} alt='avatar' className={cx('img')} />
                </div>
                <h3 className={cx('name')}>{name}</h3>
                <p className={cx('position')}>{position}</p>
            </div>
            <p className={cx('intro')}>{intro}</p>


        </div> */}

    </div>);
}

export default Item;