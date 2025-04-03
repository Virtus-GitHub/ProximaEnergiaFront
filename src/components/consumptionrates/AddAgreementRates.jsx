import React, { useState } from 'react';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import { ConsumptionRatesModal } from './ConsumptionRatesModal';

export const AddAgreementRates = ({ agreement, update }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => setIsModalOpen(true);

    const handleCloseModal = () => setIsModalOpen(false);

    const onClose = (added) => {
        handleCloseModal();
        if (added)
            update(true);
        else
            update(false);
    };

    return (
        <>
            <button
                id='add'
                disabled={agreement.length != 1}
                className='buttonAction'
                onClick={handleOpenModal}
            >
                Asociar Tarifas
            </button>
            <Tooltip anchorSelect="#add" place="top">
                Selecciona un acuerdo para asociar tarifas
            </Tooltip>
            <ConsumptionRatesModal
                agreement={agreement[0]}
                isOpen={isModalOpen}
                onClose={onClose}
            />
        </>
    )
}
