import { useEffect, useState } from 'react';

import classNames from 'classnames/bind';
import Image from 'next/image';
import style from './header.module.scss';

import Logo from '@/asset/images/LogoFN1.png';
import { Button } from '@/components';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Menu from './Menu';

import LogIn from '@/components/Login';
import Signup from '@/components/SignUp';
import { useApppContext } from '@/pages/_app';
import Img1 from '@/public/icon/Layer15.png';
import Searchkey from '@/views/Searchkey/Searchkey';
import { AiOutlineMenu, AiOutlineSearch, AiOutlineUser } from 'react-icons/ai';
import { FiUserCheck } from 'react-icons/fi';
import OutsideClickHandler from 'react-outside-click-handler';
import { ToastContainer } from 'react-toastify';


const cx = classNames.bind(style);


const Header = () => {
    const [showMenu, setShowMenu] = useState(false);
    const [showUser, setShowUser] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const [bgheader, setbgheader] = useState('');
    const [signup, setsignup] = useState(false);
    const [login, setlogin] = useState(false)
    const [translate, settranslate] = useState('none');
    const { asPath } = useRouter();
    const router = useRouter();
    const [closeUser, setCloseUser] = useState(false)


    const CT = useApppContext();

    const handelShowMenu = () => {
        setShowMenu(!showMenu);

    };
    const closeMenuMobile = () => {
        setShowMenu(false);
    }
    const handleLogout = () => {
        localStorage.removeItem('VNXUser');
        CT.setCurrentUser(null);
        { asPath == '/profile' && router.push('/') }


    };

    useEffect(() => {
        const handelScroll = () => {
            if (showMenu) {
                setShowMenu(false);
            }
            if (window.scrollY > 70) {
                setbgheader('act')
            }
            if (window.scrollY == 0) {
                setbgheader('');
            }
        };

        window.addEventListener('scroll', handelScroll);

        return () => {
            window.removeEventListener('scroll', handelScroll);
        };
    }, [showMenu]);

    return (
        <div className={cx(`header`)} id={bgheader}>
            <div className={cx(`wrapper`)}>
                <Link href={'/'} className={cx(`linkHomepage`)}>
                    <Image src={Logo} alt={'Logo'} priority className={cx('logo')} />
                </Link>
                <Menu className={'menubody'} showmenu={showMenu} menuBgr={bgheader} close={closeMenuMobile} />
                <div className={cx('itemRight')}>
                    <OutsideClickHandler onOutsideClick={() => settranslate('none')}>
                        <div className={cx('gg-trans')}>
                            <Image src={Img1} className={cx('icon', { active: translate })} onClick={() => translate == 'none' ? settranslate('block') : settranslate('none')} alt='icon-language' />
                            <div className={cx('sl-trans')} style={{ display: translate }} >
                                <div id="google_translate_element"></div>
                            </div>
                        </div>
                    </OutsideClickHandler>
                    <div className={cx('user')}>
                        <OutsideClickHandler onOutsideClick={() => {
                            setlogin(false);
                        }}>
                            {CT.currentUser ?

                                <div className={cx('item-user')} onMouseEnter={() => setCloseUser(true)}
                                    onMouseLeave={() => setCloseUser(false)}>
                                    <FiUserCheck className={cx('icon')} />
                                    {closeUser && <div className={cx('menuHover')} >
                                        <Link href='/profile' className={cx('itemMenuHover')} onClick={() => setCloseUser(false)}>Profile</Link>
                                        <h4 className={cx('itemMenuHover')} onClick={() => handleLogout()}>Logout</h4>
                                    </div>}

                                </div>
                                : <AiOutlineUser className={cx('icon', { active: showUser })} onClick={() => login ? setlogin(false) : setlogin(true)} />}

                            {login && <div className={cx('login')}>< LogIn Click={setsignup} setuser={CT.setCurrentUser} close={setlogin} /> </div>}

                        </OutsideClickHandler>
                    </div>
                    <OutsideClickHandler onOutsideClick={() => { setShowSearch(false) }}>
                        <div className={cx('search-icon')}>
                            <AiOutlineSearch className={cx('icon', { active: showSearch })} onClick={() => showSearch ? setShowSearch(false) : setShowSearch(true)} />
                        </div>
                        {showSearch && <Searchkey close={setShowSearch} />}
                    </OutsideClickHandler>
                    <AiOutlineMenu className={cx('icon', 'menuIcon', { active: showMenu })} onClick={handelShowMenu} />
                    <div className={cx('button-call')} >
                        <Button className={cx('button')}>Call US <span>+84-90-159-1111</span></Button>
                    </div>
                </div>
            </div>
            {signup && <Signup Click={setsignup} openlogin={setlogin} />}
            <ToastContainer />
        </div>
    );
};

export default Header;