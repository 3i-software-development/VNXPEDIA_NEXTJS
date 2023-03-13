import axios from "axios";
import classNames from "classnames/bind";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { TfiPencilAlt } from "react-icons/tfi";
import style from './profile.module.scss';
import qs from 'qs'
import { toastSuccess, toastError } from "@/components/Toast";
import { useApppContext } from "@/pages/_app";

const cx = classNames.bind(style);

function InfoUser({ data, setuser, dataOld }) {


    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [edit, setedit] = useState(false);
    const CT = useApppContext();
    const [userEdit, setUserEdit] = useState(CT.currentUser);
    const HandleEdit = (e) => {
        e.preventDefault()
        callApiEdit(data);
        setedit(false);
    }

    const callApiEdit = async (data) => {
        let Newinfor = {
            UserName: CT.currentUser.UserName,
            GivenName: userEdit.FullName == '' ? data.FullName : userEdit.FullName,
            Gender: userEdit.Gender,
            Reason: userEdit.BirthDay == '' ? data.BirthDay : userEdit.BirthDay,
            Description: userEdit.About == '' ? data.About : userEdit.About,
            Note: userEdit.Address == '' ? data.Address : userEdit.Address,
            PhoneNumber: userEdit.PhoneNumber == '' ? data.PhoneNumber : userEdit.PhoneNumber,
            Email: userEdit.Email == '' ? data.Email : userEdit.Email
        }
        const response = await axios({
            method: 'post',
            url: 'https://vnxpedia.3i.com.vn/TravelAPI/UpdateInfo',
            data: qs.stringify(Newinfor),
            headers: {
                'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
            },
        });

        if (response.data.Error === true) {
            toastError('Error!');
        } else {
            toastSuccess('Successfully changed information.');
            localStorage.setItem('VNXUser', JSON.stringify({ ...data, FullName: Newinfor.GivenName, Gender: Newinfor.Gender, BirthDay: Newinfor.Reason, About: Newinfor.Description, Address: Newinfor.Note, PhoneNumber: Newinfor.PhoneNumber, Email: Newinfor.Email }));
            setuser({ ...data, FullName: Newinfor.GivenName, Gender: Newinfor.Gender, BirthDay: Newinfor.Reason, About: Newinfor.Description, Address: Newinfor.Note, PhoneNumber: Newinfor.PhoneNumber, Email: Newinfor.Email });

        }
    };




    return (

        <div className={cx('wrapper')}>
            <h2 className={cx('title')}>profile information   <TfiPencilAlt onClick={() => { edit ? setedit(false) : setedit(true) }}>Edit</TfiPencilAlt></h2>
            <form onSubmit={(e) => HandleEdit(e)}>
                <div> <h3>Name: </h3>   {edit ? <input type='text' placeholder={data.FullName} onChange={(e) => setUserEdit({ ...userEdit, FullName: e.target.value })} /> : <p>{data.FullName}</p>}</div>
                <hr />
                <div className={cx('radio')}>
                    <h3>Gender: </h3> {edit ? <div>Male<input type='radio' name="gender" value='Male' onChange={(e) => setUserEdit({ ...userEdit, Gender: true })} />
                        Female   <input type='radio' name="gender" value='Female' onChange={(e) => setUserEdit({ ...userEdit, Gender: false })} /></div> : <p>{data.Gender ? 'Male' : 'Female'} </p>}
                </div>

                {/* <div> <h3>Gender: </h3>  {edit ? <input type='radio' placeholder={data.Gender ? value = 'Male' : value = 'Female'} ></input> : <p>{data.Gender ? 'Male' : 'Female'}</p>}</div> */}
                <hr />
                <div> <h3>Birth Day: </h3>  {edit ? <input type='date' placeholder={data.BirthDay} onChange={(e) => setUserEdit({ ...userEdit, BirthDay: e.target.value })} ></input> : <p>{data.BirthDay}</p>}</div>
                <hr />
                <div> <h3>Address: </h3> {edit ? <input type='text' placeholder={data.Address} onChange={(e) => setUserEdit({ ...userEdit, Address: e.target.value })}></input> : <p>{data.Address}</p>}</div>
                <hr />
                <div><h3>Phone : </h3>  {edit ? <input type='phone' placeholder={data.PhoneNumber} onChange={(e) => setUserEdit({ ...userEdit, PhoneNumber: e.target.value })}></input> : <p>{data.PhoneNumber}</p>}</div>
                <hr />
                <div> <h3>Email: </h3>  {edit ? <input type='email' placeholder={data.Email} onChange={(e) => setUserEdit({ ...userEdit, Email: e.target.value })}></input> : <p>{data.Email}</p>}</div>
                <hr />
                <div>
                    <h3>About: </h3>
                    {edit ? <textarea id="w3review" name="w3review" rows="4" cols="50" placeholder={data.About} onChange={(e) => setUserEdit({ ...userEdit, About: e.target.value })} /> : <p className={cx('about')}>{data.About}</p>}
                </div>
                {edit && <div><button className={cx('btn')}>Save</button></div>}

            </form>
        </div>
    );

}

export default InfoUser;