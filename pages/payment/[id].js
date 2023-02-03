import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from '@/styles/payment.module.scss';
import BannerIMG from '@/views/BannerSlide/BannerIMG';
import ImgBn from '@/public/images/paymentbn.png';
import Imgpay from '@/public/images/iconpay.png';
import Image from 'next/image';
import { useRouter } from "next/router";
import { Getblog } from '../api/CallAPI';



const cx = classNames.bind(styles);
const ListMenu = ['Deposit & Payment', 'Cancellation Policy', 'Term & Conditions'];


const index = () => {
    const router = useRouter();
    const [Content, setcontent] = useState(router.query.id);
    const [Active, setactive] = useState(['act', '', '']);
    const [Data, setdata] = useState();
    const handlePick = (i) => {
        setcontent(ListMenu[i]);
        let list = Active;
        setactive(list.map((d, index) => index == i ? 'act' : ''));

    }
    const CallAPI = async () => {

        const response = await Getblog(5044);
        if (response.status == 200) {
            setdata(response.data.Object);
        }

    }


    useEffect(() => {
        setcontent(router.query.id);
        { router.query.id == 'policy' && handlePick(1) }
        CallAPI();
    }, [router.query.id]);
    console.log(Data);

    return (
        <div className={cx('container')}>
            {Content && <BannerIMG img={ImgBn} title={Content.toUpperCase()} bg='bg' />}
            <div className={cx(`main`)}>
                <div className={cx('menu')}>
                    {ListMenu.map((d, i) =>
                        <h6 key={i} onClick={() => handlePick(i)} className={cx(`${Active[i]}`)} >{ListMenu[i].toUpperCase()}</h6>

                    )}


                </div>
                {Active[0] == 'act' &&
                    <div className={cx('content')}>
                        <h1 >Deposit & Payment</h1>
                        <h6 >PAYMENT BY CREDIT CARD</h6>
                        <p className={cx('p-bold')}>Instructions to pay online with Visa, MasterCard, American Express, JCB Card</p>
                        <p >We connect with OnePAY Payment Gateway to accept Online Card Payment (www.onepay.vn). All of your card information is processed through SSL protocol with international card security standard. Your card information will not be stored at our system (merchant) but MasterCard with international security standard.</p>
                        <Image src={Imgpay} alt='list-payment' />
                        <p >After you have received your order from us through a link, please check the information of the Order. If all the information is correct, please read & agree with Terms and Conditions before clicking to pay. You will be redirected to OnePAY Payment Gateway to pay us online with Visa, MasterCard, American Express, and JCB Card .</p>
                        <p >  <span>Note:</span>Note: In some cases, your transaction may be not successful due to:</p>
                        <p>- In correct card information</p>
                        <p>- Not enough credit balance (daily or monthly)</p>
                        <p>- Your card has not been activated for online payment. You should contact the Issuer Bank for the card activation.</p>
                        <p>In case you input correct card information but you did not receive the transaction result from the payment gateway or from us. <span>Please do not try to make other payment. Contact us to get the transaction result and confirmation of the Order</span> (Email: experts@vnxpedia.com)</p>
                        <h6 >PAYMENT & DEPOSIT FOR BOOKING TOUR & HOLIDAY PACKAGES</h6>
                        <p>a - Deposit: A deposit of 30% of total value by credit card is required upon confirmation of your booking. Once deposit of your booking has been made, it is agreed that you have read, understood and accepted all our Terms and Conditions.</p>
                        <p>b - Remained balance: The remained balance of the tour value (70%) will be paid on arrival.</p>
                    </div>
                }
                {Active[1] == 'act' &&
                    <div className={cx('content')}>
                        <h1>Policy</h1>
                        {Data && <div className={cx('policy')} dangerouslySetInnerHTML={{ __html: Data[0].full_text }}></div>}
                    </div>
                }


            </div>
        </div>

    )
}

export default index