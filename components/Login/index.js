import { useApppContext } from '@/pages/_app';
import axios from 'axios';
import classNames from 'classnames/bind';
import qs from "qs";
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaFacebook } from 'react-icons/fa';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toastError, toastSuccess } from '../Toast';
import style from './login.module.scss';

const cx = classNames.bind(style);

const LogIn = ({ Click, setuser, close }) => {
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm();
    const CT = useApppContext();

    const [showFPass, setShowFPass] = useState("hidden");

    const handleShowFP = () => {
        showFPass === "show" ? setShowFPass("hidden") : setShowFPass("show");
    };
    const [emailforgot, setemailforgot] = useState("");
    const callApiForgotPass = async () => {
        const response = await axios({
            method: "post",
            url: "https://vnxpedia.3i.com.vn/TravelAPI/ForgotPassword",
            data: qs.stringify({
                Email: emailforgot,
            }),
            headers: {
                "content-type":
                    "application/x-www-form-urlencoded;charset=utf-8",
            },
        });
        if (response.data.Error) {
            toast.error("Error!");
        } else toast.success("Please check your mail!");
    };
    const handleSubmitFP = () => {
        callApiForgotPass();
    };
    const callApi = async (data) => {
        const response = await axios({
            method: "post",
            url: "https://vnxpedia.3i.com.vn/TravelAPI/LoginXpedia",
            data: qs.stringify({
                UserName: data.Username,
                Password: data.Pass,
            }),
            headers: {
                "content-type":
                    "application/x-www-form-urlencoded;charset=utf-8",
            },
        });
        return response;
    };

    const handleLogin = async (data) => {
        try {
            const datas = await callApi(data);

            if (datas.data.Error === true) {
                toastError(`${datas.data.Title}`);
            }
            if (datas?.data?.Error === false) {
                toastSuccess('Login success!');
                localStorage.setItem("VNXUser", JSON.stringify(datas.data));
                CT.setCurrentUser(datas.data);
                setTimeout(() => {
                    setuser(`${datas.data?.Title}`)
                    close(false);
                }, 2000)
            }
        } catch (error) {
            toastError(`${error.message}`);
        }


    };


    return (
        <div className={cx('container')}>
            <form action="" onSubmit={handleSubmit(handleLogin)} >
                <label>USER NAME</label>
                <br />
                <input type="text" id='username'  {...register("Username", { required: true })} />
                {errors.Username &&
                    errors.Username.type === "required" && (
                        <span className={cx('error-message')}>
                            Username cannot be empty !
                            <br />
                        </span>

                    )}
                <br />
                <label>PASSWORD</label>
                <br />
                <input type="password" className={cx('input')} id='password'  {...register("Pass", { required: true })} />
                {errors.Pass && errors.Pass.type === "required" && (
                    <span className={cx('error-message')}>
                        Password cannot be empty !
                    </span>
                )}
                <br />
                <div className={cx('btn')}>
                    <button type="submit">LOGIN</button>
                    <div className={cx('form-report')}>
                        <a
                            href="#!"
                            className={cx('forget-pass')}
                            onClick={() => handleShowFP()}
                        >
                            Forget password?
                        </a>
                    </div>

                </div>
                {showFPass == 'show' &&
                    <div className={cx('form-change')}>
                        <input
                            type="mail"
                            placeholder="email"
                            className={cx('form-control')}
                            onChange={(e) => setemailforgot(e.target.value)}
                        ></input>
                        <p
                            className={cx('btn-active')}
                            onClick={() => handleSubmitFP()}
                        >
                            Send mail
                        </p>
                    </div>
                }
                <hr />
                <br />
                <span>Don&rsquo;t have account yet?</span>
                <br />
                <div className={cx('group')}>
                    <p onClick={() => Click(true)}>SIGN UP</p>
                    <p className={cx('icon-fb')}><FaFacebook />LOGIN</p>
                </div>
            </form>
        </div >


    )
}

export default LogIn