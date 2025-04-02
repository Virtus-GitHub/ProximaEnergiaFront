import React, { useState } from 'react';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import { EditAgreementModal } from './Modals/EditAgreementModal';

export const EditAgreement = ({ agreement, update }) => {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => setIsModalOpen(true);

    const handleCloseModal = () => setIsModalOpen(false);

    const Edition = () => {
        console.log(agreement);
        handleOpenModal();
    };

    const onEdited = (needUpdate) => {
        handleCloseModal();
        update(needUpdate);
    };

    return (
        <>
            <button
                id='edit'
                className="bi bi-pencil editAgreement"
                onClick={() => Edition(agreement)}
            >
            </button>
            <Tooltip anchorSelect="#edit" place="top">
                Edita este acuerdo
            </Tooltip>
            <EditAgreementModal
                agreement={agreement}
                isOpen={isModalOpen}
                onEdited={onEdited}
            />
        </>
    )
}
