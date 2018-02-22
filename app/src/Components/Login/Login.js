import React from 'react';
import { Link } from 'react-router-dom';
import './Login.css';
import JiffyLubeLogo from '../../resources/JiffyLubeLogo.png'

export default class Login extends React.Component {
    render() {
        return (
            <div className='login_page_page-container'>
                <img
                    className='login_page_logo'
                    src={JiffyLubeLogo}
                    alt='' />

                <div className='login_page_login-container'>
                    <h1>Employee Access</h1>
                    <input className='login_page_input username' placeholder='Store Login' />
                    <input
                        className='login_page_input password'
                        type='password'
                        placeholder='Password' />
                    <Link to={{ pathname: '/search', query: { the: 'query' } }}>
                        <button className='login_page_login-button'>Log In</button>
                    </Link>
                </div>

                <footer className='login_page_footer'>Copyright ©</footer>
            </div>
        )
    }
}