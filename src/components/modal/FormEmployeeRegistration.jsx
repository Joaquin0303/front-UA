import React, { useState, useEffect } from 'react'
import '../../styles/Modal.css'
import FormEmployeeStep1 from './FormEmployeeStep1';

import { FaArrowAltCircleRight } from "react-icons/fa";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import FormEmployeeStep2 from './FormEmployeeStep2';
import FormEmployeeStep3 from './FormEmployeeStep3';
import FormEmployeeStep0 from './FormEmployeeStep0';
import { getEmployees } from '../../services/EmployeeServices';

const FormEmployeeRegistration = ({ action, parameterList, data, closeModal, onSubmitForm }) => {
    const [formData, setFormData] = useState(data);
    const [validation, setValidation] = useState();
    const [formStep, setFormStep] = useState(action == 'add' || action == 'activate' ? 0 : 1);


    const updateFormData = (key, value) => {
        formData[key] = value;
        setFormData({ ...formData });
    }

    const submitForm = () => {
        console.log('Submit=', formData);
        try {
            validate(formData);
            onSubmitForm(formData)
            closeModal();
        } catch (error) {
            console.error('error', error);
            if (error.validation)
                setValidation(error.validation);
        }
    }

    const searchEmployee = () => {
        getEmployees().then(result => {
            if (result.list) {
                const employee = result.list.find(e => e.codigoTipoDocumento.id == formData.codigoTipoDocumento.id && e.numeroDocumentoPersonal == formData.numeroDocumentoPersonal)
                setValidation(null);
                if (!employee) {
                    setFormData({
                        codigoTipoDocumento: {
                            id: formData.codigoTipoDocumento.id
                        },
                        numeroDocumentoPersonal: formData.numeroDocumentoPersonal
                    });
                    setFormStep(1);
                } else if (employee.codigoEstadoEmpleado.id == 88) {
                    let reactivate = confirm("¿Desea reactivar el empleado?");
                    if (reactivate) {
                        employee.codigoEstadoEmpleado.id = 87;
                        setFormData(employee);
                        setFormStep(1);
                    } else {
                        closeModal();
                    }
                } else if (employee.codigoEstadoEmpleado.id == 87) {
                    const errorValidation = {
                        numeroDocumentoPersonal: "Hay un empleado activo con esta identificación"
                    }
                    setValidation(errorValidation);
                } else {
                    const errorValidation = {
                        numeroDocumentoPersonal: "Hay un empleado dado de baja con esta identificación"
                    };
                    setValidation(errorValidation);
                }
            }
        });
    }

    const validate = (data) => {
        const result = {
            error: false,
            validation: {}
        }
        if (!data.nombre || data.nombre.trim().length <= 0) {
            result.error = true;
            result.validation.nombre = "Ingrese nombre"
        }
        if (!data.apellido || data.apellido.trim().length <= 0) {
            result.error = true;
            result.validation.apellido = "Ingrese apellido"
        }
        if (!data.fechaNacimiento || data.fechaNacimiento.trim().length <= 0) {
            result.error = true;
            result.validation.fechaNacimiento = "Ingrese fecha de nacimiento"
        }
        if (!data.fechaIngreso || data.fechaIngreso.trim().length <= 0) {
            result.error = true;
            result.validation.fechaIngreso = "Ingrese fecha de ingreso"
        }
        if (!data.codigoTipoDocumento || data.codigoTipoDocumento.id <= 0) {
            result.error = true;
            result.validation.codigoTipoEgreso = "Ingrese tipo de documento"
        }
        if (!data.numeroDocumentoPersonal || data.numeroDocumentoPersonal.trim().length <= 0) {
            result.error = true;
            result.validation.numeroDocumentoPersonal = "Ingrese nro. documento personal"
        }
        if (!data.numeroDocumentoLaboral || data.numeroDocumentoLaboral.trim().length <= 0) {
            result.error = true;
            result.validation.numeroDocumentoLaboral = "Ingrese nro. documento laboral"
        }
        if (!data.codigoPais || data.codigoPais.id <= 0) {
            result.error = true;
            result.validation.codigoPais = "Ingrese pais"
        }
        if (!data.codigoCategoriaEmpleado || data.codigoCategoriaEmpleado.id <= 0) {
            result.error = true;
            result.validation.codigoCategoriaEmpleado = "Ingrese cateogría de empleado"
        }
        if (!data.codigoDireccion || data.codigoDireccion.id <= 0) {
            result.error = true;
            result.validation.codigoDireccion = "Ingrese direccion"
        }
        if (!data.codigoPuesto || data.codigoPuesto.id <= 0) {
            result.error = true;
            result.validation.codigoPuesto = "Ingrese puesto"
        }
        if (result.error) throw result;
    }

    return (
        <>
            <div className='modal-container'>
                <div className='modals'>
                    <div>
                        <div className="modals-content">
                            <div className='form-view'>
                                {formStep == 0 && <FormEmployeeStep0 parameterList={parameterList} validation={validation} formData={formData} updateFormData={updateFormData} />}
                                {formStep == 1 && <FormEmployeeStep1 parameterList={parameterList} validation={validation} formData={formData} updateFormData={updateFormData} />}
                                {formStep == 2 && <FormEmployeeStep2 parameterList={parameterList} validation={validation} formData={formData} updateFormData={updateFormData} />}
                                {formStep == 3 && <FormEmployeeStep3 parameterList={parameterList} validation={validation} formData={formData} updateFormData={updateFormData} />}
                            </div>
                        </div>
                        <div className='modal-step-buttons'>
                            {(formStep == 2 || formStep == 3) &&
                                <FaArrowAltCircleLeft title="Anterior" onClick={(e) => setFormStep(formStep - 1)} />
                            }
                            {(formStep == 1 || formStep == 2) &&
                                <FaArrowAltCircleRight title="Siguente" onClick={(e) => setFormStep(formStep + 1)} />
                            }
                        </div>

                        <div className='modal-buttons'>
                            {formStep == 0 && <button type='submit' className='btns' onClick={searchEmployee}>Confirmar</button>}
                            {formStep != 0 && <button type='submit' className='btns' onClick={submitForm}>Confirmar</button>}
                            <button className='btns-close' onClick={closeModal}>Cerrar</button>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}

export default FormEmployeeRegistration;