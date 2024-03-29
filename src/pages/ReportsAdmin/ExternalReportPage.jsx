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
    },
    {
        fieldName: 'activo',
        type: 'string',
        labels: [
            {
                value: 'true',
                label: 'Si'
            },
            {
                value: 'false',
                label: 'No'
            }
        ]
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
            'numeroLegajoExterno',
            'codigoPais',
            'departamento',
            'codigoDivision',
            'manager',
            'codigoGenero',
            'activo',
            'email'

        ],
        activeRows: [
            'numeroLegajoExterno',
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
            'numeroLegajoExterno',
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
            'numeroLegajoExterno',
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
    if (a.codigoProveedor < b.codigoProveedor) {
        return -1;
    } else if (a.codigoProveedor > b.codigoProveedor) {
        return 1;
    } else {
        return 0;
    }
}

const ExternalReportPage = ({ }) => {
    const [reportDataList, setReportDataList] = useState();

    useEffect(() => {
        loadReportData(defaultFilter);
    }, []);

    const loadReportData = (filter) => {
        if (!filter) filter = defaultFilter;
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