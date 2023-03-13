import style from '@/styles/Contact.module.scss';
import classNames from 'classnames/bind';
import { useForm } from "react-hook-form";
import axios from 'axios';
import { useEffect, useState } from 'react';
import { toastSuccess } from '@/hook/toastr';
import $ from 'jquery';
import qs from 'qs';
import national from '@/pages/api/national.json';
import { Sendmail } from '@/pages/api/CallAPI';
import ScrollToTop from '@/hook/scrollToTop';

const cx = classNames.bind(style);

function Transferbook({ click, transfer }) {

    const {
        watch,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const [ipAddress, setIpAddress] = useState('');
    const [currentUser, setCurrentUser] = useState(null);
    const [Country, setcountry] = useState();
    const [Baby, setBaby] = useState()
    const [errsl, seterrsl] = useState(false);
    const email = watch('Email');
    const email2 = watch('Email2');
    const selectedValue = watch('Babycartseat');

    const validateEmailMatch = () => {
        return email === email2 || 'Email not match';
    };

    const handleEnquire = (data) => {
        callApi(data);



    };
    // lay ip address
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
        const response = await axios({
            method: 'post',
            url: 'https://vnxpedia.3i.com.vn/TravelAPI/InsertBooking',
            data: qs.stringify({
                Ip: ipAddress,
                UserName: currentUser ? currentUser.UserName : null,
                TourName: transfer,
                Country: Country,
                Adult: data.Adult,
                FullName: data.FullName,
                StartDate: data.Time,
                DropOff: data.DropOff,
                PickUp: data.PickUp,
                Email: data.Email,
                Phone: data.Phone,
                Note: data.Note,
                Babycarseat: Baby,
                Children: data.Children,
                Status: 'BOOKED',
                type: 'TRANSFER',
            }),
            headers: {
                'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
            },
        });


        if (response.status === 200) {
            toastSuccess(' Inquire complete!');
            callApiSendmail(data);
            click(false);
        } else alert('Invaild infor')

    };


    const callApiSendmail = async (data) => {
        const response = await Sendmail(transfer, data.email)

    };


    return (
        <div className={cx("booking-infor")}>
            <ScrollToTop />
            <div className={cx("book-crumb")}>Home | BOOK NOW
                <p onClick={() => click(false)}>Back</p></div>

            <form className={cx("book-content")} onSubmit={handleSubmit(handleEnquire)}>
                <div className={cx("content-header")}>
                    <p className={cx("service-name")}>
                        Type of car:&nbsp;
                        <span className={cx("service-name-content")}>
                            Mercedes BENS AMS COUPE
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
                            <select name='Country' className={cx("our-services")} onChange={(e) => setcountry(e.target.value)}>
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
                            Time:
                        </label>
                        <div className={cx("input-enquire")}>
                            <input
                                type="date"
                                name="date"
                                className={cx("cus-time")}
                                {...register('Time', { required: true })}
                            />
                            {errors.Time && errors.Time.type === 'required' && (
                                <span className={cx("error-message")}>Time cannot be empty !</span>
                            )}
                        </div>

                    </div>
                    <div className={cx("item-form")}>
                        <label className={cx("label-booking")}>
                            Pick up:
                        </label>
                        <div className={cx("cus-infor")}>
                            <div className={cx("input-enquire--name")}>
                                <input
                                    type="text"
                                    placeholder="Enter your address to pick up"
                                    className={cx("cus-name")}
                                    {...register('PickUp', { required: true })}
                                />
                                {errors.PickUp && errors.PickUp.type === 'required' && (
                                    <span className={cx("error-message")}>PickUp cannot be empty !</span>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className={cx("item-form")}>
                        <label className={cx("label-booking")}>
                            Drop off:
                        </label>
                        <div className={cx("cus-infor")}>
                            <div className={cx("input-enquire--name")}>
                                <input
                                    type="text"
                                    placeholder="Enter your destination"
                                    className={cx("cus-name")}
                                    {...register('DropOff', { required: true })}
                                />
                                {errors.DropOff && errors.DropOff.type === 'required' && (
                                    <span className={cx("error-message")}>Drop Off cannot be empty !</span>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className={cx("item-form")}>
                        <label className={cx("label-booking")}>
                            Baby car seat:
                        </label>
                        <div>
                            <select name='Babycartseat' className={cx("our-services")}
                                onChange={(e) => setBaby(e.target.value)}>
                                <option value="0" label="-- Select --" selected="selected">Select</option>
                                <option value="Yes" label="Yes">Yes</option>
                                <option value="No" label="No">No</option>
                            </select>
                        </div>
                    </div>
                    <div className={cx("item-form")}>
                        <label className={cx("label-booking")}>
                            No of adult: <br />
                            <div className={cx("cus-infor")}>
                                <div className={cx("input-enquire--name")}>
                                    <input
                                        type="text"
                                        placeholder="Enter your number of adult"
                                        className={cx("cus-adult")}
                                        {...register('Adult', { required: true })}
                                    /><br />
                                    {errors.Adult && errors.Adult.type === 'required' && (
                                        <span className={cx("error-message")}>Adult Off cannot be empty !</span>
                                    )}
                                </div>
                            </div>
                        </label>
                        <div>
                            <label className={cx("label-booking")}>
                                No of children: <br />
                                <div className={cx("cus-infor")}>
                                    <div className={cx("input-enquire--name")}>
                                        <input
                                            type="text"
                                            placeholder="Enter your number of children"
                                            className={cx("cus-children")}
                                            {...register('Children', { required: true })}
                                        /><br />
                                        {errors.Children && errors.Children.type === 'required' && (
                                            <span className={cx("error-message")}>Children cannot be empty !</span>
                                        )}
                                    </div>
                                </div>
                            </label>
                        </div>
                    </div>
                    <div className={cx("item-form")}>
                        <label className={cx("label-booking")}>
                            Special request:
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
                    <button className={cx("btn-send")} >SUBMIT</button>
                </div>
            </form>
        </div>


    );
}

export default Transferbook;