import React from 'react'

export const MessageModal = ({message, isOpen, onClose}) => {
    
    if (!isOpen) return null;

    return (
        <div className="row addAgreementContainer">
            <div className="addAgreementContent">
                <h3 className='addTitle'>{message}</h3>
                <div className="modal-buttons">
                <button className="modal-button primary" onClick={onClose}>Aceptar</button>
            </div>
            </div>
        </div>
    )
}
