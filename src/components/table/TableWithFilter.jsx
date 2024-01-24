import React, { useState } from "react";
import Table from "./Table";
import generatePDF from 'react-to-pdf';
import { useRef } from 'react';
import i18n from '../../localization/i18n'
import { DownloadTableExcel } from 'react-export-table-to-excel';
import { FaFilter } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import ModalForm from "../modal/ModalForm";
import '../../styles/Filter.css'

const TableWithFilter = ({ filterDataModel, pageConfiguration, reportDataList, loadReportData }) => {
    const [showModalForm, setShowModalForm] = useState(false);
    const [showButtonDelete, setShowButtonDelete] = useState(false);
    const [formData, setFormData] = useState();
    const [filter, setFilter] = useState(filterDataModel ? JSON.parse(JSON.stringify(filterDataModel)) : {});

    const [areFiltersActive, setAreFiltersActive] = useState(false);

    console.log('filterDataModel', filterDataModel)
    const targetRef = useRef();

    const closeModalForm = () => {
        setShowModalForm(false);
    }

    const openModalForm = (data) => {
        setFormData(data);
        setShowModalForm(true);
    }

    const onSubmitForm = (data) => {
        setFilter(data)
        setShowButtonDelete(true)
        setAreFiltersActive(true);
        loadReportData(data)
    }

    const deleteFilters = () => {
        setFilter({})
        setShowButtonDelete(false)
        setAreFiltersActive(false)
    }

    //const dataToDisplay = areFiltersActive ? filterDataModel(reportDataList, filter) : reportDataList;
    const dataToDisplay = false;
    return (
        <>
            <div className="search-download">
                <div className='bloque-search'>
                    <div className="filters-btn">
                        <button className='btns-add' title='Aplicar Filtros' onClick={(e) => { e.stopPropagation(); openModalForm(filterDataModel) }}><FaFilter />Filtros</button>
                        {showButtonDelete && <button className='btns-delete-filters' title='Quitar Filtros' onClick={(e) => { e.stopPropagation(); deleteFilters() }}><MdDelete />Quitar Filtros</button>}
                    </div>
                </div>
                {dataToDisplay.length > 0 && <div className='export-buttons-container'>
                    <button className='btns' title='Descargar PDF' onClick={() => generatePDF(targetRef, { filename: 'reporte.' + pageConfiguration.name + '.pdf' })}>PDF</button>
                    <DownloadTableExcel
                        filename={'reporte.' + pageConfiguration.name}
                        sheet={i18n.t(pageConfiguration.name)}
                        currentTableRef={targetRef.current}
                    >
                        <button className='btns' title='Descargar Excel'> XLS </button>

                    </DownloadTableExcel>
                </div>}
            </div>
            <div className='export-container' ref={targetRef}>
                <Table tableConfiguration={pageConfiguration.tableConfiguration} dataList={reportDataList} />
            </div>
            {showModalForm && <ModalForm pageConfiguration={pageConfiguration} data={formData} closeModal={closeModalForm} onSubmitForm={onSubmitForm} />}
        </>
    )
}

export default TableWithFilter;
