import React, { useState, useEffect } from "react";
import Table from "./Table";
import generatePDF from 'react-to-pdf';
import { useRef } from 'react';
import i18n from '../../localization/i18n'
import { DownloadTableExcel } from 'react-export-table-to-excel';
import { FaFilter } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import ModalForm from "../modal/ModalForm";
import PartialReportMessage from "./PartialReportMessage";
import { Spinner } from "reactstrap";
import '../../styles/Filter.css'

const TableWithFilter = ({ filterDataModel, pageConfiguration, reportDataList, loadReportData }) => {
    console.log("filterDataModel=", filterDataModel)
    const [showModalForm, setShowModalForm] = useState(false);
    const [showButtonDelete, setShowButtonDelete] = useState(false);
    const [formData, setFormData] = useState();
    const [filter, setFilter] = useState(filterDataModel ? JSON.parse(JSON.stringify(filterDataModel)) : {});
    const targetRef = useRef();
    const [loading, setLoading] = useState(true);
    const [originalData, setOriginalData] = useState([]);

    const [showExportToPDF, setShowExportToPDF] = useState(false);
    const [exportFormats, setExportFormats] = useState('XLS')
    console.log("formData model=", formData)
    useEffect(() => {
        const includePdf = ['international-data-collection', 'generico'].indexOf(pageConfiguration.name) >= 0;
        console.log('name', pageConfiguration.name);
        console.log('includePdf', includePdf)
        if (includePdf) {
            setShowExportToPDF(false);
        } else {
            setShowExportToPDF(true);
            setExportFormats('PDF, XLS');
        }
    }, []);

    useEffect(() => {
        setOriginalData(JSON.parse(JSON.stringify(filterDataModel)));
        setFilter(filterDataModel);
    }, [filterDataModel]);

    useEffect(() => {
        console.log('reportDataList loading', reportDataList)
        if (reportDataList)
            setLoading(false);
    }, [reportDataList]);

    const closeModalForm = () => {
        setShowModalForm(false);
    }

    const openModalForm = (data) => {
        console.log('open Form Modal with data=', data)
        setFormData(data);
        setShowModalForm(true);
    }

    const onSubmitForm = (data) => {
        setLoading(true)
        setShowButtonDelete(true)
        loadReportData(data);
    }

    const deleteFilters = () => {
        setLoading(true)
        setShowButtonDelete(false)
        setFilter(JSON.parse(JSON.stringify(originalData)));
        loadReportData(originalData)
    }

    return (
        <>
            {loading && (
                <div className="spinner-div">
                    <Spinner color="primary"></Spinner>
                </div>
            )}
            {!loading && (
                <div className="search-download">
                    <div className='bloque-search'>
                        <div className="filters-btn">
                            <button className='btns-add' title='Aplicar Filtros' onClick={(e) => { e.stopPropagation(); openModalForm(filter) }}><FaFilter />Filtros</button>
                            {showButtonDelete && <button className='btns-delete-filters' title='Quitar Filtros' onClick={(e) => { e.stopPropagation(); deleteFilters() }}><MdDelete />Quitar Filtros</button>}
                        </div>
                    </div>
                </div>
            )}

            {!loading && reportDataList && reportDataList.length > 0 && <div className='export-buttons-container'>
                {showExportToPDF && <button className='btns' title='Descargar PDF' onClick={() => generatePDF(targetRef, { filename: 'reporte.' + pageConfiguration.name + '.pdf' })}>PDF</button>}
                <DownloadTableExcel
                    filename={'reporte.' + pageConfiguration.name}
                    sheet={i18n.t(pageConfiguration.name)}
                    currentTableRef={targetRef.current}
                >
                    <button className='btns' title='Descargar Excel'> XLS </button>

                </DownloadTableExcel>
            </div>}

            {!loading && pageConfiguration.tableConfiguration.hiddenRows && <PartialReportMessage formats={exportFormats} />}

            <div className='export-container' ref={targetRef}>
                {!loading && reportDataList.length > 0 && (

                    <Table tableConfiguration={pageConfiguration.tableConfiguration} dataList={reportDataList} />

                )}
            </div>
            {showModalForm && <ModalForm pageConfiguration={pageConfiguration} data={formData} closeModal={closeModalForm} onSubmitForm={onSubmitForm} />}
        </>
    )
}

export default TableWithFilter;