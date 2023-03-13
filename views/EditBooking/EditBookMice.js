import national from '@/pages/api/national.json';
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { toastError, toastSuccess } from "@/components/Toast";
import ScrollToTop from "@/hook/scrollToTop";
import { EditBooking } from "@/pages/api/CallAPI";
import style from '@/styles/informationBooking.module.scss';
import classNames from 'classnames/bind';
import { AiFillCloseCircle } from 'react-icons/ai';

const cx = classNames.bind(style);
const ListLocation =
    ['Hanoi', 'HoChiMinh City', 'Myanmar', 'Laos', 'Nha Trang', 'Phu Quoc', 'Thailand', 'Multi-Country', 'Danang', 'Multi Province', 'Cambodia', 'Other']

function EditBookMice({ dataOld, toggle, reload, setreload }) {

    const {
        watch,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();


    //Call API edit booking Mice

    const [show, setShow] = useState(false);
    const [dataSelect, setDataSelect] = useState({ Country: '', Lenght: '', Perpose: '', Require: '', Note: '', Subcrible: '' });

    const CallEdit = async (data) => {
        const response = await EditBooking(data);
        if (response.status == 200) {
            toastSuccess('Edit success!');
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
                <div className={cx("content-mid")}>
                    <h6 className={cx("h6-header")}>PERSONAL DETAILS<span>*Mandatory Field</span></h6>
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
                            Your Company (*):
                        </label>
                        <div className={cx("input-enquire-company")}>
                            <input
                                type="text"
                                placeholder={dataOld.Company}
                                className={cx("cus-name")}
                                {...register('Company')}
                            />
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
                                name='Email'
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
                    <hr className={cx("line")}></hr>
                    <h6 className={cx("h6-header")}>EVENT DETAILS</h6>

                    <div className={cx("item-form")}>
                        <label className={cx("label-booking")}>
                            Event Name:

                        </label>
                        <div className={cx("input-enquire")}>
                            <input
                                type="text"
                                placeholder={dataOld.EventName}
                                className={cx("cus-name")}
                                {...register('event')}
                            />
                        </div>
                    </div>

                    <div className={cx("item-form")}>
                        <label className={cx("label-booking")}>
                            Purpose of Trip:
                        </label>
                        <div>
                            <textarea
                                placeholder={dataOld.Note}
                                className={cx("book-note")}
                                {...register("Purpose")}
                                rows="4"
                            ></textarea>
                        </div>
                    </div>

                    <div className={cx("item-form item-column")}>
                        <label className={cx("label-booking")}>
                            Destination Ideas:
                        </label>
                        <div className={cx("cus-infor")}>

                            <div className={cx("list-location")}>
                                {ListLocation.map(d =>
                                    <div className={cx("location-item")}>
                                        <input
                                            name="location"
                                            type="checkbox"
                                            value={d}
                                            className={cx("form-control")}

                                            onClick={(e) => AddDes(e)}
                                        />

                                        <label className={cx("sex-m")} for="" >
                                            {d}
                                        </label>
                                    </div>
                                )}

                            </div>
                        </div>
                    </div>

                    <div className={cx("group-item")}>
                        <div className={cx("item-form")}>
                            <label className={cx("label-booking")}>
                                Persons Attending:
                            </label>
                            <div className={cx("input-enquire")}>
                                <input
                                    type="number"
                                    placeholder={dataOld.Adult}
                                    className={cx("book-age")}
                                    min="0"
                                    max="100"
                                    {...register('Adult')}
                                />
                            </div>
                        </div>

                        <div className={cx("item-form")}>
                            <label className={cx("label-booking")}>
                                Estimated Travel Date:
                            </label>
                            <div className={cx("input-enquire")}>
                                <input
                                    type="date"
                                    name="date"
                                    className={cx("book-date")}
                                    {...register('StartDate')}
                                />
                            </div>
                        </div>

                        <div className={cx("item-form")}>
                            <label className={cx("label-booking")}>
                                Preliminary Duration:
                            </label>
                            <div className={cx("input-enquire")}>

                                <select name='level' className={cx("our-services")} onChange={(e) => setDataSelect({ ...dataSelect, Lenght: e.target.value })}>
                                    <option value="1 day">1 day</option>
                                    <option value="2 - 3 days">2 - 3 days</option>
                                    <option value="> 3 days">{` > 3 days `}</option>
                                </select>
                            </div>
                        </div>

                    </div>

                    <div className={cx("item-form")}>
                        <label className={cx("label-booking")}>
                            Level of Responsiveness required:
                        </label>
                        <div className={cx("input-enquire")}>
                            <select name='level' className={cx("our-services")} onChange={(e) => setDataSelect({ ...dataSelect, Require: e.target.value })}>
                                <option value="">Urgent</option>
                                <option value="Food">Normal</option>
                            </select>
                        </div>
                    </div>

                    <div className={cx("item-form")}>
                        <label className={cx("label-booking")}>
                            Additional Information:
                        </label>
                        <div>
                            <textarea
                                placeholder={dataOld.Note}
                                className={cx("book-note")}
                                {...register('Note')}
                                onChange={(e) => setDataSelect({ ...dataSelect, Note: e.target.value })}
                                rows="6"
                            ></textarea>
                        </div>
                    </div>
                    <div className={cx("item-form")}>
                        <label className={cx("label-booking")}>
                            How did you hear about our services?
                        </label>
                        <div>
                            <select name='ourServices' className={cx("our-services")} onChange={(e) => setDataSelect({ ...dataSelect, Subcrible: e.target.value })}>
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

export default EditBookMice;