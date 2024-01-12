import React, { useState, useEffect } from "react";
import ReportPage from "../ReportPage";
import { externalReportService } from "../../services/ReportServices";

const FilterDataModel = {
    activo: [1]
}

const defaultFilter = {
    activo: [1]
}

const pageConfiguration = {
    name: 'externos',
    tableConfiguration: {
        activeRows: [
            'numeroLegajo',
            'codigoTipoDocumento',
            'numeroDocumento',
            'codigoPais',
            'codigoProveedor',
            'codigoPuesto',
            'codigoJefatura',
            'codigoDivision',
            'apellidoNombre',
            'manager',
            'startDate',
            'codigoGenero',
            'activo',
            'fechaIngreso',
            'fechaEgreso',
            'emailPersonal'
        ],
        inactiveRows: [
            'numeroLegajo',
            'codigoTipoDocumento',
            'numeroDocumento',
            'codigoPais',
            'codigoProveedor',
            'codigoPuesto',
            'codigoJefatura',
            'codigoDivision',
            'apellidoNombre',
            'manager',
            'startDate',
            'codigoGenero',
            'activo',
            'fechaIngreso',
            'fechaEgreso',
            'emailPersonal'
        ]
    },
    formConfiguration: {
        activeFields: [
            'activo'
        ],
        inactiveFields: [
            'activo'
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

const ExternalReportPage = ({ }) => {
    const [reportDataList, setReportDataList] = useState([]);
    console.log('reportDataList', reportDataList)

    useEffect(() => {
        loadReportData(defaultFilter);
    }, []);

    const loadReportData = (filter) => {
        externalReportService(filter).then(result => {
            if (result.list) {
                setReportDataList(result.list.sort(compare));
            }
        });
    }
    return (
        <ReportPage filterDataModel={FilterDataModel} pageConfiguration={pageConfiguration} reportDataList={reportDataList} loadReportData={loadReportData} />
    )
}


export default ExternalReportPage;