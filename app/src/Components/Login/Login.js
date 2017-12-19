import React from 'react';
import './Login.css';

export default class Login extends React.Component {
    render() {
        return (
            <div className='login_page_page-container'>
                <img
                    className='login_page_logo'
                    src='https://vignette.wikia.nocookie.net/logopedia/images/8/8d/Jiffy_Lube.svg/revision/latest?cb=20130820190427'
                    alt=''/>

                <div className='login_page_login-container'>
                    <h1>Employee Access</h1>
                    <input className='login_page_input username' placeholder='Store Login' />
                    <input className='login_page_input password' type='password' placeholder='Password' />
                    <button className='login_page_login-button'>Log In</button>
                </div>
            </div>
        )
    }
}