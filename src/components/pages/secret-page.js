import React from 'react';
import { Redirect } from 'react-router-dom';

const SecretPage = ({ isLoggedIn }) => {

    const style = {
        paddingTop: '6rem',
        paddingBottom: '6rem'
    }

    if (isLoggedIn) {
        return (
            <div
                style={style}
                className='text-center bg-dark rounded border border-secondary'>
                <h3>This page is full of secrets!!!</h3>
            </div>
        );
    };
    return <Redirect to='/login' />
};

export default SecretPage;