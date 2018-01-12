import React from 'react';
import './Certificate.css';
import { Link } from 'react-router-dom';
import { purchasedCertificates } from '../../PurchasedCertificates';
import Header from '../Header/Header';

export default class Certificate extends React.Component {
    constructor() {
        super();

        this.state = {
            certificateInfo: {},
            nameOfRedeemer: '',
            currentDate: '',
            currentTime: '',
            storeNumber: ''
        }
    }

    componentDidMount() {
        if (this.props.location.query) {
            this.setState({
                certificateInfo: this.props.location.query.certificateInfo,
                index: this.props.location.query.index
            })
        } else {
            purchasedCertificates.forEach((certificate, index) => {
                if (certificate.number === Number(this.props.match.params.certificate_number)) {
                    this.setState({
                        certificateInfo: certificate,
                        index: index
                    })
                }
            })
        }
    }

    displayInputs = () => {
        document.getElementById('certificate_inputs-container').style.display = 'flex';
    }

    redeemCertificate = () => {
        let newObj = Object.assign({}, purchasedCertificates[this.state.index])
        newObj.nameOfRedemption = this.state.nameOfRedeemer;
        newObj.storeRedeemed = this.state.storeNumber;
        newObj.dateRedeemed = this.state.currentDate;
        newObj.timeRedeemed = this.state.currentTime;
        newObj.status = 'Redeemed';
        purchasedCertificates[this.state.index] = newObj;
        this.setState({
            certificateInfo: newObj
        })
        document.getElementById('certificate_inputs-container').style.display = 'none';
    }

    render() {
        return (
            <div>
                <Header />
                <div className='cert_page_container'>
                    <section className='cert_header_container'>
                        <Link to='/dashboard' style={{ height: '100%' }}>
                            <div>
                                <img src='https://www.materialui.co/materialIcons/navigation/arrow_back_white_192x192.png' alt='' />
                                <h1>BACK</h1>
                            </div>
                        </Link>
                        <h1>CERTIFICATE #{this.state.certificateInfo.number}</h1>
                    </section>

                    <section className='cert_information_container'>
                        <header>
                            <h1>CERTIFICATE INFORMATION</h1>
                            <h2>#{this.state.certificateInfo.number}</h2>
                        </header>

                        <div className='cert_information_content_container'>
                            <section className='cert_info_title_container'>
                                <h1>TITLE</h1>
                                <h2>{this.state.certificateInfo.title}</h2>
                            </section>

                            <section className='cert_info_status_container'>
                                <h1>STATUS</h1>
                                <h2>{this.state.certificateInfo.status}</h2>
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
                                <h1>PRODUCT DESCRIPTION</h1>
                                <p>Nulla sollicitudin, diam eu cursus sollicitudin, libero quam tristique turpis, cursus consectetur nibh magna nec lectus. Nunc faucibus ut orci id efficitur.</p>
                            </section>

                            <section className='cert_buyer_coupon_container'>
                                <h1>COUPON CODE</h1>
                                <p>#53193</p>
                            </section>
                        </div>
                    </section>

                    <section className='cert_buyer_container' style={{ marginBottom: 0 }}>
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

                    <section className='cert_buyer_container' style={{ marginBottom: '0' }}>
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
                                <h2>{this.state.certificateInfo.storeRedeemed}</h2>
                            </section>

                            <section>
                                <h1>WHEN</h1>
                                <h2>{this.state.certificateInfo.dateRedeemed} - {this.state.certificateInfo.timeRedeemed}</h2>
                            </section>
                        </div>
                    </section>

                    <section className='cert_buyer_container'>
                        <header>
                            <h1>UNREDEEMED HISTORY</h1>
                            <h2>HIDE</h2>
                        </header>

                        <div className='cert_unredeemed_container'>
                            <section>
                                <h1>FULL NAME</h1>
                                <h2>{this.state.certificateInfo.nameOfRedemption}</h2>
                            </section>

                            <section>
                                <h1>STORE</h1>
                                <h2>{this.state.certificateInfo.storeRedeemed}</h2>
                            </section>

                            <section>
                                <h1>WHEN</h1>
                                <h2>{this.state.certificateInfo.dateRedeemed} - {this.state.certificateInfo.timeRedeemed}</h2>
                            </section>
                        </div>

                        <div className='cert_unredeemed_container'>
                            <section>
                                <h1>FULL NAME</h1>
                                <h2>{this.state.certificateInfo.nameOfRedemption}</h2>
                            </section>

                            <section>
                                <h1>STORE</h1>
                                <h2>{this.state.certificateInfo.storeRedeemed}</h2>
                            </section>

                            <section>
                                <h1>WHEN</h1>
                                <h2>{this.state.certificateInfo.dateRedeemed} - {this.state.certificateInfo.timeRedeemed}</h2>
                            </section>
                        </div>
                    </section>

                    <section className='cert_button_container'>
                        <button style={{ backgroundColor: '#42EA1A' }}>Redeem Certificate</button>
                        <button style={{ backgroundColor: '#65B3FF' }}>View Profile</button>
                    </section>

                    <section className='cert_buyer_container cert_redeeminfo_container'>
                        <header>
                            <h1>REDEEM INFO</h1>
                        </header>

                        <section className='cert_redeeminfo_content_container'>
                            <div>
                                <h1>FULL NAME</h1>
                                <input placeholder='James Sunderland...' />
                            </div>

                            <div>
                                <h1>STORE</h1>
                                <input placeholder='James Sunderland...' />
                            </div>
                        </section>


                        <section className='cert_redeeminfo_content_container'>
                            <div>
                                <h1>DATE</h1>
                                <input placeholder='James Sunderland...' />
                            </div>
                            
                            <div>
                                <h1>TIME</h1>
                                <input placeholder='James Sunderland...' />
                            </div>
                        </section>
                    </section>
                </div>
            </div>
        )
    }
}