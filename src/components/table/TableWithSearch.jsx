import React, { useState, useEffect } from 'react';
import '../../styles/abm.css';
import Table from './Table';
import { FaPlus } from 'react-icons/fa';
import ModalForm from '../modal/ModalForm';
import TableEmployee from './TableEmploee';
import { ModalFormEmployees } from '../modal/ModalFormEmployees';
import { TABLE_ACTIONS } from '../../utils/GeneralConstants';

const TableWithSearch = ({ pageConfiguration, pageName, dataList, dataModel, onAdd, onEdit, onRemove, setActive, matchHandler }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [formData, setFormData] = useState();

    const [showModalForm, setShowModalForm] = useState(false);

    const [actionForm, setActionForm] = useState();
    const [showActives, setShowActives] = useState(true);
    const [filteredDataList, setFilteredDataList] = useState(dataList);

    const closeModalForm = () => {
        setShowModalForm(false);
    }

    const openModalForm = (action, data) => {
        setFormData(data);
        setActionForm(action);
        setShowModalForm(true);
    }

    const setModal = (action, data) => {
        if (pageName == 'Empleados') {
            openModalForm(action, data);
        } else {
            openModalForm(action, data);
        }
    }

    const onSubmitForm = (data) => {
        switch (actionForm) {
            case TABLE_ACTIONS.ADD: onAdd(data); break;
            case TABLE_ACTIONS.EDIT: onEdit(data); break;
            case TABLE_ACTIONS.ACTIVATE: data.activo = true; onEdit(data); break;
            case TABLE_ACTIONS.INACTIVATE: data.activo = false; onEdit(data); break;
            case TABLE_ACTIONS.PUTDOWN: data.activo = false; onEdit(data); break;
            case TABLE_ACTIONS.VIEW: break;
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
                {pageConfiguration.show_search && <div className='search'>
                    <input type="text" className='search-input' placeholder='Buscar' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                    <i className="fa-solid fa-magnifying-glass icon"></i>
                </div>}
                {pageConfiguration.show_add_button && pageName != 'ingresoCaido' && pageName != 'licenciaHistory' && <button className='btns-add' onClick={(e) => { e.stopPropagation(); setModal(TABLE_ACTIONS.ADD, dataModel ? JSON.parse(JSON.stringify(dataModel)) : {}) }}><FaPlus />Agregar</button>}
            </div >
            {pageConfiguration.show_active_button && pageName != 'ingresoCaido' && pageName != 'licenciaHistory' && <div className='active-users'>
                {setActive && <div className='form-check form-switch'>
                    {pageName === 'Empleados' ? (showActives ? 'Activos / Licencias' : 'Inactivos') : (showActives ? 'Activos' : 'Inactivos')}
                    <input type='checkbox' className='form-check-input' checked={showActives} onChange={handleActiveChange} />
                </div>}
            </div>}

            {pageName != 'Empleados' && <Table tableConfiguration={pageConfiguration.tableConfiguration} dataList={filteredDataList} setModal={setModal} />}
            {pageName != 'Empleados' && showModalForm && <ModalForm pageConfiguration={pageConfiguration} data={formData} closeModal={closeModalForm} onSubmitForm={onSubmitForm} actionForm={actionForm} />}
            {pageName == 'Empleados' && <TableEmployee dataList={filteredDataList} setModal={setModal} />}
            {pageName == 'Empleados' && showModalForm && <ModalFormEmployees action={actionForm} data={formData} closeModal={closeModalForm} onSubmitForm={onSubmitForm} />}

        </>
    );
}

export default TableWithSearch;