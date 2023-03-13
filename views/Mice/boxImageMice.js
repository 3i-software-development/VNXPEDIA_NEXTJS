import classNames from "classnames/bind";
import style from './miceView.module.scss'

import Image from "next/image";
import Link from "next/link";
const cx = classNames.bind(style)

function BoxImageMice({ id, title, des, img, size, minWidth }) {
    return (
        <Link href={`/case-study/${id}`} className={cx('boxImageMice')} style={{ width: size, minWidth: minWidth }}>
            <div className={cx('boxImg')}>
                <Image src={img} alt='boxImage' className={cx('img')} width='1000' height='1000' />
            </div>
            <div className={cx('boxDes')}>
                <h3 className={cx('title', des ? 'titleDes' : null)}>{title}</h3>
                {
                    des &&
                    <p className={cx('desBoxImg')}>{des}</p>
                }
            </div>
        </Link>
    );
}

export default BoxImageMice;