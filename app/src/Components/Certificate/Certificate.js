import React from 'react';
import './Certificate.css';
import { Link } from 'react-router-dom';

export default class Certificate extends React.Component {
    constructor() {
        super();

        this.state = {
            certificateInfo: {}
        }
    }

    componentDidMount() {

        if (this.props.location.query) {
            this.setState({
                certificateInfo: this.props.location.query.certificateInfo
            })
        }
    }

    render() {
        console.log(this.props);
        return (
            <div className='dashboard_container'>
                <header className='dashboard_header'>
                    <Link to='/dashboard'>
                        <img src='http://www.jiffylubesocal.com/wp-content/themes/jiffy/images/main-logo.png' alt='' />
                    </Link>
                    <Link to='/login'>
                        <h1>Log Out</h1>
                    </Link>
                </header>

                <div className='certificate_product-container'>
                    {this.state.certificateInfo.title}
                    {this.state.certificateInfo.number}
                    {this.state.certificateInfo.status}
                    {this.state.certificateInfo.price}
                    {this.state.certificateInfo.nameOfBuyer}
                    {this.state.certificateInfo.phoneNumber}
                    {this.state.certificateInfo.email}
                </div>
            </div>
        )
    }
}