import React, { useState } from 'react';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import AddAgreementModal from './Modals/AddAgreementModal';

export const AddAgreement = ({ update, onError }) => {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => setIsModalOpen(true);

    const handleCloseModal = () => setIsModalOpen(false);

    const onClose = (needUpdate) => {
        handleCloseModal();
        update(needUpdate);
    };

    return (
        <>
            <button
                id='add'
                className='buttonAction'
                onClick={handleOpenModal}
            >
                Añadir Acuerdo
            </button>
            <Tooltip anchorSelect="#add" place="top">
                Crea un nuevo acuerdo
            </Tooltip>
            <AddAgreementModal
                isOpen={isModalOpen}
                onClose={onClose}
                onError={onError}
            />
        </>
    )
}
