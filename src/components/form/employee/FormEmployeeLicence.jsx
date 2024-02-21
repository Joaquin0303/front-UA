import React, { useState, useEffect } from 'react'
import '../../../styles/Modal.css'
import InputParameter from '../InputParameter';
import InputText from '../InputText';
import InputDate from '../InputDate';
import { parseTodayStr2 } from '../../../utils/Utils';

const FormEmployeeLicence = ({ parameterList, data, closeModal, onSubmitForm }) => {
    const [validation, setValidation] = useState();
    const [formData, setFormData] = useState(data);
    console.log('formData=', formData);
    const updateFormData = (key, value) => {
        formData[key] = value;
        setFormData({ ...formData });
    }

    const submitForm = () => {
        console.log('Submit=', formData);
        try {
            validate(formData);
            let inactivateEmployee = confirm("El empleado será inactivado por licencia. Desea continuar?");
            if (inactivateEmployee) {
                formData.codigoEstadoEmpleado = {
                    id: 88
                }
                formData.fechaInicio = parseTodayStr2(formData.fechaInicio);
                formData.fechaFin = parseTodayStr2(formData.fechaFin);
                onSubmitForm(formData)
            }
            closeModal();
        } catch (error) {
            console.error('error', error);
            if (error.validation)
                setValidation(error.validation);
        }
    }

    const validate = (data) => {
        const result = {
            error: false,
            validation: {}
        }
        if (!data.tipoLicencia || data.tipoLicencia.id <= 0) {
            result.error = true;
            result.validation.tipoLicencia = "Ingrese tipo de licencia"
        }
        if (!data.fechaInicio || data.fechaInicio.trim().length <= 0) {
            result.error = true;
            result.validation.fechaInicio = "Ingrese fecha de inicio"
        }
        if (!data.fechaFin || data.fechaFin.trim().length <= 0) {
            result.error = true;
            result.validation.fechaFin = "Ingrese fecha de fin"
        }
        if (result.error) throw result;
    }
    e
    return (
        <div>
            <div className='modal-title'>Licencia de empleado</div>
            <div className="modals-content">
                <div className='form-view'>
                    <div className="form-field-container">
                        <InputParameter validation={validation} name="tipoLicencia" value={formData["tipoLicencia"]} parameterList={parameterList.filter(p => p.tipoParametro.id == 16)} updateFormData={updateFormData} mandatory={true} />
                        <InputDate validation={validation} name="fechaInicio" updateFormData={updateFormData} value={formData["fechaInicio"]} mandatory={true} />
                        <InputDate validation={validation} name="fechaFin" updateFormData={updateFormData} value={formData["fechaFin"]} mandatory={true} />
                    </div>
                </div>
            </div>
            <div className='modal-buttons'>
                <button type='submit' className='btns' onClick={submitForm}>Confirmar</button>
                <button className='btns-close' onClick={closeModal}>Cerrar</button>
            </div>
        </div>
    );
}

export default FormEmployeeLicence;