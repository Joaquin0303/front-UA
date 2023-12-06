import React, { useState, useEffect } from 'react';
import { getPositions, addPosition, updatePosition, removePosition } from '../../services/PositionServices';
import ABMPage from '../ABMPage';

const PositionModel = {
    codigo: '',
    descripcion: '',
    codigoDireccion: '',
    codigoGerencia: '',
    codigoJefatura: '',
    codigoCategoria: '',
    codigoPuestoAlQueReporta: '',
    activo: true
}

const PositionsPage = () => {
    const [positionList, setPositionList] = useState([]);

    useEffect(() => {
        loadPositions();
    }, []);

    const loadPositions = () => {
        getPositions().then(result => {
            if (result.list)
                setPositionList(result.list.filter(d => d.activo == true));
        });
    }

    const onAdd = (data) => {
        addPosition(data.codigo, data.descripcion, data.codigoDireccion, data.codigoGerencia, data.codigoJefatura, data.codigoCategoria, data.codigoPuestoAlQueReporta, data.activo).then(result => {
            console.log('saved=', result);
            loadPositions();
        });
    }

    const onEdit = (data) => {
        updatePosition(data.id, data.codigo, data.descripcion, data.codigoDireccion, data.codigoGerencia, data.codigoJefatura, data.codigoCategoria, data.codigoPuestoAlQueReporta, data.activo).then(result => {
            console.log('edited=', result);
            loadPositions();
        });
    }

    const onRemove = (data) => {
        removePosition(data.id).then(result => {
            console.log('removed=', result);
            loadPositions();
        });
    }

    return (
        <ABMPage pageName="Puesto" dataList={positionList} dataModel={PositionModel} onAdd={onAdd} onEdit={onEdit} onRemove={onRemove} searchKey='descripcion' />
    );
}

export default PositionsPage;