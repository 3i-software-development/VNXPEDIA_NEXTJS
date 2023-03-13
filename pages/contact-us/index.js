import React from 'react';
import BannerIMG from '@/views/BannerSlide/BannerIMG';
import Img11 from '@/public/images/Layer79.png';
import classNames from 'classnames/bind';
import style from '@/styles/Contact.module.scss';
import ScrollToTop from '@/hook/scrollToTop';
import { useForm } from "react-hook-form";
import { useState } from 'react';
import axios from 'axios';
import national from '@/pages/api/national.json';
import qs from 'qs';
import { toastSuccess } from '@/hook/toastr';
import Headpage from '@/components/Head/head';

const cx = classNames.bind(style);

const index = () => {

    const [select, setselect] = useState()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [Bookinfor, setBookinfor] = useState({
        UserName: null,
        FullName: "",
        Email: "",
        Phone: "",
        Note: "",
        national: "",

    });

    const handleEnquire = (data) => {
        callApiSendAdmin(data);

    }

    const callApi = async (data) => {
        const response = await axios({
            method: "post",
            url: "https://vnxpedia.3i.com.vn/TravelAPI/InsertBooking",
            data: qs.stringify({
                UserName: data.UserName,
                FullName: data.FullName,
                Email: data.Email,
                Phone: data.Phone,
                Note: data.Note,
            }),
            headers: {
                "content-type":
                    "application/x-www-form-urlencoded;charset=utf-8",
            },
        });

        if (response.status === 200) {
            toastSuccess(" Send request complete!");
            console.log(response);
            setTimeout(() => onClick(), 2000);
            console.log(response);
        } else alert("Invaild infor!");
    };
    const callApiSendAdmin = async (d) => {
        const response = await axios({
            method: "post",
            url: "https://vnxpedia.3i.com.vn/TravelAPI/SendMailFeedback",
            data: qs.stringify({
                header: `You have new a consultation request from ${d.FullName}`,
                content: `
                Full name : ${d.FullName},
                Email: ${d.Email},
                Phone number : ${d.Phone},
                Note: ${d.Note},
                `,
            }),
            headers: {
                "content-type":
                    "application/x-www-form-urlencoded;charset=utf-8",
            },
        });

    };

    return (
        <div className={cx('wrapper')}>
            <Headpage />
            <BannerIMG className={cx('bannerBody')} bg='bg' title={"Contact Us"} img={Img11} />

            <div className={cx("booking-infor")}>
                <ScrollToTop />
                <div className={cx("book-crumb")}>Home | CONTACT US
                    <p onClick={() => click(false)}>Back</p></div>

                <form className={cx("book-content")} onSubmit={handleSubmit(handleEnquire)}>

                    <hr className={cx("line")}></hr>
                    <div className={cx("content-mid")}>
                        <div className={cx("header-form")}>
                            <span className={cx("title-form")}>CONTACT US</span>
                            <p className={cx("intro-form")}>SEND US A MESSAGE</p>
                        </div>

                        <div className={cx("item-form")}>
                            <label className={cx("label-booking")}>
                                How should we call you? (*)
                            </label>
                            <div className={cx("cus-infor")}>
                                <div className={cx("input-enquire--name")}>
                                    <input
                                        type="text"
                                        placeholder="Enter Your Name"
                                        className={cx("cus-name")}
                                        {...register('FullName', { required: true })}
                                    />
                                    {errors.FullName && errors.FullName.type === 'required' && (
                                        <span className={cx("error-message")}>Your Name cannot be empty !</span>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className={cx("item-form")}>
                            <label className={cx("label-booking")}>
                                Your nationality:
                            </label>
                            <div>
                                <select name='national' className={cx("our-services")} onChange={(e) => setselect(e.target.value)}>
                                    <option value="0" label="-- Select --" selected="selected">Select a country ...</option>
                                    {(national).map((d, item) => (
                                        <option key={d.code} value={d.code}>{d.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className={cx("item-form")}>
                            <label className={cx("label-booking")}>
                                Email address (*):
                            </label>
                            <div className={cx("input-enquire")}>
                                <input
                                    type="text"
                                    placeholder="Enter Your Email"
                                    className={cx("cus-mail")}
                                    {...register('Email', {
                                        required: true,
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        },
                                    })}
                                />
                                {errors.Email && errors.Email.type === 'required' && (
                                    <span className={cx("error-message")}>Email cannot be empty !</span>
                                )}
                                {errors.Email && errors.Email.type === 'pattern' && (
                                    <span className={cx("error-message")}>Invalid email</span>
                                )}
                            </div>
                        </div>
                        <div className={cx("item-form")}>
                            <label className={cx("label-booking")}>
                                Confirm Email Contact (*):
                            </label>
                            <div className={cx("input-enquire")}>
                                <input
                                    type="text"
                                    placeholder="Confirm Email"
                                    className={cx("cus-mail")}
                                    {...register('Email', {
                                        required: true,
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        },
                                    })}
                                />
                                {errors.Email && errors.Email.type === 'required' && (
                                    <span className={cx("error-message")}>Email cannot be empty !</span>
                                )}
                                {errors.Email && errors.Email.type === 'pattern' && (
                                    <span className={cx("error-message")}>Invalid email</span>
                                )}
                            </div>
                        </div>
                        <div className={cx("item-form")}>
                            <label className={cx("label-booking")}>
                                Do you expect a phone call?
                            </label>
                            <div className={cx("input-enquire")}>
                                <input
                                    type="text"
                                    placeholder="Enter Your Phone"
                                    className={cx("cus-phone")}
                                    {...register('Phone', {
                                        required: true,
                                        minLength: 9,
                                        maxLength: 15,
                                        valueAsNumber: false,
                                    })}
                                />
                                {errors.Phone && errors.Phone.type === 'required' && (
                                    <span className={cx("error-message")}>Phone number cannot be empty !</span>
                                )}
                                {errors.Phone && errors.Phone.type === 'maxLength' && (
                                    <span className={cx("error-message")}>Invalid phone number</span>
                                )}
                                {errors.Phone && errors.Phone.type === 'minLength' && (
                                    <span className={cx("error-message")}>Invalid phone number</span>
                                )}
                            </div>
                        </div>
                        <div className={cx("item-form")}>
                            <label className={cx("label-booking")}>
                                We welcome your special requests here
                            </label>
                            <div>
                                <textarea
                                    placeholder="Message"
                                    className={cx("book-note")}
                                    onChange={(e) =>
                                        setBookinfor({
                                            ...Bookinfor,
                                            Note: e.target.value,
                                        })
                                    }
                                    {...register('Note')}
                                ></textarea>
                            </div>
                        </div>
                    </div>
                    <div className={cx("content-bot")}>
                        <button className={cx('btn-send')}>Send Message</button>
                    </div>
                </form>
            </div>

        </div>
    )
}

export default index