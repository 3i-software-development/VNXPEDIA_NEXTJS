import { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import style from './input.module.scss';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const cx = classNames.bind(style);

function Input({
    type = 'text',
    checked,
    isDateInput = "",
    leftIcon,
    rightIcon,
    isSelect,
    placeholder,
    className,
    classNameInput,
    onChange
}) {
    const [valueInput, setValueInput] = useState(() => {
        let value = '';
        if (isDateInput) {
            value = new Date();
        } else if (isSelect) {
            value = isSelect[0];
        }

        return value;
    });

    const clases = cx('wrapper', {
        [className]: className,
    });

    const clasesInput = cx('input', {
        [classNameInput]: classNameInput,
    });

    const handelChangeInput = (value) => {
        if (type !== 'checkbox' || type !== 'radio') {
            setValueInput(value);
        }
    };

    return (
        <div className={clases}>
            {leftIcon && <span className={cx('icon')}>{leftIcon}</span>}
            {isDateInput ? (
                <ReactDatePicker
                    selected={valueInput}
                    onChange={(date) => handelChangeInput(date)}
                    isClearable
                    placeholderText={placeholder}
                />
            ) : isSelect ? (
                <select className={clasesInput} onChange={(e) => handelChangeInput(e.target.value)}>
                    {isSelect.map((item, index) => (
                        <option key={index} value={item}>
                            {item}
                        </option>
                    ))}
                </select>
            ) : (
                <input
                    type={type}
                    value={type === 'text' && valueInput}
                    checked={checked}
                    placeholder={placeholder}
                    className={clasesInput}
                    onChange={(e) => handelChangeInput(e.target.value)}
                />
            )}
            {rightIcon && <span className={cx('icon', { [classNameInput]: classNameInput })}>{rightIcon}</span>}
        </div>
    );
}

Input.propTypes = {
    type: PropTypes.string,
    isDateInput: PropTypes.bool,
    isSelect: PropTypes.array,
    placeholder: PropTypes.string,
    className: PropTypes.string,
    classNameInput: PropTypes.string,
};

export default Input;
