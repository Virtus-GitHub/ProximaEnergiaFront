import React, { useState } from 'react';
import logo from './assets/logo.png';
import Agreements from './components/agreements/Agreements';
import { DeleteAgreements } from './components/agreements/DeleteAgreements';
import AddAgreementModal from './components/agreements/AddAgreement';
import { useGetFetch } from './hooks/useGetFetch';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

const CommercialAgreementsApp = () => {
    const { data, hasError, error, refresh } = useGetFetch('https://localhost:44395/api/AgreementMediator/GetAgreements');

    const [selectedAgreements, setSelectedAgreements] = useState([]);

    const [deletedAgreements, setDeletedAgreements] = useState('');

    const [showMessage, setShowMessage] = useState(false)

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => setIsModalOpen(true);

    const handleCloseModal = () => setIsModalOpen(false);

    const { data: agents } = useGetFetch('https://localhost:44395/api/CommercialAgents/GetAgents');

    const handleSelectedAgreement = (agreement, isChecked) => {
        if (isChecked)
            setSelectedAgreements(prevAgreements =>
                [...prevAgreements, agreement]);
        else
            setSelectedAgreements(prevAgreements =>
                prevAgreements.filter(item => item.idAcuerdo !== agreement.idAcuerdo));
    };

    const handleDelete = (deleted) => {
        refresh();

        setTimeout(() => {
            setShowMessage(true)
        }, 1000);

        if (!deleted)
            setDeletedAgreements('Algunos acuerdos no se han podido borrar, por favor compruebe los cambios.');

        else {
            setDeletedAgreements('Los acuerdos han sido borrados');
        }

        setTimeout(() => {
            setShowMessage(false)
        }, 3000);

        setSelectedAgreements([]);
    };

    if (hasError)
        return <div>Error al cargar los acuerdos comerciales. Por favor, intenta más tarde.</div>;

    if (!data)
        return <div>Cargando...</div>;

    return (
        <div>
            <div>
                <img src={logo} alt="logo" className="logo" />
            </div>
            <h1>Acuerdos Comerciales</h1>
            <Agreements
                agreements={data}
                handleSelectedAgreement={handleSelectedAgreement}
            />
            <div className='row actionButtonsDiv'>
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
                <DeleteAgreements
                    selectedAgreements={selectedAgreements}
                    onDelete={handleDelete}
                />
            </div>
            {
                showMessage && <div className='row resultMessage'>
                    <p>{deletedAgreements}</p>
                </div>
            }
            <AddAgreementModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSave={(newAgreement) => {
                    console.log("Nuevo acuerdo:", newAgreement);
                    handleCloseModal();
                }}
                agents={agents}
            />
        </div>
    )
};

export default CommercialAgreementsApp;
