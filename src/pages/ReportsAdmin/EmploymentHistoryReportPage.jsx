import React, { useState, useEffect } from "react";
import ReportPage from "../ReportPage";
import { employmentHistoryReportService } from "../../services/ReportServices";

const FilterDataModel = {
    pais: [1],
    codigoDireccion: null,
    estado: [87],
    fechaIngresoDesde: null,
    fechaIngresoHasta: null
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
        fieldName: 'fechaIngresoDesde',
        type: 'calendar'
    },
    {
        fieldName: 'fechaIngresoHasta',
        type: 'calendar'
    },
    {
        fieldName: 'fechaIngresoReconocida',
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
    pais: [1],
    codigoDireccion: null,
    estado: [87],
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
            'fechaIngresoReconocida',
            'fechaEgreso'
        ],
        inactiveRows: [
            'numeroLegajo',
            'apellido',
            'nombre',
            'puesto',
            'fechaIngresoReconocida',
            'fechaEgreso'
        ]
    },
    formConfiguration: {
        getFieldTypeByName: getFieldTypeByName,
        activeFields: [
            'pais',
            'codigoDireccion',
            'estado',
            'fechaIngresoDesde',
            'fechaHasta'
        ],
        inactiveFields: [
            'pais',
            'codigoDireccion',
            'estado',
            'fechaIngresoDesde',
            'fechaIngresoHasta'
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

const EmploymentHistoryReportPage = ({ }) => {
    const [reportDataList, setReportDataList] = useState([]);
    console.log('reportDataList', reportDataList)

    useEffect(() => {
        loadReportData(defaultFilter);
    }, []);

    const loadReportData = (filter) => {
        employmentHistoryReportService(filter).then(result => {
            console.log('Report Result', result)
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