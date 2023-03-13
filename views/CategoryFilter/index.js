import classNames from 'classnames/bind';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import style from './filter.module.scss';
import { useRouter } from 'next/router';
import Buttom from '@/components/Button';
import { GetSocial } from '@/pages/api/CallAPI';
import { banners } from '@/public/images';
import { GrPowerReset } from 'react-icons/gr';
// import { GetSocial } from '@/pages/api/QuerryAPI';


const cx = classNames.bind(style);

const months = [`January`, 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

function CategoryFilter({ isSearch, category, price, priceft, day, tourTags, groupSize, season, recentPost, archives, banner, setValueFillter, className, setvlcountry, setvldestination, setvltype, setvlfromcost, setvlendcost, setvltag, setvlseason, setvlgroup, setinput, searchinput, blog, hotblog }) {
    const [activeCategory, setActiveCategory] = useState(-1);
    const [activeTour, setActiveTour] = useState(-1);
    const [activeArchive, setActiveArchive] = useState(-1);
    const [activeGroup, setActiveGroup] = useState(-1);
    const [activePrice, setActivePrice] = useState(-1);
    const [valueDay, setValueDay] = useState(50);
    const [listMonthArchives, setListMonthArchives] = useState([]);
    const [showFillter, setShowFillter] = useState(0)
    const [ListDes, setlist] = useState();
    const router = useRouter();
    const convertTimeString = () => {
        const listMonths = [];
        var key = 0;
        var today = new Date();
        let year = today.getFullYear();
        let month = today.getMonth();

        do {
            if (month < 0) {

                listMonths.push({ month: months[month + 12], year: year - 1 })
            } else {
                listMonths.push({ month: months[month], year: year })
            }
            month--;
            key++;
        } while (key < 5);

        return listMonths;
    }

    const CAllAPIList = async () => {
        const response = await GetSocial(6256);
        if (response.status == 200) {
            setlist(JSON.parse(response.data.Object[0].intro_text));
        }

    }

    useEffect(() => {
        const listmonth = convertTimeString()
        if (listmonth.length > 0) {
            setListMonthArchives(listmonth)
        }
        CAllAPIList();
    }, [])

    const handelShowfillter = (index) => {
        if (showFillter === index) {
            setShowFillter(0)
        } else {
            setShowFillter(index)
        }
    }

    useEffect(() => {
        const showFilterMobilef = () => {
            if (showFillter !== 0) {
                setShowFillter(0)
            }
        }

        window.addEventListener('scroll', showFilterMobilef)

        return (() => {
            window.removeEventListener('scroll', showFilterMobilef)
        })
    }, [showFillter])

    const handelActiveItemCate = (index) => {
        setActiveCategory(index)
        setShowFillter(0);
        setvldestination(ListDes[router.query.id][index]);
    }
    const handelActivePrice = (index) => {
        setActivePrice(index)
        setShowFillter(0);
        setvlfromcost(priceft.value[index][0]);
        setvlendcost(priceft.value[index][1]);

    }



    const handelActiveItemTourTags = (index) => {
        setActiveTour(index);
        setShowFillter(0);
        setvltag(tourTags.elements[index]);
    }
    const hanldleActiveSeason = (index) => {
        setActiveArchive(index);
        setShowFillter(0);

        setvlseason(season.elements[index]);
    }
    const hanldleActiveGroup = (index) => {
        setActiveGroup(index);
        setShowFillter(0);

        setvlgroup(groupSize.elements[index]);
    }


    const clases = cx('wrapper', {
        [className]: className,
    });
    console.log('Listdes', ListDes);

    return (
        <div className={clases}>

            {
                isSearch ? (<div className={cx('inputSearch-div')}>
                    <input type='text' className={cx('inputSearch')} placeholder="search" onChange={(e) => setinput(e.target.value)} />
                </div>) : null
            }
            <div className={cx('boxFillterMobile')}>
                <Buttom className={cx('btnFilter', showFillter === 1 ? 'activeBtn' : null)} onClick={() => handelShowfillter(1)}>category <MdOutlineKeyboardArrowDown className={cx('icon')} /></Buttom>
                {price && <Buttom className={cx('btnFilter', showFillter === 2 ? 'activeBtn' : null)} onClick={() => handelShowfillter(2)}>fillter by price <MdOutlineKeyboardArrowDown className={cx('icon')} /></Buttom>}
                {day && <Buttom className={cx('btnFilter', showFillter === 3 ? 'activeBtn' : null)} onClick={() => handelShowfillter(3)}>fillter by day <MdOutlineKeyboardArrowDown className={cx('icon')} /></Buttom>}
                {tourTags && <Buttom className={cx('btnFilter', showFillter === 4 ? 'activeBtn' : null)} onClick={() => handelShowfillter(4)}>tags <MdOutlineKeyboardArrowDown className={cx('icon')} /></Buttom>}
                {groupSize && <Buttom className={cx('btnFilter', showFillter === 5 ? 'activeBtn' : null)} onClick={() => handelShowfillter(5)}>groupsize <MdOutlineKeyboardArrowDown className={cx('icon')} /></Buttom>}
                {season && <Buttom className={cx('btnFilter', showFillter === 6 ? 'activeBtn' : null)} onClick={() => handelShowfillter(6)}>season <MdOutlineKeyboardArrowDown className={cx('icon')} /></Buttom>}
            </div>


            {category && router.query.id && ListDes && (
                <div className={cx('boxFillterItem', 'boxCategory', showFillter === 1 ? 'active' : null)}>
                    <h2 className={cx('title')}>Destination  <GrPowerReset className={cx('icon-reset')} onClick={() => { setActiveCategory(-1); blog ? setvldestination('Blog') : setvldestination(''); setShowFillter(0) }} /></h2>
                    {ListDes[router.query.id].map((element, index) => (
                        <div
                            className={cx('itemCategory', 'itemMobileShow', activeCategory === index ? 'active' : null)}
                            key={index}
                            onClick={() => handelActiveItemCate(index)}
                        >
                            <span className={cx('itemName')}>{element}</span>
                        </div>
                    ))}
                </div>
            )}
            {price ? (
                <div className={cx('boxFillterItem', 'boxArchives', showFillter === 2 ? 'active' : null)}>
                    <h2 className={cx('title')} >filter by price <GrPowerReset className={cx('icon-reset')} onClick={() => { setActivePrice(-1); setvlfromcost(0); setvlendcost(15000); setShowFillter(0) }} /></h2>


                    {
                        priceft?.elements.map((item, index) => (
                            <div className={cx('archivesItem', 'itemMobileShow', activePrice === index ? 'active' : null)} onClick={() => handelActivePrice(index)} key={index} >
                                <span>{item}</span>
                            </div>
                        ))
                    }
                </div>
            ) : null}
            {day ? (
                <div className={cx('boxFillterItem', showFillter === 3 ? 'active' : null)}>
                    <h2 className={cx('title')}>filter by Day </h2>
                    <div className={cx('itemMobileShow')}>
                        <div className={cx('box')}>
                            <span className={cx('text')}>1 Day</span>
                            <span className={cx('text')}>{`${Math.floor((valueDay * 25) / 100)} Day`}</span>
                        </div>
                        <div className={cx('boxRange', 'itemMobileShow')}>
                            <input
                                className={cx('rangeFilter')}
                                type="range"
                                value={valueDay}
                                min="0"
                                max="100"
                                onChange={(e) => setValueDay(e.target.value)}
                            ></input>
                            <progress className={cx('rangeFilterColor')} min="0" max="100" value={valueDay}></progress>
                        </div>

                    </div>
                </div>
            ) : null}
            {tourTags ? (
                <div className={cx('boxFillterItem', showFillter === 4 ? 'active' : null)}>
                    <h2 className={cx('title')}>{tourTags.title} <GrPowerReset className={cx('icon-reset')} onClick={() => { setActiveTour(-1); blog ? setvltag('Blog') : setvltag(''); setShowFillter(0) }} /></h2>
                    <div className={cx('boxTourFil', 'itemMobileShow')}>
                        {tourTags.elements?.map((element, index) => (
                            <span
                                className={cx('itemTourFil', activeTour === index ? 'active' : null)}
                                key={index}
                                onClick={() => handelActiveItemTourTags(index)}
                            >
                                {element}
                            </span>
                        ))}
                    </div>
                </div>
            ) : null}

            {/* ================ groupSize ==============  */}
            {
                groupSize ? (<div className={cx('boxFillterItem', 'boxArchives', showFillter === 5 ? 'active' : null)}>
                    <h2 className={cx('title')}>{groupSize.title} <GrPowerReset className={cx('icon-reset')} onClick={() => { setActiveGroup(-1); setvlgroup(''); setShowFillter(0) }} /></h2>
                    {
                        groupSize.elements.map((item, index) => (
                            <div className={cx('archivesItem', 'itemMobileShow', activeGroup === index ? 'active' : null)} onClick={() => hanldleActiveGroup(index)} key={index}>
                                <span>{item}</span>
                            </div>
                        ))
                    }
                </div>) : null
            }

            {/* ================ SeaSon ==============  */}
            {
                season ? (<div className={cx('boxFillterItem', 'boxArchives', showFillter === 6 ? 'active' : null)}>
                    <h2 className={cx('title')}><GrPowerReset className={cx('icon-reset')} onClick={() => { setActiveArchive(-1); setvlseason(''); setShowFillter(0) }} /> {season.title} </h2>
                    {
                        season.elements.map((item, index) => (
                            <div className={cx('archivesItem', 'itemMobileShow', activeArchive === index ? 'active' : null)} onClick={() => hanldleActiveSeason(index)} key={index}>
                                <span>{item}</span>
                            </div>
                        ))
                    }
                </div>) : null
            }


            {
                recentPost ? (<div className={cx('boxFillterItem', 'boxRecent')}>
                    <h2 className={cx('title')}>{recentPost.title} </h2>
                    {
                        hotblog.map((item, index) => (
                            <Link key={index} href={`/blog-detail/${item.id}`} className={cx('recentItem', 'itemMobileShow')}>
                                <div className={cx('imgBox')}>
                                    <Image src={`https://vnxpedia.3i.com.vn${item.gallery}`} alt="ImgPostRecent" className={cx('img')} width={200} height={200} />
                                </div>
                                <div className={cx('recentInfo')}>
                                    <p className={cx('titleRecentPost')}>{item.title}</p>
                                    <p className={cx('timeRecent')}>Post on May 25</p>
                                </div>
                            </Link>
                        ))
                    }
                </div>) : null
            }

            {
                archives ? (<div className={cx('boxFillterItem', 'boxArchives')}>
                    <h2 className={cx('title')}>archives <GrPowerReset className={cx('icon-reset')} onClick={() => { setActiveCategory(-1); setvldestination(''); setShowFillter(0) }} /></h2>
                    {
                        listMonthArchives.map((time, index) => (
                            <div className={cx('archivesItem', 'itemMobileShow', activeArchive === index ? 'active' : null)} onClick={() => setActiveArchive(index)} key={index}>
                                <span>{time.month}</span>
                                <span>{time.year}</span>
                            </div>
                        ))
                    }
                </div>) : null
            }

            {
                banner ? (<a className={cx('boxFillterItem', 'boxBanner')}>
                    <Image src={banners.bannerBlogListFilter} alt="banner" className={cx('bannerImg')} />
                    <div className={cx('content')}>
                        <span className={cx('number')}>299</span>
                        <p className={cx('text')}>look hot with style</p>
                    </div>
                </a>) : null
            }
        </div>
    );
}

export default CategoryFilter;
