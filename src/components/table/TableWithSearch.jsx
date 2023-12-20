import React, { useState, useEffect } from 'react';
import '../../styles/abm.css';
import Table from './Table';
import { FaPlus } from 'react-icons/fa';
import ModalForm from '../modal/ModalForm';
import ModalView from '../modal/ModalView';
import TableEmployee from './TableEmploee';
import { ModalFormEmployees } from '../modal/ModalFormEmployees';

const TableWithSearch = ({ pageName, dataList, dataModel, onAdd, onEdit, onRemove, setActive, matchHandler, statusActive }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [formData, setFormData] = useState();

    const [showModalForm, setShowModalForm] = useState(false);
    const [showModalView, setShowModalView] = useState(false);

    const [formDisabled, setFormDisabled] = useState();
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

    const closeModalView = () => {
        setShowModalView(false);
    }

    const openModalView = (action, data) => {
        setFormData(data);
        setActionForm(action);
        setShowModalView(true);
    }

    const setModal = (action, data) => {
        if (pageName == 'Empleados') {
            if (action == 'view') {
                openModalView(action, data);
            } else {
                openModalForm(action, data);
            }
        } else if (action == 'view' || action == 'inactivate' || action == 'activate') {
            openModalView(action, data);
        } else {
            openModalForm(action, data);
        }
    }

    const onSubmitForm = (data) => {
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
                {pageName != 'ingresoCaido' && <button className='btns-add' onClick={(e) => { e.stopPropagation(); setModal('add', dataModel ? JSON.parse(JSON.stringify(dataModel)) : {}) }}><FaPlus />Agregar</button>}
            </div >
            <div className='active-users'>
                {setActive && <div className='form-check form-switch'>
                    Activos
                    <input type='checkbox' className='form-check-input' checked={showActives} onChange={handleActiveChange} />
                </div>}
            </div>

            {pageName != 'Empleados' && <Table pageName={pageName} dataList={filteredDataList} setModal={setModal} statusActive={statusActive} />}
            {pageName == 'Empleados' && <TableEmployee pageName={pageName} dataList={filteredDataList} setModal={setModal} statusActive={statusActive} />}
            {pageName != 'Empleados' && showModalForm && <ModalForm pageName={pageName} data={formData} closeModal={closeModalForm} formDisabled={formDisabled} onSubmitForm={onSubmitForm} />}
            {showModalView && <ModalView pageName={pageName} data={formData} closeModal={closeModalView} onSubmitForm={onSubmitForm} action={actionForm} />}
            {pageName == 'Empleados' && showModalForm && <ModalFormEmployees action={actionForm} data={formData} closeModal={closeModalForm} onSubmitForm={onSubmitForm} />}
        </>
    );
}

export default TableWithSearch;