import React from 'react';
import classNames from 'classnames/bind';
import style from './styleTransFer.module.scss';
import Image from 'next/image';
import a1 from '@/public/icon/transfer1.png';
import a2 from '@/public/icon/transfer2.png';
import a3 from '@/public/icon/transfer3.png';
import { RxDotFilled } from 'react-icons/rx';
import { Title } from '@/components';
import Bn0 from '@/public/images/tfbn0.png';
import Bn1 from '@/public/images/tfbn2.jpg';
import { ListTransfer } from '@/pages/api/QuerryAPI';
import { BoxCarTrans } from '..';


const cx = classNames.bind(style);

export const Vehicles = ({ setbook }) => {
    const transferList = ListTransfer('VEHICLES');
    return (
        <div className={cx('containerContent')}>
            <h2>VEHICLES</h2>
            <p>At Luxury Vietravel, we don't just provide ordinary car rental services, we offer accompanying values to ensure our customers feel completely at ease, truly enjoy their experience, and most importantly, create a sense of prestige for our clients who have chosen our services.</p>

            <div className={cx('icon')}>
                <div>
                    <Image src={a1} alt='car' />
                    <h4>Professional Service</h4>
                </div>
                <div className={cx('seperate')}></div>
                <div>
                    <Image src={a2} alt='car' />
                    <h4>SuiablePrice</h4>
                </div>
                <div className={cx('seperate')}></div>
                <div className={cx('icon1')}>
                    <Image src={a3} alt='car' />
                    <h4>Safety</h4>
                </div>
            </div>

            <Image src={Bn0} alt='service VIP' className={cx('imgVIP')} />
            <h3>Our VIP pickup and drop-off services at border gates and airports:</h3>
            <p className={cx('text')}>The airport procedures in Vietnam have significantly improved in recent times, but waiting for baggage, going through visa checks, customs, etc., still takes up a lot of time, causing fatigue and stress, which is understandable. Furthermore, it creates a chaotic and unrefined atmosphere. You should give Luxury Vietravel the opportunity to provide you with convenience all the way once you arrive in Vietnam.</p>
            <h3>Private and packaged services from us:</h3>

            <div className={cx('listService')}>
                <Image src={Bn1} alt='service VIP' className={cx('imgPick')} />
                <ul className={cx('list-li')}>
                    <li><RxDotFilled /> Our staff will greet and present flowers to customers at the airport terminal.</li>
                    <li><RxDotFilled /> Use of Business Class waiting lounge.</li>
                    <li><RxDotFilled /> Served with cakes, tea, and fruits during waiting time while staff completes procedures.</li>
                    <li><RxDotFilled /> Our staff will handle all necessary procedures in just 5-15 minutes</li>
                    <li><RxDotFilled /> Customers do not need to present themselves to Customs and Security.</li>
                    <li><RxDotFilled /> Transportation with the latest car models to take customers to their hotels in the city.</li>
                </ul>
            </div>

            <button className={cx('btn')} onClick={() => setbook(true)}>BOOK NOW</button>
            <div className={cx('list-transfer')}>
                <Title text='VIP CAR SERVICE FOR BUSINESS AND TOURIST CUSTOMERS' align='center' />
                <p>Choose luxury and high-class car models in the fleet of Luxury Vietravel<br />
                    Luxury Vietravel provides VIP car service for business and tourist customers with a variety of luxurious and high-class car models to choose from. The car models are guaranteed for quality and safety, giving customers a comfortable and luxurious feeling while travelling.</p>
                <h3>SEDAN</h3>

                {transferList.data &&
                    <div className={cx('list-car')}>
                        {/* {
                            transferList.data.Object.map((d) => ( */}
                        <BoxCarTrans data={transferList.data.Object[0]} to={`/transfer-detail/${(transferList.data.Object[0]).id}`} />
                        <BoxCarTrans data={transferList.data.Object[0]} to={`/transfer-detail/${(transferList.data.Object[0]).id}`} />
                        <BoxCarTrans data={transferList.data.Object[0]} to={`/transfer-detail/${(transferList.data.Object[0]).id}`} />
                        {/* <BoxCarTrans data={d} key={d} to={`/transfer-detail/${d.id}`} /> */}
                        {/* ))
                        } */}
                    </div>}

                <h3>SUV</h3>
                {transferList.data &&
                    <div className={cx('list-car')}>
                        {/* {
                            transferList.data.Object.map((d) => ( */}
                        <BoxCarTrans data={transferList.data.Object[0]} to={`/transfer-detail/${(transferList.data.Object[0]).id}`} />
                        <BoxCarTrans data={transferList.data.Object[0]} to={`/transfer-detail/${(transferList.data.Object[0]).id}`} />
                        <BoxCarTrans data={transferList.data.Object[0]} to={`/transfer-detail/${(transferList.data.Object[0]).id}`} />
                        {/* <BoxCarTrans data={d} key={d} to={`/transfer-detail/${d.id}`} /> */}
                        {/* ))
                        } */}
                    </div>}
                <h3>VAN</h3>
                {transferList.data &&
                    <div className={cx('list-car')}>
                        {/* {
                            transferList.data.Object.map((d) => ( */}
                        <BoxCarTrans data={transferList.data.Object[0]} to={`/transfer-detail/${(transferList.data.Object[0]).id}`} />
                        <BoxCarTrans data={transferList.data.Object[0]} to={`/transfer-detail/${(transferList.data.Object[0]).id}`} />
                        <BoxCarTrans data={transferList.data.Object[0]} to={`/transfer-detail/${(transferList.data.Object[0]).id}`} />
                        {/* <BoxCarTrans data={d} key={d} to={`/transfer-detail/${d.id}`} /> */}
                        {/* ))
                        } */}
                    </div>}
                <h3>BUS</h3>
                {transferList.data &&
                    <div className={cx('list-car')}>
                        {/* {
                            transferList.data.Object.map((d) => ( */}
                        <BoxCarTrans data={transferList.data.Object[0]} to={`/transfer-detail/${(transferList.data.Object[0]).id}`} />
                        <BoxCarTrans data={transferList.data.Object[0]} to={`/transfer-detail/${(transferList.data.Object[0]).id}`} />
                        <BoxCarTrans data={transferList.data.Object[0]} to={`/transfer-detail/${(transferList.data.Object[0]).id}`} />
                        {/* <BoxCarTrans data={d} key={d} to={`/transfer-detail/${d.id}`} /> */}
                        {/* ))
                        } */}
                    </div>}
                <h3>COACH</h3>
                {transferList.data &&
                    <div className={cx('list-car')}>
                        {/* {
                            transferList.data.Object.map((d) => ( */}
                        <BoxCarTrans data={transferList.data.Object[0]} to={`/transfer-detail/${(transferList.data.Object[0]).id}`} />
                        <BoxCarTrans data={transferList.data.Object[0]} to={`/transfer-detail/${(transferList.data.Object[0]).id}`} />
                        <BoxCarTrans data={transferList.data.Object[0]} to={`/transfer-detail/${(transferList.data.Object[0]).id}`} />
                        {/* <BoxCarTrans data={d} key={d} to={`/transfer-detail/${d.id}`} /> */}
                        {/* ))
                        } */}
                    </div>}
            </div>

        </div>
    )
}

export const CruiseYacht = () => {
    return (
        < div className={cx('containerContent')}>
            <h2>YACHTS</h2>
            <p>
                Vietnam, being a coastal nation, boasts not only of stunning beaches but also of majestic and impressive bays. Exploring these magnificent natural wonders on luxury cruises is what Luxury Vietravel offers to tourists visiting Vietnam. From the pristine beaches of Nha Trang to the iconic Ha Long Bay, Vietnam offers a unique experience of sailing on a yacht cruise.<br />
                The Nha Trang Cruise takes visitors on a journey along the city's coastline, where they can enjoy the stunning views of the beaches, islands, and fishing villages. Meanwhile, the Ha Long Bay cruise offers a breathtaking experience of limestone cliffs and emerald waters, which is considered one of the most iconic destinations in Vietnam.<br />
                Luxury Vietravel aims to provide a one-of-a-kind experience for travelers seeking adventure, luxury, and relaxation. With Vietnam Yacht Cruise, visitors can immerse themselves in the country's natural beauty while indulging in the finest amenities and services on board. The company takes pride in showcasing Vietnam's natural wonders and cultural heritage while ensuring the comfort and satisfaction of its guests

            </p>
        </div>
    )
}

export const Helicopters = () => {
    return (
        < div className={cx('containerContent')}>
            <h2>HELICOPTERS</h2>
            <p>Luxury Vietravel partners with reputable airlines to provide customers with premium travel services and a time-saving experience. The company offers a wide range of flight options that cater to different travel purposes, particularly for those seeking luxury and comfort.<br />
                Apart from air travel, Luxury Vietravel also offers unique travel experiences, such as Vietnam Helicopter Landing, which allows visitors to access remote and exclusive destinations. However, it's important to note that safety is always a top priority for the company. Luxury Vietravel ensures that all their helicopter tours are conducted by licensed and experienced pilots, and regular maintenance is carried out to prevent any accidents or incidents, such as the US Vietnam Helicopter Crash that occurred during the war.<br />
                With Luxury Vietravel, travelers can expect an exceptional travel experience that combines luxury, comfort, and safety. The company is dedicated to providing its customers with the best travel options that showcase Vietnam's beauty, culture, and history, while ensuring their comfort and safety throughout their journey.
            </p>
        </div>
    )
}

export const Luxtrain = () => {
    return (
        < div className={cx('containerContent')}>
            <h2>LUX TRAIN</h2>
            <p>Experiencing the 5-star train service in Vietnam is a precious opportunity to fully admire the beautiful scenery along every route. Luxury Vietravel partners with top train companies to provide customers with a premium Vietnam train travel experience.<br />
                Traveling by train in Vietnam is not only a convenient and affordable option, but it also offers a unique cultural experience. The Vietnam train street is one such example, where visitors can see the daily life of local residents living alongside the railway tracks.<br />
                Luxury Vietravel's Vietnam train packages include comfortable cabins, exceptional service, and breathtaking views of the Vietnamese countryside. The company's knowledgeable guides also provide interesting facts and historical insights about the regions the trains pass through.
                With Luxury Vietravel, customers can expect a seamless and enjoyable train travel experience, allowing them to fully appreciate the beauty and culture of Vietnam.
            </p>
        </div>
    )
}
