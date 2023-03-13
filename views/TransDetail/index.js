import classNames from 'classnames/bind';
import style from './TransDetail.module.scss';
// import style from '@/styles/Hoteldetail.module.scss';
import Loading from '@/components/Loading';
import { ListTransfer } from '@/pages/api/QuerryAPI';
import Image from 'next/image';
import Link from 'next/link';
import { AiFillStar } from 'react-icons/ai';


const cx = classNames.bind(style);

const TransListDetail = () => {
    const getTransDetail = ListTransfer()
    if (getTransDetail.isLoading) {
        return <Loading />;
    }

    if (getTransDetail.error) {
        return <p>Error: {error.message}</p>;
    }
    console.log("get", getTransDetail.data);
    return (
        <div className={cx('Siminal-Hotel')}>
            {getTransDetail.data && getTransDetail.data.Object.slice(0, 3).map((d, i) =>
                <Link href={`/transfer-detail/${d.id}`} className={cx('card')} key={i}>
                    <div className={cx('card-img')} >
                        <Image src={`https://vnxpedia.3i.com.vn${d.gallery}`} alt="Luxuryvietravel-tour-img" className={cx('img')} width={200} height={200} />
                    </div>
                    <div className={cx('infor')}>
                        <h6 className={cx('title')}>{d.title.toUpperCase()}</h6>
                        <p className={cx('rate')}>
                            <span className={cx('rating')}>
                                <AiFillStar /> 4.8
                            </span>
                            <span className={cx('ratecount')}>
                                &#40; 28.091 Đánh giá &#41; |600 Đã được đặt
                            </span>
                        </p>
                        <p className={cx('price')}>

                        </p>
                        <p className={cx('describe')}>
                            <span>Describe: </span>
                            {d.intro_text}
                        </p>
                    </div>
                </Link>
            )
            }
        </div>
    )
}

export default TransListDetail