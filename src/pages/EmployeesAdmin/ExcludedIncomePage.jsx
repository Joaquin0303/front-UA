import React, { useState, useEffect } from 'react';
import { getExcludedIncomes, addExcludedIncome, updateExcludedIncome, removeExcludedIncome } from '../../services/ExcludedIncomeServices';
import ABMPage from '../ABMPage';
import { TABLE_ACTIONS } from '../../utils/GeneralConstants';

const ExcludedIncomeModel = {
    motivo: '',
    empleado: {
        id: 0
    },
    observaciones: '',
    activo: true
}

const ModelDefinition = [
    {
        fieldName: 'documentoPersonal',
        type: 'employee',
        employeeFields: ['numeroDocumentoPersonal'],
        employee: "empleado"
    },
    {
        fieldName: 'apellidoNombre',
        type: 'employee',
        employeeFields: ['apellido', 'nombre'],
        employee: "empleado"
    },
    {
        fieldName: 'emailPersonal',
        type: 'employee',
        employeeFields: ['emailPersonal'],
        employee: "empleado"
    },
    {
        fieldName: 'puesto',
        type: 'employee',
        employeeFields: ['codigoPuesto'],
        employee: "empleado"
    },
    {
        fieldName: 'direccion',
        type: 'employee',
        employeeFields: ['codigoDireccion'],
        employee: "empleado"
    },
    {
        fieldName: 'fechaEgreso',
        type: 'employee',
        employeeFields: ['fechaEgreso'],
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
                TABLE_ACTIONS.VIEW
            ],
            inactiveActions: [
                TABLE_ACTIONS.VIEW
            ],
        },
        activeRows: [
            'documentoPersonal',
            'apellidoNombre',
            'puesto',
            'direccion',
            'fechaEgreso',
            'observaciones'
        ],
        inactiveRows: [
            'documentoPersonal',
            'apellidoNombre',
            'puesto',
            'direccion',
            'fechaEgreso',
            'observaciones'
        ],
        aditionalRows: [
            'documentoPersonal',
            'apellidoNombre',
            'puesto',
            'direccion',
            'fechaEgreso'
        ],
        sortRow: [
            'documentoPersonal',
            'apellidoNombre',
            'puesto',
            'direccion',
            'fechaEgreso',
            'observaciones'
        ]
    },
    formConfiguration: {
        activeFields: [
        ],
        inactiveFields: [
        ]
    },
    viewConfiguration: {
        activeFields: [
            'empleado',
            'motivo',
            'observaciones'
        ],
        inactiveFields: [
            'empleado',
            'motivo',
            'observaciones'
        ]
    }
}

const ExcludedIncomePage = () => {
    const [excludedIncomeList, setExcludedIncomeList] = useState([]);
    const [statusActive, setStatusActive] = useState(true);

    useEffect(() => {
        loadExcludedIcomes();
    }, [statusActive]);

    const loadExcludedIcomes = () => {
        getExcludedIncomes().then(result => {
            console.log("activos", statusActive)
            if (result.list)
                setExcludedIncomeList(result.list);
        });
    }

    const onAdd = (data) => {
        const validation = validate(data);
        if (validation.error) throw validation;
        addExcludedIncome(data.employee, data.motivo, data.observaciones, data.activo).then(result => {
            console.log('saved=', result);
            loadExcludedIcomes();
        });
    }

    const onEdit = (data) => {
        const validation = validate(data);
        if (validation.error) throw validation;
        updateExcludedIncome(data.id, data.employee, data.motivo, data.observaciones, data.activo).then(result => {
            console.log('edited=', result);
            loadExcludedIcomes();
        });
    }

    const onRemove = (data) => {
        removeExcludedIncome(data.id).then(result => {
            console.log('removed=', result);
            loadExcludedIcomes();
        });
    }

    const matchHandler = (data, searchTerm) => {
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        return !data.empleado || data.empleado.numeroLegajo == lowerCaseSearchTerm || (data.empleado.nombre + data.empleado.apellido).toLowerCase().includes(lowerCaseSearchTerm);
    }

    const validate = (data) => {
        const result = {
            error: false,
            validation: {}
        };
        return result;
    }

    return (
        <ABMPage pageConfiguration={pageConfiguration} pageName="ingresoCaido" dataList={excludedIncomeList} dataModel={ExcludedIncomeModel} onAdd={onAdd} onEdit={onEdit} onRemove={onRemove} matchHandler={matchHandler} setActive={setStatusActive} statusActive={statusActive} />
    );
}

export default ExcludedIncomePage;