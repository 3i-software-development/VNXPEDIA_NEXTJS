import classNames from 'classnames/bind';

import axios from 'axios';
import qs from 'qs';
import { useForm } from 'react-hook-form';
import { IoMdArrowRoundBack } from 'react-icons/io';
import 'react-toastify/dist/ReactToastify.css';
import { toastError, toastSuccess } from '../Toast';
import style from './signup.module.scss';

const cx = classNames.bind(style);

const Signup = ({ Click, openlogin }) => {
    const callApi = async (data) => {
        const response = await axios({
            method: 'post',
            url: 'https://vnxpedia.3i.com.vn/TravelAPI/InsertAccount',
            data: qs.stringify({
                UserName: data.UserName,
                Password: data.Password,
                GivenName: data.GivenName,
                Email: data.Email,
                PhoneNumber: data.PhoneNumber,
                Gender: data.Gender,
            }),
            headers: {
                'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
            },

        });
        console.log(response);
        return response;


    };
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();
    const onSubmit = async (data) => {
        try {
            const datas = await callApi(data);

            if (datas.data.Error === true) {
                toastError(`${datas.data.Title}`);
            }
            if (datas?.data?.Error === false) {
                toastSuccess(`${datas.data?.Title}`);
                Click(false);
                openlogin(true);
            }
        } catch (error) {
            toastError(`${error.message}`);
        }
    };

    return (
        <div className={cx('wrapper')}>

            <div className={cx('sign-up')}>
                <div className={cx('icon')} onClick={() => Click(false)}>
                    <IoMdArrowRoundBack />
                </div>
                <form className={cx('form-signup')} onSubmit={handleSubmit(onSubmit)} id="form-1">

                    <h3 className={cx('heading')}>Create New Account</h3>
                    <p className={cx('desc')}>Hi My Friends</p>
                    <div className={cx('form-group')}>
                        <label className={cx('label-form')}>User Name</label>

                        <input id="username"
                            name="username"
                            type="text"
                            placeholder="example: Nguyen A"
                            {...register('UserName', { required: true })} />
                        {errors.UserName && errors.UserName.type === 'required' && (
                            <span className={cx('error-message')}>Username cannot be empty !</span>
                        )}
                        <span className="form-message"></span>
                    </div>
                    <div className={cx('form-group')}>
                        <label className={cx('label-form')}>Full Name</label>

                        <input type="text" id="fullname"
                            name="fullname"
                            placeholder="example: Nguyen A"
                            {...register('GivenName', { required: true })} />
                        {errors.GivenName && errors.GivenName.type === 'required' && (
                            <span className={cx('error-message')}>FullName cannot be empty !</span>
                        )}
                    </div>

                    <div className={cx('form-group')}>
                        <label className={cx('label-form')}>Email</label>

                        <input id="mail"
                            name="mail"
                            type="text"
                            placeholder="example: NguyenA@gmail.com"
                            {...register('Email', {
                                required: true,
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                },
                            })} />
                        {errors.Email && errors.Email.type === 'required' && (
                            <span className={cx('error-message')}>Email cannot be empty !</span>
                        )}
                        {errors.Email && errors.Email.type === 'pattern' && (
                            <span className={cx('error-message')}>Invalid email</span>
                        )}
                    </div>
                    <div className={cx('form-group')}>
                        <label className={cx('label-form')}>Phone</label>

                        <input id="phone"
                            name="phone"
                            type="phone"
                            placeholder="example: 0123456789"
                            {...register('PhoneNumber', {
                                required: true,
                                maxLength: 15,
                                minLength: 9,
                                valueAsNumber: false,
                            })} />
                        {errors.PhoneNumber && errors.PhoneNumber.type === 'required' && (
                            <span className={cx('error-message')}>Phone number cannot be empty !</span>
                        )}
                        {errors.PhoneNumber && errors.PhoneNumber.type === 'maxLength' && (
                            <span className={cx('error-message')}>Invalid phone number</span>
                        )}
                        {errors.PhoneNumber && errors.PhoneNumber.type === 'minLength' && (
                            <span className={cx('error-message')}>Invalid phone number</span>
                        )}
                    </div>
                    <div className={cx('form-group')}>
                        <label className={cx('label-form')}>Password</label>

                        <input id="password"
                            name="password"
                            type="password"
                            placeholder="Password"
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
                        <label className={cx('label-form')}>Password Again</label>

                        <input id="password_confirmation"
                            name="password_confirmation"
                            type="password"
                            placeholder="Re-entered password"
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


                    <div className={cx('form-group')}>
                        < label for="gender" className={cx('label-form')}>
                            Sex
                        </label >
                        <div className={cx('form-sex')}>
                            < div className={
                                cx('sex')}>
                                <label className={
                                    cx('sex-type')} for="">
                                    Male
                                </label>
                                <input
                                    name="gender"
                                    type="radio"
                                    value="Male"
                                    className={cx('form-control')}
                                    {...register('Gender', { required: true })}
                                />
                            </div >
                            <div className={cx('sex')}>
                                < label className={
                                    cx('sex-type')} for=''>
                                    Female
                                </label >
                                <input
                                    name="gender"
                                    type="radio"
                                    value="Female"
                                    className={cx('form-control')}
                                    {...register('Gender', { required: true })}
                                />
                            </div >
                        </div >
                        {errors.Gender && errors.Gender.type === 'required' && (
                            <span className={cx('error-message')}>Gender cannot be empty !</span>
                        )}
                    </div >
                    < button className={
                        cx('form-submit')} type="submit">
                        Sign Up
                    </button>
                    <div className={cx('link-nav')}>
                        <p className={
                            cx('go-home')} onClick={() => {
                                Click(false);
                                openlogin(true);
                            }}>
                            Had a Account? Login now
                        </p >
                    </div >
                </form >
            </div >

        </div >
    )
}

export default Signup