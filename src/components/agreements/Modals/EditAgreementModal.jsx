import React, {useContext, useEffect, useState} from 'react'
import { MessageModal } from '../../GeneralModals/MessageModal';
import { useGetFetch } from '../../../hooks/useGetFetch';
import { AuthContext } from '../../../context/AuthContext';

export const EditAgreementModal = ({ agreement, isOpen, onEdited, onError }) => {
    if (!isOpen) return null;

    const { token } = useContext(AuthContext);

    const [openModal, setOpenModal] = useState(true);

    const { data: agents, hasError, error, refresh } = useGetFetch('https://localhost:44395/api/CommercialAgents/GetAgents');

    const [formData, setFormData] = useState({
            idAcuerdo: agreement.idAcuerdo,
            idAgente: agreement.idAgente,
            idTrabajador: agreement.idTrabajador,
            fechaAlta: agreement.fechaAlta,
            fechaBaja: agreement.fechaBaja,
            ambito: agreement.ambito,
            duracionMeses: agreement.duracionMeses,
            prorrogaAutomatica: agreement.prorrogaAutomatica,
            duracionProrrogaMeses: agreement.duracionProrrogaMeses,
            exclusividad: agreement.exclusividad,
            codFormaPago: agreement.codFormaPago
        });

    const [selectedAgent, setSelectedAgent] = useState('');

    useEffect(() => {
        setSelectedAgent((
            agreement.idAgente
        ));
    }, [agents]);

    const closeModal = () => {
        setOpenModal(false);
        refresh();
    };

    if (hasError) {
            return (<MessageModal
                        message={error.message}
                        isOpen={true}
                        onClose={onEdited}
                 />);
    };

    const EditAgreement = async() => {
        const response = await fetch('https://localhost:44395/api/AgreementMediator/UpdateAgreement',
            {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            }).catch(err => {
                onEdited(false);
            });

            if (response.status != 200){
                const error = await response.text();
                console.log(error);

                onEdited(false);
                onError(true);
            }
            else{
                const resp = await response.json();
        
                if(resp?.length !== 0)
                    onEdited(true);
                else
                    onEdited(false);
            }
    };

    const handleChange = (e) => {
        if(e.target.id === 'idAgente')
            setSelectedAgent(agents.filter(a => a.idAgente === e.target.value).idAgente);

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

    if (hasError) {
            return (<MessageModal
                message={error.message}
                isOpen={openModal}
                onClose={closeModal}
            />);
        };

    return (
        <div className="row addAgreementContainer">
            <div className="addAgreementContent">
                <h2 className='addTitle'>Editar Acuerdo</h2>
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
                    <input id='idTrabajador' type="text" placeholder="ID Trabajador" value={formData.idTrabajador ?? ''} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="fechaAlta">Fecha Alta</label>
                    <input id='fechaAlta' type="date" placeholder="Fecha Alta" value={formData.fechaAlta ?? ''} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="fechaBaja">Fecha Baja</label>
                    <input id='fechaBaja' type="date" placeholder="Fecha Baja" value={formData.fechaBaja ?? ''} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="ambito">Ámbito</label>
                    <input id='ambito' type="text" placeholder="Ámbito" value={formData.ambito ?? ''} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="duracionMeses">Duración (meses)</label>
                    <input id='duracionMeses' type="number" placeholder="Duración (meses)" value={formData.duracionMeses ?? 0} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="prorrogaAutomatica">Prórroga Automática</label>
                    <select id="prorrogaAutomatica" value={formData.prorrogaAutomatica ?? true} onChange={handleChange}>
                        <option value={true}>Si</option>
                        <option value={false}>No</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="duracionProrrogaMeses">Fecha Alta</label>
                    <input id='duracionProrrogaMeses' type="number" value={formData.duracionProrrogaMeses ?? 0} placeholder="Duración Prórroga (meses)" onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="exclusividad">Exclusividad</label>
                    <select id="exclusividad" value={formData.exclusividad ?? 1} onChange={handleChange}>
                        <option value={1}>Si</option>
                        <option value={0}>No</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="codFormaPago">Forma de Pago</label>
                    <input id='codFormaPago' type="text" placeholder="Código Forma de Pago" value={formData.codFormaPago ?? ''} onChange={handleChange} />
                </div>
                <div className="modal-buttons">
                    <button className="modal-button secondary" onClick={onEdited}>Cancelar</button>
                    <button className="modal-button primary" onClick={() => EditAgreement()}>Guardar</button>
                </div>
            </div>
        </div>
    )
}
