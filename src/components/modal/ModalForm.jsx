/*
import React, { useEffect, useRef, useState } from 'react';
import '../../styles/Modal.css';
import DynamicView from '../form/DynamicView';
import { TABLE_ACTIONS } from '../../utils/GeneralConstants';
import DynamicFormV2 from '../form/DynamicFormV2';

const ModalForm = ({ pageConfiguration, data, closeModal, onSubmitForm, actionForm }) => {
    const [isFormVisible, setIsFormVisible] = useState(true);
    const formRef = useRef(null);

    useEffect(() => {
        setIsFormVisible(showForm());
        if (isFormVisible) {
            formRef.current.focus();
        }
    }, [actionForm]);

    const handleKeyDown = (e) => {
        if (isFormVisible && e.key === 'Tab') {
            e.preventDefault();
            const formElements = formRef.current.querySelectorAll('input, button, select, textarea');
            const focusable = Array.from(formElements).filter(element => !element.hasAttribute('tabindex') || element.getAttribute('tabindex') !== '-1');
            const currentFocus = document.activeElement;
            const currentIndex = focusable.indexOf(currentFocus);

            if (e.shiftKey) {
                const nextIndex = currentIndex > 0 ? currentIndex - 1 : focusable.length - 1;
                focusable[nextIndex].focus();
            } else {
                const nextIndex = currentIndex < focusable.length - 1 ? currentIndex + 1 : 0;
                focusable[nextIndex].focus();
            }
        }
    };

    const showView = () => {
        return (
            actionForm === TABLE_ACTIONS.VIEW ||
            actionForm === TABLE_ACTIONS.ACTIVATE ||
            actionForm === TABLE_ACTIONS.INACTIVATE ||
            actionForm === TABLE_ACTIONS.PUTDOWNLICENCE
        );
    };

    const showForm = () => {
        return !showView();
    };

    return (
        <div className='modal-container' onKeyDown={handleKeyDown}>
            <div className='modals'>
                {showView() && <DynamicView viewConfiguration={pageConfiguration.viewConfiguration} data={data} closeModal={closeModal} onSubmitForm={actionForm === TABLE_ACTIONS.VIEW ? null : onSubmitForm} />}
                {isFormVisible && (
                    <div className="modal-form-container" ref={formRef} tabIndex="0">
                        <DynamicFormV2 formConfiguration={pageConfiguration.formConfiguration} data={data} closeModal={closeModal} onSubmitForm={onSubmitForm} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default ModalForm;
*/

import React, { useState } from 'react'
import '../../styles/Modal.css'
import DynamicView from '../form/DynamicView';
import { FORM_ACTIONS, TABLE_ACTIONS } from '../../utils/GeneralConstants';
import DynamicFormV2 from '../form/DynamicFormV2';

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
        <div className='modal-container' >
            <div className='modals'>
                {showView() && <DynamicView viewConfiguration={pageConfiguration.viewConfiguration} data={data} closeModal={closeModal} onSubmitForm={actionForm == TABLE_ACTIONS.VIEW ? null : onSubmitForm} />}
                {showForm() && <DynamicFormV2 formConfiguration={pageConfiguration.formConfiguration} data={data} closeModal={closeModal} onSubmitForm={onSubmitForm} />}
            </div>
        </div >
    )

}

export default ModalForm;