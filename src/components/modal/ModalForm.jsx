
import React, { } from 'react'
import '../../styles/Modal.css'
import DynamicView from '../form/DynamicView';
import { TABLE_ACTIONS } from '../../utils/GeneralConstants';
import DynamicFormV2 from '../form/DynamicFormV2';

const ModalForm = ({ pageConfiguration, data, closeModal, onSubmitForm, actionForm }) => {

    const showView = () => {
        return actionForm == TABLE_ACTIONS.VIEW
            || actionForm == TABLE_ACTIONS.ACTIVATE
            || actionForm == TABLE_ACTIONS.INACTIVATE;
    }

    const showForm = () => {
        return !showView();
    }

    return (
        <div className='modal-container' >
            <div className='modals'>
                {showView() && <DynamicView viewConfiguration={pageConfiguration.viewConfiguration} data={data} closeModal={closeModal} onSubmitForm={actionForm == TABLE_ACTIONS.VIEW ? null : onSubmitForm} />}
                {showForm() && <DynamicFormV2 formConfiguration={pageConfiguration.formConfiguration} data={data} closeModal={closeModal} onSubmitForm={onSubmitForm} actionForm={actionForm} />}
            </div>
        </div >
    )

}

export default ModalForm;