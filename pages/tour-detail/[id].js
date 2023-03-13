import React, { useState, useRef } from 'react';
import classNames from 'classnames/bind';
import style from '@/styles/Tourdetail.module.scss';
import BannerIMG from '@/views/BannerSlide/BannerIMG';
import Crumb from '@/views/Crumb/Crumb';
import Imglist from '@/views/Tourdetail/Imglist';
import Highlight from '@/views/Tourdetail/Highlight';
import Itinerary from '@/views/Tourdetail/Itinerary';
import Tourrecomment from '@/views/Tourdetail/Tourrecomment';
import { useRouter } from "next/router";
import Booking from '@/views/Tourdetail/Booking';
import Shareemail from '@/views/Tourdetail/Shareemail';
import { Gettour } from '../api/QuerryAPI';
import Headpage from '@/components/Head/head';
import { GetTourLength } from '@/hook/GetTourLength';

const cx = classNames.bind(style);


const index = () => {
    const router = useRouter();
    const [Book, setBook] = useState(0);
    const componentRef = useRef(null);

    const Tourdata = Gettour(router.query.id);



    return (
        <div className={cx('container')}>
            <Headpage />
            {Tourdata.data &&
                <div className={cx('main')}>
                    {Tourdata.data.BannerImg ?
                        <BannerIMG img={`https://vnxpedia.3i.com.vn${Tourdata.data.BannerImg}`} title={Tourdata.data.TourName} bg='bg' /> :
                        <BannerIMG img={`https://vnxpedia.3i.com.vn${Tourdata.data.HightlightImg}`} title={Tourdata.data.TourName} bg='bg' />
                    }


                    {Book == 0 &&
                        <div className={cx('main-infor')}>

                            <div className={cx('crumb-cost')}>
                                <Crumb text={Tourdata.data.TourName} type={Tourdata.data.TourType} />
                                <div className={cx('cost')}>
                                    <sup>From</sup>
                                    <p>$ {Tourdata.data.PRICE[0].price}</p>
                                    <span>/PAX</span>
                                </div>
                            </div>

                            <Imglist data={[`https://vnxpedia.3i.com.vn${Tourdata.data.HightlightImg}`, `https://vnxpedia.3i.com.vn${Tourdata.data.HightlightImg1}`, `https://vnxpedia.3i.com.vn${Tourdata.data.HightlightImg2}`, `https://vnxpedia.3i.com.vn${Tourdata.data.HightlightImg3}`]} />
                            <Highlight title={Tourdata.data.TourName} destination={Tourdata.data.Destination} long={GetTourLength(Tourdata.data.DETAIL)} highlight={Tourdata.data.Hightlight} click={setBook} btn cla='name' cla2='highlight' />
                            <Itinerary description={Tourdata.data.TourDescription} detail={Tourdata.data.DETAIL} click={setBook} btn dataref={componentRef.current} />

                        </div>}
                    {Book == 1 && <Booking
                        onClick={setBook}
                        datas={Tourdata.data}
                    />

                    }
                    {Book == 2 && <Shareemail close={setBook} />}
                    <Tourrecomment type={Tourdata.data.TourType} />

                    <div className={cx('pdf')}>
                        <div className={cx('main-infor1')} ref={el => (componentRef.current = el)}>
                            <div className={cx('crumb-cost')}>
                                <h3> {Tourdata.data.TourName} </h3>
                                <div className={cx('cost')}>
                                    <sup>From</sup>
                                    <p>${Tourdata.data.PRICE[0].price}</p>
                                    <span>/PAX</span>
                                </div>
                            </div>

                            <Imglist data={[`https://vnxpedia.3i.com.vn${Tourdata.data.HightlightImg}`, `https://vnxpedia.3i.com.vn${Tourdata.data.HightlightImg}`, `https://vnxpedia.3i.com.vn${Tourdata.data.HightlightImg}`, `https://vnxpedia.3i.com.vn${Tourdata.data.HightlightImg}`]} />
                            <Highlight title={Tourdata.data.TourName} destination={Tourdata.data.Destination} long={Tourdata.data.DETAIL.length} highlight={Tourdata.data.Hightlight} click={setBook} cla='name1' cla2='highlight2' />
                            <Itinerary description={Tourdata.data.TourDescription} detail={Tourdata.data.DETAIL} click={setBook} />

                        </div>
                    </div>
                </div>}

        </div>
    )
}

export default index

