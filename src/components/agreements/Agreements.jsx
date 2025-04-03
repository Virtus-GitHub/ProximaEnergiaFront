import React, { useEffect, useState } from 'react';
import { useGetFetch } from '../../hooks/useGetFetch';
import { EditAgreement } from './EditAgreement';
import { AddAgreement } from './AddAgreement';
import { DeleteAgreements } from './DeleteAgreements';
import { MessageModal } from '../GeneralModals/MessageModal';
import { AddAgreementRates } from '../consumptionrates/AddAgreementRates';

const Agreements = () => {
    const [openModal, setOpenModal] = useState(false);

    const { data, hasError, error, refresh } = useGetFetch('https://localhost:44395/api/AgreementMediator/GetAgreements');

    const [agreements, setAgreements] = useState([]);

    const [version, setVersion] = useState(0);

    const [showMessage, setShowMessage] = useState(false);

    const [message, setMessage] = useState('');

    useEffect(() => {
        refresh();
    }, [version]);

    useEffect(() => {
        if (data) {
            setAgreements(data.map(agreement => ({ ...agreement, checked: false })));
        }
    }, [data]);

    const [currentPage, setCurrentPage] = useState(1);
    const agreementsPerPage = 5;

    const indexOfLastAgreement = currentPage * agreementsPerPage;
    const indexOfFirstAgreement = indexOfLastAgreement - agreementsPerPage;
    const currentAgreements = agreements?.slice(indexOfFirstAgreement, indexOfLastAgreement);
    const totalPages = Math.ceil(agreements?.length / agreementsPerPage);

    const [selectedAgreements, setSelectedAgreements] = useState([]);

    const handleSelectedAgreement = (agreement, checked) => {
        if (checked)
            setSelectedAgreements(prevAgreements =>
                [...prevAgreements, agreement]);
        else
            setSelectedAgreements(prevAgreements =>
                prevAgreements.filter(item => item.idAcuerdo !== agreement.idAcuerdo));
    };

    if (!agreements)
        return <div>Cargando...</div>;

    if (!agreements || agreements.length === 0)
        return <p>No hay acuerdos comerciales disponibles. Por favor espere...</p>

    const update = (needUpdate = false) => {
        if (needUpdate)
            setVersion(version + 1);
    };

    const closeModal = () => {
        setOpenModal(false);
        refresh();
    };

    const agreementRatesAdded = (added) => {
        if (added)
            setMessage('Las tarifas se han asociado correctamente');
        else
            setMessage('Las tarifas no se han podido asociar');

        setOpenModal(true);
        handleSelectedAgreement(selectedAgreements[0], false);
    };

    const onError = (error) => {
        if (error) {
            setMessage('Se ha producido un error inesperado, por favor contacte con el administrador.');
            setOpenModal(true);
        };
    };

    if (hasError) {
        setMessage(error.message);
        setOpenModal(true);
    };

    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>ID Agente</th>
                        <th>ID Trabajador</th>
                        <th>Fecha Alta</th>
                        <th>Fecha Baja</th>
                        <th>Ámbito</th>
                        <th>Duración (meses)</th>
                        <th>Prórroga Automática</th>
                        <th>Duración Prórroga (meses)</th>
                        <th>Exclusividad</th>
                        <th>Código Forma de Pago</th>
                        <th>Acción</th>
                    </tr>
                </thead>
                <tbody>
                    {currentAgreements?.map((agreement) => (
                        <tr key={agreement.idAcuerdo} className='agreement'>
                            <td>
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    checked={selectedAgreements.some(item => item.idAcuerdo === agreement.idAcuerdo)}
                                    onChange={(e) => handleSelectedAgreement(agreement, e.target.checked)}
                                />
                            </td>
                            <td>{agreement.idAgente}</td>
                            <td>{agreement.idTrabajador}</td>
                            <td>{agreement.fechaAlta}</td>
                            <td>{agreement.fechaBaja}</td>
                            <td>{agreement.ambito}</td>
                            <td>{agreement.duracionMeses}</td>
                            <td>{agreement.prorrogaAutomatica ? "Sí" : "No"}</td>
                            <td>{agreement.duracionProrrogaMeses}</td>
                            <td>{agreement.exclusividad ? "Sí" : "No"}</td>
                            <td>{agreement.codFormaPago}</td>
                            <td className="td-icons">
                                <EditAgreement
                                    agreement={agreement}
                                    update={update} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="pagination">
                <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                >
                    Anterior
                </button>

                <span>Página {currentPage} de {totalPages}</span>

                <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                >
                    Siguiente
                </button>
            </div>
            <div className='row actionButtonsDiv'>
                <AddAgreement
                    update={update}
                    onError={onError} />
                <AddAgreementRates
                    agreement={selectedAgreements}
                    update={agreementRatesAdded} />
                <DeleteAgreements
                    selectedAgreements={selectedAgreements}
                    onDelete={update}
                />
            </div>
            {
                showMessage && <div className='resultMessage'><p style={{ color: 'green' }}>{message}</p></div>
            }
            <MessageModal
                message={message}
                isOpen={openModal}
                onClose={closeModal}
            />
        </>
    );
};

export default Agreements;