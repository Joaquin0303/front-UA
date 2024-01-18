import React, { useState, useEffect } from 'react';
import ABMPage from '../ABMPage';
import { getLoadFamilies, addLoadFamily, updateLoadFamily, removeLoadFamily } from '../../services/LoadFamilyServices';
import { TABLE_ACTIONS } from '../../utils/GeneralConstants';

export const LoadFamilyModel = {
    apellido: '',
    nombre: '',
    codigoParentesco: {
        id: 0
    },
    codigoTipoDocumento: {
        id: 0
    },
    numeroDocumento: '',
    fechaNacimiento: '',
    activo: true
}

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
        fieldName: 'apellidoynombre',
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
    show_active_button: false,
    tableConfiguration: {
        getFieldTypeByName: getFieldTypeByName,
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
            'codigoTipoDocumento',
            'numeroDocumento',
            'fechaNacimiento',
            'apellidoynombre'
        ],
        inactiveRows: [
            'numeroLegajo',
            'nombre',
            'apellido',
            'codigoParentesco',
            'codigoTipoDocumento',
            'numeroDocumento',
            'fechaNacimiento',
            'apellidoynombre'
        ],
        aditionalRows: [
            'apellidoynombre'
        ],
    },
    formConfiguration: {
        getFieldTypeByName: getFieldTypeByName,
        activeFields: [
            'nombre',
            'apellido',
            'codigoParentesco',
            'codigoTipoDocumento',
            'numeroDocumento',
            'fechaNacimiento',
        ],
        inactiveFields: [
            'nombre',
            'apellido',
            'codigoParentesco',
            'codigoTipoDocumento',
            'numeroDocumento',
            'fechaNacimiento',
        ]
    },
    viewConfiguration: {
        activeFields: [
            'nombre',
            'apellido',
            'codigoParentesco',
            'codigoTipoDocumento',
            'numeroDocumento',
            'fechaNacimiento',
        ],
        inactiveFields: [
            'numeroLegajo',
            'nombre',
            'apellido',
            'codigoParentesco',
            'codigoTipoDocumento',
            'numeroDocumento',
            'fechaNacimiento',
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
            if (result)
                setLoadFamilyList(result.filter(d => d.activo == statusActive));
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
        updateLoadFamily(data.id, data).then(result => {
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
        <ABMPage pageConfiguration={pageConfiguration} pageName="cargaDeFamilia" dataList={loadFamilyList} dataModel={LoadFamilyModel} onAdd={onAdd} onEdit={onEdit} onRemove={onRemove} matchHandler={matchHandler} setActive={setStatusActive} statusActive={statusActive} />
    );
}

export default LoadFamilyPage;