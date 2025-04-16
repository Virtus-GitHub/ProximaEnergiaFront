import React from 'react';
import logo from './assets/logo.png';
import Agreements from './components/agreements/Agreements';

const CommercialAgreementsApp = () => {

    return (
            <div>
                <div>
                    <img src={logo} alt="logo" className="logo" />
                </div>
                <h1>Acuerdos Comerciales</h1>
                <Agreements />
            </div>
    )
};

export default CommercialAgreementsApp;
