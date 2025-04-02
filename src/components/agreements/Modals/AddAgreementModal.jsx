import React, { useState } from 'react';
import { SaveAgreement } from '../SaveAgreement';
import { MessageModal } from '../../GeneralModals/MessageModal';
import { useGetFetch } from '../../../hooks/useGetFetch';

export const AddAgreementModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    const [openModal, setOpenModal] = useState(true);

    const { data: agents, hasError, error, refresh } = useGetFetch('https://localhost:44395/api/CommercialAgents/GetAgents');

    const [formData, setFormData] = useState({
        idAgente: null,
        idTrabajador: null,
        fechaAlta: null,
        fechaBaja: null,
        ambito: null,
        duracionMeses: null,
        prorrogaAutomatica: true,
        duracionProrrogaMeses: null,
        exclusividad: 1,
        codFormaPago: null
    });

    const handleChange = (e) => {
        if (e.target.id === 'idAgente')
            setSelectedAgent(agents.filter(a => a.idAgente === e.target.value).nombre);

        const value = Validations(e.target.id, e.target.value);
        setFormData({
            ...formData,
            [e.target.id]: value
        });
    };

    const Validations = (item, value) => {
        if (item.startsWith('id') || item.startsWith('duracion'))
            return +value;

        if (item === 'prorrogaAutomatica')
            return value === 'true';

        return value;
    };

    const [selectedAgent, setSelectedAgent] = useState('');

    const closeModal = () => {
        setOpenModal(false);
        refresh();
    };

    if (hasError) {
            return (<MessageModal
                message={error.message}
                isOpen={openModal}
                onClose={closeModal}
            />);
        };

    return (
        <div className="row addAgreementContainer col-sm-12">
            <div className="addAgreementContent col-sm-12">
                <h2 className='addTitle'>Añadir Acuerdo</h2>
                <div className='divPropierties'>
                    <label htmlFor="idAgente">Agente</label>
                    <select id="idAgente" value={selectedAgent} onChange={handleChange} required>
                        <option value="">-- Selecciona un Agente --</option>
                        {agents?.map(agent => (
                            <option key={agent.idAgente} value={agent.idAgente}>
                                {agent.nombre.trim()} ({agent.nif.trim()})
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="idTrabajador">Trabajador</label>
                    <input id='idTrabajador' type="text" placeholder="ID Trabajador" onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="fechaAlta">Fecha Alta</label>
                    <input id='fechaAlta' type="date" placeholder="Fecha Alta" onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="fechaBaja">Fecha Baja</label>
                    <input id='fechaBaja' type="date" placeholder="Fecha Baja" onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="ambito">Ámbito</label>
                    <input id='ambito' type="text" placeholder="Ámbito" onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="duracionMeses">Duración (meses)</label>
                    <input id='duracionMeses' type="number" placeholder="Duración (meses)" onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="prorrogaAutomatica">Prórroga Automática</label>
                    <select id="prorrogaAutomatica" onChange={handleChange}>
                        <option value={true}>Si</option>
                        <option value={false}>No</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="duracionProrrogaMeses">Fecha Alta</label>
                    <input id='duracionProrrogaMeses' type="number" placeholder="Duración Prórroga (meses)" onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="exclusividad">Exclusividad</label>
                    <select id="exclusividad" onChange={handleChange}>
                        <option value={1}>Si</option>
                        <option value={0}>No</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="codFormaPago">Forma de Pago</label>
                    <input id='codFormaPago' type="text" placeholder="Código Forma de Pago" onChange={handleChange} />
                </div>
                <div className="modal-buttons">
                    <button className="modal-button secondary" onClick={onClose}>Cancelar</button>
                    <SaveAgreement
                        formData={formData}
                        onClose={onClose}
                    />
                </div>
            </div>
        </div>
    );
};

export default AddAgreementModal;

