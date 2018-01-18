import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import Logout from '../../resources/Logout.png'

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
                    <Link to='/login'>
                        <div className='header_options_container'>
                            <section>
                                <img src={Logout} alt='' />
                            </section>
                            <h1>Logout</h1>
                        </div>
                    </Link>
                </section>
            </header>
        )
    }
}