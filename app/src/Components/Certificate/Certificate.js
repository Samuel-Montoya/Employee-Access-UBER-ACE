import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { purchasedCertificates } from '../../PurchasedCertificates';
import Header from '../Header/Header';
import moment from 'moment';
import styled from 'styled-components';
import { RedeemCertificate, UnRedeemCertificate } from './CertificateComponents';
import 'babel-polyfill';

let PageContainer = styled.div`
    width: 100vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: rgb(245, 245, 245);
    min-height: 100%;

    button {
        border: none;
        width: 25%;
        min-width: 250px;
        height: 50px;
        font-size: 16px;
        color: white;
        font-weight: bolder;
        transition: all 0.2s ease;
    }

    button:hover {
        box-shadow: 0px -6px 0px rgba(0, 0, 0, 0.3) inset;
    }
    button:active {
        box-shadow: 0px -6px 0px rgba(0, 0, 0, 0.5) inset;
    }
`;
let CertHeaderContainer = styled.div`
    min-width: 900px;
    width: 60%;
    height: 60px;
    display: flex;
    margin-top: 150px;
    margin-bottom: 20px;
    position: relative;

    div {
        width: 150px;
        height: 80%;
        margin-top: 10px;
        display: flex;
        align-items: center;
        position: absolute;
        font-size: 18px;
        color: white;
        background-color: #505050;
    }
`;
let HeaderButtonContainer = styled.section`
    min-width: 900px;
    width: 60%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
`;
let BackButtonContainer = styled.div`
    transition: all 0.2s ease;
    img {    
        width: 25%;
        height: 80%;
        margin: 0 20px 0 10px;
    }
    &:hover {
        box-shadow: 0px -6px 0px rgba(0, 0, 0, 0.3) inset;
    }
`;
let Title = styled.h1`
    width: 100%;
    font-size: 34px;
    font-weight: bolder;
    color: rgb(43, 43, 43);
    display: flex;
    justify-content: center;
    align-items: center;
`;
let CertInformationContainer = styled.section`
    min-width: 900px;
    width: 60%;
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 2px solid #8E0E34;
    box-shadow: 2px 2px 5px rgb(163, 163, 163);
    margin-bottom: 40px;
    background-color: white;

    header {
        width: 100%;
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: bolder;
        color: white;
        background-color: #8E0E34;
        position: relative;
        margin-bottom: 40px;
        font-size: 18px;

        h1 {
            width: 100%;
            text-align: center;
        }

        h2 {
            margin-right: 10px;
        }
    }

    div {
        width: 95%;
        display: flex;
        justify-content: space-around;
        margin-bottom: 50px;

        p {
            font-weight: lighter;
            line-height: 30px;
            margin-top: 20px;
            color: rgb(43, 43, 43);
        }
    }

    section {
        font-size: 20px;
        font-weight: bolder;
        color: #8E0E34;
        
        ${props => props.small &&
        `text-align: center;`
    }

        h2 {
            font-weight: lighter;
            margin-top: 20px;
            color: rgb(43, 43, 43);
        }
    }
`;

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
            showRedeemInfo: false,
            showUnRedeemInfo: false,
            shouldRedirect: false
        }
    }

    componentWillReceiveProps(nextProps) {
        this.updateCertificate(true, nextProps.match.params.certificate_number);
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        this.updateCertificate(false);
    }

    updateCertificate = (fromHeader, certificateNumber) => {
        let newCertificateNumber;
        if (!fromHeader) {
            newCertificateNumber = this.props.match.params.certificate_number
        } else {
            newCertificateNumber = certificateNumber;
        }

        if (this.props.location.query && !fromHeader) {
            this.setState({
                certificateInfo: this.props.location.query.certificateInfo
            })
        } else {
            for (let certificate of purchasedCertificates) {
                if (certificate.number === Number(newCertificateNumber)) {
                    this.setState({
                        certificateInfo: certificate,
                        shouldRedirect: false
                    });
                    break;
                } else {
                    this.setState({
                        shouldRedirect: true
                    })
                }
            }
        }
    }

    updateState = (property, value) => {
        this.setState({
            [property]: value
        })
    }

    render() {
        if (this.state.shouldRedirect) {
            return <Redirect to={{ pathname: '/search', query: { resultsToShow: false } }} />
        }
        return (
            <div style={{ height: '100vh' }}>
                <Header displayStatus={true} />
                <PageContainer>
                    <CertHeaderContainer>
                        <Link to='/search'>
                            <BackButtonContainer>
                                <img src='https://www.materialui.co/materialIcons/navigation/arrow_back_white_192x192.png' alt='' />
                                <h1>BACK</h1>
                            </BackButtonContainer>
                        </Link>
                        <Title>CERTIFICATE #{this.state.certificateInfo.number}</Title>
                    </CertHeaderContainer>

                    <HeaderButtonContainer>
                        <button style={{ backgroundColor: '#65B3FF' }}>View Profile</button>
                        <button style={{ backgroundColor: '#ce2b2b' }}>View UnRedeemed History</button>
                        {this.state.certificateInfo.status === 'Redeemable'
                            ?
                            <button onClick={() => this.setState({ showRedeemInfo: true })} style={{ backgroundColor: '#48d20e' }}>Redeem Certificate</button>
                            :
                            <button onClick={() => { this.setState({ showUnRedeemInfo: true }) }} style={{ backgroundColor: '#BC1B4B' }}>Unredeem Certificate</button>
                        }
                    </HeaderButtonContainer>

                    {this.state.showRedeemInfo && <RedeemCertificate certificateInfo={this.state.certificateInfo} updateState={this.updateState} />}
                    {this.state.showUnRedeemInfo && <UnRedeemCertificate certificateInfo={this.state.certificateInfo} updateState={this.updateState} />}

                    <CertInformationContainer>
                        <header>
                            <h1>CERTIFICATE INFORMATION</h1>
                            <h2>#{this.state.certificateInfo.number}</h2>
                        </header>

                        <div>
                            <section style={{ width: '30%' }}>
                                <h1>PRODUCT</h1>
                                <h2>{this.state.certificateInfo.title}</h2>
                            </section>

                            <section style={{ width: '20%' }}>
                                <h1>STATUS</h1>
                                <h2 style={this.state.certificateInfo.status === 'Redeemable' ? { color: '#48d20e', fontWeight: 'bold' } : { color: 'red', fontWeight: 'bold' }}>{this.state.certificateInfo.status}</h2>
                            </section>

                            <section style={{ width: '20%', marginRight: '5%' }}>
                                <h1>PURCHASE DATE</h1>
                                <h2>{this.state.certificateInfo.datePurchased}</h2>
                            </section>

                            <section style={{ width: '25%' }}>
                                <h1>EXPIRATION DATE</h1>
                                <h2>12/04/2018</h2>
                            </section>
                        </div>

                        <div style={{ justifyContent: 'normal' }}>
                            <section style={{ width: '50%' }}>
                                <h1>STEPS TO PURCHASE</h1>
                                <p>
                                    1) Enter Coupon Code<br />
                                    2) Select Certifcate for Method of Payment<br />
                                    3) Enter Certificate Number
                                </p>
                            </section>

                            <section style={{ width: '25%' }}>
                                <h1>COUPON CODE</h1>
                                <p>#53193</p>
                            </section>
                        </div>
                    </CertInformationContainer>

                    <CertInformationContainer small>
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

                    </CertInformationContainer>
                    {this.state.certificateInfo.status === 'Redeemed'
                        &&
                        <CertInformationContainer small>
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
                                    <h1>LICENSE PLATE</h1>
                                    <h2>{this.state.certificateInfo.licensePlate}, {this.state.certificateInfo.carState}</h2>
                                </section>

                                <section>
                                    <h1>WHEN</h1>
                                    <h2>{moment(this.state.certificateInfo.dateRedeemed).format('dddd, MMMM Do YYYY')} - {moment(this.state.certificateInfo.dateRedeemed).format('h:mm a')}<br />{moment(this.state.certificateInfo.dateRedeemed).fromNow()}</h2>
                                </section>
                            </div>
                        </CertInformationContainer>}
                </PageContainer>
            </div>
        )
    }
}