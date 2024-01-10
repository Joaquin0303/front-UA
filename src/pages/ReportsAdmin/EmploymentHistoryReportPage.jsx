import React, { useState, useEffect } from "react";
import ReportPage from "../ReportPage";
import { employmentHistoryReportService } from "../../services/ReportServices";

const FilterDataModel = {
    idPais: null,
    idDireccion: null,
    estado: null,
    fechaIngresoDesde: null,
    fechaIngresoHasta: null
}

const defaultFilter = {
    f1: 0
}

const pageConfiguration = {
    name: 'historial-laboral',
    tableConfiguration: {
        activeRows: [
            'numeroLegajo',
            'apellido',
            'nombre',
            'codigoPuesto',
            'fechaDesde',
            'fechaHasta'
        ],
        inactiveRows: [
            'numeroLegajo',
            'apellido',
            'nombre',
            'codigoPuesto',
            'fechaDesde',
            'fechaHasta'
        ]
    },
    formConfiguration: {
        activeFields: [
            'idPais',
            'idDireccion',
            'estado',
            'fechaIngresoDesde',
            'fechaIngresoHasta'
        ],
        inactiveFields: [
            'idPais',
            'idDireccion',
            'estado',
            'fechaIngresoDesde',
            'fechaIngresoHasta'
        ]
    }
}

const compare = (a, b) => {
    if (a.codigoPais.codigo.toLowerCase() < b.codigoPais.codigo.toLowerCase()) {
        return -1;
    } else if (a.codigoPais.codigo.toLowerCase() > b.codigoPais.codigo.toLowerCase()) {
        return 1;
    } else {
        if (a.numeroLegajo < b.numeroLegajo) {
            return -1;
        } else if (a.numeroLegajo > b.numeroLegajo) {
            return 1;
        } else {
            return 0;
        }
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