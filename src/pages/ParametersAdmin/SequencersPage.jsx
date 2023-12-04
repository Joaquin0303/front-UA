import React, { useState, useEffect } from 'react';
import { getSequencers, updateSequencer, removeSequencer } from '../../services/SequencerServices';
import ABMPage from '../ABMPage';

const SequencerModel = {
    codigo: '',
    fechaRangoDesde: '',
    fechaRangoHasta: '',
    secuencia: '',
    estado: '',
    activo: true
}

const SequencersPage = () => {
    const [sequencerList, setSequencerList] = useState([]);

    useEffect(() => {
        loadSequencers();
    }, []);

    const loadSequencers = () => {
        getSequencers().then(result => {
            setSequencerList(result.list);
        });
    }

    const onAdd = (data) => {
        /*
        addSequenver().then(result => {
            console.log('saved=', result);
            loadSequencers();
        });
        */
    }

    const onEdit = (data) => {
        updateSequencer(data.id, data.codigo, data.fechaRangoDesde, data.fechaRangoHasta, data.secuencia, data.estado, data.activo).then(result => {
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
        <ABMPage pageName="Secuenciador" dataList={sequencerList} dataModel={SequencerModel} onAdd={onAdd} onEdit={onEdit} onRemove={onRemove} searchKey='codigo' />
    );
}

export default SequencersPage;