import React from 'react';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

const Agreements = ({ agreements, handleSelectedAgreement }) => {

    if (!agreements || agreements.length === 0)
        return <p>No hay acuerdos comerciales disponibles.</p>

    return (
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
                {agreements?.map((agreement) => (
                    <tr key={agreement.idAcuerdo} className='agreement'>
                        <td>
                            <input
                                type="checkbox"
                                className="form-check-input"
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
                            <button
                                id='edit'
                                className="bi bi-pencil editAgreement"
                            >
                            </button>
                            <Tooltip anchorSelect="#edit" place="top">
                                Edita este acuerdo
                            </Tooltip>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default Agreements;