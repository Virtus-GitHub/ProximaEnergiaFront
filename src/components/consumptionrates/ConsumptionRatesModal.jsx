import React, { useEffect, useState } from 'react';
import { useGetFetch } from '../../hooks/useGetFetch';
import { SaveConsumptionRates } from './SaveConsumptionRates';
import { MessageModal } from '../GeneralModals/MessageModal';

export const ConsumptionRatesModal = ({ agreement, isOpen, onClose }) => {
    if (!isOpen) return null;

    const [openModal, setOpenModal] = useState(true);

    const { data, hasError, error } = useGetFetch('https://localhost:44395/api/ConsumptionRatesMediator/GetConsumptionRates');

    const [rates, setRates] = useState([]);

    const [currentRates, setCurrentRates] = useState([]);

    const [selectedAgreementRates, setSelectedAgreementRates] = useState([]);

    const [filteredRates, setFilteredRates] = useState(rates);

    const [counter, setCounter] = useState(20);

    useEffect(() => {
        setCurrentRates(rates);
    }, [rates]);

    useEffect(() => {
        if (data) {
            setRates(data.map(rate => ({ ...rate, checked: false })));
        }
    }, [data]);

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
                if(counter > 0)
                    setCounter(counter - 1);

                if (!prevRates.some(item => item.idTarifa === rate.idTarifa)) {
                    return [...prevRates, {
                        nombre: rate.nombre,
                        cod: rate.codTarifaAcceso,
                        idAcuerdo: agreement.idAcuerdo,
                        idTarifa: rate.idTarifa,
                        porcRenovacion: 100,
                        fechaVigor: getDate()
                    }];
                }
                return prevRates;
            } else {
                setCounter(counter + 1);
                return prevRates.filter(item => item.idTarifa !== rate.idTarifa);
            }
        });
    };

    const handleFilterRates = (event) => {
        setCurrentRates(rates?.filter(r => r.nombre === event.target.value));
    };

    const getDate = () => {
        const today = new Date();
        const dd = today.getDate() < 10 ? '0' + today.getDate() : today.getDate();
        const mm = (today.getMonth() + 1) < 10 ? '0' + (today.getMonth() + 1) : (today.getMonth() + 1);
        const yyyy = today.getFullYear();

        return `${yyyy}-${mm}-${dd}`;
    };

    const removeSelected = (rate) => {
        console.log(rate);
        setSelectedAgreementRates(prevRates => {
            setCounter(counter + 1);
            return prevRates.filter(item => item.idTarifa !== +rate);
        });
    };

    const cancel = () => {
        onClose(false);
    };

    const closeModal = () => {
        setOpenModal(false);
        refresh();
    };

    if (hasError) {
        return (<MessageModal
            message={'error.message'}
            isOpen={openModal}
            onClose={closeModal}
        />);
    };

    return (
        <>
            <div className="row ratesContainer">
                <div className="ratesContent">
                    <div>
                        <div style={{ width: '60%', float: 'left' }}>
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
                        </div>
                        <div style={{ width: '30%', float: 'left', textAlign: 'left' }}>
                            <div className="selectedRatesContent" style={{ textAlign: 'left' }}>
                                <p style={{ margin: '0' }}>Tarifas Seleccionadas, faltan min: {counter}</p>
                                <select name="selectedRates" id="selectedRates" style={{width: '100%', overflowY: 'auto'}} size={15} onChange={(e) => removeSelected(e.target.value)}>
                                    <option>Pulsa sobre una para deseleccionar</option>
                                    {selectedAgreementRates?.map(rate => (
                                        <option key={rate.idTarifa} value={rate.idTarifa}>
                                            {rate.nombre.trim()} - {rate.cod}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
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
                                                checked={selectedAgreementRates.some(item => item.idTarifa === rate.idTarifa)}
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
                            onClick={cancel}
                        >
                            Cancelar
                        </button>
                        {
                            selectedAgreementRates.length > 19 && <SaveConsumptionRates
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
