import React from 'react'
import DynamicForm from '../form/DynamicForm';
import '../../styles/Modal.css'

const ModalForm = ({ pageName, data, closeModal, formDisabled, onSubmitForm }) => {
    return (
        <div className='modal-container' >
            <div className='modals'>
                <DynamicForm pageName={pageName} data={data} closeModal={closeModal} disabled={formDisabled} onSubmitForm={onSubmitForm} />
            </div>
        </div >
    )

}

export default ModalForm;