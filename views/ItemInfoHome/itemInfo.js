import classNames from 'classnames/bind';
import style from './item.module.scss';

import Image from 'next/image';

const cx = classNames.bind(style);

function ItemInfo({ data, id }) {
    const clases = cx('wrapper', { backgroundBlack: id % 2 === 0 });
    const newtitle = data.title.split('<br/>');

    return (
        <div className={clases}>
            <div className={cx('boxTitle')}>
                <Image src={data.icon} alt="banner" className={cx('icon')} />



                {newtitle.length == 2 ? <h2 className={cx('title')}>{newtitle[0]}<br />{newtitle[1]}</h2> : <h2 className={cx('title')}>{newtitle[0]}</h2>}
            </div>
            <p className={cx('content')}>{data.content}</p>
        </div>
    );
}

export default ItemInfo;
