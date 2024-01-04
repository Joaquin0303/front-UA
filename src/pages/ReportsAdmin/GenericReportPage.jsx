import React, { useState, useEffect } from "react";
import ReportPage from "../ReportPage";
import { genericReportService } from "../../services/ReportServices";

const FilterDataModel = {
    codigoEstadoEmpleado: {
        id: 0
    },
    codigoDireccion: {
        id: 0
    },
    codigoGerencia: {
        id: 0
    }
}

const defaultFilter = {
    f1: 0
}

const pageConfiguration = {
    name: 'generico',
    tableConfiguration: {
        activeRows: [
        ],
        inactiveRows: [
        ]
    },
    formConfiguration: {
        activeFields: [
            'codigoEstadoEmpleado',
            'codigoDireccion',
            'codigoGerencia'
        ],
        inactiveFields: [
            'codigoEstadoEmpleado',
            'codigoDireccion',
            'codigoGerencia'
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

const GenericReportPage = ({ }) => {
    const [reportDataList, setReportDataList] = useState([]);
    console.log('reportDataList', reportDataList)

    useEffect(() => {
        loadReportData(defaultFilter);
    }, []);

    const loadReportData = (filter) => {
        genericReportService(filter).then(result => {
            if (result.list) {
                setReportDataList(result.list.sort(compare));
            }
        });
    }
    return (
        <ReportPage filterDataModel={FilterDataModel} pageConfiguration={pageConfiguration} reportDataList={reportDataList} loadReportData={loadReportData} />
    )
}


export default GenericReportPage;