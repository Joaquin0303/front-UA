import React, { useState } from 'react'
import '../styles/Modal.css'

const Modal = ({ closeModal, onSubmit }) => {

    const [formData, setFormData] = useState({
        id: '',
        name: '',
        username: '',
        email: '',
        address: { street: '' },
        phone: '',
        website: '',
        company: { name: '' },
    });

    return <div className='modal-container'>
        <div className='modals'>
            <form action="">
                <h1 className='label'>Alta de Usuario</h1>
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
                        <label className='label' htmlFor="address">Dirección</label>
                        <input name='address' value={formData.address.street} onChange={(e) => setFormData({ ...formData, address: { street: e.target.value } })} />
                    </div>
                    <div className='form-group'>
                        <label className='label' htmlFor="phone">Teléfono</label>
                        <input name='phone' value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
                    </div>
                    <div className='form-group'>
                        <label htmlFor="website">Sitio Web</label>
                        <input name='website' value={formData.website} onChange={(e) => setFormData({ ...formData, website: e.target.value })} />
                    </div>
                    <div className='form-group'>
                        <label htmlFor="company">Compañía</label>
                        <input name='company' value={formData.company.name} onChange={(e) => setFormData({ ...formData, company: { name: e.target.value } })} />
                    </div>
                </div>
                <div className='botones-conf-close'>
                    <button type='submit' className='btns' onClick={() => onSubmit(formData)}>Confirmar</button>
                    <button className='btns-close' onClick={(e) => { if (e.target.className === "btns-close") closeModal() }}>Cerrar</button>
                </div>
            </form>
        </div>
    </div>
}
export default Modal
