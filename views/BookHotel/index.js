import style from '@/styles/Contact.module.scss';
import classNames from 'classnames/bind';
import { useForm } from "react-hook-form";

import axios from 'axios';
import { useEffect, useState } from 'react';

import ScrollToTop from '@/hook/scrollToTop';
import { toastSuccess } from '@/hook/toastr';
import national from '@/pages/api/national.json';
import $ from 'jquery';
import qs from 'qs';

const cx = classNames.bind(style);

function Hotelbook({ click, hotel }) {
    console.log(hotel);
    const [ipAddress, setIpAddress] = useState('');
    const [currentUser, setCurrentUser] = useState(null);
    const [Select, setselect] = useState();
    const [Typeroom, settyperoom] = useState();
    const [errsl, seterrsl] = useState(false);
    const [gender, setgender] = useState()

    const {
        watch,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const email = watch('Email');
    const email2 = watch('Email2');

    const validateEmailMatch = () => {
        return email === email2 || 'Email not match';
    };


    const handleEnquire = (data) => {
        callApi(data);
        callApiSendmail(data);


    };
    $.getJSON('https://jsonip.com/?callback=?').done(function (data) {
        var ip_address = window.JSON.parse(JSON.stringify(data, null, 2));
        ip_address = ip_address.ip;
        setIpAddress(ip_address);
    });


    useEffect(() => {
        let VNXuser = localStorage.getItem('VNXUser') ? JSON.parse(localStorage.getItem('VNXUser')) : null;
        if (VNXuser) {
            setCurrentUser(VNXuser);
        } else {
            setCurrentUser(null);
        }
    }, [])

    const callApi = async (data) => {
        console.log(data);
        const response = await axios({
            method: 'post',
            url: 'https://vnxpedia.3i.com.vn/TravelAPI/InsertBooking',
            data: qs.stringify({
                Ip: ipAddress,
                UserName: currentUser ? currentUser.UserName : null,
                TourName: hotel,
                Country: Select,
                Adult: data.PersonsAttendtion,
                FullName: data.FullName,
                Email: data.Email,
                Phone: data.Phone,
                Note: data.Note,
                CheckIn: data.CheckIn,
                Checkout: data.CheckOut,
                TypeRoom: Typeroom,
                Status: 'BOOKED',
                Type: 'HOTEL',
            }),
            headers: {
                'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
            },
        });

        if (response.status === 200) {
            toastSuccess(' Inquire complete!');
            click(false);
        } else alert('Invaild infor')

    };


    const callApiSendmail = async (data) => {
        const response = await axios({
            method: 'post',
            url: 'https://vnxpedia.3i.com.vn/TravelAPI/SendMailCustom',
            data: qs.stringify({
                header: `You inquired a hotel from Luxuryvietravel`,
                content: `Hotel: ${hotel}`,
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
            <div className={cx("book-crumb")}>Home | BOOK NOW
                <p onClick={() => click(false)}>Back</p></div>

            <form className={cx("book-content")} onSubmit={handleSubmit(handleEnquire)}>
                <div className={cx("content-header")}>
                    <p className={cx("service-name")}>
                        Service Name:&nbsp;
                        <span className={cx("service-name-content")}>
                            Amanoi Resort
                        </span>
                    </p>
                    <p className={cx("tour-country")}>
                        Country:&nbsp;
                        <span className={cx("tour-country-content")}>
                            VIET NAM
                        </span>
                    </p>
                </div>
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
                            {errsl && <span className={cx("error-message")}>Nationality cannot be empty !</span>}
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
                                {...register('Email2', {
                                    required: true,
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    },
                                    validate: validateEmailMatch,
                                })}
                            />
                            {errors.Email2 && errors.Email2.type === 'required' && (
                                <span className={cx("error-message")}>Email cannot be empty !</span>
                            )}
                            {errors.Email2 && errors.Email2.type === 'pattern' && (
                                <span className={cx("error-message")}>Invalid email</span>
                            )}
                            {errors.Email2 && errors.Email2.message === 'Email not match' && (
                                <span className={cx("error-message")}>Email not match</span>
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
                            Check In: <br />
                            <div className={cx("input-enquire")}>
                                <input
                                    type="date"
                                    name="date"
                                    className={cx("check-in")}
                                    {...register('CheckIn', { required: true })}
                                />
                                {errors.CheckIn && errors.CheckIn.type === 'required' && (
                                    <span className={cx("error-message")}>Check In cannot be empty !</span>
                                )}
                            </div>
                        </label>
                        <div className={cx('groupcheck')}>
                            <div>
                                <label className={cx("label-booking")}>
                                    Check out:   <br />
                                    <div className={cx("input-enquire")}>
                                        <input
                                            type="date"
                                            name="date"
                                            className={cx("check-out")}
                                            {...register('CheckOut', { required: true })}
                                        />
                                        {errors.CheckOut && errors.CheckOut.type === 'required' && (
                                            <span className={cx("error-message")}>CheckOut cannot be empty !</span>
                                        )}
                                    </div>
                                </label></div>
                            <div>
                                <label className={cx("label-booking")}>
                                    Persons Attendtion <br />
                                    <div>
                                        <input
                                            type="number"
                                            name="date"
                                            className={cx("persons-attendtion")}
                                            min="0"
                                            max="100"
                                            {...register('PersonsAttendtion', { required: true })}
                                        />
                                        {errors.PersonsAttendtion && errors.PersonsAttendtion.type === 'required' && (
                                            <span className={cx("error-message")}>PersonsAttendtion cannot be empty !</span>
                                        )}
                                    </div>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className={cx("item-form")}>
                        <label className={cx("label-booking")}>
                            Type of Room:
                        </label>
                        <div>
                            <select name='TypeRoom' className={cx("our-services")} onChange={(e) => settyperoom(e.target.value)}>
                                <option value="0" label="-- Select --" selected="selected">Select</option>
                                <option value="vip" label="Vip Room">Vip Room</option>
                                <option value="normal" label="Normal Room">Normal Room</option>
                            </select>
                            {errsl && <span className={cx("error-message")}>TypeRoom cannot be empty !</span>}

                        </div>
                    </div>
                    <div className={cx("item-form")}>
                        <label className={cx("label-booking")}>
                            We welcome your special requests here:
                        </label>
                        <div>
                            <textarea
                                placeholder="Message"
                                className={cx("book-note")}
                                {...register('Note', { required: true })}
                            ></textarea>
                            {errors.Note && errors.Note.type === 'required' && (
                                <span className={cx("error-message")}>Note cannot be empty !</span>
                            )}
                        </div>
                    </div>

                </div>
                <div className={cx("content-bot")}>
                    <button className={cx("btn-send")} onClick={() => { Select ? seterrsl(false) : seterrsl(true) }}>SUBMIT</button>
                </div>
            </form>
        </div>
    );
}

export default Hotelbook;