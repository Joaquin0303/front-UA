import React, { useState, useEffect } from 'react';
import '../../styles/abm.css';
import Table from './Table';
import { FaPlus } from 'react-icons/fa';
import ModalForm from '../modal/ModalForm';

const TableWithSearch = ({ dataList, dataModel, onAdd, onEdit, onRemove, searchKey }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [formData, setFormData] = useState();
    const [showModalForm, setShowModalForm] = useState(false);
    const [formDisabled, setFormDisabled] = useState();
    const [actionForm, setActionForm] = useState();

    const [filteredDataList, setFilteredDataList] = useState(dataList);

    const setModal = (open, action, data) => {
        setFormData(data);
        setActionForm(action);
        setShowModalForm(open);
        setFormDisabled(action != 'edit' && action != 'add');
    }

    const onSubmitForm = (data) => {
        switch (actionForm) {
            case 'add': onAdd(data); break;
            case 'edit': onEdit(data); break;
            case 'view': break;
            case 'remove': onRemove(data); break;
            default: ;
        }
    }

    useEffect(() => {
        const filtered = dataList.filter((data) => {
            const lowerCaseSearchTerm = searchTerm.toLowerCase();
            return (
                data[searchKey]?.toLowerCase().includes(lowerCaseSearchTerm)
            );
        });
        setFilteredDataList(filtered);
    }, [searchTerm, dataList]);

    return (
        <>
            <div className='bloque-search'>
                <div className='search'>
                    <input type="text" className='search-input' placeholder='Buscar' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                    <i className="fa-solid fa-magnifying-glass icon"></i>
                </div>
                <button className='btns-add' onClick={(e) => { e.stopPropagation(); setModal(true, 'add', dataModel) }}><FaPlus />Agregar</button>
            </div>
            <Table dataList={filteredDataList} setModal={setModal} />
            {showModalForm && <ModalForm data={formData} setModal={setModal} formDisabled={formDisabled} onSubmitForm={onSubmitForm} />}
        </>
    );
}

export default TableWithSearch;