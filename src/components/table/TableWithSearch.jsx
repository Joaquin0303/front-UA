import React, { useState, useEffect } from 'react';
import '../../styles/abm.css';
import Table from './Table';
import { FaPlus } from 'react-icons/fa';
import ModalForm from '../modal/ModalForm';
import TableEmployee from './TableEmploee';
import { ModalFormEmployees } from '../modal/ModalFormEmployees';
import { MODAL_FORM, TABLE_ACTIONS } from '../../utils/GeneralConstants';

const TableWithSearch = ({ pageConfiguration, pageName, dataList, dataModel, onAdd, onEdit, onRemove, setActive, matchHandler }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [formData, setFormData] = useState();

    const [showModalForm, setShowModalForm] = useState(false);
    const [showEmployeeModalForm, setShowEmployeeModalForm] = useState(false);

    const [actionForm, setActionForm] = useState();
    const [showActives, setShowActives] = useState(true);
    const [filteredDataList, setFilteredDataList] = useState(dataList);

    const [showClearIcon, setShowClearIcon] = useState(false);

    const closeModalForm = () => {
        setShowModalForm(false);
        setShowEmployeeModalForm(false);
    }

    const openModalForm = (modal, action, data) => {
        setFormData(data);
        setActionForm(action);
        if (modal == MODAL_FORM.DYNAMICMODAL) {
            setShowModalForm(true);
        } else if (modal == MODAL_FORM.EMPLOYEEMODAL) {
            setShowEmployeeModalForm(true);
        } else if (modal == MODAL_FORM.NONE) {
            onSubmitForm(data, action);
        }
    }

    const onSubmitForm = (data, defaultAction) => {
        const action = actionForm ? actionForm : defaultAction;
        switch (action) {
            case TABLE_ACTIONS.ADD: onAdd(data, actionForm); break;
            case TABLE_ACTIONS.EDIT: onEdit(data, TABLE_ACTIONS.EDIT); break;
            case TABLE_ACTIONS.ACTIVATE: data.activo = true; onEdit(data, TABLE_ACTIONS.ACTIVATE); break;
            case TABLE_ACTIONS.INACTIVATE: data.activo = false; onEdit(data, TABLE_ACTIONS.INACTIVATE); break;
            case TABLE_ACTIONS.PUTDOWN: data.activo = false; onEdit(data, TABLE_ACTIONS.PUTDOWN); break;
            case TABLE_ACTIONS.ADDLICENCE: onAdd(data, TABLE_ACTIONS.ADDLICENCE); break;
            case TABLE_ACTIONS.RENEWLICENCE: onEdit(data, TABLE_ACTIONS.RENEWLICENCE); break;
            case TABLE_ACTIONS.PUTDOWNLICENCE: onEdit(data, TABLE_ACTIONS.PUTDOWNLICENCE); break;
            case TABLE_ACTIONS.VIEW: break;
            case TABLE_ACTIONS.CHANGEPOSITION: onEdit(data, TABLE_ACTIONS.CHANGEPOSITION); break;
            case TABLE_ACTIONS.ADDFAMILY: onAdd(data, TABLE_ACTIONS.ADDFAMILY); break;
            case TABLE_ACTIONS.INACTIVATEEXTERN: onEdit(data, TABLE_ACTIONS.INACTIVATEEXTERN); break;
            case TABLE_ACTIONS.UNBLOCK: onEdit(data, TABLE_ACTIONS.UNBLOCK); break;
            case 'remove': onRemove(data); break;
            default:
                console.warn("NON SUBMIT");
        }
    }

    const handleActiveChange = (e) => {
        setShowActives(e.target.checked);
        setActive(e.target.checked);
    }

    {/*---------------------------------------- */ }
    const handleClearIconClick = () => {
        setSearchTerm("");
        setShowClearIcon(false);
    }


    useEffect(() => {
        setFilteredDataList(dataList.filter((data) => matchHandler(data, searchTerm)));
    }, [searchTerm, dataList]);
    return (
        <>
            <div className='search-checkbox'>
                <div className='bloque-search'>
                    {pageConfiguration.show_search && <div className='search'>
                        <div className='search-div'>
                            <i className="fa-solid fa-magnifying-glass icon"></i>
                            <input type="text" className='search-input' placeholder='Buscar' value={searchTerm} onChange={(e) => {
                                const value = e.target.value;
                                setSearchTerm(value);
                                setShowClearIcon(value.length > 0);
                            }}
                            />
                            {showClearIcon && (
                                <i className="fa-solid fa-xmark" onClick={handleClearIconClick}></i>
                            )}
                        </div>
                        {pageConfiguration.show_active_button && <div className='active-users'>
                            {setActive && <div className='form-check form-switch'>
                                {pageName === 'Empleados' ? (showActives ? 'Activos / Licencias' : 'Bajas') : (showActives ? 'Activos' : 'Inactivos')}
                                <input type='checkbox' className='form-check-input' checked={showActives} onChange={handleActiveChange} />
                            </div>}
                        </div>}
                    </div>}
                    {pageConfiguration.show_add_button && pageName != 'ingresoCaido' && pageName != 'licenciaHistory' && <button className='btns-add' onClick={(e) => { e.stopPropagation(); openModalForm(pageName == 'Empleados' ? MODAL_FORM.EMPLOYEEMODAL : MODAL_FORM.DYNAMICMODAL, TABLE_ACTIONS.ADD, dataModel ? JSON.parse(JSON.stringify(dataModel)) : {}) }}><FaPlus />Agregar</button>}
                </div >
            </div>
            {pageName != 'Empleados' && <Table tableConfiguration={pageConfiguration.tableConfiguration} dataList={filteredDataList} openModalForm={openModalForm} />}
            {showModalForm && <ModalForm pageConfiguration={pageConfiguration} data={formData} closeModal={closeModalForm} onSubmitForm={onSubmitForm} actionForm={actionForm} />}
            {pageName == 'Empleados' && <TableEmployee tableConfiguration={pageConfiguration.tableConfiguration} dataList={filteredDataList} openModalForm={openModalForm} />}
            {showEmployeeModalForm && <ModalFormEmployees action={actionForm} data={formData} closeModal={closeModalForm} onSubmitForm={onSubmitForm} />}
        </>
    );
}

export default TableWithSearch;