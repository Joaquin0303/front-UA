import React, { useState, useEffect } from 'react'
import InputText from "../InputText";
import InputCountry from "../InputCountry";
import InputPositionCode from "../InputPositionCode";
import InputParameter from "../InputParameter";
import '../../../styles/Modal.css'
import InputDate from '../InputDate';
import { parseInputDate, parseToday } from '../../../utils/Utils';

const FormChangePosition = ({ parameterList, data, closeModal, onSubmitForm }) => {
    const [validation, setValidation] = useState();
    const [formData, setFormData] = useState({ ...data, codigoDireccion: data.codigoPuesto.codigoDireccion });
    const updateFormData = (key, value) => {
        formData[key] = value;
        setFormData({ ...formData });
    }

    const submitForm = () => {
        try {
            validate(formData);
            let changePosition = confirm("Confirma el cambio de puesto?");
            if (changePosition) {
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
        if (!data.codigoPais || data.codigoPais.id <= 0) {
            result.error = true;
            result.validation.codigoPais = "Ingrese pais"
        }
        if (!data.codigoDireccion || data.codigoDireccion.id <= 0) {
            result.error = true;
            result.validation.codigoDireccion = "Ingrese dirección"
        }
        if (!data.codigoPuesto || data.codigoPuesto.id <= 0) {
            result.error = true;
            result.validation.codigoPuesto = "Ingrese puesto"
        }
        if (!data.fechaInicioPuesto || data.fechaInicioPuesto.trim().length <= 0) {
            result.error = true;
            result.validation.fechaInicioPuesto = "Ingrese una fecha"
        }
        if (data.fechaInicioPuesto) {
            const fechaInicioPuesto = parseInputDate(data.fechaInicioPuesto);
            if (fechaInicioPuesto <= parseToday()) {
                result.error = true;
                result.validation.fechaInicioPuesto = "Ingrese una fecha mayor"
            }
        }

        if (result.error) throw result;
    }

    return (
        <div className='div-width'>
            <div className='modal-title'>Cambio de puesto</div>
            <div className="modals-content">
                <div className='form-view'>
                    <div className="form-field-container">
                        <InputCountry validation={validation} name="codigoPais" value={formData["codigoPais"]} updateFormData={updateFormData} mandatory={true} />
                        <InputParameter validation={validation} name="codigoOficina" value={formData["codigoOficina"]} parameterList={parameterList.filter(p => p.tipoParametro.id == 19)} updateFormData={updateFormData} country={formData["codigoPais"]} mandatory={true} />
                        <InputParameter validation={validation} name="codigoDireccion" value={formData['codigoDireccion']} parameterList={parameterList.filter(p => p.tipoParametro.id == 6)} updateFormData={updateFormData} mandatory={true} />
                        <InputDate validation={validation} name="fechaInicioPuesto" value={formData["fechaInicioPuesto"]} updateFormData={updateFormData} mandatory={true} />
                        <InputPositionCode validation={validation} name="codigoPuesto" value={formData["codigoPuesto"]} updateFormData={updateFormData} directionCode={formData['codigoDireccion']} countryCode={formData['codigoPais']} currentPositionId={formData['id']} mandatory={true} />

                        <InputText disabled={true} validation={validation} name="Categoría" updateFormData={() => { }} value={formData['codigoPuesto'] && formData['codigoPuesto'].codigoCategoria ? formData['codigoPuesto'].codigoCategoria.descripcion : ""} />
                        <InputText disabled={true} validation={validation} name="A quien reporta" updateFormData={() => { }} value={formData['codigoPuesto'] && formData['codigoPuesto'].codigoPuestoAlQueReporta ? formData['codigoPuesto'].codigoPuestoAlQueReporta.descripcion : ""} />
                        <InputText disabled={true} validation={validation} name="Centro de costo" updateFormData={() => { }} value={formData['codigoPuesto'] && formData['codigoPuesto'].codigoCentroDeCosto ? formData['codigoPuesto'].codigoCentroDeCosto.descripcion : ""} />
                        <InputText disabled={true} validation={validation} name="Gerencia" updateFormData={() => { }} value={formData['codigoPuesto'] && formData['codigoPuesto'].codigoGerencia ? formData['codigoPuesto'].codigoGerencia.descripcion : ""} />
                        <InputText disabled={true} validation={validation} name="Jefatura" updateFormData={() => { }} value={formData['codigoPuesto'] && formData['codigoPuesto'].codigoJefatura ? formData['codigoPuesto'].codigoJefatura.descripcion : ""} />
                    </div>
                </div>
            </div>
            <div className='modal-buttons'>
                <button type='submit' className='btns' onClick={submitForm}>Confirmar</button>
                <button className='btns-close' onClick={closeModal}>Cerrar</button>
            </div>
        </div >
    )
}

export default FormChangePosition;