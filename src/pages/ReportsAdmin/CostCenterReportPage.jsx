import React, { useState, useEffect } from "react";
import ReportPage from "../ReportPage";
import { costCenterReportService } from "../../services/ReportServices";

const FilterDataModel = {
    codigoDireccion: null,
    centroDeCosto: null,
    estado: [87, 88]
}

const ModelDefinition = [
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
            }
        ]
    },
    {
        fieldName: 'codigoDireccion',
        type: 'parameter',
        code: 6
    },
    {
        fieldName: 'centroDeCosto',
        type: 'parameter',
        code: 4
    }
]

const getFieldTypeByName = (fieldName) => {
    const field = ModelDefinition.find(d => d.fieldName == fieldName);
    if (field) return field;
    else return null;
}

const defaultFilter = {
    codigoDireccion: null,
    centroDeCosto: null,
    estado: [87, 88]
}

const pageConfiguration = {
    name: 'centro-de-costo',
    tableConfiguration: {
        getFieldTypeByName: getFieldTypeByName,
        getHeaderLabel: (key) => {
            const header = pageConfiguration.tableConfiguration.headerRow.find(h => h.field == key);
            if (header) return header.label;
            else return key;
        },
        headerRow: [{
            field: 'codigoCentroDeCosto',
            label: 'codigo'
        }
        ],
        activeRows: [
            'numeroLegajo',
            'apellido',
            'nombre',
            'direccion',
            'gerencia',
            'codigoCentroDeCosto',
            'descripcionCentroDeCosto',
            'fte'
        ],
        inactiveRows: [
            'numeroLegajo',
            'apellido',
            'nombre',
            'direccion',
            'gerencia',
            'codigoCentroDeCosto',
            'descripcionCentroDeCosto',
            'fte'
        ]
    },
    formConfiguration: {
        getFieldTypeByName: getFieldTypeByName,
        activeFields: [
            'codigoDireccion',
            'centroDeCosto',
            'estado'
        ],
        inactiveFields: [
            'codigoDireccion',
            'centroDeCosto',
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

const CostCenterReportPage = ({ }) => {
    const [reportDataList, setReportDataList] = useState([]);
    console.log('reportDataList', reportDataList)

    useEffect(() => {
        loadReportData(defaultFilter);
    }, []);

    const loadReportData = (filter) => {
        costCenterReportService(filter).then(result => {
            console.log('result', result)
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