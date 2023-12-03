import React from 'react'
import DynamicForm from '../form/DynamicForm';
import '../../styles/Modal.css'

const ModalForm = ({ data, setModal, formDisabled, onSubmitForm }) => {

    return (
        <div className='modal-container' >
            <div className='modals'>
                <DynamicForm data={data} setModal={setModal} disabled={formDisabled} onSubmitForm={onSubmitForm} />
            </div>
        </div >
    )

}

export default ModalForm;