import React, { useState } from 'react';
import '../styles/abm.css';

const ModalAddSwitch = ({ closeModal, onSubmit }) => {
    const [nombreRol, setNombreRol] = useState('');

    const handleNombreRolChange = (e) => {
        setNombreRol(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Llama a la función onSubmit pasando el nombreRol
        onSubmit(nombreRol);
        // Cierra el modal
        closeModal();
    };

    return (
        <div className='modal-container' onClick={(e) => {
            if (e.target.className === "modal-container") closeModal();
        }}>
            <div className='modals'>
                <form onSubmit={handleSubmit}>
                    <h1 className='label'>Nuevo Rol</h1>
                    <br />
                    <div className='form'>
                        <div className='form-group'>
                            <label className='label' htmlFor="rol-new">Nombre Rol</label>
                            <input
                                type="text"
                                placeholder='Ejemplo: Alta de Empleado'
                                value={nombreRol}
                                onChange={handleNombreRolChange}
                            />
                        </div>
                    </div>
                    <div className='botones-conf-close'>
                        <button type='submit' className='btns'>Confirmar</button>
                        <button className='btns-close' onClick={() => closeModal()}>Cerrar</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ModalAddSwitch;
