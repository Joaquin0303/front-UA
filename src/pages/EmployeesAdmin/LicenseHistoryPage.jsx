import React, { useState, useEffect } from 'react';
import { addLicense, getLicenses, removeLicense, updateLicense } from '../../services/LicenseServices';
import ABMPage from '../ABMPage';
import { TABLE_ACTIONS } from '../../utils/GeneralConstants';

const LicenseModel = {
    numeroLegajo: null,
    fechaInicio: null,
    fechaFin: null,
    motivoLicencia: '',
    activo: true
}

const pageConfiguration = {
    show_search: true,
    show_add_button: false,
    show_active_button: false,
    tableConfiguration: {
        actions: {
            activeActions: [
                TABLE_ACTIONS.VIEW,
                TABLE_ACTIONS.EDIT,
                TABLE_ACTIONS.PUTDOWN
            ],
            inactiveActions: [
            ],
        },
        activeRows: [
            'numeroLegajo',
            'tipoLicencia',
            'fechaInicio',
            'fechaFin',
            'empleado',
            'motivoLicencia'
        ],
        inactiveRows: [
        ]
    },
    formConfiguration: {
        activeFields: [
            'numeroLegajo',
            'tipoLicencia',
            'fechaInicio',
            'fechaFin',
            'empleado',
            'motivoLicencia'
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
            'empleado',
            'motivoLicencia'
        ],
        inactiveFields: [
        ]
    }
}

const LicensesPage = () => {
    const [licenseList, setLicenseList] = useState([]);
    const [statusActive, setStatusActive] = useState(true);
    console.log(licenseList);
    useEffect(() => {
        loadLicenses();
    }, [statusActive]);

    const loadLicenses = () => {
        getLicenses().then(result => {
            if (result.list)
                setLicenseList(result.list.filter(d => d.activo == statusActive));
        });
    }

    const onAdd = (data) => {
        const validation = validate(data);
        if (validation.error) throw validation;
        addLicense(data.empleado, data.numeroLegajo, data.fechaInicio, data.fechaFin, data.motivoLicencia, data.activo).then(result => {
            console.log('saved=', result);
            loadLicenses();
        });
    }

    const onEdit = (data) => {
        const validation = validate(data);
        if (validation.error) throw validation;
        updateLicense(data.empleado, data.numeroLegajo, data.fechaInicio, data.fechaFin, data.motivoLicencia, data.activo).then(result => {
            console.log('edited=', result);
            loadLicenses();
        });
    }

    const onRemove = (data) => {
        removeLicense(data.numeroLegajo).then(result => {
            console.log('removed=', result);
            loadLicenses();
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
        if (!data.numeroLegajo) {
            result.error = true;
            result.validation.numeroLegajo = "Ingrese número de legajo"
        }
        if (!data.fechaInicio) {
            result.error = true;
            result.validation.fechaInicio = "Ingrese fecha de inicio"
        }
        if (!data.fechaFin) {
            result.error = true;
            result.validation.fechaFin = "Ingrese fecha de finalización"
        }
        if (!data.motivoLicencia) {
            result.error = true;
            result.validation.motivoLicencia = "Ingrese motivo de licencia"
        }
        if (!data.activo) {
            result.error = true;
            result.validation.activo = "Ingrese activo"
        }
        /* if (!data.secuenciador || data.secuenciador.id <= 0) {
            result.error = true;
            result.validation.secuenciador = "Seleccione secuenciador"
        } */
        return result;
    }

    return (
        <ABMPage pageConfiguration={pageConfiguration} pageName="licenciaHistory" dataList={licenseList} dataModel={LicenseModel} onAdd={onAdd} onEdit={onEdit} onRemove={onRemove} matchHandler={matchHandler} setActive={setStatusActive} statusActive={statusActive} />
    );
}

export default LicensesPage;