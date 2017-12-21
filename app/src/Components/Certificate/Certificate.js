import React from 'react';
import './Certificate.css';
import { Link } from 'react-router-dom';
import { purchasedCertificates } from '../../PurchasedCertificates';

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
        } else {
            let certificateInfo = purchasedCertificates.filter(certificate => {
                return certificate.number === Number(this.props.match.params.certificate_number)
            })
            this.setState({
                certificateInfo: certificateInfo[0]
            })
        }
    }

    displayInputs = () => {
        document.getElementById('certificate_inputs-container').style.display = 'flex';
    }

    render() {
        let color = '#06ca21';
        if (this.state.certificateInfo.status === 'Redeemed')
            color = '#ce1616';
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

                <div className='certificate_page-container'>

                    <div className='certificate_buttons-container'>

                        <Link to='/dashboard'>
                            <div style={{ backgroundColor: '#989898' }} className='dashboard_buttons' >
                                <i style={{ color: 'white', backgroundColor: '#5f5f5f' }} className="fa fa-angle-left fa-2x" />
                                <h1>Go Back</h1>
                            </div>
                        </Link>

                        {this.state.certificateInfo.status === 'Redeemable' ?
                            <div disabled className='dashboard_buttons' style={{ backgroundColor: '#06ca21' }} onClick={() => this.displayInputs()} >
                                <i style={{ color: 'white', backgroundColor: '#09921c' }} className="fa fa-check fa-2x" />
                                <h1>Redeem</h1>
                            </div> :
                            <div disabled className='dashboard_buttons' style={{ backgroundColor: '#808080' }} >
                                <i style={{ color: 'white', backgroundColor: '#3e3e3e' }} className="fa fa-check fa-2x" />
                                <h1>Redeemed</h1>
                            </div>}



                        <div style={{ backgroundColor: '#de9626' }} className='dashboard_buttons' >
                            <i style={{ color: 'white', backgroundColor: '#c78216' }} className="fa fa-user fa-2x" />
                            <h1>View Profile</h1>
                        </div>

                    </div>

                    <div className='certificate_product-container' style={{ borderLeft: '3px solid ' + color }}>
                        <section className='certificate_product-header'>
                            <h2>{this.state.certificateInfo.title}</h2>
                            <h1>#{this.state.certificateInfo.number}</h1>
                        </section>
                        <hr className='certificate_header-underline' />
                        <section className='certificate_information-container'>
                            <h1>- ${this.state.certificateInfo.price}</h1>
                            <h1>- Expires on: 10/08/2018</h1>
                            <h1>- Purchased on: {this.state.certificateInfo.datePurchased}</h1>
                            <h1><span style={{ fontWeight: 'bold' }}>Product Description: </span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Elementum eu facilisis sed odio morbi.</h1>
                        </section>

                        <h2 style={{ marginTop: '25px' }}>Certificate Status</h2>
                        <hr className='certificate_header-underline' />
                        <section className='certificate_information-container' style={{ height: '250px' }}>
                            {this.state.certificateInfo.status === 'Redeemed'
                                ?
                                <h1><i style={{ backgroundColor: '#09921c' }} className="fa fa-check fa-1x" />{this.state.certificateInfo.status} by {this.state.certificateInfo.nameOfRedemption}</h1>
                                :
                                <h1><i style={{ backgroundColor: '#09921c' }} className="fas fa-shopping-cart fa-1x" />{this.state.certificateInfo.status}</h1>
                            }
                            <h2 style={{margin: '20px 0 20px 0'}}>Buyer Information</h2>
                            <h1><i style={{ backgroundColor: '#de9626' }} className="fa fa-user fa-1x" />{this.state.certificateInfo.nameOfBuyer}</h1>
                            <h1><i style={{ backgroundColor: '#1674c7', transform: 'rotate(90deg)' }} className="fa fa-phone fa-1x" />{this.state.certificateInfo.phoneNumber}</h1>
                            <h1><i style={{ backgroundColor: '#c71616' }} className="fa fa-envelope fa-1x" />{this.state.certificateInfo.email}</h1>
                            <h1><i style={{ backgroundColor: '#16c7b8' }} className="fa fa-clock fa-1x" />{this.state.certificateInfo.dateRedeemed} - {this.state.certificateInfo.timeRedeemed}</h1>
                            <h1><i style={{ backgroundColor: '#9e2020' }} className="fa fa-home fa-1x" />{this.state.certificateInfo.storeRedeemed}</h1>
                        </section>
                    </div>

                            <div id='certificate_inputs-container'>
                                <input placeholder='Name of Redeemer...' />
                                <input placeholder='Date...' />
                                <input placeholder='Time...' />
                                <input placeholder='Store Number...' />
                                <button>Redeem</button>
                            </div>
                </div>
            </div>
        )
    }
}