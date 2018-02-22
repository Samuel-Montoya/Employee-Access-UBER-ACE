import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import Logout from '../../resources/Logout.png'
import styled from 'styled-components';

let SearchContainer = styled.div`
    width: 60%;
    display: flex;
    justify-content: flex-start;
    align-items: center;

    @media only screen and (max-width: 1300px) {
        input {
            width: 50% !important;
            height: 35px !important;
            font-size: 14px !important;
        }

        button {
            width: 100px !important;
            height: 35px !important;
            font-size: 14px !important;
        }

        select {
            width: 180px !important;
            height: 35px !important;
            font-size: 14px !important;
        }
    }

    input {
        width: 50%;
        height: 40px;
        font-size: 18px;
        font-weight: lighter;
        box-sizing: border-box;
        padding: 0 20px 0 45px;
        border: none;
        background-image: url('https://founderspledge.com/assets/tool-eb55fd48ba43e5215980829385a8058d2ec5f357ab63be0d4c7758ccf0a4db77.svg');
        background-repeat: no-repeat;
        background-size: 24px 24px;
        background-position: 10px;
        border-radius: 1px;
    }

    button {
        width: 110px;
        height: 40px;
        border: none;
        font-size: 18px;
        font-weight: lighter;
        background-color: #5e001e;
        color: white;
        cursor: pointer;
    }

    select {
        width: 200px;
        height: 40px;
        margin-left: 20px;
        padding: 0 0 0 10px;
        font-size: 16px;
        font-weight: lighter;
        -webkit-appearance: none;
        -moz-appearance: none;
        -webkit-border-radius: 0px;
        -o-appearance: none;
        border: none;
        background: url('https://www.materialui.co/materialIcons/hardware/keyboard_arrow_down_black_192x192.png');
        background-position: 97% 50%;
        background-repeat: no-repeat;
        background-size: 25px;
        background-color: white;
    }
    select::-ms-expand { display: none; }
`;

export default class Header extends React.Component {
    constructor() {
        super();

        this.state = {
            searchInput: '',
            searchFilter: 'number'
        }
    }
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

                {this.props.displayStatus &&
                    <SearchContainer>
                        <input onChange={(text) => this.setState({ searchInput: text.target.value })} placeholder='Search...' />
                        {this.state.searchFilter === 'number' && this.state.searchInput ?
                            <Link to={'/certificate/' + this.state.searchInput}>
                                <button>Search</button>
                            </Link>
                            : this.state.searchInput ?
                                <Link to={{ pathname: '/search', query: { searchInfo: { searchInput: this.state.searchInput, searchFilter: this.state.searchFilter } } }}>
                                    <button>Search</button>
                                </Link> : <button>Search</button>
                        }
                        <select onChange={(input) => this.setState({ searchFilter: input.target.value })}>
                            <option value="number">Certificate Number</option>
                            <option value="email">Email</option>
                            <option value="nameOfBuyer">Name</option>
                            <option value="phoneNumber">Phone Number</option>
                        </select>
                    </SearchContainer>}

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