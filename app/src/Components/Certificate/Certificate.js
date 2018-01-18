import React from 'react';
import './Certificate.css';
import { Link } from 'react-router-dom';
import { purchasedCertificates } from '../../PurchasedCertificates';
import Header from '../Header/Header';
import moment from 'moment';

import { BackToSearch, RedeemCertificate, UnRedeemCertificate } from './CertificateComponents'


export default class Certificate extends React.Component {
    constructor() {
        super();

        this.state = {
            certificateInfo: {},
            isOpen: false,
            currentDate: '',
            currentTime: '',
            storeNumber: 947,
            customerName: '',
            showButtonHeader: true,
            showBackToSearch: false,
            showRedeemInfo: false,
            showUnRedeemInfo: false
        }
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        if (this.props.location.query) {
            this.setState({
                certificateInfo: this.props.location.query.certificateInfo
            })
        } else {
            purchasedCertificates.forEach((certificate, index) => {
                if (certificate.number === Number(this.props.match.params.certificate_number)) {
                    this.setState({
                        certificateInfo: certificate
                    })
                }
            })
        }
    }

    updateState = (property, value) => {
        this.setState({
            [property]: value
        })
    }

    render() {
        return (
            <div style={{ height: '100vh' }}>
                <Header />
                <div className='cert_page_container'>
                    <section className='cert_header_container'>
                        <Link to='/search' style={{ height: '100%' }}>
                            <div>
                                <img src='https://www.materialui.co/materialIcons/navigation/arrow_back_white_192x192.png' alt='' />
                                <h1>BACK</h1>
                            </div>
                        </Link>
                        <h1>CERTIFICATE #{this.state.certificateInfo.number}</h1>
                    </section>

                    {this.state.showButtonHeader ?
                        <section className='cert_button_container'>
                            {this.state.certificateInfo.status === 'Redeemable'
                                ?
                                <button onClick={() => this.setState({ showButtonHeader: false, showRedeemInfo: true, showBackToSearch: false })} style={{ backgroundColor: '#48d20e' }}>Redeem Certificate</button>
                                :
                                <button onClick={() => { this.setState({ showBackToSearch: false, showButtonHeader: false, showUnRedeemInfo: true }) }} style={{ backgroundColor: '#BC1B4B' }}>UnRedeem Certificate</button>
                            }
                            <button style={{ backgroundColor: '#65B3FF' }}>View Profile</button>
                        </section>
                        :
                        null}


                    {this.state.showRedeemInfo && <RedeemCertificate certificateInfo={this.state.certificateInfo} updateState={this.updateState} />}

                    {this.state.showUnRedeemInfo && <UnRedeemCertificate certificateInfo={this.state.certificateInfo} updateState={this.updateState} />}

                    {this.state.showBackToSearch && <BackToSearch />}



                    <section className='cert_information_container'>
                        <header>
                            <h1>CERTIFICATE INFORMATION</h1>
                            <h2>#{this.state.certificateInfo.number}</h2>
                        </header>

                        <div className='cert_information_content_container'>
                            <section className='cert_info_title_container'>
                                <h1>PRODUCT</h1>
                                <h2>{this.state.certificateInfo.title}</h2>
                            </section>

                            <section className='cert_info_status_container'>
                                <h1>STATUS</h1>
                                <h2 style={this.state.certificateInfo.status === 'Redeemable' ? { color: '#48d20e', fontWeight: 'bold' } : { color: 'red', fontWeight: 'bold' }}>{this.state.certificateInfo.status}</h2>
                            </section>

                            <section className='cert_info_purchase_container'>
                                <h1>PURCHASE DATE</h1>
                                <h2>{this.state.certificateInfo.datePurchased}</h2>
                            </section>

                            <section className='cert_info_expiration_container'>
                                <h1>EXPIRATION DATE</h1>
                                <h2>12/04/2018</h2>
                            </section>
                        </div>

                        <div className='cert_buyer_information_content_container'>
                            <section className='cert_buyer_description_container'>
                                <h1>STEPS TO PURCHASE</h1>
                                <p>
                                    1) Enter Coupon Number<br />
                                    2) Select Certifcate for Method of Payment<br />
                                    3) Enter Certificate Number
                                </p>
                            </section>

                            <section className='cert_buyer_coupon_container'>
                                <h1>COUPON CODE</h1>
                                <p>#53193</p>
                            </section>
                        </div>
                    </section>

                    <section className='cert_buyer_container'>
                        <header>
                            <h1>BUYER INFORMATION</h1>
                        </header>

                        <div>
                            <section>
                                <h1>FULL NAME</h1>
                                <h2>{this.state.certificateInfo.nameOfBuyer}</h2>
                            </section>

                            <section>
                                <h1>EMAIL</h1>
                                <h2>{this.state.certificateInfo.email}</h2>
                            </section>

                            <section>
                                <h1>PHONE</h1>
                                <h2>{this.state.certificateInfo.phoneNumber}</h2>
                            </section>
                        </div>

                    </section>

                    {this.state.certificateInfo.status === 'Redeemed'
                        ?
                        <section className='cert_buyer_container'>
                            <header>
                                <h1>REDEEMER INFORMATION</h1>
                            </header>

                            <div>
                                <section>
                                    <h1>FULL NAME</h1>
                                    <h2>{this.state.certificateInfo.nameOfRedemption}</h2>
                                </section>

                                <section>
                                    <h1>STORE</h1>
                                    <h2>#{this.state.certificateInfo.storeRedeemed}</h2>
                                </section>

                                <section>
                                    <h1>WHEN</h1>
                                    <h2>{this.state.certificateInfo.dateRedeemed} - {this.state.certificateInfo.timeRedeemed}</h2>
                                    <h3>{moment(this.state.certificateInfo.dateRedeemed, 'MM-DD-YYYY').fromNow()}</h3>
                                </section>
                            </div>
                        </section>
                        :
                        null}
                </div>
            </div>
        )
    }
}