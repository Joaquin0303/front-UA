import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/abm.css';
import TableWithSearch from '../components/table/TableWithSearch';

const ABMPage = ({ pageName, dataList, dataModel, onAdd, onEdit, onRemove, searchKey }) => {

    return (
        <div className='bloque-principal'>
            <div className="bloque-secundario">
                <Link to="/">Inicio</Link><p>/ {pageName}</p>
            </div>
            <TableWithSearch dataList={dataList} dataModel={dataModel} onAdd={onAdd} onEdit={onEdit} onRemove={onRemove} searchKey={searchKey} />
        </div>
    );
}

export default ABMPage;