import classNames from 'classnames/bind';
import style from '@/styles/bloghome.module.scss';
import { Title } from '@/components';
import Blogcard1 from './Blogcard1';
import { Getbloghot } from '@/pages/api/QuerryAPI';



const cx = classNames.bind(style);


const BlogHome = () => {

    const { data, isLoading, error } = Getbloghot();
    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error.message}</p>;
    }
    return (
        <div className={cx('container')}>
            <Title text="Blog Share" />

            <div className={cx('grid-blog')}>
                <div className={cx('grid1')}>
                    <div className={cx('card1')}>
                        <Blogcard1 Data={data.Object[0]} />
                    </div>
                    <div className={cx('card2')}>
                        <Blogcard1 Data={data.Object[1]} />
                    </div>
                </div>
                <div className={cx('grid2')}>
                    <div className={cx('card3')}>
                        <Blogcard1 Data={data.Object[2]} />
                    </div>
                    <div className={cx('card3')}>
                        <Blogcard1 Data={data.Object[3]} />
                    </div>
                    <div className={cx('card3')}>
                        <Blogcard1 Data={data.Object[4]} />
                    </div>
                </div>
            </div>

        </div>
    );
};

export default BlogHome;
