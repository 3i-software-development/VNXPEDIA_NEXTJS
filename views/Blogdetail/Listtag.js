import React from 'react';
import classNames from 'classnames/bind';
import style from '@/styles/blogdetail.module.scss';
import TitleLine from '@/components/TitleLine';
import Share from "@/views/Share/Share";



const cx = classNames.bind(style);

const Listtag = ({ data }) => {
    return (
        <div className={cx('main-end')}>
            <div className={cx('tag-list')}>
                {JSON.parse(data).filter(a => a != '#Blog').map((d, i) =>
                    <div key={i}>
                        <TitleLine key={i} text={d.replace('#', '').toUpperCase()} />
                    </div>
                )}

            </div>
            <div className={cx('share-list')}>
                <span>Share</span>
                <Share />
            </div>
        </div>
    )
}

export default Listtag