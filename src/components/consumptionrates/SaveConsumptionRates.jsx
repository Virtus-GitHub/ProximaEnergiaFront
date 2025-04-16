import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

export const SaveConsumptionRates = ({ agreementRates, onClose }) => {
    const { token } = useContext(AuthContext);

    const SaveRates = async () => {
        const response = await fetch('https://localhost:44395/api/AgreementRatesMediator/AddAgreementRates',
            {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(agreementRates)
            }).catch(err => {
                onClose(false);
            });

        const resp = await response.json();  

        if (resp?.length !== 0)
            onClose(true);
        else
            onClose(false);
    };

    return (
        <>
            <button
                className="modal-button primary"
                onClick={() => SaveRates()}
            >
                Guardar
            </button>
        </>
    )
}
