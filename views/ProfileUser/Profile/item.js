import { useState, useRef, useEffect } from "react";
import classNames from "classnames/bind";
import style from './profile.module.scss'

import { TfiPencilAlt } from "react-icons/tfi";

const cx = classNames.bind(style)

function ItemInput({ id, value, title, placeholder, setEdit, onChange, ...props }) {
    const [isDisabled, setIsDisabled] = useState(true)
    const [valueInput, setValueInput] = useState(value)

    const inputRef = useRef()

    const handelEdit = () => {
        setIsDisabled(false);
        setValueInput('');
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }

    return (<div className={cx('wrapperItem')}>
        <h3 className={cx('titleItem')}>{title}:</h3>
        <div className={cx('boxInput')}>
            <TfiPencilAlt className={cx('icon')} onClick={handelEdit} />
            <input ref={inputRef} className={cx('input')} placeholder={placeholder} value={valueInput} disabled={isDisabled} onChange={(e) => setValueInput(e.target.value)} {...props} />
        </div>
    </div>);
}

export default ItemInput;