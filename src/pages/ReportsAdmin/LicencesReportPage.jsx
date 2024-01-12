import React, { useState, useEffect } from "react";
import ReportPage from "../ReportPage";
import { licencesReportService } from "../../services/ReportServices";

const FilterDataModel = {
    paisLicencia: 1,
    estadoLicencia: 1,
    codigoDireccion: null,
    estado: [1]
}

const defaultFilter = {
    paisLicencia: 1,
    estadoLicencia: 1,
    codigoDireccion: null,
    estado: [1]
}

const pageConfiguration = {
    name: 'licencias',
    tableConfiguration: {
        activeRows: [
            'numeroLegajo',
            'apellido',
            'nombre',
            'descripcionLicencia',
            'fechaInicio',
            'fechaFin',
            'estado',
            'pais',
            'puesto',
            'direccion',
            'gerencia',
            'jefatura'
        ],
        inactiveRows: [
            'numeroLegajo',
            'apellido',
            'nombre',
            'descripcionLicencia',
            'fechaInicio',
            'fechaFin',
            'estado',
            'pais',
            'puesto',
            'direccion',
            'gerencia',
            'jefatura'
        ]
    },
    formConfiguration: {
        activeFields: [
            'estadoLicencia',
            'paisLicencia',
            'codigoDireccion',
            'estado'
        ],
        inactiveFields: [
            'estadoLicencia',
            'paisLicencia',
            'codigoDireccion',
            'estado'
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