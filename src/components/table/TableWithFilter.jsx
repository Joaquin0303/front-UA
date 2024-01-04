import React, { useState } from "react";
import Table from "./Table";
import DynamicFilterForm from "../form/DynamicFilterForm";
import generatePDF from 'react-to-pdf';
import { useRef } from 'react';
import i18n from '../../localization/i18n'
import { DownloadTableExcel } from 'react-export-table-to-excel';
import { FaFilter } from "react-icons/fa";
import ModalForm from "../modal/ModalForm";


const TableWithFilter = ({ filterDataModel, pageConfiguration, reportDataList, loadReportData }) => {
    const [showModalForm, setShowModalForm] = useState(false);
    const [formData, setFormData] = useState();

    const targetRef = useRef();
    const tableRef = useRef(null);

    const closeModalForm = () => {
        setShowModalForm(false);
    }

    const openModalForm = (data) => {
        setFormData(data);
        setShowModalForm(true);
    }

    const onSubmitForm = (data) => {
        loadReportData(data);
    }

    return (
        <>
            {
                //<DynamicFilterForm formConfiguration={pageConfiguration.formConfiguration} filterDataModel={filterDataModel} onSubmitForm={onSubmitForm} />
            }

            <div className='bloque-search'>
                <button className='btns-add' onClick={(e) => { e.stopPropagation(); openModalForm(filterDataModel) }}><FaFilter />Filtros</button>
            </div>
            {reportDataList.length > 0 && <div className='export-buttons-container'>
                <button className='btns' title='Descargar PDF' onClick={() => generatePDF(targetRef, { filename: 'reporte.' + pageConfiguration.name + '.pdf' })}>PDF</button>
                <DownloadTableExcel
                    filename={'reporte.' + pageConfiguration.name}
                    sheet={i18n.t(pageConfiguration.name)}
                    currentTableRef={tableRef.current}
                >
                    <button className='btns' title='Descargar Excel'> XLS </button>

                </DownloadTableExcel>
            </div>}
            <div className='export-container' ref={targetRef}>
                <Table tableRef={tableRef} tableConfiguration={pageConfiguration.tableConfiguration} dataList={reportDataList} />
            </div>
            {showModalForm && <ModalForm pageConfiguration={pageConfiguration} data={formData} closeModal={closeModalForm} onSubmitForm={onSubmitForm} />}
        </>
    )
}

export default TableWithFilter;
