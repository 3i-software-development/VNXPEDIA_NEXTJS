import classNames from 'classnames/bind';
import Image from 'next/image';
import style from './footer.module.scss';
import Logo from '../../public/logo-w-2.png';
import { GiPhone } from 'react-icons/gi';
import { MdEmail } from 'react-icons/md';
import { GrFacebookOption } from 'react-icons/gr';
import { TiSocialInstagram } from 'react-icons/ti';
import { BsTwitter } from 'react-icons/bs';
import { BiCopyright } from 'react-icons/bi';
import { TfiGoogle } from 'react-icons/tfi';
import Img1 from '../../public/1.webp';
import Img2 from '../../public/2.webp';
import Img3 from '../../public/3.webp';
import Img4 from '../../public/4.png';
import Img5 from '../../public/5.webp';
import Img6 from '../../public/6.webp';
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
                    {Listimg.map((d) => (
                        <Image src={d} className={cx('img')} alt="logo-prize-vnxpedia" />
                    ))}
                </div>
                <hr className={cx('hr')} />
                <div className={cx('main')}>
                    <div className={cx('main-top')}>
                        <div className={cx('main-left')}>
                            <div className={cx('infor')}>
                                {/* <img src={Logo} className={cx("logo-img")} alt="logo-VNXpedia" /> */}
                                <Image src={Logo} className={cx('logo-img')} alt="logo-VNXpedia" />
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
                                        <div className={cx('item-icon')}>
                                            <GrFacebookOption />
                                        </div>
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
                                    <Link href='/about-us#this' >Meat VNXpedia team</Link>

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
                            <div>Copyright 2019 VNXpedia</div>
                        </div>
                        <div>All Rights Reserved</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;
