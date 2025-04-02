import React, { useState } from 'react';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import { MessageModal } from '../GeneralModals/MessageModal';

export const DeleteAgreements = ({ selectedAgreements, onDelete }) => {

    const [message, setMessage] = useState('');

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => setIsModalOpen(true);

    const handleCloseModal = () => setIsModalOpen(false);

    const itemsDeleted = (deleted) => {
        if (!deleted) {
            setMessage('Algunos acuerdos no se han podido borrar, por favor compruebe los cambios.');
        }
        else {
            setMessage('Los acuerdos han sido borrados');
        }

        handleOpenModal();
    }

    const sendAgreementsToDelete = async () => {
        const response = await fetch('https://localhost:44395/api/AgreementMediator/DeleteAgreementList',
            {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(selectedAgreements)
            })
            .catch(err => {
                itemsDeleted(false);
            });

        const resp = await response.json();

        onDelete(true);

        if (resp.length === 0)
            itemsDeleted(true);
        else
            itemsDeleted(false);
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
            <MessageModal
                message={message}
                isOpen={isModalOpen}
                onClose={handleCloseModal}
            />
        </>
    )
};
