import { Pagination } from '@/components';
import Headpage from '@/components/Head/head';
import Loading from '@/components/Loading';
import { categoryFillerAddress } from '@/public/dataRender';
import { banners } from '@/public/images';
import style from '@/styles/luxuryhotel.module.scss';
import { CategoryFilter } from '@/views';
import BannerIMG from '@/views/BannerSlide/BannerIMG';
import Hotelcard from '@/views/HotelCard/Hotelcard';
import classNames from 'classnames/bind';
import { useRouter } from "next/router";
import { useState } from 'react';
import { ListHotel } from '../api/QuerryAPI';


const cx = classNames.bind(style);


const index = () => {
    const router = useRouter();
    const [tag, settag] = useState('')
    const [page, setPage] = useState(1);

    const hotelList = ListHotel(tag);

    const lastIndex = page * 8
    const firstIndex = lastIndex - 8;



    return (
        <div className={cx('wrapper')}>
            <Headpage />
            <BannerIMG img={banners.hotel} title={'LUXURY HOTEL'} descrip={'Best luxury hotel in Viet Nam and Asia'} />
            <div className={cx('main')}>
                {hotelList.isLoading && <Loading />}
                {hotelList.data &&
                    <div className={cx('hotel-list')}>
                        <div className={cx('sort')}>
                            <button>Sort by</button>
                        </div>
                        {
                            hotelList.data.Object.slice(firstIndex, lastIndex).map((d) => (
                                <Hotelcard data={d} key={d} to={`/hotel-detail/${d.id}`} />
                            ))
                        }
                    </div>
                }
                <CategoryFilter
                    category={categoryFillerAddress}
                    className={cx('boxFilter')}
                    setvldestination={settag}

                />
            </div>

            {/* } */}
            {hotelList.data &&
                <Pagination totalPosts={hotelList.data.Object.length} postPerPage={8} setPage={setPage} pageIndex={page} />}
        </div>
    )
}

export default index