import React, { useState, useEffect } from 'react';
import { getPositions, addPosition, updatePosition, removePosition } from '../../services/PositionServices';
import ABMPage from '../ABMPage';

const PositionModel = {
    descripcion: '',
    codigoPais: {
        id: 0
    },
    codigoDireccion: {
        id: 0
    },
    codigoGerencia: {
        id: 0
    },
    codigoCentroDeCosto: {
        id: 0
    },
    codigoJefatura: {
        id: 0
    },
    codigoCategoria: {
        id: 0
    },
    codigoPuestoAlQueReporta: {
        id: 0
    },
    activo: true
}

const PositionsPage = () => {
    const [positionList, setPositionList] = useState([]);
    const [statusActive, setStatusActive] = useState(true);

    useEffect(() => {
        loadPositions();
    }, [statusActive]);

    const loadPositions = () => {
        getPositions().then(result => {
            if (result.list)
                setPositionList(result.list.filter(d => d.activo == statusActive));
        });
    }

    const onAdd = (data) => {
        const validation = validate(data);
        if (validation.error) throw validation;
        addPosition(data.codigoPais, data.descripcion, data.codigoDireccion, data.codigoCentroDeCosto, data.codigoGerencia, data.codigoJefatura, data.codigoCategoria, data.codigoPuestoAlQueReporta, data.activo).then(result => {
            console.log('saved=', result);
            loadPositions();
        });
    }

    const onEdit = (data) => {
        const validation = validate(data);
        if (validation.error) throw validation;
        updatePosition(data.id, data.codigoPais, data.descripcion, data.codigoDireccion, data.codigoCentroDeCosto, data.codigoGerencia, data.codigoJefatura, data.codigoCategoria, data.codigoPuestoAlQueReporta, data.activo).then(result => {
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

    const matchHandler = (data, searchTerm) => {
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        return data.descripcion?.toLowerCase().includes(lowerCaseSearchTerm);
    }

    const validate = (data) => {
        const result = {
            error: false,
            validation: {}
        };
        if (!data.codigoDireccion || data.codigoDireccion.id <= 0) {
            result.error = true;
            result.validation.codigoDireccion = "Seleccione código de dirección"
        }
        if (!data.descripcion?.trim()) {
            result.error = true;
            result.validation.descripcion = "Ingrese descripción"
        }
        if (!data.codigoCategoria || data.codigoCategoria.id <= 0) {
            result.error = true;
            result.validation.codigoCategoria = "Seleccione código de categoría"
        }
        return result;
    }

    return (
        <ABMPage pageName="Puesto" dataList={positionList} dataModel={PositionModel} onAdd={onAdd} onEdit={onEdit} onRemove={onRemove} matchHandler={matchHandler} setActive={setStatusActive} statusActive={statusActive} />
    );
}

export default PositionsPage;