import Link from 'next/link';

import classNames from 'classnames/bind';
import style from './header.module.scss';

import { useState } from 'react';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import MenuHover from './MenuHover';

const cx = classNames.bind(style);

const menuDes = [
    {
        title: 'Viet Nam',
        to: '/destination/VietNam',
    },
    {
        title: 'ThaiLand',
        to: '/destination/ThaiLand',

    },
    {
        title: 'Myanmar',
        to: '/destination/Myanmar',

    },
    {
        title: 'Laos',
        to: '/destination/Laos',

    },
    {
        title: 'Cambodia',
        to: '/destination/Cambodia',

    }
]

const menuWayTravel = [
    {
        title: 'luxury tour',
        children: {
            title: 'luxury tour',
            data: [
                {
                    title: 'Classic Tour',
                    to: '/way-to-travel/TYPE_CLASSIC',
                },
                {
                    title: 'Family Tour',
                    to: '/way-to-travel/TYPE_FAMILY',
                },
                {
                    title: 'Culinary',
                    to: '/way-to-travel/TYPE_CULINARY',
                },
                {
                    title: 'Beach Break',
                    to: '/way-to-travel/TYPE_BEACH',
                },
                {
                    title: 'Adventure',
                    to: '/way-to-travel/TYPE_ADVENTURE',
                },
                {
                    title: 'Heritage',
                    to: '/way-to-travel/TYPE_HERITAGES',
                },
                {
                    title: 'Wellness',
                    to: '/way-to-travel/TYPE_WELLNESS',
                },
                {
                    title: 'MICE',
                    to: '/mice',
                },
            ],
        },
    },
    {
        title: 'luxury cruise',
        to: '/way-to-travel/TYPE_CRUISE',
    },
    {
        title: 'luxury transfer',
        to: '/luxury-transfer',
    },
    {
        title: 'luxury hotel',
        to: '/luxury-hotel',
    },
]

const menuAbouUs = [
    {
        title: 'About Us',
        to: '/about-us'
    },
    {
        title: 'Payment',
        to: '/payment/DEPOSIT & PAYMENT'
    },
    {
        title: 'Responsible',
        to: '/responsible'
    }
]


function Menu({ className, showmenu, menuBgr, close }) {

    const clases = cx('menu', {
        [className]: className,
        active: showmenu,
    });

    const [cclosed1, setclose1] = useState();
    const [cclosed2, setclose2] = useState();
    const [cclosed3, setclose3] = useState();

    const [showList1, setshow1] = useState(false);
    const [showList2, setshow2] = useState(false);
    const [showList3, setshow3] = useState(false);
    // const [showList4, setshow4] = useState(false);
    const [showList5, setshow5] = useState(false);

    const CloseAll = () => {
        setshow1(false);
        setshow2(false);
        setshow3(false);
        setshow5(false);
        close();
    }

    return (

        <nav className={clases}>
            <div className={cx('item')} onMouseEnter={() => setclose1(true)}
                onMouseLeave={() => setclose1(false)} >
                <span onClick={() => showList1 ? setshow1(false) : setshow1(true)}>
                    destination
                </span>
                {cclosed1 && <MenuHover items={menuDes} className={cx('menuHoverBody')} isScroll={!!menuBgr.length} close={close} close1={setclose1} />}
                {showList1 && <div className={cx('listMobile')}>

                    <div className={cx('listMobileDiv')}>
                        {menuDes.map((d, i) =>
                            <Link href={d.to} className={cx('linkMobile')} onClick={() => CloseAll()} key={i}>{d.title}</Link>
                        )}

                    </div>
                </div>
                }

            </div>
            <div className={cx('item')} onMouseEnter={() => setclose2(true)}
                onMouseLeave={() => setclose2(false)}>
                <span onClick={() => showList2 ? setshow2(false) : setshow2(true)}> way to travel</span>
                {cclosed2 && <MenuHover items={menuWayTravel} className={cx('menuHoverBody')} close={close} close1={setclose2} />}
                {showList2 && <div className={cx('listMobile')}>
                    <p className={cx('listMobile-1')} onClick={() => showList5 ? setshow5(false) : setshow5(true)}>Luxury tour <MdOutlineKeyboardArrowDown /></p>
                    {showList5 && <div className={cx('listMobileDiv')}>
                        {menuWayTravel[0].children.data.map((d, i) =>
                            <Link href={d.to} className={cx('linkMobile')} onClick={() => CloseAll()} key={i}>{d.title}</Link>
                        )}

                    </div>
                    }
                    {menuWayTravel.slice(1, 4).map((d, i) =>
                        <Link href={d.to} className={cx('linkMobile')} onClick={() => CloseAll()} key={i}>{d.title}</Link>
                    )}
                </div>
                }
            </div>

            <Link href={'/blog-list'} className={cx('item')} onClick={() => { close(); CloseAll() }} ><span>Inspirations</span></Link>
            <div className={cx('item')} onMouseEnter={() => setclose3(true)}
                onMouseLeave={() => setclose3(false)}>
                <span onClick={() => showList3 ? setshow3(false) : setshow3(true)}>about us</span>
                {cclosed3 && <MenuHover items={menuAbouUs} className={cx('menuHoverBody')} close={close} close1={setclose3} />}
                {showList3 && <div className={cx('listMobile')}>

                    <div className={cx('listMobileDiv')}>
                        {menuAbouUs.map((d, i) =>
                            <Link href={d.to} className={cx('linkMobile')} onClick={() => CloseAll()} key={i}>{d.title}</Link>
                        )}

                    </div>
                </div>
                }

            </div>
        </nav>

    );
}

export default Menu;