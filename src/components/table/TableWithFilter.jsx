import React, { useState } from "react";
import Table from "./Table";
import generatePDF from 'react-to-pdf';
import { useRef } from 'react';
import i18n from '../../localization/i18n'
import { DownloadTableExcel } from 'react-export-table-to-excel';
import { FaFilter } from "react-icons/fa";
import ModalForm from "../modal/ModalForm";
import '../../styles/Filter.css'

import { FilterBubble } from "../FilterBubble";

const TableWithFilter = ({ filterDataModel, pageConfiguration, reportDataList, loadReportData }) => {
    const [showModalForm, setShowModalForm] = useState(false);
    const [formData, setFormData] = useState();
    const [filter, setFilter] = useState(filterDataModel ? JSON.parse(JSON.stringify(filterDataModel)) : {});
    console.log('filterDataModel', filterDataModel)
    const targetRef = useRef();

    {/*------------------------------------------ */}
    const [appliedFilters, setAppliedFilters] = useState([]);

    {/*------------------------------------------ */}
    const addFilter = (newFilter) => {
        setAppliedFilters([...appliedFilters, newFilter]);
        loadReportData(newFilter);
    };

    {/*------------------------------------------ */}
    const removeFilter = (filterToRemove) => {
        const updatedFilters = appliedFilters.filter(filter => filter !== filterToRemove);
        setAppliedFilters(updatedFilters);
    };

    const closeModalForm = () => {
        setShowModalForm(false);
    }

    const openModalForm = (data) => {
        setFormData(data);
        setShowModalForm(true);
    }

    const onSubmitForm = (data) => {
        setFilter(data)
        addFilter(data)
        loadReportData(data);
    }


    return (
        <>
            <div className="search-download">
                <div className='bloque-search'>
                    <button className='btns-add' onClick={(e) => { e.stopPropagation(); openModalForm(filterDataModel) }}><FaFilter />Filtros</button>
                </div>
                {/*------------------------------------------ */}
                {appliedFilters.length > 0 && (
                    <div className='applied-filters-container'>
                        {appliedFilters.map((appliedFilter, index) => (
                            <FilterBubble key={index} filter={appliedFilter} onRemove={removeFilter} />
                        ))}
                    </div>
                )}
                {/*------------------------------------------ */}
                {reportDataList.length > 0 && <div className='export-buttons-container'>
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
