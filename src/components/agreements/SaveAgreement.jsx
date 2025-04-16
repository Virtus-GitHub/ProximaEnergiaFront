import React, {useContext, useState} from 'react'
import { MessageModal } from '../GeneralModals/MessageModal';
import { AuthContext } from '../../context/AuthContext';

export const SaveAgreement = ({formData, onClose, onError}) => {
    const { token } = useContext(AuthContext);

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
                    'Content-Type': "application/json",
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            }).catch(err => {
                onClose(false);
                onAdd(false);
            });

            if (response.status != 200){
                const error = await response.text();
                console.log(error);

                onAdd(false);
                onClose(true);
                onError(true);
            }
            else{
                const resp = await response.json();

                onClose(true);
                onError(false);
        
                if (resp?.length !== 0)
                    onAdd(true);
                else
                    onAdd(false);
            }
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
