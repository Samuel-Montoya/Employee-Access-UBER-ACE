import React from 'react';
import { Link } from 'react-router-dom';
import { purchasedCertificates } from '../../PurchasedCertificates';
import styled, { keyframes } from 'styled-components';


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
    position: relative;
    margin-bottom: 20px;
    font-size: 18px;

    span {
        position: absolute;
        right: 0;
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
                    <Link style={{ width: '100%' }} to='/search'>
                        <button style={{ backgroundColor: '#8E0E34', cursor: 'pointer' }}>Back To Search</button>
                    </Link>
                    <button style={{ backgroundColor: '#63b3ff' }} onClick={() => this.props.updateState(this.props.displayContainer, false)}>View Certificate</button>
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
                        <button style={{ backgroundColor: 'dimgray', width: '40%', height: '50px' }} onClick={() => document.getElementById('uncomplete_text_controller').style.display = 'block'}>REDEEM</button>}
                </section>
            </div>
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
        tempCertificate.timeRedeemed = null;
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
                                <textarea onChange={(text) => this.setState({reasonText: text.target.value})} />
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