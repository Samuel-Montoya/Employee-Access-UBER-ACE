import React from 'react';
import {Link} from 'react-router-dom';

export class BackToSearch extends React.Component {
    render() {
        return (
            <div style={{ width: '1200px', display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '40px 0 60px 0' }}>
                <h1 style={{ marginBottom: '20px', fontSize: '30px', fontWeight: 'bold' }}>Certificate has been redeemed.</h1>
                <Link style={{ width: '60%' }} to='/search'>
                    <button className='cert_redeemed_button' style={{ backgroundColor: '#960030', width: '100%', cursor: 'pointer' }}>Back To Search</button>
                </Link>
            </div>
        )
    }
}