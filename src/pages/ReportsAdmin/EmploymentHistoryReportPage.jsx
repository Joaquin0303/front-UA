import React, { useState, useEffect } from "react";
import ReportPage from "../ReportPage";
import { employmentHistoryReportService } from "../../services/ReportServices";

const FilterDataModel = {
    pais: [1],
    codigoDireccion: null,
    estado: [87, 88],
    fechaDesde: null,
    fechaHasta: null
}

const ModelDefinition = [
    {
        fieldName: 'pais',
        type: 'country',
        multivalue: true
    },
    {
        fieldName: 'estado',
        type: 'select',
        multivalue: true,
        options: [
            {
                value: 87,
                label: 'Activo'
            },
            {
                value: 88,
                label: 'Inactivo'
            },
            {
                value: 89,
                label: 'Baja'
            }
        ]
    },
    {
        fieldName: 'codigoDireccion',
        type: 'parameter',
        code: 6
    },
    {
        fieldName: 'fechaDesde',
        type: 'calendar'
    },
    {
        fieldName: 'fechaHasta',
        type: 'calendar'
    },
    {
        fieldName: 'fechaInicioPuesto',
        type: 'calendar'
    },
    {
        fieldName: 'fechaFinPuesto',
        type: 'calendar'
    }
]

const getFieldTypeByName = (fieldName) => {
    const field = ModelDefinition.find(d => d.fieldName == fieldName);
    if (field) return field;
    else return null;
}

const defaultFilter = {
    pais: [1],
    codigoDireccion: null,
    estado: [87, 88],
    fechaDesde: null,
    fechaHasta: null
}

const pageConfiguration = {
    name: 'historial-laboral',
    tableConfiguration: {
        getFieldTypeByName: getFieldTypeByName,
        activeRows: [
            'numeroLegajo',
            'apellido',
            'nombre',
            'puesto',
            'direccion',
            'fechaInicioPuesto',
            'fechaFinPuesto'
        ],
        inactiveRows: [
            'numeroLegajo',
            'apellido',
            'nombre',
            'puesto',
            'direccion',
            'fechaInicioPuesto',
            'fechaFinPuesto'
        ]
    },
    formConfiguration: {
        getFieldTypeByName: getFieldTypeByName,
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
    return (a.apellido + a.nombre).localeCompare(b.apellido + b.nombre);
}

const EmploymentHistoryReportPage = ({ }) => {
    const [reportDataList, setReportDataList] = useState();

    useEffect(() => {
        loadReportData(defaultFilter);
    }, []);

    const loadReportData = (filter) => {
        if (!filter) filter = defaultFilter;
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