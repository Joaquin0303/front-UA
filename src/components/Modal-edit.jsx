import React, { useState } from 'react';
import '../styles/Modal.css';

const ModalEdit = ({ user, closeModal, onSubmit }) => {
    const [formData, setFormData] = useState({
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email,
        address: {
            ...user.address,
            street: user.address.street,
        },
        phone: user.phone,
        website: user.website,
        company: {
            ...user.company,
            name: user.company.name,
        }
    });

    return (
        <div className='modal-container'>
            <div className='modals'>
                <div>
                    <h1 className='label'>Editar Datos del Usuario</h1>
                    <br />
                    <div className='form'>
                        <div className='form-group'>
                            <label className='label' htmlFor="id">ID</label>
                            <input name='id' value={formData.id} onChange={(e) => setFormData({ ...formData, id: e.target.value })} />
                        </div>
                        <div className='form-group'>
                            <label className='label' htmlFor="name">Nombre</label>
                            <input name='name' value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                        </div>
                        <div className='form-group'>
                            <label className='label' htmlFor="username">Nombre de Usuario</label>
                            <input name='username' value={formData.username} onChange={(e) => setFormData({ ...formData, username: e.target.value })} />
                        </div>
                        <div className='form-group'>
                            <label className='label' htmlFor="email">Email</label>
                            <input name='email' value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                        </div>
                        <div className='form-group'>
                            <label className='label' htmlFor="address">Dirección de Usuario</label>
                            <input name='address' value={formData.address.street} onChange={(e) => setFormData({ ...formData, address: { ...formData.address, street: e.target.value } })} />
                        </div>
                        <div className='form-group'>
                            <label className='label' htmlFor="phone">Teléfono</label>
                            <input name='phone' value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
                        </div>
                        <div className='form-group'>
                            <label className='label' htmlFor="website">Sitio Web</label>
                            <input name='website' value={formData.website} onChange={(e) => setFormData({ ...formData, website: e.target.value })} />
                        </div>
                        <div className='form-group'>
                            <label className='label' htmlFor="company">Compañía</label>
                            <input name='company' value={formData.company.name} onChange={(e) => setFormData({ ...formData, company: { ...formData.company, name: e.target.value } })} />
                        </div>
                    </div>
                </div>
                <div className='botones-conf-close'>
                    <button type='submit' className='btns' onClick={() => onSubmit(formData)}>Confirmar</button>
                    <button className='btns-close' onClick={closeModal}>Cerrar</button>
                </div>
            </div>
        </div>
    );
}

export default ModalEdit;
