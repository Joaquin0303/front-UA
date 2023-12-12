import React, { useState, useEffect } from 'react';
import { getParameters, addParameter, updateParameter, removeParameter } from '../../services/ParameterServices';
import ABMPage from '../ABMPage';

const ParameterModel = {
    codigo: '',
    tipoParametro: {
        id: 1
    },
    descripcion: '',
    texto1: '',
    texto2: '',
    activo: true
}

const compare = (a, b) => {
    if (a.tipoParametro.descripcion < b.tipoParametro.descripcion) {
        return -1
    } else if (a.tipoParametro.descripcion > b.tipoParametro.descripcion) {
        return 1;
    } else {
        if (a.descripcion < b.descripcion) {
            return -1;
        }
        if (a.descripcion > b.descripcion) {
            return 1;
        }
        return 0;
    }
}

const ParametersPage = () => {
    const [parameterList, setParameterList] = useState([]);
    const [statusActive, setStatusActive] = useState(true);

    useEffect(() => {
        loadParameters();
    }, [statusActive]);

    const loadParameters = () => {
        getParameters().then(result => {
            if (result.list)
                setParameterList(result.list.filter(d => d.activo == statusActive).sort(compare));
        });
    }

    const onAdd = (data) => {
        addParameter(data.codigo, data.tipoParametro, data.descripcion, data.texto1, data.texto2, data.activo).then(result => {
            console.log('saved=', result);
            loadParameters();
        });
    }

    const onEdit = (data) => {
        updateParameter(data.id, data.tipoParametro, data.codigo, data.descripcion, data.texto1, data.texto2, data.activo).then(result => {
            console.log('edited=', result);
            loadParameters();
        });
    }

    const onRemove = (data) => {
        removeParameter(data.id).then(result => {
            console.log('removed=', result);
            loadParameters();
        });
    }

    const matchHandler = (data, searchTerm) => {
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        return data.tipoParametro?.descripcion?.toLowerCase().includes(lowerCaseSearchTerm) ||
            data.descripcion?.toLowerCase().includes(lowerCaseSearchTerm);
    }

    return (
        <ABMPage pageName="Parametros" dataList={parameterList} dataModel={ParameterModel} onAdd={onAdd} onEdit={onEdit} onRemove={onRemove} setActive={setStatusActive} matchHandler={matchHandler} />
    );
}

export default ParametersPage;