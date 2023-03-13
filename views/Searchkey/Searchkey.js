import classNames from 'classnames/bind';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import style from './style.module.scss';
import Image from 'next/image';

import { Searchtour, Searchblog } from '@/pages/api/QuerryAPI';
import { GetlistImg } from '@/hook/GetListImg';

const cx = classNames.bind(style);

const Searchkey = ({ close }) => {

    const [keyword, setkeyword] = useState();

    const tourSearch = Searchtour(keyword);
    const blogSearch = Searchblog(keyword);
    useEffect(() => {
        if (keyword !== '') {
            tourSearch.refetch();
            blogSearch.refetch()
        }
    }, [keyword])
    return (
        <div className={cx('searchkey-container')}>
            <input type='text' className={cx('input')} onChange={(e) => setkeyword(e.target.value)} placeholder='Type keyword here' />
            <div className={cx('result')}>
                {tourSearch.data && tourSearch.data.length > 0 &&
                    <div className={cx('result-div')}>
                        <p className={cx('title')}>Tour result</p>
                        {tourSearch.data.map((d, i) =>
                            <Link href={`/tour-detail/${d.TourCode}`} className={cx('result-tour')} key={i} onClick={() => close(false)}>
                                <Image src={`https://vnxpedia.3i.com.vn${d.HightlightImg}`} alt="Luxuryvietravel-tour-img" className={cx('img')} width='500' height='500' />
                                <p>{d.TourName.toUpperCase()}</p>
                            </Link>

                        )}</div>}

                {blogSearch.data && blogSearch.data.length > 0 &&
                    <div className={cx('result-div')}>
                        <p className={cx('title')}> Blog result</p>
                        {blogSearch.data.map((d, i) =>
                            <Link href={`/blog-detail/${d.id}`} className={cx('result-tour')} key={i} onClick={() => close(false)}>
                                <Image src={GetlistImg(d.gallery)[0]} alt="Luxuryvietravel-tour-img" className={cx('img')} width='500' height='500' />
                                <p>{d.title.toUpperCase()}</p>
                            </Link>

                        )}</div>}
            </div>
        </div>
    )
}

export default Searchkey