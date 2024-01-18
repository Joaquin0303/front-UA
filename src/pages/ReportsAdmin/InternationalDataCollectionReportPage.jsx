import React, { useState, useEffect } from "react";
import ReportPage from "../ReportPage";
import { internationalDataCollectionReportService } from "../../services/ReportServices";

const FilterDataModel = {
    estado: [87],
    fechaDesde: null,
    fechaHasta: null
}

const defaultFilter = {
    estado: [87],
    fechaDesde: null,
    fechaHasta: null
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
            },
            {
                value: 89,
                label: 'Baja'
            }
        ]
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
        fieldName: 'dateOfBirth',
        type: 'calendar'
    },
    {
        fieldName: 'title',
        type: 'titleByGender',
        gender: 'gender'
    }
]

const getFieldTypeByName = (fieldName) => {
    const field = ModelDefinition.find(d => d.fieldName == fieldName);
    if (field) return field;
    else return null;
}
const pageConfiguration = {
    name: 'international-data-collection',
    tableConfiguration: {
        getFieldTypeByName: getFieldTypeByName,
        hiddenRows: [
            'positionTitle',
            'managerToReport',
            'cargoManagerToReport',
            'middleName',
            'otherName',
            'preferedName',
            'dateOfBirth',
            'gender',
            'mailLaboral',
            'startDate',
            'horasDeTrabajo',
            'fte',
            'rateFrecuency',
            'salaryBasePayRate',
            'reasonForSalaryChange',
            'employmentType',
            'personnelType',
            'termDate',
            'termReason',
            'antiguedad',
            'age',
            'generation',
            'division',
            'jefatura'
        ],
        activeRows: [
            'positionTitle',
            'managerToReport',
            'cargoManagerToReport',
            'middleName',
            'otherName',
            'preferedName',
            'dateOfBirth',
            'gender',
            'mailLaboral',
            'startDate',
            'horasDeTrabajo',
            'fte',
            'rateFrecuency',
            'salaryBasePayRate',
            'reasonForSalaryChange',
            'employmentType',
            'personnelType',
            'termDate',
            'termReason',
            'antiguedad',
            'age',
            'generation',
            'division',
            'jefatura',
            'globalId',
            'title',
            'surname',
            'firstName',
            'country',
            'department'
        ],
        inactiveRows: [
            'positionTitle',
            'managerToReport',
            'cargoManagerToReport',
            'middleName',
            'otherName',
            'preferedName',
            'dateOfBirth',
            'gender',
            'mailLaboral',
            'startDate',
            'horasDeTrabajo',
            'fte',
            'rateFrecuency',
            'salaryBasePayRate',
            'reasonForSalaryChange',
            'employmentType',
            'personnelType',
            'termDate',
            'termReason',
            'antiguedad',
            'age',
            'generation',
            'division',
            'jefatura',
            'globalId',
            'title',
            'surname',
            'firstName',
            'country',
            'department'
        ]
    },
    formConfiguration: {
        getFieldTypeByName: getFieldTypeByName,
        activeFields: [
            'estado',
            'fechaDesde',
            'fechaHasta'
        ],
        inactiveFields: [
            'estado',
            'fechaDesde',
            'fechaHasta'
        ]
    }
}

const compare = (a, b) => {
    if (a.globalId < b.globalId) {
        return -1;
    } else if (a.globalId > b.globalId) {
        return 1;
    } else {
        return 0;
    }
}

const InternationalDataCollectionReportPage = ({ }) => {
    const [reportDataList, setReportDataList] = useState([]);
    console.log('reportDataList', reportDataList)

    useEffect(() => {
        loadReportData(defaultFilter);
    }, []);

    const loadReportData = (filter) => {
        internationalDataCollectionReportService(filter).then(result => {
            if (result.list) {
                setReportDataList(result.list.sort(compare));
            }
        });
    }
    return (
        <ReportPage filterDataModel={FilterDataModel} pageConfiguration={pageConfiguration} reportDataList={reportDataList} loadReportData={loadReportData} />
    )
}


export default InternationalDataCollectionReportPage;