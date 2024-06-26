import React, { useState, useEffect } from 'react'
import '../../../styles/Modal.css'
import '../../../styles/progress.css'
import FormEmployeeStep1 from './FormEmployeeStep1';
import { FaArrowAltCircleRight } from "react-icons/fa";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import FormEmployeeStep2 from './FormEmployeeStep2';
import FormEmployeeStep3 from './FormEmployeeStep3';
import FormEmployeeStep0 from './FormEmployeeStep0';
import { findByLaboralIdentity, findByIdentity, filterByIdentity } from '../../../pages/EmployeesAdmin/EmployeesPage';
import { MIN_DATE, TABLE_ACTIONS } from '../../../utils/GeneralConstants';
import { diffBetweenDates, parseInputDate, parseToday } from '../../../utils/Utils';

const FormEmployeeRegistration = ({ action, parameterList, data, closeModal, onSubmitForm }) => {
    const [formData, setFormData] = useState(data);
    const [validation, setValidation] = useState();
    const [formStep, setFormStep] = useState(action == TABLE_ACTIONS.ADD || action == TABLE_ACTIONS.ACTIVATE ? 0 : 1);

    const updateFormData = (key, value) => {
        formData[key] = value;
        setFormData({ ...formData });
    }

    const submitForm = () => {
        try {
            validateStep(formData);
            onSubmitForm(formData)
            closeModal();
        } catch (error) {
            console.error('error', error);
            if (error.validation)
                setValidation(error.validation);
        }
    }

    const searchEmployee = () => {
        try {
            validateStep(formData, 0);
            const employeeSearchResult = filterByIdentity(formData.codigoTipoDocumento.id, formData.numeroDocumentoPersonal);
            setValidation(null);

            if (employeeSearchResult && employeeSearchResult.find(e => e.codigoEstadoEmpleado.id == 87)) {
                const errorValidation = {
                    numeroDocumentoPersonal: "Hay un empleado activo con esta identificación"
                }
                setValidation(errorValidation);
            } else if (employeeSearchResult && employeeSearchResult.find(e => e.codigoEstadoEmpleado.id == 88)) {
                const errorValidation = {
                    numeroDocumentoPersonal: "Hay un empleado en licencia con esta identificación"
                }
                setValidation(errorValidation);
            } else if (!employeeSearchResult || employeeSearchResult.length == 0 || employeeSearchResult.find(e => e.codigoEstadoEmpleado.id == 89 && e.codigoTipoEgreso.codigo == 'ME06')) {
                setFormData({
                    codigoTipoDocumento: {
                        id: formData.codigoTipoDocumento.id
                    },
                    numeroDocumentoPersonal: formData.numeroDocumentoPersonal
                });
                setFormStep(1);
            } else if (employeeSearchResult && employeeSearchResult.find(e => e.codigoEstadoEmpleado.id == 89)) {
                const inactiveEmployees = employeeSearchResult.filter(e => e.codigoEstadoEmpleado.id == 89);
                const employee = inactiveEmployees.sort((e1, e2) => {
                    if (e1.id > e2.id) return -1;
                    else return 1;
                })[0];
                let reingresar = confirm("¿Desea reingresar el empleado " + employee.apellido + " " + employee.nombre + "?");
                if (reingresar) {
                    employee.codigoEstadoEmpleado = {
                        id: 87
                    }
                    employee.id = null;
                    employee.antiguedad = diffBetweenDates(parseInputDate(employee.fechaIngreso), parseInputDate(employee.fechaEgreso));
                    employee.codigoTipoEgreso = null;
                    employee.fechaEgreso = null;
                    employee.observaciones = null;
                    setFormData(employee);
                    setFormStep(1);
                } else {
                    closeModal();
                }
            } else {
                // NO IS AN OPTION
                console.error("Trying to add employee with wrong data");
            }
        } catch (error) {
            console.error('error', error);
            if (error.validation)
                setValidation(error.validation);
        }
    }

    const validateStep = (data, step) => {
        setValidation(null);
        switch (step) {
            case 0:
                validateStep0(data);
                break;
            case 1:
                validateStep1(data);
                break;
            case 2:
                validateStep2(data);
                break;
            /* case 3:
                validateStep3(data);
                break; */
            default:
                validateStep1(data);
                validateStep2(data);
        }
    }


    const validateStep0 = (data) => {
        const result = {
            error: false,
            validation: {}
        }
        if (!data.codigoTipoDocumento || data.codigoTipoDocumento.id <= 0) {
            result.error = true;
            result.validation.codigoTipoDocumento = "Ingrese tipo de documento"
        }
        if (!data.numeroDocumentoPersonal || data.numeroDocumentoPersonal.trim().length <= 0) {
            result.error = true;
            result.validation.numeroDocumentoPersonal = "Ingrese nro. documento personal"
        }
        if (result.error) throw result;
    }

    const validateStep1 = (data) => {
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
        if (data.fechaNacimiento && data.fechaNacimiento.trim().length > 0) {
            const fn = parseInputDate(data.fechaNacimiento);
            const today = parseToday();
            if (fn.getTime() < MIN_DATE || fn.getTime() >= today.getTime()) {
                result.error = true;
                result.validation.fechaNacimiento = "Ingrese fecha de nacimiento válida";
            }
        }
        if (!data.fechaIngreso || data.fechaIngreso.trim().length <= 0) {
            result.error = true;
            result.validation.fechaIngreso = "Ingrese fecha de ingreso";
        }
        if (data.position != null && !data.position) {
            result.error = true;
            result.validation.codigoPuesto = "El puesto seleccionado ya esta asignado a otro empleado."
        }
        if (data.fechaIngreso && data.fechaIngreso.trim().length > 0) {
            if (data.fechaNacimiento && data.fechaNacimiento.trim().length > 0) {
                const fn = parseInputDate(data.fechaNacimiento);
                const fi = parseInputDate(data.fechaIngreso);
                if (fn.getTime() >= fi.getTime()) {
                    result.error = true;
                    result.validation.fechaNacimiento = "Ingrese fecha de nacimiento válida";
                    result.validation.fechaIngreso = "Ingrese fecha de ingreso válida";
                }
            }
        }
        if (!data.codigoTipoDocumento || data.codigoTipoDocumento.id <= 0) {
            result.error = true;
            result.validation.codigoTipoDocumento = "Ingrese tipo de documento"
        }
        if (!data.numeroDocumentoPersonal || data.numeroDocumentoPersonal.trim().length <= 0) {
            result.error = true;
            result.validation.numeroDocumentoPersonal = "Ingrese nro. documento personal"
        }
        if (data.codigoTipoDocumento && data.numeroDocumentoPersonal) {
            const emp1 = findByIdentity(formData.codigoTipoDocumento.id, formData.numeroDocumentoPersonal);
            if (emp1 && data.id != emp1.id) {
                result.error = true;
                result.validation.numeroDocumentoPersonal = "Ya existe un usuario con este número"
            }
        }
        if (!data.numeroDocumentoLaboral || data.numeroDocumentoLaboral.trim().length <= 0) {
            result.error = true;
            result.validation.numeroDocumentoLaboral = "Ingrese nro. documento laboral"
        }
        if (data.codigoTipoDocumento && data.numeroDocumentoLaboral) {
            const empl2 = findByLaboralIdentity(formData.codigoTipoDocumento.id, formData.numeroDocumentoLaboral);
            if (empl2 && data.id != empl2.id) {
                result.error = true;
                result.validation.numeroDocumentoLaboral = "Ya existe un usuario con este número"
            }
        }
        if (!data.codigoGenero || data.codigoGenero.id <= 0) {
            result.error = true;
            result.validation.codigoGenero = "Ingrese género"
        }
        if (!data.codigoGeneracion || data.codigoGeneracion.id <= 0) {
            result.error = true;
            result.validation.codigoGeneracion = "Ingrese generación"
        }
        if (!data.codigoOficina || data.codigoOficina.id <= 0) {
            result.error = true;
            result.validation.codigoOficina = "Ingrese oficina"
        }

        if (!data.codigoPais || data.codigoPais.id <= 0) {
            result.error = true;
            result.validation.codigoPais = "Ingrese pais"
        }
        if (!data.codigoPuesto || data.codigoPuesto.id <= 0) {
            result.error = true;
            result.validation.codigoPuesto = "Ingrese puesto"
        }
        if (result.error) throw result;
    }

    const validateStep2 = (data) => {
        const result = {
            error: false,
            validation: {}
        }
        // VALIDATIONS
        if (data.calleResidencia && !data.numeroResidencia) {
            result.error = true;
            result.validation.numeroResidencia = "Ingrese número de residencia"
        }
        if (data.calleResidencia && !data.localidadResidencia) {
            result.error = true;
            result.validation.localidadResidencia = "Ingrese localidad de residencia"
        }
        if (result.error) throw result;
    }

    const validateStep3 = (data) => {
        const result = {
            error: false,
            validation: {}
        }
        // VALIDATIONS
        if (data.horasSemanales && !data.fte) {
            result.error = true;
            result.validation.fte = "Ingrese FTE"
        }
        if (data.codigoConvenio && !data.codigoCategoriaConvenio) {
            result.error = true;
            result.validation.codigoCategoriaConvenio = "Ingrese código de categoría de convenio"
        }
        if (data.codigoPrepaga && !data.codigoObraSocial) {
            result.error = true;
            result.validation.codigoObraSocial = "Ingrese código de obra social"
        }
    }

    const nextStep = () => {
        try {
            validateStep(formData, formStep);
            setFormStep(formStep + 1);
        } catch (error) {
            console.error('error', error);
            if (error.validation)
                setValidation(error.validation);
        }
    }

    return (
        <>
            <div className='modal-container'>
                <div className='modals'>
                    <div className='div-width'>
                        {formStep > 0 && <div>
                            <div>
                                <div className="progress-container">
                                    <div className={"progress" + formStep} id="progress"></div>
                                    <div className={formStep >= 1 ? "circle active" : "circle"}>1</div>
                                    <div className={formStep >= 2 ? "circle active" : "circle"}>2</div>
                                    <div className={formStep >= 3 ? "circle active" : "circle"}>3</div>
                                </div>
                            </div>
                            <div>
                                {formStep == 1 && <div className={"progressTitle progressTitle" + formStep}>Datos Mínimos</div>}
                                {formStep == 2 && <div className={"progressTitle progressTitle" + formStep}>Datos Personales</div>}
                                {formStep == 3 && <div className={"progressTitle progressTitle" + formStep}>Datos Laborales</div>}
                            </div>
                        </div>}
                        <div className="modals-content">
                            <div className='form-view'>
                                {formStep == 0 && <FormEmployeeStep0 parameterList={parameterList} validation={validation} formData={formData} updateFormData={updateFormData} />}
                                {formStep == 1 && <FormEmployeeStep1 action={action} parameterList={parameterList} validation={validation} formData={formData} updateFormData={updateFormData} />}
                                {formStep == 2 && <FormEmployeeStep2 parameterList={parameterList} validation={validation} formData={formData} updateFormData={updateFormData} />}
                                {formStep == 3 && <FormEmployeeStep3 parameterList={parameterList} validation={validation} formData={formData} updateFormData={updateFormData} />}
                            </div>
                        </div>
                        <div className='modal-step-buttons'>
                            {(formStep == 2 || formStep == 3) &&
                                <FaArrowAltCircleLeft size={30} title="Anterior" onClick={(e) => setFormStep(formStep - 1)} />
                            }
                            {(formStep == 1 || formStep == 2) &&
                                <FaArrowAltCircleRight size={30} title="Siguente" onClick={(e) => { nextStep(formStep + 1); }} />
                            }
                            <div className='modal-buttons-step'>
                                {formStep == 0 && <button type='submit' className='btns' onClick={searchEmployee}>Confirmar</button>}
                                {formStep != 0 && <button type='submit' className='btns' onClick={submitForm}>Confirmar</button>}
                                <button className='btns-close' onClick={closeModal}>Cerrar</button>
                            </div>
                        </div>

                    </div>
                </div>
            </div >
        </>
    )
}

export default FormEmployeeRegistration;