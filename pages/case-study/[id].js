import React, { useState } from 'react';
import classNames from 'classnames/bind';
import style from '@/styles/casetudy.module.scss';
import BannerIMG from '@/views/BannerSlide/BannerIMG';
import { useRouter } from "next/router";
import ChangeTextHTML from '@/hook/ChangetextHTML';
import Highlight from '@/views/CaseStudy/Highlight';
import InEx from '@/views/CaseStudy/InEx';
import Listtag from '@/views/Blogdetail/Listtag';
import { Blogrecomment } from '@/views/Blogdetail';
import BookMICE from '@/views/CaseStudy/BookMICE';
import { Gettour } from '../api/QuerryAPI';
import Headpage from '@/components/Head/head';

const cx = classNames.bind(style);

const Data = {
    Img: '',
    Infor: [`Time: May 2017 `, `Number of pax: 150`, `Venue: Mui Ne - Phan Thiet`, `Organizer: Luxuryvietravel`],
    Inclusions: ['Food for 150 pax', 'Table and chair', 'Service proesinal staff', 'Drink', 'Decoration', 'Cleaning Service'],
    Exclusions: ['Food not in menu', 'Tip money for staff', 'Wine and alcoho', 'Tip money for staff', 'Tip money for staff', 'Tip money for staff'],
    hash_tag: "[\"#BBQ Party\",\"#Phan Thiet \",\"#Dailytour\"]"
}

const index = () => {
    const router = useRouter();
    const [Book, setBook] = useState(true);

    const caseStudy = Gettour(router.query.id);




    return (
        <div className={cx('container')}>
            <Headpage />
            {caseStudy.data && <div className={cx('main')}>
                {(caseStudy.data && caseStudy.data.BannerImg && caseStudy.data.HightlightImg) ?
                    <BannerIMG img={`https://vnxpedia.3i.com.vn${caseStudy.data.BannerImg}`} title={caseStudy.data.TourName} bg='bg' descrip={ChangeTextHTML(caseStudy.data.TourDescription)} /> :
                    <BannerIMG img={`https://vnxpedia.3i.com.vn${caseStudy.data.HightlightImg}`} title={caseStudy.data.TourName} bg='bg' descrip={ChangeTextHTML(caseStudy.data.TourDescription)} />
                }


                {Book ?
                    <div className={cx('main-infor')}>

                        {caseStudy.data && <Highlight data={caseStudy.data} />}
                        <InEx data={Data.Inclusions} type='inc' />
                        <InEx data={Data.Exclusions} type='exc' />

                        <div className={cx('book-div')}>
                            <h6 className={cx('text')}>Let me us know your dream trip for your company! </h6>
                            <button className={cx('btn-book')} onClick={() => setBook(false)}>Book Now</button>
                        </div>
                        <Listtag data={Data.hash_tag} />

                    </div> : <BookMICE close={setBook} />

                }

                <Blogrecomment />


            </div>
            }
        </div>
    )
}

export default index