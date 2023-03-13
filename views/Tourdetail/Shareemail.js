import style from '@/styles/informationBooking.module.scss';
import axios from 'axios';
import classNames from 'classnames/bind';
import { useState } from 'react';
import { useForm } from "react-hook-form";

import ScrollToTop from '@/hook/scrollToTop';
import { toastError, toastSuccess } from '@/hook/toastr';
import qs from 'qs';


const cx = classNames.bind(style);


function Shareemail({ onClick, datas, title, long, close }) {

    const [textArea, settexta] = useState();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const handleShare = (data) => {
        callApiSendmail(data);
    };


    const callApiSendmail = async (d) => {
        const response = await axios({
            method: 'post',
            url: 'https://vnxpedia.3i.com.vn/TravelAPI/SendMailCustom',
            data: qs.stringify({
                header: `${d.Email} want share his travel with you`,
                content: `
                          Note: ${textArea}
                        
                `,
                mail: d.Email2,
            }),
            headers: {
                'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
            },
        });
        if (response.data.Error === true) {
            toastError('Error!');
            console.log(response.data)
        } else {
            toastSuccess('Share Trip success.');
            localStorage.setItem('VNXUser', JSON.stringify(response.data));
        }
    };

    return (
        <div className={cx("booking-infor")}>
            <ScrollToTop />
            <p onClick={() => close(0)} className={cx("back")}>Back</p>
            <form className={cx("book-content")} onSubmit={handleSubmit(handleShare)}>
                <div className={cx("content-header")}>
                    <p className={cx("tour-name")}>
                        SHARE WITH YOUR FRIEND
                    </p>
                </div>
                <hr className={cx("line")}></hr>
                <div className={cx("content-mid")}>
                    <div className={cx("item-form")}>
                        <label className={cx("label-booking")}>
                            Your email (*):
                        </label>
                        <div className={cx("input-enquire")}>
                            <input
                                type="text"
                                placeholder="Your email"
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
                            Your friend's email (*):
                        </label>
                        <div className={cx("input-enquire")}>
                            <input
                                type="text"
                                placeholder="Your Friend's Email "
                                className={cx("cus-mail")}
                                {...register('Email2', {
                                    required: true,
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    },
                                })}
                            />
                            {errors.Email2 && errors.Email2.type === 'required' && (
                                <span className={cx("error-message")}>Email cannot be empty !</span>
                            )}
                            {errors.Email2 && errors.Email2.type === 'pattern' && (
                                <span className={cx("error-message")}>Invalid email</span>
                            )}
                        </div>
                    </div>
                    <div className={cx("item-form")}>
                        <label className={cx("label-booking")}>
                            More information about this tour (*):
                        </label>
                        <div>
                            <textarea
                                placeholder="More information about this tour"
                                className={cx("book-note")}
                                onChange={(e) =>
                                    settexta(
                                        e.target.value,
                                    )
                                }
                            ></textarea>
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

export default Shareemail;