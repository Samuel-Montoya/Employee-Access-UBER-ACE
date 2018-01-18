import React from 'react';
import { Link } from 'react-router-dom';
import { purchasedCertificates } from '../../PurchasedCertificates';

export class BackToSearch extends React.Component {
    render() {
        return (
            <div style={{ width: '1200px', display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '40px 0 60px 0' }}>
                <h1 style={{ marginBottom: '20px', fontSize: '30px' }}>Certificate has been updated.</h1>
                <Link style={{ width: '60%' }} to='/search'>
                    <button className='cert_redeemed_button' style={{ backgroundColor: '#960030', width: '100%', cursor: 'pointer' }}>Back To Search</button>
                </Link>
            </div>
        )
    }
}

export class RedeemCertificate extends React.Component {
    constructor() {
        super();

        this.state = {
            customerName: '',
            storeNumber: 937,
            currentDate: new Date().toLocaleDateString(),
            currentTime: new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
        }
    }

    redeemCertificate = () => {
        let tempCertificate;
        purchasedCertificates.forEach(certificate => {
            if (certificate.number === this.props.certificateInfo.number)
                tempCertificate = Object.assign({}, certificate)
        })
        tempCertificate.nameOfRedemption = this.state.customerName;
        tempCertificate.storeRedeemed = this.state.storeNumber;
        tempCertificate.dateRedeemed = this.state.currentDate;
        tempCertificate.timeRedeemed = this.state.currentTime;
        tempCertificate.status = 'Redeemed';
        purchasedCertificates.forEach((certificate, index) => {
            if (certificate.number === this.props.certificateInfo.number)
                purchasedCertificates[index] = tempCertificate;
        })

        this.props.updateState('certificateInfo', tempCertificate);
        this.props.updateState('showRedeemInfo', false);
        this.props.updateState('showBackToSearch', true);
        this.props.updateState('showButtonHeader', true);
    }

    render() {
        return (
            <div id='cert_redeem_controller'>
                <section className='cert_buyer_container cert_redeeminfo_container'>
                    <header>
                        <h1>REDEEM INFO</h1>
                    </header>

                    <section className='cert_redeeminfo_content_container'>
                        <div>
                            <h1>CUSTOMER FULL NAME *</h1>
                            <input id='cert_customer_input' placeholder='James Sunderland...' onChange={(text) => this.setState({ customerName: text.target.value })} />
                            <h1 id='uncomplete_text_controller' style={{ fontSize: '16px', marginTop: '10px', color: 'red', display: 'none' }}>Enter customer's full name.</h1>
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
                    <button onClick={() => { this.props.updateState('showRedeemInfo', false), this.props.updateState('showButtonHeader', true) }} style={{ backgroundColor: '#BC1B4B', width: '40%', height: '50px' }}>CANCEL</button>

                    {this.state.currentDate && this.state.currentTime && this.state.storeNumber && this.state.customerName ?
                        <button onClick={() => this.redeemCertificate()} style={{ backgroundColor: '#42EA1A', width: '40%', height: '50px' }}>REDEEM</button>
                        :
                        <button style={{ backgroundColor: 'dimgray', width: '40%', height: '50px' }} onClick={() => document.getElementById('uncomplete_text_controller').style.display = 'block'}>REDEEM</button>}
                </section>
            </div>
        )
    }
}

export class UnRedeemCertificate extends React.Component {

    unredeemCertificate = () => {
        let tempCertificate;
        purchasedCertificates.forEach(certificate => {
            if (certificate.number === this.props.certificateInfo.number)
                tempCertificate = Object.assign({}, certificate)
        })
        tempCertificate.nameOfRedemption = null;
        tempCertificate.storeRedeemed = null;
        tempCertificate.dateRedeemed = null;
        tempCertificate.timeRedeemed = null;
        tempCertificate.status = 'Redeemable';
        purchasedCertificates.forEach((certificate, index) => {
            if (certificate.number === this.props.certificateInfo.number)
                purchasedCertificates[index] = tempCertificate;
        })

        this.props.updateState('certificateInfo', tempCertificate)
        this.props.updateState('showButtonHeader', true);
        this.props.updateState('showBackToSearch', true);
        this.props.updateState('showUnRedeemInfo', false);
    }

    render() {
        return (
            <div id='cert_unredeem_notify_controller' style={{ width: '1200px', display: 'flex', alignItems: 'center', flexDirection: 'column', margin: '40px 0 60px 0' }}>
                <h1 style={{ fontSize: '30px' }}>Are you sure you want to unredeem this certificate?</h1>

                <div style={{ display: 'flex', justifyContent: 'space-around', width: '100%', marginTop: '20px' }}>
                    <button onClick={() => { this.props.updateState('showButtonHeader', true), this.props.updateState('showUnRedeemInfo', false) }} className='cert_redeemed_button' style={{ marginBottom: '20px', backgroundColor: '#960030' }}>CANCEL</button>
                    <button onClick={() => this.unredeemCertificate()} className='cert_redeemed_button' style={{ backgroundColor: '#63b3ff' }}>UNREDEEM</button>
                </div>
            </div>
        )
    }
}