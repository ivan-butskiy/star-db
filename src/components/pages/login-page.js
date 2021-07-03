import React from 'react';
import { Redirect } from 'react-router-dom';

const LoginPage = ({ isLoggedIn, onLogin }) => {

    const style = {
        padding: '3rem'
    };

    if (isLoggedIn) {
        return <Redirect to='/' />
    };

    return (
        <div
            className='bg-dark rounded border border-secondary'
            style={style}>
            <p>Login to see the secret page!</p>
            <button
                className='btn btn-primary'
                onClick={onLogin}>
                Login
            </button>
        </div>
    );
};

export default LoginPage;