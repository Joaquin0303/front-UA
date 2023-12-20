import React, { useState, useEffect } from 'react'
import '../../styles/Modal.css'
import { getParameters } from '../../services/ParameterServices';
import FormEmployeeRegistration from '../form/employee/FormEmployeeRegistration';
import FormEmployeeDismissal from '../form/employee/FormEmployeeDismissal';

export const ModalFormEmployees = ({ action, data, closeModal, onSubmitForm }) => {
    const [parameterList, setParameterList] = useState([]);

    useEffect(() => {
        getParameters().then(result => {
            setParameterList(result.list.filter(p => p.activo == true));
        });
    }, []);

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
