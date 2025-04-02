import React from 'react';

export const SaveConsumptionRates = ({ agreementRates, onClose }) => {

    const SaveRates = async () => {
        const response = await fetch('https://localhost:44395/api/AgreementRatesMediator/AddAgreementRates',
            {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
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
