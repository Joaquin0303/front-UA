import React, { useState, useEffect } from "react";
import ReportPage from "../ReportPage";
import { employmentHistoryReportService } from "../../services/ReportServices";

const FilterDataModel = {
    pais: [1],
    codigoDireccion: null,
    estado: [1],
    fechaDesde: null,
    fechaHasta: null
}

const defaultFilter = {
    pais: [1],
    codigoDireccion: null,
    estado: [1],
    fechaDesde: null,
    fechaHasta: null
}

const pageConfiguration = {
    name: 'historial-laboral',
    tableConfiguration: {
        activeRows: [
            'numeroLegajo',
            'apellido',
            'nombre',
            'puesto',
            'fechaIngresoReconocida',
            'fechaEgreso'
        ],
        inactiveRows: [
            'numeroLegajo',
            'apellido',
            'nombre',
            'puesto',
            'fechaIngresoReconocida',
            'fechaEgreso'
        ]
    },
    formConfiguration: {
        activeFields: [
            'pais',
            'codigoDireccion',
            'estado',
            'fechaDesde',
            'fechaHasta'
        ],
        inactiveFields: [
            'pais',
            'codigoDireccion',
            'estado',
            'fechaDesde',
            'fechaHasta'
        ]
    }
}

const compare = (a, b) => {
    if (parseInt(a.numeroLegajo) < parseInt(b.numeroLegajo)) {
        return -1;
    } else if (parseInt(a.numeroLegajo) > parseInt(b.numeroLegajo)) {
        return 1;
    } else {
        return 0;
    }
}

const EmploymentHistoryReportPage = ({ }) => {
    const [reportDataList, setReportDataList] = useState([]);
    console.log('reportDataList', reportDataList)

    useEffect(() => {
        loadReportData(defaultFilter);
    }, []);

    const loadReportData = (filter) => {
        employmentHistoryReportService(filter).then(result => {
            console.log('Report Result', result)
            if (result.list) {
                setReportDataList(result.list.sort(compare));
            }
        });
    }
    return (
        <ReportPage filterDataModel={FilterDataModel} pageConfiguration={pageConfiguration} reportDataList={reportDataList} loadReportData={loadReportData} />
    )
}


export default EmploymentHistoryReportPage;