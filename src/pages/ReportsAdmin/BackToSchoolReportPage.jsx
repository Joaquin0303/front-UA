import React, { useState, useEffect } from "react";
import { backToSchoolReportService } from "../../services/ReportServices";
import ReportPage from "../ReportPage";

const FilterDataModel = {
    empleadoPais: [
        1
    ]
}

const ModelDefinition = [
    {
        fieldName: 'empleadoPais',
        type: 'country',
        multivalue: true
    },
    {
        fieldName: 'edades',
        type: 'listString',
        separator: ','
    },
    {
        fieldName: 'cantidadHijos',
        type: 'numberNonCero'
    }
]

const getFieldTypeByName = (fieldName) => {
    const field = ModelDefinition.find(d => d.fieldName == fieldName);
    if (field) return field;
    else return null;
}

const defaultFilter = {
    empleadoPais: [
        1
    ]
}

const pageConfiguration = {
    name: 'vuelta-al-colegio',
    show_search: true,
    show_add_button: true,
    show_active_button: true,
    tableConfiguration: {
        getFieldTypeByName: getFieldTypeByName,
        actions: {
            activeActions: [
            ],
            inactiveActions: [
            ],
        },
        activeRows: [
            'numeroLegajo',
            'apellido',
            'nombre',
            'cantidadHijos',
            'edades',
            'pais'
        ],
        inactiveRows: [
            'numeroLegajo',
            'apellido',
            'nombre',
            'cantidadHijos',
            'edades',
            'pais'
        ]
    },
    formConfiguration: {
        getFieldTypeByName: getFieldTypeByName,
        activeFields: [
            'empleadoPais'
        ],
        inactiveFields: [
            'empleadoPais'
        ]
    },
    viewConfiguration: {
        activeFields: [
        ],
        inactiveFields: [
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

const BackToSchoolReportPage = ({ }) => {
    const [reportDataList, setReportDataList] = useState([]);
    console.log('reportDataList', reportDataList)

    useEffect(() => {
        loadReportData(defaultFilter);
    }, []);

    const loadReportData = (filter) => {
        if (!filter) filter = defaultFilter;
        backToSchoolReportService(filter).then(result => {
            if (result) {
                setReportDataList(result.list.sort(compare));
            }
        });
    }

    return (
        <ReportPage filterDataModel={FilterDataModel} pageConfiguration={pageConfiguration} reportDataList={reportDataList} loadReportData={loadReportData} />
    )
}

export default BackToSchoolReportPage;