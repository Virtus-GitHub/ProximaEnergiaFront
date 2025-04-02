import React, { useEffect, useState } from 'react';
import { useGetFetch } from '../../hooks/useGetFetch';
import { SaveConsumptionRates } from './SaveConsumptionRates';

export const ConsumptionRatesModal = ({ agreement, isOpen, onClose }) => {
    if (!isOpen) return null;

    const { data: rates, hasError, error, refresh } = useGetFetch('https://localhost:44395/api/ConsumptionRatesMediator/GetConsumptionRates');

    const [currentRates, setCurrentRates] = useState([]);

    const [selectedAgreementRates, setSelectedAgreementRates] = useState([]);

    const [filteredRates, setFilteredRates] = useState(rates);

    useEffect(() => {
        setCurrentRates(rates);
    }, [rates]);

    useEffect(() => {
        setFilteredRates((
            rates?.filter(
                (rate, index, self) =>
                    index === self.findIndex((a) => a.nombre.trim() === rate.nombre.trim())
            )));
    }, [rates]);

    const handleSelectedRate = (rate, checked) => {
        setSelectedAgreementRates(prevRates => {
            if (checked) {
                if (!prevRates.some(item => item.idTarifa === rate.idTarifa)) {
                    return [...prevRates, { idAcuerdo: agreement.idAcuerdo, idTarifa: rate.idTarifa, porcRenovacion: 100, fechaVigor: getDate() }];
                }
                return prevRates;
            } else {
                return prevRates.filter(item => item.idTarifa !== rate.idTarifa);
            }
        });
    };

    const handleFilterRates = (event) => {
        setCurrentRates(rates?.filter(r => r.nombre === event.target.value));
    };

    const getDate = () => {
        const today = new Date();
        const dd = today.getDate() < 10 ? '0'+ today.getDate() : today.getDate();
        const mm = (today.getMonth() + 1) < 10 ? '0'+ (today.getMonth() + 1) : (today.getMonth() + 1);
        const yyyy = today.getFullYear();

        return `${yyyy}-${mm}-${dd}`;
    };

    return (
        <>
            <div className="row ratesContainer">
                <div className="ratesContent col-sm-12">
                    <h1>Tarifas Consumo</h1>
                    <div className='row'>
                        <p className='fl'>Selecciona una tarifa</p>
                        <select className='fl' onChange={handleFilterRates}>
                            <option value="">-- Selecciona --</option>
                            {filteredRates?.map(rate => (
                                <option key={rate.idTarifa} value={rate.nombre}>
                                    {rate.nombre.trim()}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Nombre</th>
                                    <th>Cod. Tarifa Acceso</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentRates?.map((rate) => (
                                    <tr key={rate.idTarifa} className='agreement'>
                                        <td>
                                            <input
                                                type="checkbox"
                                                className="form-check-input"
                                                onChange={(e) => handleSelectedRate(rate, e.target.checked)}
                                            />
                                        </td>
                                        <td>{rate.nombre}</td>
                                        <td>{rate.codTarifaAcceso}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="modal-buttons ratesButtons" >
                        <button
                            className="modal-button primary"
                            onClick={onClose}
                        >
                            Cancelar
                        </button>
                        {
                            selectedAgreementRates.length !== 0 && <SaveConsumptionRates
                            agreementRates={selectedAgreementRates}
                            onClose={onClose}
                             />
                        }
                    </div>
                </div>
            </div>
        </>
    )
}
