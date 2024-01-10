import React, { useState, useEffect } from 'react';
import ABMPage from '../ABMPage';
import { getEmployees, addEmployee, updateEmployee, getEmployeeById, removeEmployee } from '../../services/EmployeeServices';
import { getCurrentSequence, updateSequencer } from '../../services/SequencerServices';
import { getCountries } from '../../services/CountryServices';
import { addExcludedIncome } from '../../services/ExcludedIncomeServices';
import { addLicense, updateLicense } from '../../services/LicenseServices';
import { TABLE_ACTIONS } from '../../utils/GeneralConstants';
import { compareStrDates, parseInputDate } from '../../utils/Utils';
import { addPositionChange } from '../../services/PositionChangeServices';
import { addLoadFamily } from '../../services/LoadFamilyServices';

const pageConfiguration = {
    show_search: true,
    show_add_button: true,
    show_active_button: true,
    tableConfiguration: {
        actions: {
            activeActions: [
                TABLE_ACTIONS.VIEW,
                TABLE_ACTIONS.EDIT,
                TABLE_ACTIONS.PUTDOWN,
                TABLE_ACTIONS.ADDLICENCE,
                TABLE_ACTIONS.ADDFAMILY
            ],
            inactiveActions: [
                TABLE_ACTIONS.VIEW
            ],
        },
        activeRows: [
        ],
        inactiveRows: [
        ]
    },
    formConfiguration: {
        activeFields: [
            'tipoLicencia', // LicencePage
            'fechaInicio', // LicencePage
            'fechaFin', // LicencePage
            'nombre',
            'apellido',
            'codigoParentesco',
            'codigoTipoDocumento',
            'numeroDocumento',
            'fechaNacimiento'
        ],
        inactiveFields: [
        ]
    },
    viewConfiguration: {
        activeFields: [
            'numeroLegajo',
            'nombre',
            'apellido',
            'codigoTipoDocumento',
            'numeroDocumentoPersonal',
            'numeroDocumentoLaboral',
            'fechaNacimiento',
            'fechaIngreso',
            'codigoPais',
            'codigoOficina',
            'codigoDireccion',
            'codigoPuesto',
            'segundoNombre',
            'nombrePreferido',
            'codigoGeneracion',
            'codigoNacionalidad',
            'codigoGenero',
            'codigoProvincia',
            'calleResidencia',
            'numeroResidencia',
            'departamentoResidencia',
            'pisoResidencia',
            'localidadResidencia',
            'emailPersonal',
            'codigoBanco',
            'cbu',
            'fechaIngresoReconocida',
            'codigoTipoContratacion',
            'horasSemanales',
            'fte',
            'codigoFrecuenciaLiquidacion',
            'codigoTipoEmpleo',
            'codigoTipoJornada',
            'emailLaboral',
            'codigoCategoriaEmpleado',
            'codigoDivision',
            'codigoCentroDeCosto',
            'codigoPrepaga',
            'codigoObraSocial',
            'codigoConvenio',
            'codigoCategoriaConvenio',
            'afiliadoSindicato',
            'fechaFinContrato',
            'fechaEgreso',
            'codigoTipoEgreso',
            'codigoEstadoEmpleado',
            'observaciones',
            'codigoPaisResidencia',
            'codigoEstadoCivil',
            'codigoGrado',
            'tipoLicencia', // LicencePage
            'fechaInicio', // LicencePage
            'fechaFin', // LicencePage

        ],
        inactiveFields: [
            'tipoLicencia', // LicencePage
            'fechaInicio', // LicencePage
            'fechaFin', // LicencePage
        ]
    }
}

let employeeTotalList = [];
export const findById = (id) => {
    return employeeTotalList.find(e => e.id == id);
}

export const findByFileNumber = (fileNumber) => {
    return employeeTotalList.find(e => e.numeroLegajo == fileNumber);
}

export const findByIdentity = (docTypeId, docNumber) => {
    return employeeTotalList.find(e => e.codigoTipoDocumento.id == docTypeId && e.numeroDocumentoPersonal == docNumber);
}

export const findByLaboralIdentity = (docTypeId, docNumber) => {
    return employeeTotalList.find(e => e.codigoTipoDocumento.id == docTypeId && e.numeroDocumentoLaboral == docNumber);
}

const compare = (a, b) => {
    if (a.codigoEstadoEmpleado.id < b.codigoEstadoEmpleado.id) {
        return -1
    } else if (a.codigoEstadoEmpleado.id > b.codigoEstadoEmpleado.id) {
        return 1;
    } else {
        return 0;
    }
}

const EmployeesPage = ({ }) => {
    const [employeeList, setEmployeeList] = useState([]);
    const [statusActive, setStatusActive] = useState(true);
    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');

    useEffect(() => {
        loadEmployees();
    }, [statusActive]);

    const loadEmployees = () => {
        getEmployees().then(result => {
            if (result.list) {
                employeeTotalList = result.list;
                setEmployeeList(result.list.filter(d => (!statusActive && d.codigoEstadoEmpleado.id == 89) || (statusActive && d.codigoEstadoEmpleado.id != 89)).sort(compare));
            }
        });
    }

    const onAdd = (data, action) => {
        switch (action) {
            case TABLE_ACTIONS.ADD:
                const validation = validate(data);
                if (validation.error) throw validation;

                data.codigoEstadoEmpleado = {
                    id: 87
                }

                data.fechaIngresoReconocida = data.fechaIngreso;

                // REMOVE AFTER DATABASE FIXED
                data.codigoCentroDeCosto = {
                    id: 55
                }

                getCountries().then(rCountries => {
                    getCurrentSequence(
                        rCountries.list.find(c => c.id == data.codigoPais.id).secuenciador.codigo
                    ).then(seq => {
                        data.numeroLegajo = seq.model.secuencia;
                        addEmployee(data).then(result => {
                            console.log('Employee added=', result);
                            loadEmployees();
                            updateSequencer(seq.model.id, seq.model.codigo, seq.model.rangoDesde, seq.model.rangoHasta, seq.model.secuencia, seq.model.activo);

                            setShowPopup(true);
                            console.log(`Empleado con el numero de legajo: ${data.numeroLegajo} agregado correctamente`);
                            setPopupMessage(`Empleado con el numero de legajo: ${data.numeroLegajo} agregado correctamente`);

                            setTimeout(() => {
                                setShowPopup(false);
                            }, 3000);
                        });
                    });

                })
                break;
            case TABLE_ACTIONS.ADDLICENCE:
                const validationLicence = validateLicence(data);
                if (validationLicence.error) throw validationLicence;
                addLicense(data.empleado, data.empleado.numeroLegajo, data.fechaInicio, data.fechaFin, data.tipoLicencia, true).then(licenceResult => {
                    console.log('Licence added=', licenceResult);
                    data.empleado.codigoEstadoEmpleado = {
                        id: 88
                    }
                    updateEmployee(data.empleado.id, data.empleado).then(empResult => {
                        loadEmployees();
                    });
                });
                break;
            case TABLE_ACTIONS.ADDFAMILY:
                const validationFamily = validateFamily(data);
                if (validationFamily.error) throw validationFamily;
                addLoadFamily(data).then(result => {
                    console.log('saved=', result);
                });
                break;
            default:
                break;
        }

    }

    const onEdit = (data, action) => {

        switch (action) {
            case TABLE_ACTIONS.EDIT:
                const validation = validate(data);
                if (validation.error) throw validation;
                const employeeId = data.id;
                delete data["id"];
                updateEmployee(employeeId, data).then(empResult => {
                    console.log('Employee updated=', r);
                    loadEmployees();
                });
                break;
            case TABLE_ACTIONS.CHANGEPOSITION:
                getEmployeeById(data.id).then(oldEmp => {
                    if (oldEmp.model.codigoPuesto.id != data.codigoPuesto.id) {
                        addPositionChange(data.numeroLegajo, data.codigoPais, data.codigoOficina, data.codigoDireccion, data.codigoPuesto.codigoGerencia, data.codigoPuesto.codigoJefatura, data.codigoPuesto, data.fechaIngresoReconocida, new Date(), true).then(r => {
                            console.log('Position History Updated', r)
                        })
                        updateEmployee(data.id, data).then(r => {
                            console.log('Employee updated=', r);
                            loadEmployees();
                        });
                    }
                });
                break;
            case TABLE_ACTIONS.PUTDOWN:
                if (data.codigoTipoEgreso && data.codigoTipoEgreso.id == 202) {
                    data.fechaEgreso = data.fechaIngreso;
                    addExcludedIncome(data, data.codigoTipoEgreso.descripcion, data.observaciones, true).then(excludeResult => {
                        console.log('Excluded Income added=', excludeResult);
                    });
                }
                updateEmployee(data.id, data).then(r => {
                    console.log('Employee updated=', r);
                    loadEmployees();
                });
                break;
            case TABLE_ACTIONS.RENEWLICENCE:
                const oldLicence = data.oldLicence;
                const validationLicence = validateLicence(data, oldLicence);
                if (validationLicence.error) throw validationLicence;
                updateLicense(oldLicence.id, oldLicence.empleado, oldLicence.numeroLegajo, oldLicence.fechaInicio, oldLicence.fechaFin, oldLicence.tipoLicencia, false).then(r => {
                    console.log('Licence inactivated=', r);
                    addLicense(data.empleado, data.empleado.numeroLegajo, data.fechaInicio, data.fechaFin, data.tipoLicencia, true).then(r => {
                        console.log('Licence added=', r);
                    });
                });

                break;
            case TABLE_ACTIONS.PUTDOWNLICENCE:
                let putdownLicence = confirm("Desea dar de baja la licencia y reactivar el empleado?");
                if (putdownLicence) {
                    updateLicense(data.id, data.empleado, data.numeroLegajo, data.fechaInicio, data.fechaFin, data.tipoLicencia, false).then(result => {
                        console.log('Putdown Licence=', result);
                        result.model.empleado.codigoEstadoEmpleado = {
                            id: 87 // ACTIVATE EMPLOYEE
                        };
                        updateEmployee(result.model.empleado.id, result.model.empleado).then(resultEmp => {
                            console.log('Update employee=', resultEmp);
                            loadEmployees();
                        })
                    });
                }
                break;
            default:
                break;
        }
    }

    const onRemove = (data) => {
        removeEmployee(data.id).then(result => {
            console.log('Employee removed=', result);
            loadEmployees();
        });
    }

    const matchHandler = (data, searchTerm) => {
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        return data.numeroLegajo == lowerCaseSearchTerm || (data.nombre + data.apellido).toLowerCase().includes(lowerCaseSearchTerm);
    }

    const validate = (data) => {
        const result = {
            error: false,
            validation: {}
        }

        return result;
    }

    const validateLicence = (data, oldLicence) => {
        const result = {
            error: false,
            validation: {}
        };
        if (!data.fechaInicio || data.fechaInicio.trim().length <= 0) {
            result.error = true;
            result.validation.fechaInicio = "Ingrese fecha de inicio"
        }
        if (!data.fechaFin || data.fechaFin.trim().length <= 0) {
            result.error = true;
            result.validation.fechaFin = "Ingrese fecha de finalización"
        }
        if (data.fechaInicio && data.fechaFin && compareStrDates(data.fechaInicio, data.fechaFin) < 1) {
            result.error = true;
            result.validation.fechaFin = "Ingrese fecha de fin valida"
        }
        if (!data.tipoLicencia) {
            result.error = true;
            result.validation.tipoLicencia = "Ingrese motivo de licencia"
        }
        if (oldLicence && data.fechaInicio) {
            const lDate1 = parseInputDate(data.fechaInicio);
            const lDate2 = parseInputDate(oldLicence.fechaFin);
            if (lDate1 <= lDate2) {
                result.error = true;
                result.validation.fechaInicio = "Ingrese fecha de inicio mayor"
            }
        }
        return result;
    }

    const validateFamily = (data) => {
        const result = {
            error: false,
            validation: {}
        };
        if (!data.nombre || data.nombre.trim().length <= 0) {
            result.error = true;
            result.validation.nombre = "Ingrese nombre"
        }
        if (!data.apellido || data.apellido.trim().length <= 0) {
            result.error = true;
            result.validation.apellido = "Ingrese apellido"
        }
        if (!data.codigoTipoDocumento || data.codigoTipoDocumento.id <= 0) {
            result.error = true;
            result.validation.codigoTipoDocumento = "Ingrese tipo de documento"
        }
        if (!data.fechaNacimiento) {
            result.error = true;
            result.validation.fechaNacimiento = "Ingrese fecha de nacimiento"
        }
        if (!data.codigoParentesco) {
            result.error = true;
            result.validation.codigoParentesco = "Ingrese un parentesco"
        }
        if (!data.numeroDocumento || data.numeroDocumento.trim().length <= 0) {
            result.error = true;
            result.validation.numeroDocumento = "Ingrese nro. documento"
        }
        return result;
    }

    return (
        <>
        {showPopup && <PopUp message={popupMessage} />}
        <ABMPage pageConfiguration={pageConfiguration} pageName="Empleados" dataList={employeeList} onAdd={onAdd} onEdit={onEdit} onRemove={onRemove} matchHandler={matchHandler} setActive={setStatusActive} statusActive={statusActive} />
        </>
    );
}

export default EmployeesPage;