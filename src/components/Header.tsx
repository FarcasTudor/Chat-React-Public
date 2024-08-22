import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/storage/store';
import { fetchUserName } from '../redux/slices/userDetailsSlice';

export const Header: React.FC = () => {
    const dispatch = useAppDispatch();
    const username = useAppSelector((state) => state.userDetailsReducer.username);

    useEffect(() => {
        dispatch(fetchUserName());
    }, []);

    return (
        <div className="chat-header">
            <h2>Teamm</h2>
            <div className="chat-header-team-name">{username}</div>
        </div>
    );
};
