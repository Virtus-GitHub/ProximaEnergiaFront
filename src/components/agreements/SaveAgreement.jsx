import React, {useState} from 'react'
import { MessageModal } from '../GeneralModals/MessageModal';

export const SaveAgreement = ({formData, onClose}) => {

    const [message, setMessage] = useState('');

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => setIsModalOpen(true);

    const handleCloseModal = () => setIsModalOpen(false);

    const onAdd = (added) => {
        if (!added)
            setMessage('El acuerdo no se ha podido añadir');
        else
            setMessage('El acuerdo ha sido añadido correctamente');

        handleOpenModal();
    }

    const SaveAgreement = async () => {
        const response = await fetch('https://localhost:44395/api/AgreementMediator/CreateNewAgreement',
            {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData)
            }).catch(err => {
                onClose(false);
                onAdd(false);
            });

        const resp = await response.json();

        onClose(true);

        if (resp?.length !== 0)
            onAdd(true);
        else
            onAdd(false);
    };

    return (
        <>
            <button
                className="modal-button primary"
                onClick={() => SaveAgreement()}
            >
                Guardar
            </button>
            <MessageModal
                message={message}
                isOpen={isModalOpen}
                onClose={handleCloseModal}
            />
        </>
    )
}
