import React from 'react';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

export const DeleteAgreements = ({ selectedAgreements, onDelete }) => {

    const sendAgreementsToDelete = async () => {
        const response = await fetch('https://localhost:44395/api/AgreementMediator/DeleteAgreementList',
            {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(selectedAgreements)
            });
        const resp = await response.json();

        if (resp.length === 0)
            onDelete(true);
        else
            onDelete(false);
    };

    return (
        <>
            <button
                id='delete'
                disabled={selectedAgreements.length === 0}
                className="buttonAction deleteButton"
                onClick={sendAgreementsToDelete}
            >
                Borrar Seleccionados
            </button>
            <Tooltip anchorSelect="#delete" place="top">
                Borra los acuerdos seleccionados, <br />hay que seleccionar al menos un acuerdo.
            </Tooltip>
        </>
    )
};
