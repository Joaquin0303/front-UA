import React, { useState, useEffect } from 'react';
import { getParameterTypes, addParameterType, updateParameterType, removeParameterType } from '../../services/ParameterTypeServices';
import ABMPage from '../ABMPage';

const ParameterTypeModel = {
    codigo: '',
    descripcion: '',
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

const ParameterTypesPage = () => {
    const [parameterTypeList, setParameterTypeList] = useState([]);
    const [statusActive, setStatusActive] = useState(true);

    useEffect(() => {
        loadParameterTypes();
    }, [statusActive]);

    const loadParameterTypes = () => {
        getParameterTypes().then(result => {
            if (result.list)
                setParameterTypeList(result.list.filter(d => d.activo == statusActive).sort(compare));
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
        <ABMPage pageName="parameterType" dataList={parameterTypeList} dataModel={ParameterTypeModel} onAdd={onAdd} onEdit={onEdit} onRemove={onRemove} searchKey='descripcion' setActive={setStatusActive} />
    );
}

export default ParameterTypesPage;