import React from 'react';
import '../styles/Modal.css';

const ModalView = ({ user, closeModal }) => {
    return (
        <div className='modal-container' onClick={(e) => {
            if (e.target.className === "modal-container") closeModal();
        }}>
            <div className='modals'>
                <div>
                    <h1 className='label'>Datos del Usuario</h1>
                    <br />
                    <div className='form'>
                        <div className='form-group'>
                            <label className='label' htmlFor="id">ID</label>
                            <p className='form-p'>{user.id}</p>
                        </div>
                        <div className='form-group'>
                            <label className='label' htmlFor="name">Nombre</label>
                            <p className='form-p'>{user.name}</p>
                        </div>
                        <div className='form-group'>
                            <label className='label' htmlFor="username">Nombre de Usuario</label>
                            <p className='form-p'>{user.username}</p>
                        </div>
                        <div className='form-group'>
                            <label className='label' htmlFor="email">Email</label>
                            <p className='form-p'>{user.email}</p>
                        </div>
                        <div className='form-group'>
                            <label className='label' htmlFor="address">Dirección</label>
                            <p className='form-p'>{user.address.street}</p>
                        </div>
                        <div className='form-group'>
                            <label className='label' htmlFor="phone">Teléfono</label>
                            <p className='form-p'>{user.phone}</p>
                        </div>
                        <div className='form-group'>
                            <label className='label' htmlFor="website">Sitio Web</label>
                            <p className='form-p'>{user.website}</p>
                        </div>
                        <div className='form-group'>
                            <label className='label' htmlFor="company">Compañía</label>
                            <p className='form-p'>{user.company.name}</p>
                        </div>
                    </div>
                </div>
                <div className='botones-conf-close'>
                    <button className='btns-close' onClick={closeModal}>Cerrar</button>
                </div>
            </div>
        </div>
    );
}

export default ModalView;
