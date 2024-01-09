import React, { useState, useEffect } from 'react';
import ABMPage from '../ABMPage';
import { getExternals, addExternal, updateExternal, removeExternal } from '../../services/ExternalServices';
import { TABLE_ACTIONS } from '../../utils/GeneralConstants';

const ExternalModel = {
    apellido: '',
    nombre: '',
    codigoTipoDocumento: {
        id: 0
    },
    numeroDocumento: '',
    numeroDocumentoLaboral: '',
    codigoNacionalidad: '',
    codigoGenero: '',
    fechaIngreso: '',
    codigoPaisResidencia: {
        id: 0
    },
    codigoDireccion: {
        id: 0
    },
    codigoGerencia: {
        id: 0
    },
    codigoJefatura: {
        id: 0
    },
    codigoPuesto: {
        id: 0
    },
    codigoDivision: {
        id: 0
    },
    codigoProveedor: {
        id: 0
    },
    emailPersonal: '',
    activo: true
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
                TABLE_ACTIONS.INACTIVATE
            ],
            inactiveActions: [
                TABLE_ACTIONS.VIEW,
                TABLE_ACTIONS.ACTIVATE
            ],
        },
        activeRows: [
            'numeroLegajo',
            'nombre',
            'apellido',
            'pais',
            'codigoPuesto',
            'codigoDireccion',
            'codigoDivision'
        ],
        inactiveRows: [
            'numeroLegajo',
            'nombre',
            'apellido',
            'pais',
            'codigoPuesto',
            'codigoDireccion',
            'codigoDivision'
        ]
    },
    formConfiguration: {
        activeFields: [
            'numeroLegajo',
            'nombre',
            'apellido',
            'pais',
            'codigoPuesto',
            'codigoDireccion',
            'codigoDivision'
        ],
        inactiveFields: [
            'numeroLegajo',
            'nombre',
            'apellido',
            'pais',
            'codigoPuesto',
            'codigoDireccion',
            'codigoDivision'
        ]
    },
    viewConfiguration: {
        activeFields: [
            'numeroLegajo',
            'nombre',
            'apellido',
            'pais',
            'codigoPuesto',
            'codigoDireccion',
            'codigoDivision'
        ],
        inactiveFields: [
            'numeroLegajo',
            'nombre',
            'apellido',
            'pais',
            'codigoPuesto',
            'codigoDireccion',
            'codigoDivision'
        ]
    }
}

const ExternalPage = () => {
    const [extarnalList, setExternalList] = useState([]);
    const [statusActive, setStatusActive] = useState(true);

    useEffect(() => {
        loadExternals();
    }, [statusActive]);

    const loadExternals = () => {
        getExternals().then(result => {
            if (result.list)
                setExternalList(result.list.filter(d => d.activo == statusActive));
        });
    }

    const onAdd = (data) => {
        const validation = validate(data);
        if (validation.error) throw validation;
        addExternal(data).then(result => {
            console.log('saved=', result);
            loadExternals();
        });
    }

    const onEdit = (data) => {
        const validation = validate(data);
        if (validation.error) throw validation;
        updateExternal(data).then(result => {
            console.log('edited=', result);
            loadExternals();
        });
    }

    const onRemove = (data) => {
        removeExternal(data.id).then(result => {
            console.log('removed=', result);
            loadExternals();
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
        };
        return result;
    }

    return (
        <ABMPage pageConfiguration={pageConfiguration} pageName="external" dataList={extarnalList} dataModel={ExternalModel} onAdd={onAdd} onEdit={onEdit} onRemove={onRemove} matchHandler={matchHandler} setActive={setStatusActive} statusActive={statusActive} />
    );
}

export default ExternalPage;