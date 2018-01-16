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
            isOpen: false,
            currentDate: '',
            currentTime: '',
            storeNumber: 947,
            customerName: ''
        }
    }

    componentDidMount() {
        window.scrollTo(0, 0);
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

    redeemViewController = () => {
        if (!this.state.isOpen) {
            document.getElementById('cert_redeem_controller').style.display = 'block';
            this.setState({
                isOpen: true
            })
        } else {
            document.getElementById('cert_redeem_controller').style.display = 'none';
            this.setState({
                isOpen: false
            })
        }

        this.setState({
            currentDate: new Date().toLocaleDateString(),
            currentTime: new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
        })
    }

    redeemCertificate = () => {
        let newObj = Object.assign({}, purchasedCertificates[this.state.index])
        newObj.nameOfRedemption = this.state.customerName;
        newObj.storeRedeemed = this.state.storeNumber;
        newObj.dateRedeemed = this.state.currentDate;
        newObj.timeRedeemed = this.state.currentTime;
        newObj.status = 'Redeemed';
        purchasedCertificates[this.state.index] = newObj;
        this.setState({
            certificateInfo: newObj
        })
        document.getElementById('cert_redeem_notify_controller').style.display = 'flex';
        document.getElementById('cert_redeem_controller').style.display = 'none';
    }

    unredeemCertificate = () => {
        let newObj = Object.assign({}, purchasedCertificates[this.state.index])
        newObj.nameOfRedemption = null;
        newObj.storeRedeemed = null;
        newObj.dateRedeemed = null;
        newObj.timeRedeemed = null;
        newObj.status = 'Redeemable';
        purchasedCertificates[this.state.index] = newObj;
        this.setState({
            certificateInfo: newObj
        })
        document.getElementById('cert_unredeem_notify_controller').style.display = 'none';
    }

    render() {
        return (
            <div>
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

                    <section className='cert_button_container'>
                        {this.state.certificateInfo.status === 'Redeemable'
                            ?
                            <button onClick={() => this.redeemViewController()} style={{ backgroundColor: '#42EA1A' }}>Redeem Certificate</button>
                            :
                            <button onClick={() => {document.getElementById('cert_unredeem_notify_controller').style.display = 'flex', document.getElementById('cert_redeem_notify_controller').style.display = 'none'}} style={{ backgroundColor: '#BC1B4B' }}>Unredeem Certificate</button>
                        }
                        <button style={{ backgroundColor: '#65B3FF' }}>View Profile</button>
                    </section>

                    <div id='cert_redeem_controller'>
                        <section className='cert_buyer_container cert_redeeminfo_container'>
                            <header>
                                <h1>REDEEM INFO</h1>
                            </header>

                            <section className='cert_redeeminfo_content_container'>
                                <div>
                                    <h1>CUSTOMER FULL NAME *</h1>
                                    <input id='cert_customer_input' placeholder='James Sunderland...' onChange={(text) => this.setState({ customerName: text.target.value })} />
                                </div>

                                <div>
                                    <h1>STORE *</h1>
                                    <input id='cert_store_input' placeholder='932' value={this.state.storeNumber} onChange={(text) => this.setState({ storeNumber: text.target.value })} />
                                </div>
                            </section>


                            <section className='cert_redeeminfo_content_container'>
                                <div>
                                    <h1>DATE *</h1>
                                    <input id='cert_date_input' placeholder='05/12/2018' value={this.state.currentDate} onChange={(text) => this.setState({ currentDate: text.target.value })} />
                                </div>

                                <div>
                                    <h1>TIME *</h1>
                                    <input id='cert_time_input' placeholder='3:30 PM' value={this.state.currentTime} onChange={(text) => this.setState({ currentTime: text.target.value })} />
                                </div>
                            </section>
                        </section>

                        <section className='cert_button_container' style={{ margin: '-20px 0 60px 0' }}>
                            <button onClick={() => this.redeemViewController()} style={{ backgroundColor: '#BC1B4B', width: '40%', height: '50px' }}>CANCEL</button>
                            {this.state.currentDate && this.state.currentTime && this.state.storeNumber && this.state.customerName ?
                                <button onClick={() => this.redeemCertificate()} style={{ backgroundColor: '#42EA1A', width: '40%', height: '50px' }}>REDEEM</button>
                                :
                                <button style={{ backgroundColor: 'dimgray', width: '40%', height: '50px' }}>REDEEM</button>}
                        </section>
                    </div>

                    <div id='cert_redeem_notify_controller' style={{ width: '1200px', display: 'none', flexDirection: 'column', alignItems: 'center', margin: '40px 0 60px 0' }}>
                        <h1 style={{ marginBottom: '20px', fontSize: '30px', fontWeight: 'bold' }}>Certificate has been redeemed.</h1>
                        <Link style={{ width: '60%' }} to='/search'>
                            <button className='cert_redeemed_button' style={{ backgroundColor: '#960030', width: '100%', cursor: 'pointer' }}>Back To Search</button>
                        </Link>
                    </div>

                    <div id='cert_unredeem_notify_controller' style={{ width: '1200px', display: 'none', alignItems: 'center', flexDirection: 'column', margin: '40px 0 60px 0' }}>
                        <h1 style={{fontSize: '30px', fontWeight: 'bold'}}>Are you sure you want to unredeem this certificate?</h1>

                        <div style={{display: 'flex', justifyContent: 'space-around', width: '100%', marginTop: '20px'}}>
                            <button onClick={() => document.getElementById('cert_unredeem_notify_controller').style.display = 'none'} className='cert_redeemed_button' style={{ marginBottom: '20px', backgroundColor: '#960030' }}>CANCEL</button>
                            <button onClick={() => this.unredeemCertificate()} className='cert_redeemed_button' style={{ backgroundColor: '#63b3ff' }}>UNREDEEM</button>
                        </div>
                    </div>

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
                                <h2 style={this.state.certificateInfo.status === 'Redeemable' ? { color: 'lime', fontWeight: 'bold' } : { color: 'red', fontWeight: 'bold' }}>{this.state.certificateInfo.status}</h2>
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
                                    <h2>{this.state.certificateInfo.storeRedeemed}</h2>
                                </section>

                                <section>
                                    <h1>WHEN</h1>
                                    <h2>{this.state.certificateInfo.dateRedeemed} - {this.state.certificateInfo.timeRedeemed}</h2>
                                </section>
                            </div>
                        </section>
                        :
                        null
                    }


                    <section id='cert_undredeemed_controller' className='cert_buyer_container'>
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
                </div>
            </div>
        )
    }
}