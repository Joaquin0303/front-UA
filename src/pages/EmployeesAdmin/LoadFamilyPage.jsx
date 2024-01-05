import React, { useState, useEffect } from 'react';
import ABMPage from '../ABMPage';
import { getLoadFamilies, addLoadFamily, updateLoadFamily, removeLoadFamily } from '../../services/LoadFamilyServices';
import { TABLE_ACTIONS } from '../../utils/GeneralConstants';
import { compareStrDates } from '../../utils/Utils';

export const LoadFamilyModel = {
    numeroLegajo: null,
    apellido: '',
    nombre: null,
    codigoParentesco: null,
    codigoTipoDocumento: null,
    numeroDocumento: null,
    fechaNacimiento: null,
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
                TABLE_ACTIONS.INACTIVATE
            ],
            inactiveActions: [
                TABLE_ACTIONS.VIEW,
                TABLE_ACTIONS.ACTIVATE,
            ],
        },
        activeRows: [
            'numeroLegajo',
            'nombre',
            'apellido',
            'codigoParentesco',
            'numeroDocumentoPersonal',
            'fechaNacimiento',
        ],
        inactiveRows: [
        ]
    },
    formConfiguration: {
        activeFields: [
            'numeroLegajo',
            'codigoParentesco',
            'numeroDocumentoPersonal',
            'fechaNacimiento',
        ],
        inactiveFields: [
        ]
    },
    viewConfiguration: {
        activeFields: [
            'numeroLegajo',
            'codigoParentesco',
            'numeroDocumentoPersonal',
            'fechaNacimiento',
        ],
        inactiveFields: [
        ]
    }
}

const LoadFamilyPage = () => {
    const [loadFamilyList, setLoadFamilyList] = useState([]);
    const [statusActive, setStatusActive] = useState(true);

    useEffect(() => {
        loadLoadFamilies();
    }, [statusActive]);

    const loadLoadFamilies = () => {
        getLoadFamilies().then(result => {
            if (result.list)
                setLoadFamilyList(result.list.filter(d => d.activo == statusActive));
        });
    }

    const onAdd = (data) => {
        const validation = validate(data);
        if (validation.error) throw validation;
        addLoadFamily(data).then(result => {
            console.log('saved=', result);
            loadLoadFamilies();
        });
    }

    const onEdit = (data) => {
        const validation = validate(data);
        if (validation.error) throw validation;
        updateLoadFamily(data).then(result => {
            console.log('edited=', result);
            loadLoadFamilies();
        });
    }

    const onRemove = (data) => {
        removeLoadFamily(data.id).then(result => {
            console.log('removed=', result);
            loadLoadFamilies();
        });
    }

    const matchHandler = (data, searchTerm) => {
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        return lowerCaseSearchTerm == lowerCaseSearchTerm;
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

    return (
        <ABMPage pageConfiguration={pageConfiguration} pageName="cargaDeFamilia" dataList={loadFamilyList} dataModel={LoadFamilyModel} onAdd={onAdd} onEdit={onEdit} onRemove={onRemove} matchHandler={matchHandler} setActive={setStatusActive} statusActive={statusActive} />
    );
}

export default LoadFamilyPage;