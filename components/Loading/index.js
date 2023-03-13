import classNames from "classnames/bind";
import { TiTick } from 'react-icons/ti';
import { Vortex } from 'react-loader-spinner';
import style from './Loading.module.scss';


const cx = classNames.bind(style);

const Loading = () => {
    return (
        <div className={cx('container')}>
            <div>
                <Vortex
                    visible={true}
                    height="130"
                    width="130"
                    ariaLabel="vortex-loading"
                    wrapperStyle={{}}
                    wrapperClass="vortex-wrapper"
                    colors={['red', 'green', 'blue', 'yellow', 'orange', 'purple']}
                />
            </div>

            <span>LUXURYVIETRAVEL</span><TiTick />
        </div>
    )
}

export default Loading