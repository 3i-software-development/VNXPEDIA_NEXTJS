import { toastError, toastSuccess } from "@/components/Toast";
import ScrollToTop from "@/hook/scrollToTop";
import { EditBooking } from "@/pages/api/CallAPI";
import national from '@/pages/api/national.json';
import style from '@/styles/informationBooking.module.scss';
import classNames from 'classnames/bind';
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AiFillCloseCircle } from 'react-icons/ai';

const cx = classNames.bind(style);

function EditBookDefault({ dataOld, toggle, reload, setreload }) {
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm();

    const [show, setShow] = useState(false);
    const [dataSelect, setDataSelect] = useState({ Hotel: '', Country: '', Note: '' });
    const CallEdit = async (data) => {
        const response = await EditBooking(data);
        if (response.status == 200) {
            toastSuccess('Edit Success!');
            toggle(false);
        }
        else {
            toastError('Error')
        }
    }
    const Submit = (data) => {
        CallEdit({
            Id: dataOld.Id,
            ...data,
            ...dataSelect
        });

        setreload(!reload);
    }

    return (
        <div className={cx("book-edit")}>
            <ScrollToTop />
            {!show && <form className={cx("book-content-edit")} setShow={setShow} onSubmit={handleSubmit(Submit)}>
                <AiFillCloseCircle className={cx('btn-close')} onClick={() => toggle(false)} />
                <div className={cx("content-header")}>
                    <p className={cx("tour-name")}>
                        Tour Name:&nbsp;
                        <span className={cx("tour-name-content")}>
                            {dataOld.TourName}
                        </span>
                    </p>
                    <p className={cx("tour-duration")}>
                        Tour duration:&nbsp;
                        <span className={cx("tour-duration-content")}>
                            {dataOld.Lenght} days
                        </span>
                    </p>
                    <p className={cx("tour-country")}>
                        Country:&nbsp;
                        <span className={cx("tour-country-content")}>
                            {dataOld.Country}
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
                                placeholder={dataOld.StartDate}
                                className={cx("book-date")}
                                {...register('StartDate')}
                            />
                        </div>
                    </div>
                    <div className={cx("item-form")}>
                        <label className={cx("label-booking")}>
                            How many people in your group?
                        </label>
                        <div className={cx("age-option")}>
                            <input
                                type="number"
                                placeholder={dataOld.Adult}
                                className={cx("book-age")}
                                min="0"
                                max="100"
                                {...register('Adult')}
                            />
                            <input
                                type="text"
                                placeholder={dataOld.Children}
                                className={cx("book-age")}
                                min="0"
                                {...register('Children')}
                            />
                            <input
                                type="text"
                                placeholder={dataOld.Children2}
                                className={cx("book-age")}
                                min="0"
                                {...register('Children1')}
                            />
                            <input
                                type="text"
                                placeholder={dataOld.Children1}
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
                            <select name='ourServices' className={cx("our-services")}
                                onChange={(e) => setDataSelect({ ...dataSelect, Hotel: e.target.value })}
                            >
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
                                    placeholder={dataOld.FullName}
                                    className={cx("cus-name")}
                                    {...register('FullName')}
                                />
                            </div>
                        </div>
                    </div>
                    <div className={cx("item-form")}>
                        <label className={cx("label-booking")}>
                            Your nationality:
                        </label>
                        <div>
                            <select name='national' className={cx("our-services")} onChange={(e) => setDataSelect({ ...dataSelect, Country: e.target.value })}>
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
                                placeholder={dataOld.Email}
                                className={cx("cus-mail")}
                                {...register('Email', {

                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    },
                                })}
                            />
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
                                placeholder={dataOld.Email}
                                className={cx("cus-mail")}
                                {...register('Email', {
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    },
                                })}
                            />
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
                                placeholder={dataOld.Phone}
                                className={cx("cus-phone")}
                                {...register('Phone', {

                                    minLength: 9,
                                    maxLength: 15,
                                    valueAsNumber: false,
                                })}
                            />
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
                                placeholder={dataOld.Note}
                                className={cx("book-note")}
                                onChange={(e) => setDataSelect({ ...dataSelect, Note: e.target.value })}
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
            </form>}
        </div>

    );
}

export default EditBookDefault;