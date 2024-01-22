import React, { useState, useEffect } from "react";
import ReportPage from "../ReportPage";
import { externalReportService } from "../../services/ReportServices";

const FilterDataModel = {
    estado: [1]
}

const ModelDefinition = [
    {
        fieldName: 'estado',
        type: 'select',
        multivalue: true,
        options: [
            {
                value: 1,
                label: 'Activo'
            },
            {
                value: 0,
                label: 'Inactivo'
            }
        ]
    },
    {
        fieldName: 'fechaIngreso',
        type: 'calendar'
    },
    {
        fieldName: 'fechaEgreso',
        type: 'calendar'
    }
]

const getFieldTypeByName = (fieldName) => {
    const field = ModelDefinition.find(d => d.fieldName == fieldName);
    if (field) return field;
    else return null;
}

const defaultFilter = {
    estado: [1]
}

const pageConfiguration = {
    name: 'externos',
    tableConfiguration: {
        getFieldTypeByName: getFieldTypeByName,
        hiddenRows: [
            'numeroLegajo',
            'codigoPais',
            'departamento',
            'codigoDivision',
            'manager',
            'codigoGenero',
            'activo',
            'email'
        ],
        activeRows: [
            'numeroLegajo',
            'codigoTipoDocumento',
            'numeroDocumento',
            'codigoPais',
            'codigoProveedor',
            'codigoPuesto',
            'departamento',
            'codigoDivision',
            'apellidoNombre',
            'manager',
            'activo',
            'fechaIngreso',
            'codigoGenero',
            'fechaEgreso',
            'email'
        ],
        inactiveRows: [
            'numeroLegajo',
            'codigoTipoDocumento',
            'numeroDocumento',
            'codigoPais',
            'codigoProveedor',
            'codigoPuesto',
            'departamento',
            'codigoDivision',
            'apellidoNombre',
            'manager',
            'activo',
            'fechaIngreso',
            'codigoGenero',
            'fechaEgreso',
            'email'
        ],
        sortRow: [
            'numeroLegajo',
            'codigoTipoDocumento',
            'numeroDocumento',
            'codigoPais',
            'codigoProveedor',
            'codigoPuesto',
            'departamento',
            'codigoDivision',
            'apellidoNombre',
            'manager',
            'activo',
            'fechaIngreso',
            'codigoGenero',
            'fechaEgreso',
            'email'
        ]
    },
    formConfiguration: {
        getFieldTypeByName: getFieldTypeByName,
        activeFields: [
            'estado'
        ],
        inactiveFields: [
            'estado'
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