import { useState } from "react";

import classNames from "classnames/bind";
import style from './booking.module.scss';

import { Pagination } from "@/components";
import { banners } from "@/public/images";
import EditBookDefault from "@/views/EditBooking/EditBookDefault";
import EditBookHotel from "@/views/EditBooking/EditBookHotel";
import EditBookMice from "@/views/EditBooking/EditBookMice";
import EditBookTransfer from "@/views/EditBooking/EditBookTransfer";
import { Getbookinglist } from "@/pages/api/QuerryAPI";
import { useApppContext } from "@/pages/_app";
import ItemBookingUser from "./item";

const cx = classNames.bind(style);



function BookingUser({ user }) {

    const [Bookdata, setBookdata] = useState([]);
    const [page, setPage] = useState(1);
    const [showDetail, setShowDetail] = useState(false);

    const [data, setData] = useState();
    const CT = useApppContext();
    const lastIndex = page * 6;
    const firstIndex = lastIndex - 6;
    const listBook = Getbookinglist(user, CT.reload);


    return (<div className={cx('wrapper')}>
        {listBook.data && <>
            <h2 className={cx('title')}>booking list</h2>

            {listBook.data.slice(firstIndex, lastIndex).map((item, index) => (

                <ItemBookingUser key={index}
                    img={banners.banner2}
                    data={item}
                    toggle={setShowDetail}
                    setData={setData}
                />
            ))}

        </>
        }
        <Pagination totalPosts={Bookdata.length} postPerPage={6} setPage={setPage} pageIndex={page} />



        {showDetail && data.Type == "TOUR" && <EditBookDefault dataOld={data} toggle={setShowDetail} reload={CT.reload} setreload={CT.setreload} />}
        {showDetail && data.Type == "MICE" && <EditBookMice dataOld={data} toggle={setShowDetail} reload={CT.reload} setreload={CT.setreload} />}
        {showDetail && data.Type == "TRANSFER" && <EditBookTransfer dataOld={data} toggle={setShowDetail} reload={CT.reload} setreload={CT.setreload} />}
        {showDetail && data.Type == "HOTEL" && <EditBookHotel dataOld={data} toggle={setShowDetail} reload={CT.reload} setreload={CT.setreload} />}
    </div>);
}

export default BookingUser;