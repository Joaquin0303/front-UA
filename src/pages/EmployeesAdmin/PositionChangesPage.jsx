import React, { useState, useEffect } from 'react';
import ABMPage from '../ABMPage';
import { getPositionChanges, addPositionChange, updatePositionChange, removePositionChange } from '../../services/PositionChangeServices';

const PositionChangeModel = {
    activo: true
}

const PositionChangesPage = () => {
    const [positionChangeList, setPositionChangeList] = useState([]);
    const [statusActive, setStatusActive] = useState(true);

    useEffect(() => {
        loadPositionChanges();
    }, [statusActive]);

    const loadPositionChanges = () => {
        getPositionChanges().then(result => {
            if (result.list)
                setPositionChangeList(result.list.filter(d => d.activo == statusActive));
        });
    }

    const onAdd = (data) => {
        const validation = validate(data);
        if (validation.error) throw validation;
        addPositionChange(data).then(result => {
            console.log('saved=', result);
            loadPositionChanges();
        });
    }

    const onEdit = (data) => {
        const validation = validate(data);
        if (validation.error) throw validation;
        updatePositionChange(data).then(result => {
            console.log('edited=', result);
            loadPositionChanges();
        });
    }

    const onRemove = (data) => {
        removePositionChange(data.id).then(result => {
            console.log('removed=', result);
            loadPositionChanges();
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
        return result;
    }

    return (
        <ABMPage pageName="cambioDePuesto" dataList={positionChangeList} dataModel={PositionChangeModel} onAdd={onAdd} onEdit={onEdit} onRemove={onRemove} matchHandler={matchHandler} setActive={setStatusActive} statusActive={statusActive} />
    );
}

export default PositionChangesPage;