import React, { useState, useEffect } from 'react';
import { getSequencers, updateSequencer, removeSequencer, addSequencer } from '../../services/SequencerServices';
import ABMPage from '../ABMPage';
import { TABLE_ACTIONS } from '../../utils/GeneralConstants';

const SequencerModel = {
    codigo: '',
    rangoDesde: 0,
    rangoHasta: 0,
    secuencia: 0,
    activo: true
}

const ModelDefinition = [
    {
        fieldName: 'codigo',
        type: 'string'
    },
    {
        fieldName: 'rangoDesde',
        type: 'number'
    },
    {
        fieldName: 'rangoHasta',
        type: 'number'
    },
    {
        fieldName: 'secuencia',
        type: 'number',
        disabled: {
            edit: true,
            add: false
        }
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
            'codigo',
            'rangoDesde',
            'rangoHasta',
            'secuencia'
        ],
        inactiveRows: [
            'codigo',
            'rangoDesde',
            'rangoHasta',
            'secuencia'
        ]
    },
    formConfiguration: {
        getFieldTypeByName: getFieldTypeByName,
        activeFields: [
            'codigo',
            'rangoDesde',
            'rangoHasta',
            'secuencia'
        ],
        inactiveFields: [
        ]
    },
    viewConfiguration: {
        activeFields: [
            'codigo',
            'rangoDesde',
            'rangoHasta',
            'secuencia'
        ],
        inactiveFields: [
            'codigo',
            'rangoDesde',
            'rangoHasta',
            'secuencia'
        ]
    }
}

let secuenceTotalList = [];

const SequencersPage = () => {
    const [sequencerList, setSequencerList] = useState([]);
    const [statusActive, setStatusActive] = useState(true);

    useEffect(() => {
        loadSequencers();
    }, [statusActive]);

    const loadSequencers = () => {
        getSequencers().then(result => {
            if (result.list) {
                secuenceTotalList = result.list;
                setSequencerList(result.list.filter(d => d.activo == statusActive));
            }
        });
    }

    const onAdd = (data) => {
        const validation = validate(data);
        if (validation.error) throw validation;
        addSequencer(data.codigo, data.rangoDesde, data.rangoHasta, data.secuencia, data.activo).then(result => {
            loadSequencers();
        }).catch(error => {
            alert('¡Ups! Ocurrió un error. Inténtelo de nuevo o inicie sesión nuevamente');
        });
    }

    const onEdit = (data) => {
        const validation = validate(data);
        if (validation.error) throw validation;
        updateSequencer(data.id, data.codigo, data.rangoDesde, data.rangoHasta, data.secuencia, data.activo).then(result => {
            loadSequencers();
        }).catch(error => {
            alert('¡Ups! Ocurrió un error. Inténtelo de nuevo o inicie sesión nuevamente');
        });
    }

    const onRemove = (data) => {
        removeSequencer(data.id).then(result => {
            loadSequencers();
        }).catch(error => {
            alert('¡Ups! Ocurrió un error. Inténtelo de nuevo o inicie sesión nuevamente');
        });
    }

    const matchHandler = (data, searchTerm) => {
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        return data.codigo?.toLowerCase().includes(lowerCaseSearchTerm);
    }

    const validate = (data) => {
        const result = {
            error: false,
            validation: {}
        };
        if (!data.codigo?.trim()) {
            result.error = true;
            result.validation.codigo = "Ingrese código"
        }
        if (data.codigo?.trim() && secuenceTotalList.find(sec => data.id != sec.id && data.codigo.toLowerCase() == sec.codigo.toLowerCase())) {
            result.error = true;
            result.validation.codigo = "Ingrese un codigo válido"
        }
        if (!data.rangoDesde) {
            result.error = true;
            result.validation.rangoDesde = "Ingrese rango desde"
        }
        if (!data.rangoHasta) {
            result.error = true;
            result.validation.rangoHasta = "Ingrese rango hasta"
        }
        if (!data.secuencia) {
            result.error = true;
            result.validation.secuencia = "Ingrese secuencia"
        }
        if (data.rangoDesde && data.rangoHasta) {
            if (data.rangoDesde >= data.rangoHasta || secuenceTotalList.find(sec => data.id != sec.id && ((data.rangoDesde <= sec.rangoHasta && data.rangoDesde >= sec.rangoDesde) || (data.rangoHasta >= sec.rangoDesde && data.rangoHasta <= sec.rangoHasta)))) {
                result.error = true;
                result.validation.rangoDesde = "Ingrese un rango válido"
                result.validation.rangoHasta = "Ingrese un rango válido"
            }
            if (data.secuencia && (data.rangoDesde > data.secuencia || data.rangoHasta < data.secuencia)) {
                result.error = true;
                result.validation.secuencia = "Ingrese un valor de secuencia válido"
            }
        }
        return result;
    }

    return (
        <ABMPage pageConfiguration={pageConfiguration} pageName="Secuenciador" dataList={sequencerList} dataModel={SequencerModel} onAdd={onAdd} onEdit={onEdit} onRemove={onRemove} matchHandler={matchHandler} setActive={setStatusActive} statusActive={statusActive} />
    );
}

export default SequencersPage;