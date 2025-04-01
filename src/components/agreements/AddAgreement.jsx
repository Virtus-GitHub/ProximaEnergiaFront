import React, { useState } from 'react';

export const AddAgreement = ({ isOpen, onClose, onSave, agents }) => {

    if (!isOpen) return null;

    const [formData, setFormData] = useState({
        idAgente: '',
        idTrabajador: '',
        fechaAlta: '',
        fechaBaja: '',
        ambito: '',
        duracionMeses: '',
        prorrogaAutomatica: false,
        duracionProrrogaMeses: '',
        exclusividad: false,
        codFormaPago: ''
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
        onClose();
    };

    const [selectedAgent, setSelectedAgent] = useState('');

    const handleAgent = (event) => {
        const selectedId = event.target.value;
        setSelectedAgent(selectedId);
        if (onSelect) onSelect(selectedId);
    };

    return (
        <div className="row addAgreementContainer col-sm-12">
            <div className="addAgreementContent col-sm-12">
                <h2 className='addTitle'>Añadir Acuerdo</h2>
                <div className='divPropierties'>
                    <label htmlFor="IdAgente">Agente</label>
                    <select id="agentSelect" value={selectedAgent} onChange={handleAgent}>
                        <option value="">-- Selecciona un Agente --</option>
                        {agents?.map(agent => (
                            <option key={agent.idAgente} value={agent.idAgente}>
                                {agent.nombre.trim()} ({agent.nif.trim()})
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="IdTrabajador">Trabajador</label>
                    <input id='IdTrabajador' type="text" placeholder="ID Trabajador" />
                </div>
                <div>
                    <label htmlFor="FechaAlta">Fecha Alta</label>
                    <input id='FechaAlta' type="date" placeholder="Fecha Alta" />
                </div>
                <div>
                    <label htmlFor="FechaBaja">Fecha Baja</label>
                    <input id='FechaBaja' type="date" placeholder="Fecha Baja" />
                </div>
                <div>
                    <label htmlFor="Ambito">Ámbito</label>
                    <input id='Ambito' type="text" placeholder="Ámbito" />
                </div>
                <div>
                    <label htmlFor="Duracion">Duración (meses)</label>
                    <input id='Duracion' type="number" placeholder="Duración (meses)" />
                </div>
                <div>
                    <label htmlFor="prorroga">Prórroga Automática</label>
                    <select id="prorroga">
                        <option value={1}>Si</option>
                        <option value={0}>No</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="DuracionProrroga">Fecha Alta</label>
                    <input id='DuracionProrroga' type="number" placeholder="Duración Prórroga (meses)" />
                </div>
                <div>
                    <label htmlFor="exclusividad">Exclusividad</label>
                    <select id="exclusividad">
                        <option value={1}>Si</option>
                        <option value={0}>No</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="FormaPago">Exclusividad</label>
                    <input id='FormaPago' type="text" placeholder="Código Forma de Pago" />
                </div>
                <div className="modal-buttons">
                    <button className="modal-button secondary" onClick={onClose}>Cancelar</button>
                    <button className="modal-button primary" onClick={() => onSave()}>Guardar</button>
                </div>
            </div>
        </div>
    );
};

export default AddAgreement;

