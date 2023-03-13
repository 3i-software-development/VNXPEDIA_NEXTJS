import { toastError, toastSuccess } from "@/components/Toast";
import style from '@/styles/forgetpass.module.scss';
import axios from "axios";
import classNames from 'classnames/bind';
import Link from "next/link";
import qs from "qs";
import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import Image from "next/image";
import logo from '@/public/images/logos/logo-b-1.png';
import Headpage from '@/components/Head/head';


const cx = classNames.bind(style);

function ForgetPass() {

    const [email, setEmail] = useState();
    const [pass, setPass] = useState();
    const Location = useRouter();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();
    const callApi = async () => {
        const response = await axios({
            method: "post",
            url: "https://vnxpedia.3i.com.vn/TravelAPI/GetNewPassword",
            data: qs.stringify({
                Email: email,
                Password: pass,
                Confirmpassword: pass,
                Code: Location.search.replace("?code=", ""),
            }),
            headers: {
                "content-type":
                    "application/x-www-form-urlencoded;charset=utf-8",
            },
        });

        if (response.data.Error === true) {
            toastError("Có lỗi xảy ra!");
        } else {
            toastSuccess("Change password success");
        }
    };

    const handleChangepass = (e) => {
        e.preventDefault();
        callApi();
    };

    return (<>
        <Headpage />

        <div className={cx('wrapper')}>

            <div className={cx('sign-up')}>
                <form className={cx('form-signup')} id="form-1">
                    <Image src={logo} alt='logo' />
                    <h3 className={cx('heading')}>Reset Password</h3>
                    <div className={cx('form-group')}>
                        <label className={cx('label-form')}>Email</label>

                        <input id="mail"
                            name="mail"
                            type="text"
                            placeholder="Enter your email"
                        />
                    </div>
                    <div className={cx('form-group')}>
                        <label className={cx('label-form')}>New Password</label>

                        <input id="password"
                            name="password"
                            type="password"
                            placeholder="New Password"
                            autoComplete="on"
                            {...register('Password', {
                                required: true,
                                minLength: 6,
                                maxLength: 30,
                            })} />
                        {errors.Password && errors.Password.type === 'required' && (
                            <span className={cx('error-message')}>Password cannot be empty !</span>
                        )}
                        {errors.Password && errors.Password.type === 'minLength' && (
                            <span className={cx('error-message')}>Weak password</span>
                        )}
                        {errors.Password && errors.Password.type === 'maxLength' && (
                            <span className={cx('error-message')}>Password up to 30 characters</span>
                        )}
                    </div>

                    <div className={cx('form-group')}>
                        <label className={cx('label-form')}>Confirm Password</label>

                        <input id="password_confirmation"
                            name="password_confirmation"
                            type="password"
                            placeholder="Retype password"
                            autoComplete="on"
                            {...register('Passwordagain', {
                                required: true,
                                validate: (val) => {
                                    if (watch('Password') != val) {
                                        return 'Your passwords do no match';
                                    }
                                },
                            })} />
                        {errors.Passwordagain && errors.Passwordagain.type === 'required' && (
                            <span className={cx('error-message')}>Password again is required</span>
                        )}
                        {errors.Passwordagain && errors.Passwordagain.type === 'validate' && (
                            <span className={cx('error-message')}>re-entered password does not match</span>
                        )}
                    </div>
                    {/* <SignUpGG /> */}
                    < button className={
                        cx('form-submit')} type="submit">
                        Confirm
                    </button>
                    <div className={cx('link-nav')}>
                        <Link href="/" className={cx('go-home')} onClick={() => Click(false)}>
                            Go to home page
                        </Link >
                    </div >
                </form >
            </div >

        </div >
    </>
    );
}

export default ForgetPass;