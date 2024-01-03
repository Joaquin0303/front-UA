import React, { useState, useEffect } from 'react'
import '../../styles/Modal.css'
import { getParameters } from '../../services/ParameterServices';
import FormEmployeeRegistration from '../form/employee/FormEmployeeRegistration';
import FormEmployeeDismissal from '../form/employee/FormEmployeeDismissal';
import FormEmployeeLicence from '../form/employee/FormEmployeeLicence';
import { TABLE_ACTIONS } from '../../utils/GeneralConstants';
import ViewEmployee from '../form/employee/ViewEmployee';
import FormChangePosition from '../form/employee/FormChangePosition';

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
                    {action == TABLE_ACTIONS.CHANGEPOSITION && <FormChangePosition parameterList={parameterList} data={data} closeModal={closeModal} onSubmitForm={onSubmitForm} />}
                    {action == TABLE_ACTIONS.ADDLICENCE && <FormEmployeeLicence parameterList={parameterList} data={data} closeModal={closeModal} onSubmitForm={onSubmitForm} />}
                    {action == TABLE_ACTIONS.PUTDOWN && <FormEmployeeDismissal parameterList={parameterList} data={data} closeModal={closeModal} onSubmitForm={onSubmitForm} />}
                    {(action == TABLE_ACTIONS.ADD || action == TABLE_ACTIONS.EDIT) && <FormEmployeeRegistration action={action} parameterList={parameterList} data={data} closeModal={closeModal} onSubmitForm={onSubmitForm} />}
                    {action == TABLE_ACTIONS.VIEW && <ViewEmployee data={data} closeModal={closeModal} />}
                </div>
            </div >
        </>
    )
}
