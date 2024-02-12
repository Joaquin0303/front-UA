import React, { useState, useEffect } from 'react';
import ABMPage from '../ABMPage';
import { getEmployees, addEmployee, updateEmployee, getEmployeeById, removeEmployee } from '../../services/EmployeeServices';
import { getCurrentSequence, updateSequencer, getSequencerById } from '../../services/SequencerServices';
import { getCountries } from '../../services/CountryServices';
import { addExcludedIncome } from '../../services/ExcludedIncomeServices';
import { addLicense, updateLicense } from '../../services/LicenseServices';
import { TABLE_ACTIONS } from '../../utils/GeneralConstants';
import { compareStrDates, parseDate, parseInputDate, parseToday } from '../../utils/Utils';
import { addPositionChange, updatePositionChange, searchPositionChange } from '../../services/PositionChangeServices';
import { addLoadFamily } from '../../services/LoadFamilyServices';
import PopUp from '../../components/modal/PopUp';

const ModelDefinition = [
    {
        fieldName: 'apellido',
        type: 'string'
    },
    {
        fieldName: 'nombre',
        type: 'string'
    },
    {
        fieldName: 'codigoParentesco',
        type: 'parameter',
        code: 20
    },
    {
        fieldName: 'codigoTipoDocumento',
        type: 'parameter',
        code: 29
    },
    {
        fieldName: 'numeroDocumento',
        type: 'string'
    },
    {
        fieldName: 'fechaNacimiento',
        type: 'calendar'
    },
    {
        fieldName: 'numeroLegajo',
        type: 'string'
    },
    {
        fieldName: 'fechaInicio',
        type: 'calendar'
    },
    {
        fieldName: 'fechaFin',
        type: 'calendar'
    },
    {
        fieldName: 'tipoLicencia',
        type: 'parameter',
        code: 16
    },
    {
        fieldName: 'nombreyapellido',
        type: 'employee',
        employeeFields: ['apellido', 'nombre'],
        employee: "empleado"
    },
    {
        fieldName: 'fechaInicioPuesto',
        type: 'calendar'
    }
]

const getFieldTypeByName = (fieldName) => {
    const field = ModelDefinition.find(d => d.fieldName == fieldName);
    if (field) return field;
    else return null;
}

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
        getFieldTypeByName: getFieldTypeByName,
        activeFields: [
            'tipoLicencia', // LicencePage
            'fechaInicio', // LicencePage
            'fechaFin', // LicencePage
            'nombre',
            'apellido',
            'codigoParentesco',
            'codigoTipoDocumento',
            'numeroDocumento',
            'fechaNacimiento',
            'fechaInicioPuesto'
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
    return employeeTotalList.find(e => e.codigoTipoDocumento.id == docTypeId && e.numeroDocumentoPersonal == docNumber && (e.codigoEstadoEmpleado.id == 87 || e.codigoEstadoEmpleado.id == 88));
}

export const filterByIdentity = (docTypeId, docNumber) => {
    return employeeTotalList.filter(e => e.codigoTipoDocumento.id && e.codigoTipoDocumento.id > 0 && e.codigoTipoDocumento.id == docTypeId && e.numeroDocumentoPersonal == docNumber);
}

export const findByLaboralIdentity = (docTypeId, docNumber) => {
    return employeeTotalList.find(e => e.codigoTipoDocumento.id == docTypeId && e.numeroDocumentoLaboral == docNumber && (e.codigoEstadoEmpleado.id == 87 || e.codigoEstadoEmpleado.id == 88));
}

const compare = (a, b) => {
    if (a.codigoEstadoEmpleado.id < b.codigoEstadoEmpleado.id) {
        return -1
    } else if (a.codigoEstadoEmpleado.id > b.codigoEstadoEmpleado.id) {
        return 1;
    } else {
        if (a.numeroLegajo < b.numeroLegajo) {
            return -1
        } else if (a.numeroLegajo > b.numeroLegajo) {
            return 1;
        } else {
            return 0;
        }
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

                // REMOVE AFTER DATABASE FIXED
                data.codigoCentroDeCosto = data.codigoPuesto.codigoCentroDeCosto;

                if (data.antiguedad) {
                    data.fechaIngresoReconocida = new Date(parseInputDate(data.fechaIngreso).getTime() - data.antiguedad);
                } else {
                    data.fechaIngresoReconocida = data.fechaIngreso;
                }

                getCountries().then(rCountries => {
                    getCurrentSequence(
                        rCountries.list.find(c => c.id == data.codigoPais.id).secuenciador.codigo
                    ).then(seq1 => {
                        if (seq1.model.secuencia <= seq1.model.rangoHasta) {
                            data.numeroLegajo = seq1.model.secuencia;
                            addEmployee(data).then(result => {
                                console.log('Employee added=', result);
                                loadEmployees();
                                getSequencerById(seq1.model.id).then(seq2 => {
                                    if (seq1.model.secuencia == seq2.model.secuencia + 1)
                                        updateSequencer(seq1.model.id, seq1.model.codigo, seq1.model.rangoDesde, seq1.model.rangoHasta, seq1.model.secuencia, seq1.model.activo);
                                });
                                setShowPopup(true);
                                console.log(`Empleado con el numero de legajo: ${data.numeroLegajo} agregado correctamente`);
                                let message = `Empleado con el numero de legajo: ${data.numeroLegajo} agregado correctamente`;
                                let timePopup = 3000;
                                if (seq1.model.secuencia == seq1.model.rangoHasta) {
                                    message += `.\n Se ha llegado al máximo número de secuencia, recuerde actualizar el secuenciador antes de ingresar un nuevo empleado.`;
                                    timePopup = 6000;
                                }
                                setPopupMessage(message);

                                setTimeout(() => {
                                    setShowPopup(false);
                                }, timePopup);
                            });
                        } else {
                            setShowPopup(true);
                            console.log(`Numero de secuencia ${seq1.model.secuencia} exede el rango del secuenciador`);
                            setPopupMessage(`El empleado ${data.nombre} ${data.apellido} no se ha podido dar de alta debido a que no hay número disponible para su legajo`);

                            setTimeout(() => {
                                setShowPopup(false);
                            }, 10000);
                        }
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
                updateEmployee(employeeId, data).then(r => {
                    console.log('Employee updated=', r);
                    loadEmployees();
                });
                break;
            case TABLE_ACTIONS.CHANGEPOSITION:
                getEmployeeById(data.id).then(oldEmp => {
                    if (oldEmp.model.codigoPuesto.id != data.codigoPuesto.id) {
                        searchPositionChange(oldEmp.model.numeroLegajo).then(hp => {
                            const fechaFinLastPuesto = parseToday();
                            if (hp && hp.list) {
                                // HAY UN PUESTO GUARDADO
                                const lastPosition = hp.list.find(p => p.fechaFinPuesto == null);
                                lastPosition.fechaFinPuesto = fechaFinLastPuesto;
                                updatePositionChange(lastPosition.id, lastPosition).then(r => {
                                    console.log('Position History Updated', r)
                                });
                            } else {
                                addPositionChange(data.numeroLegajo, data.codigoPais, oldEmp.model.codigoOficina, oldEmp.model.codigoPuesto.codigoDireccion, oldEmp.model.codigoPuesto.codigoGerencia, oldEmp.model.codigoPuesto.codigoJefatura, oldEmp.model.codigoPuesto, oldEmp.model.fechaIngresoReconocida, fechaFinLastPuesto, true).then(r => {
                                    console.log('Old Position History Added', r)
                                });
                            }
                            addPositionChange(data.numeroLegajo, data.codigoPais, data.codigoOficina, data.codigoPuesto.codigoDireccion, data.codigoPuesto.codigoGerencia, data.codigoPuesto.codigoJefatura, data.codigoPuesto, data.fechaInicioPuesto, null, true).then(r => {
                                console.log('New Position History Added', r)
                            });

                            updateEmployee(data.id, data).then(r => {
                                console.log('Employee updated=', r);
                                loadEmployees();
                            });
                            /*
                                                        let startPositionDate = parseInputDate(oldEmp.model.fechaIngresoReconocida);
                                                        if (hp.list) {
                                                            startPositionDate = new Date(Math.max.apply(null, hp.list.map(p => {
                                                                return parseInputDate(p.fechaEgreso);
                                                            })));
                                                            startPositionDate.setDate(startPositionDate.getDate() + 1);
                                                        }
                                                        console.log('startPositionDate', startPositionDate)
                                                        if (startPositionDate < new Date()) {
                                                            addPositionChange(data.numeroLegajo, data.codigoPais, oldEmp.model.codigoOficina, oldEmp.model.codigoPuesto.codigoDireccion, oldEmp.model.codigoPuesto.codigoGerencia, oldEmp.model.codigoPuesto.codigoJefatura, oldEmp.model.codigoPuesto, startPositionDate, parseToday(), true).then(r => {
                                                                console.log('Position History Updated', r)
                                                            });
                            
                                                            data.codigoCentroDeCosto = data.codigoPuesto.codigoCentroDeCosto;
                                                            updateEmployee(data.id, data).then(r => {
                                                                console.log('Employee updated=', r);
                                                                loadEmployees();
                                                            });
                                                        } else {
                                                            setShowPopup(true);
                                                            console.log(`No es posible cambiar de puesto a un empleado mas de una vez en el mismo día`);
                                                            setPopupMessage(`No es posible cambiar de puesto a un empleado mas de una vez en el mismo día`);
                            
                                                            setTimeout(() => {
                                                                setShowPopup(false);
                                                            }, 10000);
                                                        }
                            */
                        })

                    }
                });
                break;
            case TABLE_ACTIONS.PUTDOWN:
                if (data.codigoTipoEgreso && data.codigoTipoEgreso.codigo == 'ME06') {
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
                console.log('data.licence', data.licence)
                data.licence.fechaFin = data.fechaFin;
                const validationPutDownLicence = validatePutDownLicence(data.licence);
                console.log(validationPutDownLicence)
                if (validationPutDownLicence.error) throw validationPutDownLicence;
                let putdownLicence = confirm("Desea dar de baja la licencia y reactivar el empleado?");
                if (putdownLicence) {
                    console.log('Data Licencia=', data)
                    updateLicense(data.licence.id, data.licence.empleado, data.licence.numeroLegajo, data.licence.fechaInicio, data.licence.fechaFin, data.licence.tipoLicencia, false).then(result => {
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


    const validatePutDownLicence = (data) => {
        const result = {
            error: false,
            validation: {}
        };
        if (!data.fechaFin || data.fechaFin.trim().length <= 0) {
            result.error = true;
            result.validation.fechaFin = "Ingrese fecha de finalización"
        }
        if (data.fechaInicio && data.fechaFin && compareStrDates(data.fechaInicio, data.fechaFin) < 1) {
            result.error = true;
            result.validation.fechaFin = "Ingrese fecha de fin valida"
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
        if (data.fechaEgreso && compareStrDates(data.fechaIngreso, data.fechaEgreso) < 1) {
            result.error = true;
            result.validation.fechaIngreso = "Ingrese fecha de egreso valida"
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
        if (!data.codigoParentesco || data.codigoParentesco.id <= 0) {
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