import React, { useState, useEffect } from "react";
import ReportPage from "../ReportPage";
import { costCenterReportService } from "../../services/ReportServices";

const FilterDataModel = {
    codigoDireccion: {
        id: 0
    },
    codigoCentroDeCosto: {
        id: 0
    },
    codigoEstadoEmpleado: {
        id: 0
    }
}

const defaultFilter = {
    f1: 0
}

const pageConfiguration = {
    name: 'centro-de-costo',
    tableConfiguration: {
        activeRows: [
            'numeroLegajo',
            'apellido',
            'nombre',
            'codigoDireccion',
            'codigoGerencia',
            'codigoCentroDeCosto',
            'fte'
        ],
        inactiveRows: [
            'numeroLegajo',
            'apellido',
            'nombre',
            'codigoDireccion',
            'codigoGerencia',
            'codigoCentroDeCosto',
            'fte'
        ]
    },
    formConfiguration: {
        activeFields: [
            'codigoDireccion',
            'codigoCentroDeCosto',
            'codigoEstadoEmpleado'
        ],
        inactiveFields: [
            'codigoDireccion',
            'codigoCentroDeCosto',
            'codigoEstadoEmpleado'
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

const CostCenterReportPage = ({ }) => {
    const [reportDataList, setReportDataList] = useState([]);
    console.log('reportDataList', reportDataList)

    useEffect(() => {
        loadReportData(defaultFilter);
    }, []);

    const loadReportData = (filter) => {
        costCenterReportService(filter).then(result => {
            if (result.list) {
                setReportDataList(result.list.sort(compare));
            }
        });
    }
    return (
        <ReportPage filterDataModel={FilterDataModel} pageConfiguration={pageConfiguration} reportDataList={reportDataList} loadReportData={loadReportData} />
    )
}


export default CostCenterReportPage;