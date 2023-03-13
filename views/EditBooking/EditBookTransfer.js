import { toastError, toastSuccess } from "@/components/Toast";
import ScrollToTop from "@/hook/scrollToTop";
import { EditBooking } from "@/pages/api/CallAPI";
import national from '@/pages/api/national.json';
import style from '@/styles/Contact.module.scss';
import classNames from 'classnames/bind';
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AiFillCloseCircle } from 'react-icons/ai';

const cx = classNames.bind(style);

function EditBookTransfer({ dataOld, toggle, reload, setreload }) {

    const {
        watch,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    //Call API edit booking Transfer
    const [show, setShow] = useState(false);
    const [dataSelect, setDataSelect] = useState({ Country: '', Babycarseat: '', Note: '' });

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
        })
        setreload(!reload);
    }

    return (
        <div className={cx("book-edit")}>
            <ScrollToTop />
            <form className={cx("book-content-edit")} onSubmit={handleSubmit(Submit)}>
                <AiFillCloseCircle className={cx('btn-close')} onClick={() => toggle(false)} />
                <div className={cx("content-header")}>
                    <p className={cx("service-name")}>
                        Type of car:&nbsp;
                        <span className={cx("service-name-content")}>
                            {dataOld.TourName}
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
                            <select name='Country' className={cx("our-services")} onChange={(e) => setDataSelect({ ...dataSelect, Country: e.target.value })}>
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
                            Time:
                        </label>
                        <div className={cx("input-enquire")}>
                            <input
                                type="date"
                                name="date"
                                className={cx("cus-time")}
                                placeholder={dataOld.StartDate}
                                {...register('StartDate')}
                            />
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
                                    placeholder={dataOld.PickUp}
                                    className={cx("cus-name")}
                                    {...register('PickUp',)}
                                />
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
                                    placeholder={dataOld.DropOff}
                                    className={cx("cus-name")}
                                    {...register('DropOff')}
                                />
                            </div>
                        </div>
                    </div>
                    <div className={cx("item-form")}>
                        <label className={cx("label-booking")}>
                            Baby car seat:
                        </label>
                        <div>
                            <select name='Babycartseat' className={cx("our-services")}
                                onChange={(e) => setDataSelect({ ...dataSelect, Babycarseat: e.target.value })}>
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
                                        placeholder={dataOld.Adult}
                                        className={cx("cus-adult")}
                                        {...register('Adult')}
                                    /><br />
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
                                            placeholder={dataOld.Children}
                                            className={cx("cus-children")}
                                            {...register('children')}
                                        /><br />
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
                                placeholder={dataOld.Note}
                                className={cx("book-note")}
                                onChange={(e => setDataSelect({ ...dataSelect, Note: e.target.value }))}></textarea>


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

export default EditBookTransfer;