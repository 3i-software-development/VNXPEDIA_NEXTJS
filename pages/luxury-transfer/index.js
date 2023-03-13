import { Button, Pagination } from '@/components';
import Headpage from '@/components/Head/head';
import Loading from '@/components/Loading';
import a1 from '@/public/icon/transfer1.png';
import a2 from '@/public/icon/transfer2.png';
import a3 from '@/public/icon/transfer3.png';
import { banners } from '@/public/images';
import style from '@/styles/luxuryTransfer.module.scss';
import { BoxCarTrans } from '@/views';
import BannerIMG from '@/views/BannerSlide/BannerIMG';
import classNames from 'classnames/bind';
import Image from 'next/image';
import { useState } from 'react';
import { ListTransfer } from '../api/QuerryAPI';

const cx = classNames.bind(style);

const listtype = ['VEHICLES', 'YACHTS', 'HELICOPTERS', 'LUX TRAIN']

function index() {

    const [page, setPage] = useState(1)
    const [transActive, setTransActive] = useState(0);

    const [Type, settype] = useState('VEHICLES')


    const transferList = ListTransfer(Type);
    // const ChangeType = (i) => {
    //     setTransActive(i);
    //     settype(listtype(i));
    // }

    const onChangePag = (page) => {
        setcurrent(Tourresult.slice((page - 1) * 9, page * 9));
    };
    console.log(Type);

    return (
        <div className={cx('wrapper')}>
            <Headpage />
            <BannerIMG img={banners.luxuryTransfer} title={"LUXURY TRANSFER"} />
            <div className={cx('main')}>
                <div className={cx('boxTitle')}>
                    <h2 className={cx('title')}>luxury transfer</h2>
                    <p className={cx('textTitle')}>At Luxuryvietravel, we are disceming, opinionated, and beleve kairy should be part of the pleasure in exploring our beautiful country No matter what you need from your kury experience, we make sure than your journey is customized to your meds Fram commercialigns to private charters points and legge planning to luxury arexpenence</p>
                </div>

                <div className={cx('boxBtn')} >
                    {listtype.map((d, i) =>
                        <Button className={cx('btn', transActive === i ? 'active' : null)} onClick={() => { setTransActive(i); settype(d) }} key={i}>{d} </Button>
                    )}

                </div>

                <div className={cx('container')}>
                    <div className={cx('text')}>
                        <h2>{Type}</h2>
                        <p>We manually compare the prices from hundreds of airport transfer service suppliers in Vietnam to offer you the best value for money service. All of our transportation suppliers in Vietnam offer free cancellations and free amendments, up to 24 hours before pick up. Vietnam Airport pick ups include meet and greet and our prices are fully inclusive. Book your Vietnam taxi transfer online in minutes and enjoy a stress free transfer and a perfect start to your holiday. And while you are here, why not book your transfer from your home to the airport and back. You can find a list of all destinations we cover on our destinations page, or use the quote form.<br /><br />

                            Our Private Cars are all new, modern with strong A/C and only use for our customers.</p>
                        <div className={cx('icon')}>
                            <div>
                                <Image src={a1} alt='car' />
                                <h4>Professional Service</h4>
                            </div>
                            <div className={cx('seperate')}></div>
                            <div>
                                <Image src={a2} alt='car' />
                                <h4>Professional Service</h4>
                            </div>
                            <div className={cx('seperate')}></div>
                            <div className={cx('icon1')}>
                                <Image src={a3} alt='car' />
                                <h4>Professional Service</h4>
                            </div>
                        </div>
                    </div>
                </div>
                {transferList.isLoading && <Loading />}
                {transferList.data &&
                    <div className={cx('list-car')}>
                        {
                            transferList.data.Object.map((d) => (
                                <BoxCarTrans data={d} key={d} to={`/transfer-detail/${d.id}`} />
                            ))
                        }
                    </div>}
                {transferList.data &&
                    <Pagination totalPosts={transferList.data.Object.length} postPerPage={9} setPage={setPage} pageIndex={page} />}
            </div>
        </div>
    );
}

export default index;
