import React, { useState } from 'react'
import DynamicForm from '../form/DynamicForm';
import '../../styles/Modal.css'
import DynamicView from '../form/DynamicView';
import { FORM_ACTIONS, TABLE_ACTIONS } from '../../utils/GeneralConstants';

const ModalForm = ({ pageConfiguration, data, closeModal, onSubmitForm, actionForm }) => {

    const showView = () => {
        console.log('actionForm', actionForm);
        return actionForm == TABLE_ACTIONS.VIEW
            || actionForm == TABLE_ACTIONS.ACTIVATE
            || actionForm == TABLE_ACTIONS.INACTIVATE
            || actionForm == TABLE_ACTIONS.PUTDOWNLICENCE;
    }

    const showForm = () => {
        return !showView();
    }

    return (
        <div className='modal-container' onClick={(e) => {
            if (e.target.className === "modal-container") closeModal();
        }}>
            <div className='modals'>

                {showView() && <DynamicView viewConfiguration={pageConfiguration.viewConfiguration} data={data} closeModal={closeModal} onSubmitForm={actionForm == TABLE_ACTIONS.VIEW ? null : onSubmitForm} />}
                {showForm() && <DynamicForm formConfiguration={pageConfiguration.formConfiguration} data={data} closeModal={closeModal} onSubmitForm={onSubmitForm} />}

            </div>
        </div >
    )

}

export default ModalForm;