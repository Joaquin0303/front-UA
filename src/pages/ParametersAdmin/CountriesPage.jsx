import React, { useState, useEffect } from 'react';
import { addCountry, getCountries, removeCountry, updateCountry } from '../../services/CountryServices';
import ABMPage from '../ABMPage';
import { TABLE_ACTIONS } from '../../utils/GeneralConstants';

const CountryModel = {
    codigo: '',
    descripcion: '',
    secuenciador: {
        id: 0
    },
    activo: true
}

const ModelDefinition = [
    {
        fieldName: 'codigo',
        type: 'string'
    },
    {
        fieldName: 'secuenciador',
        type: 'sequencer'
    },
    {
        fieldName: 'descripcion',
        type: 'string'
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
            'descripcion',
            'secuenciador'
        ],
        inactiveRows: [
            'codigo',
            'descripcion',
            'secuenciador'
        ]
    },
    formConfiguration: {
        getFieldTypeByName: getFieldTypeByName,
        activeFields: [
            'codigo',
            'descripcion',
            'secuenciador'
        ],
        inactiveFields: [
        ]
    },
    viewConfiguration: {
        activeFields: [
            'codigo',
            'descripcion',
            'secuenciador'
        ],
        inactiveFields: [
            'codigo',
            'descripcion',
            'secuenciador'
        ]
    }
}

const compare = (a, b) => {
    if (a.codigo.toLowerCase() < b.codigo.toLowerCase()) {
        return -1;
    }
    if (a.codigo.toLowerCase() > b.codigo.toLowerCase()) {
        return 1;
    }
    return 0;
}

let countryTotalList = [];

const CountriesPage = () => {
    const [countryList, setCountryList] = useState([]);
    const [statusActive, setStatusActive] = useState(true);

    useEffect(() => {
        loadCountries();
    }, [statusActive]);

    const loadCountries = () => {
        getCountries().then(result => {
            if (result.list) {
                countryTotalList = result.list;
                setCountryList(result.list.filter(d => d.activo == statusActive).sort(compare));
            }
        });
    }

    const onAdd = (data) => {
        const validation = validate(data);
        if (validation.error) throw validation;
        addCountry(data.codigo, data.descripcion, data.secuenciador, data.activo).then(result => {
            loadCountries();
        });
    }

    const onEdit = (data) => {
        const validation = validate(data);
        if (validation.error) throw validation;
        updateCountry(data.id, data.descripcion, data.codigo, data.secuenciador, data.activo).then(result => {
            loadCountries();
        });
    }

    const onRemove = (data) => {
        removeCountry(data.id).then(result => {
            loadCountries();
        });
    }

    const matchHandler = (data, searchTerm) => {
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        return data.descripcion?.toLowerCase().includes(lowerCaseSearchTerm) ||
            data.pais?.toLowerCase().includes(lowerCaseSearchTerm) ||
            data.secuenciador?.codigo?.toLowerCase().includes(lowerCaseSearchTerm);
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
        if (!data.descripcion?.trim()) {
            result.error = true;
            result.validation.descripcion = "Ingrese descripción"
        }
        if (!data.secuenciador || data.secuenciador.id <= 0) {
            result.error = true;
            result.validation.secuenciador = "Seleccione secuenciador"
        }
        if (countryTotalList.find(pt => pt.codigo.toLowerCase() == data.codigo.toLowerCase() && pt.id != data.id)) {
            result.error = true;
            result.validation.codigo = "Ya existe un país con este codigo"
        }
        return result;
    }

    return (
        <ABMPage pageConfiguration={pageConfiguration} pageName="paises" dataList={countryList} dataModel={CountryModel} onAdd={onAdd} onEdit={onEdit} onRemove={onRemove} matchHandler={matchHandler} setActive={setStatusActive} statusActive={statusActive} />
    );
}

export default CountriesPage;