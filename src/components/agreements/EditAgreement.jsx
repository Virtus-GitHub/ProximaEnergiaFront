import React, { useState } from 'react';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import { EditAgreementModal } from './Modals/EditAgreementModal';
import { MessageModal } from '../GeneralModals/MessageModal';

export const EditAgreement = ({ agreement, update }) => {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [openErrorModal, setOpenErrorModal] = useState(false);

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

    const onError = (error) => {
        if(error){
            setOpenErrorModal(true);
        };
    };

    const closeModal = () => {
        setOpenErrorModal(false);
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
                onError={onError}
            />
            <MessageModal
                message={'Se ha producido un error al editar, por favor contacte con el admninistrador'}
                isOpen={openErrorModal}
                onClose={closeModal} />
        </>
    )
}
