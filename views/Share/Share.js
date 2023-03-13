import classNames from 'classnames/bind';
import Link from 'next/link';
import { CiMail, CiTwitter } from 'react-icons/ci';
import { FaLinkedin } from 'react-icons/fa';
import { SlSocialFacebook } from 'react-icons/sl';
import style from './style.module.scss';
import { AiOutlinePrinter } from 'react-icons/ai'


const cx = classNames.bind(style);

const Share = () => {
    return (
        <div className={cx('container')}>
            <Link href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`} target="_blank"><SlSocialFacebook /></Link>
            <Link href={`https://twitter.com/intent/tweet?url=${window.location.href}&text=`} target="_blank"><CiTwitter /></Link>
            <Link href={`https://www.linkedin.com/shareArticle?mini=true&url=${window.location.href}`} target="_blank"><FaLinkedin /></Link>

        </div>
    )
}

export default Share