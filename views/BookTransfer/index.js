import style from '@/styles/Contact.module.scss';
import classNames from 'classnames/bind';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { toastSuccess } from '@/hook/toastr';
import $ from 'jquery';
import qs from 'qs';
import national from '@/pages/api/national.json';
import { Sendmail } from '@/pages/api/CallAPI';
import ScrollToTop from '@/hook/scrollToTop';
import HandToast from '@/components/HandToast/HandToast';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { format, isAfter } from "date-fns";
import { useApppContext } from '@/pages/_app';

const cx = classNames.bind(style);
const ListType = [
    'BMW',
    'Rolls Royce',
    'Mercedes',
    'Limousine',
    'Vin bus'
]
const ListAirport = [
    'Noi Bai (Ha Noi)',
    'Tan Son Nhat (HCM city)',
    'Da Nang',
    'Nha Trang (Khanh Hoa)',
    'Phu Quoc (Kien Giang)',
    'Van Don (Quang Ninh)'
]


function Transferbook({ click, transfer, type }) {

    const schema = yup.object().shape({
        name: yup.string().required(),
        email: yup.string().email().required(),
        password: yup.string().min(6).required(),
        adult: yup.number().required(),
        children: yup.number().required(),
    });

    const {
        watch,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const isFutureDate = (selectedDate) => {
        const today = new Date();
        const date = new Date(selectedDate);

        return date.getTime() > today.getTime();
    };
    const noteValue = watch('Note');
    const [ipAddress, setIpAddress] = useState('');
    const [Country, setcountry] = useState();
    const [showToast, setshowToast] = useState(false);
    const CT = useApppContext();

    const handleEnquire = (data) => {
        callApi(data);
        // setshowToast(true);
        console.log('nottttttttttt', data);



    };
    // lay ip address
    $.getJSON('https://jsonip.com/?callback=?').done(function (data) {
        var ip_address = window.JSON.parse(JSON.stringify(data, null, 2));
        ip_address = ip_address.ip;
        setIpAddress(ip_address);
    });



    const callApi = async (data) => {
        const response = await axios({
            method: 'post',
            url: 'https://vnxpedia.3i.com.vn/TravelAPI/InsertBooking',
            data: qs.stringify({
                Ip: ipAddress,
                UserName: CT.currentUser ? CT.currentUser.UserName : null,
                TourName: data.typecar,
                Country: data.country,
                Adult: data.Adult,
                FullName: data.FullName,
                StartDate: data.StartDate,
                ArrivalTime: data.ArrivalTime,
                Flight: data.Flight,
                VIP: data.VIP,
                // DropOff: data.DropOff,
                PickUp: data.airport,
                Email: data.Email,
                Phone: data.Phone,
                Note: data.Note,
                UsFrom: data.fromus,
                Children: data.Children,
                Status: 'BOOKED',
                Type: 'AIRPORT',
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
            {showToast && <HandToast click={click} />}
            <ScrollToTop />
            <div className={cx("book-crumb")}>
                Home | <span onClick={() => click(false)}>LUXURY TRANSFER</span> | BOOK

            </div>

            <form className={cx("book-content")} onSubmit={handleSubmit(handleEnquire)}>

                <div className={cx("content-mid")}>
                    <div className={cx("header-form")}>
                        <span className={cx("title-form")}>{type} BOOKING </span>

                    </div>

                    <div className={cx("item-form")}>
                        <div className={cx("item-form-number")}>
                            <label className={cx("label-booking")}>
                                No of adult: <br />
                            </label>
                            <div className={cx("cus-infor")}>

                                <input
                                    type="text"
                                    name="adult"
                                    placeholder="Enter your number of adult"
                                    className={cx("cus-adult")}
                                    // ref={register}
                                    {...register('Adult', { required: true })}
                                /><br />
                                {errors.Adult && errors.Adult.type === 'required' && (
                                    <span className={cx("error-message")}>Adult Off cannot be empty !</span>
                                )}
                                {/* {errors.adult && <span className={cx("error-message")}>{errors.adult.message}</span>} */}

                            </div>

                        </div>

                        <div className={cx("item-form-number")}>
                            <label className={cx("label-booking")}>
                                No of children: <br />
                            </label>
                            <div className={cx("cus-infor")}>

                                <input
                                    type="text"
                                    name="children"
                                    placeholder="Enter your number of children"
                                    className={cx("cus-children")}
                                    // ref={register}
                                    {...register('Children', { required: true })}
                                /><br />
                                {errors.Children && errors.Children.type === 'required' && (
                                    <span className={cx("error-message")}>Children cannot be empty !</span>
                                )}
                                {/* {errors.children && <span className={cx("error-message")}>{errors.children.message}</span>} */}
                            </div>

                        </div>
                    </div>


                    <div className={cx("item-form")}>
                        <div className={cx("item-form-number")}>
                            <label className={cx("label-booking")}>
                                Date to VietNam: <br />
                            </label>
                            <div className={cx("cus-infor")}>
                                <div className={cx("input-enquire--name")}>
                                    <input
                                        type="date"

                                        placeholder="Enter your number of adult"
                                        className={cx("cus-adult")}
                                        {...register('StartDate', {
                                            required: true, validate: {
                                                futureDate: isFutureDate,
                                            }
                                        })}
                                    /><br />
                                    {errors.StartDate && errors.StartDate.type === 'required' && (
                                        <span className={cx("error-message")}>Date cannot be empty !</span>
                                    )}

                                    {errors.StartDate?.type === "futureDate" && (
                                        <span className={cx("error-message")}>Please select a future date</span>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className={cx("item-form-number")}>
                            <label className={cx("label-booking")}>
                                Arrival Time: <br />
                            </label>
                            <div className={cx("cus-infor")}>

                                <input
                                    type="time"
                                    placeholder="Enter your number of adult"
                                    className={cx("cus-adult")}
                                    {...register('ArrivalTime', { required: true })}
                                /><br />
                                {errors.ArrivalTime && errors.ArrivalTime.type === 'required' && (
                                    <span className={cx("error-message")}>ArrivalTime cannot be empty !</span>
                                )}

                            </div>
                        </div>

                        <div className={cx("item-form-number")}>
                            <label className={cx("label-booking")}>
                                Flight: <br />
                            </label>
                            <div className={cx("cus-infor")}>

                                <input
                                    type="text"
                                    placeholder="Flight code"
                                    className={cx("cus-children")}
                                    {...register('Flight', { required: true })}
                                /><br />
                                {errors.Flight && errors.Flight.type === 'required' && (
                                    <span className={cx("error-message")}>Flight cannot be empty !</span>
                                )}

                            </div>
                        </div>

                        <div className={cx("item-form-number")}>
                            <label className={cx("label-booking")}>
                                Entry: <br />
                            </label>
                            <div className={cx("cus-infor")}>

                                <select name='airport' className={cx("select-input")}
                                    {...register("airport", { required: true })}>
                                    <option value="">Select your airport</option>
                                    {ListAirport.map((d, i) => (

                                        <option key={i} value={d}>{d}</option>
                                    ))}
                                </select><br />
                                {/* {errors.Children && errors.Children.type === 'required' && (
                                    <span className={cx("error-message")}>Children cannot be empty !</span>
                                )} */}
                                {errors.airport && (
                                    <span className={cx("error-message")}>Please select your airport</span>
                                )}

                            </div>
                        </div>




                    </div>

                    <div className={cx("item-form")}>
                        <label className={cx("label-booking")}>
                            Sign up for VIP pick-up service :
                        </label>
                        <div className={cx("cus-infor")}>

                            <input
                                type="checkbox"
                                placeholder="Enter Your Name"
                                className={cx("check-input")}
                                {...register("VIP")}
                            />


                        </div>
                    </div>

                    <div className={cx("item-form")}>
                        <label className={cx("label-booking")}>
                            Pick-up vehicle type:
                        </label>
                        <div>
                            <select name='typecar' className={cx("our-services")} onChange={(e) => setcountry(e.target.value)}
                                {...register("typecar", { required: true })}
                            >
                                <option value="" selected="selected">Select a vehicle ...</option>
                                {ListType.map((d, i) => (
                                    <option key={i} value={d}>{d}</option>
                                ))}
                            </select>
                            {errors.typecar && (
                                <span className={cx("error-message")}>Please select your vehicle</span>
                            )}
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

                                {...register('Note')}
                            ></textarea>

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
                            <select name='country' className={cx("our-services")} onChange={(e) => setcountry(e.target.value)}
                                {...register("country", { required: true })}
                            >
                                <option value=''>--Select your national</option>
                                {(national).map((d, item) => (
                                    <option key={d.code} value={d.name}>{d.name}</option>
                                ))}
                            </select>
                            {errors.country && (
                                <span className={cx("error-message")}>Please select your country</span>
                            )}
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
                            Your phone number (*):
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
                            How did you hear about our services?
                        </label>
                        <div>
                            <select name='ourServices' className={cx("our-services")}  {...register("fromus", { required: true })}>
                                <option value="">-- Select --</option>
                                <option value="Your Friend">Recommended by friend or colleague</option>
                                <option value="Social Network">Social Network</option>
                                <option value="Blog">Blog or publication</option>
                            </select>
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

