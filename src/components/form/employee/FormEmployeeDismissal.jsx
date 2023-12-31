import React, { useState, useEffect } from 'react'
import '../../../styles/Modal.css'
import InputParameter from '../InputParameter';
import InputText from '../InputText';
import InputDate from '../InputDate';
import { parseInputDate } from '../../../utils/Utils';

const FormEmployeeDismissal = ({ parameterList, data, closeModal, onSubmitForm }) => {
    const [validation, setValidation] = useState();
    const [formData, setFormData] = useState(data);

    const updateFormData = (key, value) => {
        formData[key] = value;
        setFormData({ ...formData });
    }

    const submitForm = () => {
        console.log('Submit=', formData);
        try {
            validate(formData);
            let dismissEmployee = confirm("Si usted da de baja al empleado no podrá reactivarlo.");
            if (dismissEmployee) {
                formData.codigoEstadoEmpleado = {
                    id: 89
                }
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
        if (!data.codigoTipoEgreso || data.codigoTipoEgreso.id <= 0) {
            result.error = true;
            result.validation.codigoTipoEgreso = "Ingrese motivo de egreso";
        }
        if (!data.fechaEgreso || data.fechaEgreso.trim().length <= 0) {
            result.error = true;
            result.validation.fechaEgreso = "Ingrese fecha de egreso";
        }
        if (data.fechaEgreso && data.fechaEgreso.trim().length > 0) {
            const fi = parseInputDate(data.fechaIngreso);
            const fe = parseInputDate(data.fechaEgreso);
            if (fi > fe) {
                result.error = true;
                result.validation.fechaEgreso = "Ingrese fecha de egreso válida";
            }
        }
        if (result.error) throw result;
    }

    return (
        <div className='div-width'>
            <div className='modal-title'>Baja de empleado</div>
            <div className="modals-content">
                <div className='form-view'>
                    <div className="form-field-container">
                        <InputParameter validation={validation} name="codigoTipoEgreso" value={formData["codigoTipoEgreso"]} parameterList={parameterList.filter(p => p.tipoParametro.id == 15)} updateFormData={updateFormData} />
                        <InputText name="observaciones" updateFormData={updateFormData} value={formData["observaciones"]} />
                        <InputDate validation={validation} name="fechaEgreso" updateFormData={updateFormData} value={formData["fechaEgreso"]} />
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

export default FormEmployeeDismissal;