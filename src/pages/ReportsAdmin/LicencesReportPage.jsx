import React, { useState, useEffect } from "react";
import ReportPage from "../ReportPage";
import { licencesReportService } from "../../services/ReportServices";

const FilterDataModel = {
    codigoPais: {
        id: 0
    },
    codigoEstadoEmpleado: {
        id: 0
    },
    codigoDireccion: {
        id: 0
    }
}

const defaultFilter = {
    f1: 0
}

const pageConfiguration = {
    name: 'licencias',
    tableConfiguration: {
        activeRows: [
            'numeroLegajo',
            'apellido',
            'nombre',
            'tipoLicencia',
            'fechaInicio',
            'fechaFin',
            'codigoEstadoEmpleado',
            'codigoPais',
            'codigoPuesto',
            'codigoDireccion',
            'codigoGerencia',
            'codigoJefatura'
        ],
        inactiveRows: [
            'numeroLegajo',
            'apellido',
            'nombre',
            'tipoLicencia',
            'fechaInicio',
            'fechaFin',
            'codigoEstadoEmpleado',
            'codigoPais',
            'codigoPuesto',
            'codigoDireccion',
            'codigoGerencia',
            'codigoJefatura'
        ]
    },
    formConfiguration: {
        activeFields: [
            'codigoEstadoEmpleado',
            'codigoPais',
            'codigoDireccion',
        ],
        inactiveFields: [
            'codigoEstadoEmpleado',
            'codigoPais',
            'codigoDireccion',
        ]
    }
}

const compare = (a, b) => {
    if (a.numeroLegajo < b.numeroLegajo) {
        return -1;
    } else if (a.numeroLegajo > b.numeroLegajo) {
        return 1;
    } else {
        return 0;
    }

}

const LicencesReportPage = ({ }) => {
    const [reportDataList, setReportDataList] = useState([]);
    console.log('reportDataList', reportDataList)

    useEffect(() => {
        loadReportData(defaultFilter);
    }, []);

    const loadReportData = (filter) => {
        licencesReportService(filter).then(result => {
            if (result.list) {
                setReportDataList(result.list.sort(compare));
            }
        });
    }
    return (
        <ReportPage filterDataModel={FilterDataModel} pageConfiguration={pageConfiguration} reportDataList={reportDataList} loadReportData={loadReportData} />
    )
}


export default LicencesReportPage;