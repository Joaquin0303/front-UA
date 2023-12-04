import React, { useState, useEffect } from 'react';
import { getParameterTypes, addParameterType, updateParameterType, removeParameterType } from '../../services/ParameterTypeServices';
import ABMPage from '../ABMPage';

const ParameterTypeModel = {
    codigo: '',
    descripcion: '',
    activo: true
}

const ParameterTypesPage = () => {
    const [parameterTypeList, setParameterTypeList] = useState([]);

    useEffect(() => {
        loadParameterTypes();
    }, []);

    const loadParameterTypes = () => {
        getParameterTypes().then(result => {
            setParameterTypeList(result.list);
        });
    }

    const onAdd = (data) => {
        addParameterType(data.codigo, data.descripcion, data.activo).then(result => {
            console.log('saved=', result);
            loadParameterTypes();
        });
    }

    const onEdit = (data) => {
        updateParameterType(data.id, data.codigo, data.descripcion, data.activo).then(result => {
            console.log('edited=', result);
            loadParameterTypes();
        });
    }

    const onRemove = (data) => {
        removeParameterType(data.id).then(result => {
            console.log('removed=', result);
            loadParameterTypes();
        });
    }

    return (
        <ABMPage pageName="Tipo de Parametros" dataList={parameterTypeList} dataModel={ParameterTypeModel} onAdd={onAdd} onEdit={onEdit} onRemove={onRemove} searchKey='descripcion' />
    );
}

export default ParameterTypesPage;