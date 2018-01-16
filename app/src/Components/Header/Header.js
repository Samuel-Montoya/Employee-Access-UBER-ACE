import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import UserIcon from '../../resources/user.svg';

export default class Header extends React.Component {
    render() {
        return (
            <header className='header_container'>
                <section className='logo_container'>
                    <Link to='/search'>
                        <img
                            src='http://www.jiffylubesocal.com/wp-content/themes/jiffy/images/main-logo.png'
                            alt='' />
                    </Link>
                    <h1>Employee Access</h1>
                </section>

                <section className='header_options'>
                    <Link to={{ pathname: '/', query: { showProducts: true } }} >
                        <div className='header_options_container'>
                            <section>
                                <img src={UserIcon} alt='' />
                            </section>
                            <h1>Account</h1>
                        </div>
                    </Link>

                    <Link to='/login'>
                        <div className='header_options_container'>
                            <section>
                                <img src={'http://www.iconsplace.com/icons/preview/white/logout-256.png'} alt='' />
                            </section>
                            <h1>Logout</h1>
                        </div>
                    </Link>
                </section>
            </header>
        )
    }
}