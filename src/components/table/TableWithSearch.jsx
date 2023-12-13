import React, { useState, useEffect } from 'react';
import '../../styles/abm.css';
import Table from './Table';
import { FaPlus } from 'react-icons/fa';
import ModalForm from '../modal/ModalForm';

const TableWithSearch = ({ pageName, dataList, dataModel, onAdd, onEdit, onRemove, searchKey, setActive, matchHandler }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [formData, setFormData] = useState();
    const [showModalForm, setShowModalForm] = useState(false);
    const [formDisabled, setFormDisabled] = useState();
    const [actionForm, setActionForm] = useState();
    const [showActives, setShowActives] = useState(true);
    const [filteredDataList, setFilteredDataList] = useState(dataList);

    const setModal = (open, action, data) => {
        setFormData(data);
        setActionForm(action);
        setShowModalForm(open);
        setFormDisabled(action != 'edit' && action != 'add');
    }

    const onSubmitForm = (data) => {
        console.log('data submited', data)
        switch (actionForm) {
            case 'add': onAdd(data); break;
            case 'edit': onEdit(data); break;
            case 'activate': data.activo = true; onEdit(data); break;
            case 'inactivate': data.activo = false; onEdit(data); break;
            case 'view': break;
            case 'remove': onRemove(data); break;
            default: ;
        }
    }

    const handleActiveChange = (e) => {
        setShowActives(e.target.checked);
        setActive(e.target.checked);
    }

    useEffect(() => {
        setFilteredDataList(dataList.filter((data) => matchHandler(data, searchTerm)));
    }, [searchTerm, dataList]);

    return (
        <>
            <div className='bloque-search'>
                <div className='search'>
                    <input type="text" className='search-input' placeholder='Buscar' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                    <i className="fa-solid fa-magnifying-glass icon"></i>
                </div>
                <button className='btns-add' onClick={(e) => { e.stopPropagation(); setModal(true, 'add', JSON.parse(JSON.stringify(dataModel))) }}><FaPlus />Agregar</button>
            </div>
            <div className='active-users'>
                {setActive && <div className='form-check form-switch'>
                    Activos
                    <input type='checkbox' className='form-check-input' checked={showActives} onChange={handleActiveChange} />
                </div>}
            </div>

            <Table pageName={pageName} dataList={filteredDataList} setModal={setModal} />
            {showModalForm && <ModalForm pageName={pageName} data={formData} setModal={setModal} formDisabled={formDisabled} onSubmitForm={onSubmitForm} isViewAction={actionForm === 'see'}/>}
        </>
    );
}

export default TableWithSearch;