import React, { useState, useEffect } from 'react';
import { addLicense, getLicenses, removeLicense, updateLicense, getLicenseById } from '../../services/LicenseServices';
import { updateEmployee } from '../../services/EmployeeServices';
import ABMPage from '../ABMPage';
import { TABLE_ACTIONS } from '../../utils/GeneralConstants';
import { compareStrDates } from '../../utils/Utils';

export const putDownLicenceModel = {
    fechaFin: '',
    activo: true
}

export const LicenseModel = {
    numeroLegajo: null,
    fechaInicio: null,
    fechaFin: null,
    tipoLicencia: '',
    activo: true
}

const ModelDefinition = [
    {
        fieldName: 'numeroLegajo',
        type: 'string'
    },
    {
        fieldName: 'fechaInicio',
        type: 'calendar'
    },
    {
        fieldName: 'tipoLicencia',
        type: 'parameter',
        code: 16
    },
    {
        fieldName: 'fechaFin',
        type: 'calendar'
    },
    {
        fieldName: 'nombreyapellido',
        type: 'employee',
        employeeFields: ['apellido', 'nombre'],
        employee: "empleado"
    }
]

const getFieldTypeByName = (fieldName) => {
    const field = ModelDefinition.find(d => d.fieldName == fieldName);
    if (field) return field;
    else return null;
}

const pageConfiguration = {
    show_search: true,
    show_add_button: false,
    show_active_button: true,
    tableConfiguration: {
        getFieldTypeByName: getFieldTypeByName,
        actions: {
            activeActions: [
                TABLE_ACTIONS.VIEW
            ],
            inactiveActions: [
                TABLE_ACTIONS.VIEW,
            ],
        },
        activeRows: [
            'tipoLicencia',
            'fechaInicio',
            'fechaFin',
            'numeroLegajo',
            'nombreyapellido'
        ],
        inactiveRows: [
            'tipoLicencia',
            'fechaInicio',
            'fechaFin',
            'numeroLegajo',
            'nombreyapellido'
        ],
        aditionalRows: [
            'nombreyapellido'
        ],
        sortRow: [
            'numeroLegajo',
            'nombreyapellido',
            'tipoLicencia',
            'fechaInicio',
            'fechaFin'
        ]
    },
    formConfiguration: {
        getFieldTypeByName: getFieldTypeByName,
        activeFields: [
            'tipoLicencia',
            'fechaInicio',
            'fechaFin'
        ],
        inactiveFields: [
        ]
    },
    viewConfiguration: {
        activeFields: [
            'numeroLegajo',
            'tipoLicencia',
            'fechaInicio',
            'fechaFin',
            'empleado'
        ],
        inactiveFields: [
            'numeroLegajo',
            'tipoLicencia',
            'fechaInicio',
            'fechaFin',
            'empleado'
        ]
    }
}

const compare = (a, b) => {
    if (a.activo && !b.activo) {
        return -1;
    } else if (!a.activo && b.activo) {
        return 1;
    } else {
        if (a.empleado.apellido < b.empleado.apellido) {
            return -1
        } else if (a.empleado.apellido > b.empleado.apellido) {
            return 1;
        } else {
            return 0;
        }
    }
}

const LicensesPage = () => {
    const [licenseList, setLicenseList] = useState([]);
    const [statusActive, setStatusActive] = useState(true);
    useEffect(() => {
        loadLicenses();
    }, [statusActive]);

    const loadLicenses = () => {
        getLicenses().then(result => {
            if (result.list)
                setLicenseList(result.list.filter(d => d.activo == statusActive).sort(compare));
        });
    }

    const onAdd = (data, action) => {
        const validation = validate(data);
        if (validation.error) throw validation;
        switch (action) {
            case TABLE_ACTIONS.ADD:
                break;
            case TABLE_ACTIONS.ADDLICENCE: // RENOVATION
                const validation = validateRenovation(data);
                if (validation.error) throw validation;
                addLicense(data.empleado, data.empleado.numeroLegajo, data.fechaInicio, data.fechaFin, data.tipoLicencia, true).then(nLicenceResult => {
                    getLicenseById(data.id).then(originalLicence => {
                        updateLicense(originalLicence.model.id, originalLicence.model.empleado, originalLicence.model.numeroLegajo, originalLicence.model.fechaInicio, originalLicence.model.fechaFin, originalLicence.model.tipoLicencia, false).then(oLicenceResult => {
                            loadLicenses();
                        });
                    }).catch(error => {
                        alert('¡Ups! Ocurrió un error. Inténtelo de nuevo o inicie sesión nuevamente');
                    });
                });
                break;
        }
    }

    const onEdit = (data, action) => {
        const validation = validate(data);
        if (validation.error) throw validation;
        switch (action) {
            case TABLE_ACTIONS.PUTDOWNLICENCE:
                let putdownLicence = confirm("Desea dar de baja la licencia y reactivar el empleado?");
                if (putdownLicence) {
                    updateLicense(data.id, data.empleado, data.numeroLegajo, data.fechaInicio, data.fechaFin, data.tipoLicencia, false).then(result => {
                        result.model.empleado.codigoEstadoEmpleado = {
                            id: 87 // ACTIVATE EMPLOYEE
                        };
                        updateEmployee(result.model.empleado.id, result.model.empleado).then(resultEmp => {
                            loadLicenses();
                        })
                    }).catch(error => {
                        alert('¡Ups! Ocurrió un error. Inténtelo de nuevo o inicie sesión nuevamente');
                    });
                }
                break;
            case TABLE_ACTIONS.EDIT:
                updateLicense(data.id, data.empleado, data.numeroLegajo, data.fechaInicio, data.fechaFin, data.tipoLicencia, data.activo).then(result => {
                    loadLicenses();
                });
                break;
            default:
        }


    }

    const onRemove = (data) => {
        removeLicense(data.numeroLegajo).then(result => {
            loadLicenses();
        }).catch(error => {
            alert('¡Ups! Ocurrió un error. Inténtelo de nuevo o inicie sesión nuevamente');
        });
    }

    const matchHandler = (data, searchTerm) => {
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        return !data.empleado || data.numeroLegajo == lowerCaseSearchTerm || (data.empleado.nombre + data.empleado.apellido).toLowerCase().includes(lowerCaseSearchTerm);
    }

    const validate = (data) => {
        const result = {
            error: false,
            validation: {}
        };
        if (!data.fechaInicio) {
            result.error = true;
            result.validation.fechaInicio = "Ingrese fecha de inicio"
        }
        if (!data.fechaFin) {
            result.error = true;
            result.validation.fechaFin = "Ingrese fecha de finalización"
        }
        if (data.fechaInicio && data.fechaFin && compareStrDates(data.fechaInicio, data.fechaFin) < 1) {
            result.error = true;
            result.validation.fechaInicio = "Ingrese fecha de inicio valida"
        }
        if (!data.tipoLicencia) {
            result.error = true;
            result.validation.tipoLicencia = "Ingrese motivo de licencia"
        }
        return result;
    }

    const validateRenovation = (data) => {
        const result = {
            error: false,
            validation: {}
        };
        if (licenseList.find(l => l.numeroLegajo == data.numeroLegajo && l.activo && compareStrDates(l.fechaFin, data.fechaInicio) < 1)) {
            result.error = true;
            result.validation.fechaInicio = "Ingrese fecha de inicio valida"
        }
        return result;
    }


    return (
        <ABMPage pageConfiguration={pageConfiguration} pageName="licenciaHistory" dataList={licenseList} dataModel={LicenseModel} onAdd={onAdd} onEdit={onEdit} onRemove={onRemove} matchHandler={matchHandler} setActive={setStatusActive} statusActive={statusActive} />
    );
}

export default LicensesPage;