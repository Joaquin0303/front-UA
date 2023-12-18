import React, { useState, useEffect } from 'react'
import '../../styles/Modal.css'
import { getParameters } from '../../services/ParameterServices';
import FormEmployeeRegistration from './FormEmployeeRegistration';
import FormEmployeeDismissal from './FormEmployeeDismissal';

export const ModalFormEmployees = ({ action, data, closeModal, onSubmitForm }) => {
    const [parameterList, setParameterList] = useState([]);

    useEffect(() => {
        getParameters().then(result => {
            setParameterList(result.list);
        });
    }, []);

    console.log('action', action)

    return (
        <>
            <div className='modal-container'>
                <div className='modals'>
                    {action == 'inactivate' && <FormEmployeeDismissal parameterList={parameterList} data={data} closeModal={closeModal} onSubmitForm={onSubmitForm} />}
                    {action != 'inactivate' && <FormEmployeeRegistration action={action} parameterList={parameterList} data={data} closeModal={closeModal} onSubmitForm={onSubmitForm} />}
                </div>
            </div >
        </>
    )
}
