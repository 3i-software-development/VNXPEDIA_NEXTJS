import style from '@/styles/informationBooking.module.scss';
import axios from 'axios';
import classNames from 'classnames/bind';
import { useState } from 'react';
import { useForm } from "react-hook-form";

import ScrollToTop from '@/hook/scrollToTop';
import { toastSuccess } from '@/hook/toastr';
import national from '@/pages/api/national.json';
import { useApppContext } from '@/pages/_app';
import { isPast } from 'date-fns';
import $ from 'jquery';
import Link from 'next/link';
import qs from 'qs';

const cx = classNames.bind(style);

function Booking({ onClick, datas, title, long }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [ipAddress, setIpAddress] = useState('');
    const [country, setcountry] = useState();
    const [hotel, sethotel] = useState();
    const [texta, settexta] = useState();
    const [submitting, setSubmitting] = useState(false);
    const CT = useApppContext()
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();
    function validateDate(value) {
        if (isPast(new Date(value))) {
            return "Please pick a day in tomorrow";
        }
        return true;
    }
    const handleEnquire = (data) => {
        setSubmitting(true);
        callApi(data);
        callApiSendmail(data);
        setTimeout(() => {
            reset();
            setSubmitting(false);
        }, 2000);
    };

    // lay ip address
    $.getJSON('https://jsonip.com/?callback=?').done(function (data) {
        var ip_address = window.JSON.parse(JSON.stringify(data, null, 2));
        ip_address = ip_address.ip;
        setIpAddress(ip_address);
    });
    // useEffect(() => {
    //     setBookinfor({ ...Bookinfor });
    // }, [Bookinfor.Adult, Bookinfor.Children, Bookinfor.Children1, Bookinfor.Children2, Bookinfor.Hotel, Bookinfor.UsFrom]);

    const callApi = async (data) => {
        const response = await axios({
            method: 'post',
            url: 'https://vnxpedia.3i.com.vn/TravelAPI/InsertBooking',
            data: qs.stringify({
                Ip: ipAddress,
                Type: 'TOUR',
                TourCode: datas.TourCode,
                UserName: CT.currentUser ? CT.currentUser.UserName : null,
                TourName: datas.TourName,
                Country: country,
                StartDate: data.StartDate,
                Adult: data.Adult,
                Children: data.Children,
                Children1: data.Children1,
                Children2: data.Children2,
                Hotel: hotel,
                FullName: data.FullName,
                Email: data.Email,
                Phone: data.Phone,
                Note: texta,
                Status: 'BOOKED'

            }),
            headers: {
                'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
            },
        });
        console.log(response)

        if (response.status === 200) {

            toastSuccess(' Inquire complete!');
            onClick(false);

        } else alert('Invaild infor')

    };

    const callApiSendmail = async (data) => {
        const response = await axios({
            method: 'post',
            url: 'https://vnxpedia.3i.com.vn/TravelAPI/SendMailCustom',
            data: qs.stringify({
                header: `You have new travel from Luxuryvietravel`,
                content: `Tour name: ${datas.TourName}`,
                mail: data.Email,
            }),
            headers: {
                'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
            },
        });
    };
    return (
        <div className={cx("booking-infor")}>
            <ScrollToTop />
            <div className={cx("book-crumb")}><Link href='/'>Home</Link> | <span onClick={() => onClick(0)}>{datas.TourName}</span> | BOOK TOUR</div>

            <form className={cx("book-content")} onSubmit={handleSubmit(handleEnquire)}>
                <div className={cx("content-header")}>
                    <p className={cx("tour-name")}>
                        Tour Name:&nbsp;
                        <span className={cx("tour-name-content")}>
                            {datas.TourName}
                        </span>
                    </p>
                    <p className={cx("tour-duration")}>
                        Tour duration:&nbsp;
                        <span className={cx("tour-duration-content")}>
                            {datas.DETAIL.length} days
                        </span>
                    </p>
                    <p className={cx("tour-country")}>
                        Country:&nbsp;
                        <span className={cx("tour-country-content")}>
                            {datas.Country}
                        </span>
                    </p>
                </div>
                <hr className={cx("line")}></hr>
                <div className={cx("content-mid")}>
                    <div className={cx("item-form")}>
                        <label className={cx("label-booking")}>
                            Your proposed arrival date:
                        </label>
                        <div className={cx("input-enquire")}>
                            <input
                                type="date"
                                name="date"
                                className={cx("book-date")}
                                {...register('StartDate', { required: true },
                                    { validate: validateDate }
                                )}
                            />
                            {errors.StartDate && <span className={cx("error-message")}>{errors.StartDate.message}</span>}
                            {errors.StartDate && errors.StartDate.type === 'required' && (
                                <span className={cx("error-message")}>Date cannot be empty !</span>
                            )}
                        </div>
                    </div>
                    <div className={cx("item-form")}>
                        <label className={cx("label-booking")}>
                            How many people in your group?
                        </label>
                        <div className={cx("age-option")}>
                            <input
                                type="number"
                                placeholder="Adult(s) (>=12 years old)"
                                className={cx("book-age")}
                                min="0"
                                max="100"
                                {...register('Adult', { required: true })}
                            />
                            {errors.Adult && errors.Adult.type === 'required' && (
                                <span className={cx("error-message")}>Adult cannot be empty !</span>
                            )}
                            <input
                                type="text"
                                placeholder="Child(ren) (7-11 years old)"
                                className={cx("book-age")}
                                min="0"

                                {...register('Children')}
                            />
                            <input
                                type="text"
                                placeholder="Infant(s) (2-6 years old)"
                                className={cx("book-age")}
                                min="0"

                                {...register('Children1')}
                            />
                            <input
                                type="text"
                                placeholder="Child(ren) (0-2 years old)"
                                className={cx("book-age")}
                                min="0"

                                {...register('Children2')}
                            />
                        </div>
                    </div>
                    <div className={cx("item-form")}>
                        <label className={cx("label-booking")}>
                            Hotel categories you desire to stay?
                        </label>
                        <div>
                            <select name='ourServices' className={cx("our-services")} onChange={(e) => sethotel(e.target.value)}>
                                <option value="">-- Select --</option>
                                <option value="Hotel 3 *">Hotel 3 *</option>
                                <option value="Hotel 4 *">Hotel 4 *</option>
                                <option value="Hotel 5 *">Hotel 5 *</option>
                            </select>
                        </div>
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
                            <select name='national' className={cx("our-services")} onChange={(e) => setcountry(e.target.value)}>
                                <option value="0" label="-- Select --" selected="selected">Select a country ...</option>
                                {(national).map((d, item) => (
                                    <option key={d.code} value={d.name}>{d.name}</option>
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
                                placeholder="Type here for special activities, alergy, wheel chair, vegetari"
                                className={cx("book-note")}
                                onChange={(e) =>
                                    settexta(
                                        e.target.value,
                                    )
                                }
                            ></textarea>
                        </div>
                    </div>
                    <div className={cx("item-form")}>
                        <label className={cx("label-booking")}>
                            How did you hear about our services?
                        </label>
                        <div>
                            <select name='ourServices' className={cx("our-services")}>
                                <option value="">-- Select --</option>
                                <option value="Your Friend">Recommended by friend or colleague</option>
                                <option value="Social Network">Social Network</option>
                                <option value="Blog">Blog or publication</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className={cx("content-bot")}>
                    <button className={cx("btn-submit")} >SUBMIT</button>
                </div>
            </form>
        </div>
    );
}

export default Booking;