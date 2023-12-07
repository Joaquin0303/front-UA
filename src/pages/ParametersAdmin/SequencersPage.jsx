import React, { useState, useEffect } from 'react';
import { getSequencers, updateSequencer, removeSequencer, addSequencer } from '../../services/SequencerServices';
import ABMPage from '../ABMPage';

const SequencerModel = {
    codigo: '',
    rangoDesde: '',
    rangoHasta: '',
    secuencia: '',
    activo: true
}

const SequencersPage = () => {
    const [sequencerList, setSequencerList] = useState([]);
    const [statusActive, setStatusActive] = useState(true);

    useEffect(() => {
        loadSequencers();
    }, [statusActive]);

    const loadSequencers = () => {
        getSequencers().then(result => {
            if (result.list)
                setSequencerList(result.list.filter(d => d.activo == statusActive));
        });
    }

    const onAdd = (data) => {
        addSequencer(data.codigo, data.rangoDesde, data.rangoHasta, data.secuencia, data.activo).then(result => {
            console.log('saved=', result);
            loadSequencers();
        });
    }

    const onEdit = (data) => {
        updateSequencer(data.id, data.codigo, data.rangoDesde, data.rangoHasta, data.secuencia, data.activo).then(result => {
            console.log('edited=', result);
            loadSequencers();
        });
    }

    const onRemove = (data) => {
        removeSequencer(data.id).then(result => {
            console.log('removed=', result);
            loadSequencers();
        });
    }

    return (
        <ABMPage pageName="Secuenciador" dataList={sequencerList} dataModel={SequencerModel} onAdd={onAdd} onEdit={onEdit} onRemove={onRemove} searchKey='codigo' setActive={setStatusActive} />
    );
}

export default SequencersPage;