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
    if (a.descripcion < b.descripcion) {
        return -1;
    }
    if (a.descripcion > b.descripcion) {
        return 1;
    }
    return 0;
}

const ParametersPage = () => {
    const [parameterList, setParameterList] = useState([]);

    useEffect(() => {
        loadParameters();
    }, []);

    const loadParameters = () => {
        getParameters().then(result => {
            if (result.list)
                setParameterList(result.list.sort(compare));
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

    return (
        <ABMPage pageName="Parametros" dataList={parameterList} dataModel={ParameterModel} onAdd={onAdd} onEdit={onEdit} onRemove={onRemove} searchKey='descripcion' />
    );
}

export default ParametersPage;