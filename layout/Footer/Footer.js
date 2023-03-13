import classNames from 'classnames/bind';
import Image from 'next/image';
import style from './footer.module.scss';
import Logo from '@/asset/images/LogoFN2.png';
import { GiPhone } from 'react-icons/gi';
import { MdEmail } from 'react-icons/md';
import { GrFacebookOption } from 'react-icons/gr';
import { TiSocialInstagram } from 'react-icons/ti';
import { BsTwitter } from 'react-icons/bs';
import { BiCopyright } from 'react-icons/bi';
import { TfiGoogle } from 'react-icons/tfi';
import Img1 from '@/public/icon/logo6.png'
import Img2 from '@/public/icon/logo5.png'
import Img3 from '@/public/icon/logo4.png'
import Img4 from '@/public/icon/logo3.png'
import Img5 from '@/public/icon/logo2.png'
import Img6 from '@/public/icon/logo1.png'
import Link from 'next/link';
import { Subcrise } from '@/pages/api/CallAPI';
import { useState, useEffect } from 'react';


const cx = classNames.bind(style);
const Listimg = [Img1, Img2, Img3, Img4, Img5, Img6];

function Footer() {
    const [email, setemail] = useState();
    const CallAPI = async () => {
        const response = await Subcrise(email);
        if (response.status == 200) {
            alert('Subcrise success !');
        }
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('footer')}>
                <div className={cx('list-logo')}>

                    <Image src={Img1} className={cx('img')} alt="logo-prize-Luxuryvietravel" />
                    <Image src={Img2} className={cx('img-mini')} alt="logo-prize-Luxuryvietravel" />
                    <Image src={Img3} className={cx('img')} alt="logo-prize-Luxuryvietravel" />
                    <Image src={Img4} className={cx('img')} alt="logo-prize-Luxuryvietravel" />
                    <Image src={Img5} className={cx('img')} alt="logo-prize-Luxuryvietravel" />
                    <Image src={Img6} className={cx('img-mini')} alt="logo-prize-Luxuryvietravel" />
                </div>
                <hr className={cx('hr')} />
                <div className={cx('main')}>
                    <div className={cx('main-top')}>
                        <div className={cx('main-left')}>
                            <div className={cx('infor')}>

                                <Image src={Logo} className={cx('logo-img')} alt="logo-Luxuryvietravel" />
                                <div className={cx('infor-bot')}>
                                    <div className={cx('phone')}>
                                        <GiPhone />
                                        <div>+84 901591111</div>
                                    </div>
                                    <div className={cx('email')}>
                                        <MdEmail />
                                        <div>info@luxuryvietravel.com</div>
                                    </div>
                                    <div className={cx('icon')}>
                                        <Link href='https://www.facebook.com/profile.php?id=100090618182366' className={cx('item-icon')}>
                                            <GrFacebookOption />
                                        </Link>
                                        <div className={cx('item-icon')}>
                                            <TiSocialInstagram />
                                        </div>
                                        <div className={cx('item-icon')}>
                                            <BsTwitter />
                                        </div>
                                        <div className={cx('item-icon')}>
                                            <TfiGoogle />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={cx('list-link')}>
                                <div className={cx('list')}>
                                    <div className={cx('title')}>OUR DESTINATIONS</div>
                                    <Link href='/destination/VietNam'>VietNam</Link>
                                    <Link href='/destination/VietNam'>Thailand</Link>
                                    <Link href='/destination/VietNam'>Cambodia</Link>
                                    <Link href='/destination/VietNam'>Laos</Link>
                                    <Link href='/destination/VietNam'>Myanmar</Link>
                                </div>
                                <div className={cx('list')}>
                                    <div className={cx('title')}>AS TOUR OPERATOR</div>
                                    <Link href='/about-us'>Why travel with us</Link>
                                    <Link href='/about-us#this' >Meat Luxuryvietravel team</Link>

                                    <Link href='/responsible'>Responsible Travel</Link>
                                    <Link href='/payment/conditions'>Terms & Conditions</Link>
                                    <Link href='/payment/Deposit&Payment'>Deposit & Payment</Link>
                                    <Link href='/payment/policy'>Cancellation Policy</Link>
                                </div>
                            </div>
                        </div>
                        <div className={cx('about')}>
                            <div className={cx('title')}>ABOUT</div>
                            <p>
                                img elements must have an alt prop, either with meaningful text, or an empty string for
                                decorative img elements must have an alt prop, either with meaningful text
                            </p>
                            <div className={cx('new-letter')}>Newsletter Sign up</div>
                            <div className={cx('form-email')}>
                                <input type="text" placeholder="Your Email Address" onChange={(e) => setemail(e.target.value)} />
                                <button type="button" onClick={() => CallAPI()}>SUBSCRIBE</button>
                            </div>
                        </div>
                    </div>
                    <hr className={cx('hr')} />
                    <div className={cx('end')}>
                        <div className={cx('end-left')}>
                            <BiCopyright />
                            <div>Copyright 2019 Luxuryvietravel</div>
                        </div>
                        <div>All Rights Reserved</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;
