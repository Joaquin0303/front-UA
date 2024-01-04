import React, { useState, useEffect } from "react";
import ReportPage from "../ReportPage";
import { externalReportService } from "../../services/ReportServices";

const FilterDataModel = {
    activo: 0
}

const defaultFilter = {
    f1: 0
}

const pageConfiguration = {
    name: 'externos',
    tableConfiguration: {
        activeRows: [
            'numeroLegajo',
            'apellido',
            'nombre',
            'codigoPuesto',
            'codigoTipoDocumento',
            'numeroDocumento',
            'codigoPais',
            'codigoProveedor',
            'codigoPuesto',
            'codigoDivision',
            'codigoDireccion',
            'codigoGerencia',
            'codigoJefatura',
            'activo',
            'fechaIngreso',
            'codigoGenero',
            'fechaEgreso',
            'emailPersonal'
        ],
        inactiveRows: [
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