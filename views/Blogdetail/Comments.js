import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import style from '@/styles/blogdetail.module.scss';
import Comment from './Comment';
import { Title } from '@/components';
import { GetComment } from '@/pages/api/QuerryAPI';
import { useApppContext } from '@/pages/_app';

const cx = classNames.bind(style);


const Comments = ({ id, setrepid, setrepname }) => {
    const CT = useApppContext();
    const listComment = GetComment(id, CT.reload);

    return (
        <div className={cx('comments')}>
            <Title text='COMMENTS' align='center' />
            {listComment.data &&

                <div className={cx('comment-item')}>

                    {listComment.data.Object.map((d, i) => <div key={i}><Comment data={d} setrepid={setrepid} setrepname={setrepname} id={d.ID} />
                        {d.CommentChild.length > 0 && d.CommentChild.map(
                            a =>
                                <div className={cx('comment-reply')}>
                                    <Comment data={a} setrepid={setrepid} setrepname={setrepname} id={d.ID} />
                                </div>
                        )}
                    </div>)}

                </div>



            }

        </div>
    )
}

export default Comments