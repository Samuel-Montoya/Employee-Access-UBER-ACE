import React from 'react';
import { Link } from 'react-router-dom';
import { purchasedCertificates } from '../../PurchasedCertificates';
import styled, { keyframes } from 'styled-components';
import moment from 'moment';


let PopupContainer = styled.div`
    display: flex;
    justify-content: center;
    position: fixed;
    z-index: 10;
    margin-top: 100px;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.4);
`;
let animatetop = keyframes`
    0% {top:-300px; opacity:0;}
    100% {top:0; opacity:1;}
`;
let PopupContent = styled.section`
    position: relative;
    min-width: 900px;
    width: 50%;
    height: 350px;
    margin-top: 200px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 2px solid #8E0E34;
    box-shadow: 1px 0px 8px 2px #2f2f2f;
    margin-bottom: 40px;
    background-color: white;
    animation: ${animatetop} 0.4s;
    }
`;
let PopupHeader = styled.div`
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bolder;
    color: white;
    background-color: #8E0E34;
    margin-bottom: 20px;
    font-size: 18px;

    h1 {
        width: 100%;
        text-align: center;
    }

    span {
        margin: -3px 10px 0 0;
        font-size: 28px;
        cursor: pointer;
    }
`;
let PopupBody = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 90%;
    text-align: center;
`;


let BackToSearchContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    h1 {
        font-size: 28px;
        font-weight: lighter;
        margin: 30px 0 30px 0;
    }

    button {
        width: 100% !important;
        margin-bottom: 30px;
    }
`;
export class BackToSearch extends React.Component {
    render() {
        return (
            <PopupBody>
                <BackToSearchContainer>
                    <h1>Certificate has been updated.</h1>
                    <button style={{ backgroundColor: '#63b3ff' }} onClick={() => this.props.updateState(this.props.displayContainer, false)}>View Certificate</button>
                    <Link style={{ width: '100%' }} to='/search'>
                        <button style={{ backgroundColor: '#8E0E34', cursor: 'pointer' }}>Back To Search</button>
                    </Link>
                </BackToSearchContainer>
            </PopupBody>
        )
    }
}

let RedeemContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 24px;
    font-weight: lighter;

    button {
        width: 80% !important;
        margin: 10px 0 10px 0;
    }
    
    section {
        width: 80%;
        display: flex;
        justify-content: space-between;
        margin: 10px 0 10px 0;
        font-weight: bold;

        div {
            width: 50%;
            display: flex;
            flex-direction: column;
            align-items: flex-start;

            h1 {
                font-size: 18px;
                color: #8e0e34;
            }

            input {
                width: 90%;
                box-sizing: border-box;
                height: 40px;
                margin-top: 10px;
                font-size: 16px;
                padding: 0 0 0 10px;
                border: 1px solid #8E0E34;
            }
        }
    }
`;
export class RedeemCertificate extends React.Component {
    constructor() {
        super();

        this.state = {
            didRedeem: false,
            customerName: '',
            licensePlate: '',
            storeNumber: 937,
            currentDate: new Date().toLocaleDateString(),
            currentTime: new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
        }
    }

    redeemCertificate = () => {
        let tempCertificate;
        let time = moment(this.state.currentDate + ' ' + this.state.currentTime, "MM-DD-YYYY h:mm a")
        purchasedCertificates.forEach(certificate => {
            if (certificate.number === this.props.certificateInfo.number)
                tempCertificate = Object.assign({}, certificate)
        })
        tempCertificate.nameOfRedemption = this.state.customerName;
        tempCertificate.storeRedeemed = this.state.storeNumber;
        tempCertificate.dateRedeemed = time._d;
        tempCertificate.licensePlate = '4DFA3G';
        tempCertificate.status = 'Redeemed';
        purchasedCertificates.forEach((certificate, index) => {
            if (certificate.number === this.props.certificateInfo.number)
                purchasedCertificates[index] = tempCertificate;
        })

        this.props.updateState('certificateInfo', tempCertificate);
        this.setState({ didRedeem: true })
    }

    render() {
        return (
            <PopupContainer>
                <PopupContent>
                    <PopupHeader>
                        <h1>Redeem Certificate</h1>
                        <span onClick={() => { this.props.updateState('showButtonHeader', true); this.props.updateState('showRedeemInfo', false); }}>&times;</span>
                    </PopupHeader>

                    {this.state.didRedeem ?
                        <BackToSearch updateState={this.props.updateState} displayContainer='showRedeemInfo' />
                        :
                        <PopupBody>
                            <RedeemContainer>
                                <h1 style={{ marginBottom: '10px' }}>Fill out all * fields:</h1>
                                <section>
                                    <div>
                                        <h1>CUSTOMER FULL NAME *</h1>
                                        <input placeholder='Full Name...' onChange={(text) => this.setState({ customerName: text.target.value })} />
                                        <h1 id='uncomplete_text_controller' style={{ fontSize: '16px', marginTop: '10px', color: 'red', display: 'none' }}>Enter customer's full name.</h1>
                                    </div>

                                    <div>
                                        <h1 style={{ marginLeft: '30px' }}>LICENSE PLATE *</h1>
                                        <input placeholder='License Plate #...' value={this.state.licensePlate} onChange={(text) => this.setState({ licensePlate: text.target.value.toUpperCase() })} style={{ alignSelf: 'flex-end' }} />
                                    </div>
                                </section>

                                <section>
                                    <div>
                                        <h1>DATE *</h1>
                                        <input placeholder='05/12/2018...' value={this.state.currentDate} onChange={(text) => this.setState({ currentDate: text.target.value })} />
                                    </div>

                                    <div>
                                        <h1 style={{ marginLeft: '30px' }}>STORE *</h1>
                                        <input placeholder='947...' value={this.state.storeNumber} onChange={(text) => this.setState({ storeNumber: text.target.value })} style={{ alignSelf: 'flex-end' }} />
                                    </div>

                                    <div>
                                        <h1 style={{ marginLeft: '30px' }}>TIME *</h1>
                                        <input placeholder='3:30 PM...' value={this.state.currentTime} onChange={(text) => this.setState({ currentTime: text.target.value })} style={{ alignSelf: 'flex-end' }} />
                                    </div>
                                </section>
                                {this.state.currentDate && this.state.currentTime && this.state.storeNumber && this.state.customerName && this.state.licensePlate ?
                                    <button onClick={() => this.redeemCertificate()} style={{ backgroundColor: '#42EA1A' }}>Redeem</button>
                                    :
                                    <button style={{ backgroundColor: 'dimgray' }} onClick={() => document.getElementById('uncomplete_text_controller').style.display = 'block'}>Redeem</button>}
                            </RedeemContainer>
                        </PopupBody>
                    }
                </PopupContent>
            </PopupContainer>
        )
    }
}


let UnRedeemContainer = styled.div`
    width: 70%;
    display: flex;
    flex-direction: column;

    h1 {
        font-size: 22px;
        font-weight: lighter;
        margin: 10px 0 20px 0;
    }

    textarea {
        width: 100%;
        height: 100px;
        box-sizing: border-box;
        font-size: 18px;
        margin-top: 10px;
        resize: none;
        font-family: inherit;
    }

    button {
        margin-top: 20px;
        width: 100% !important;
    }
`;
export class UnRedeemCertificate extends React.Component {

    constructor() {
        super();

        this.state = {
            reasonText: '',
            didUnredeem: false
        }
    }

    unredeemCertificate = () => {
        let tempCertificate;
        purchasedCertificates.forEach(certificate => {
            if (certificate.number === this.props.certificateInfo.number)
                tempCertificate = Object.assign({}, certificate)
        })
        tempCertificate.nameOfRedemption = null;
        tempCertificate.storeRedeemed = null;
        tempCertificate.dateRedeemed = null;
        tempCertificate.status = 'Redeemable';
        purchasedCertificates.forEach((certificate, index) => {
            if (certificate.number === this.props.certificateInfo.number)
                purchasedCertificates[index] = tempCertificate;
        })
        this.setState({ didUnredeem: true })
        this.props.updateState('certificateInfo', tempCertificate)
    }

    render() {
        return (
            <PopupContainer>
                <PopupContent>
                    <PopupHeader>
                        <h1>Unredeem Certificate</h1>
                        <span onClick={() => { this.props.updateState('showButtonHeader', true); this.props.updateState('showUnRedeemInfo', false); }}>&times;</span>
                    </PopupHeader>

                    {this.state.didUnredeem ?
                        <BackToSearch updateState={this.props.updateState} displayContainer='showUnRedeemInfo' />
                        :
                        <PopupBody>
                            <UnRedeemContainer>
                                <h1>Provide a reason for unredemption:</h1>
                                <textarea onChange={(text) => this.setState({ reasonText: text.target.value })} />
                                {this.state.reasonText ? <button style={{ backgroundColor: '#48d20e' }} onClick={() => this.unredeemCertificate()}>Unredeem</button>
                                    : <button style={{ backgroundColor: 'dimgray' }}>Unredeem</button>}
                            </UnRedeemContainer>
                        </PopupBody>
                    }
                </PopupContent>
            </PopupContainer>
        )
    }
}