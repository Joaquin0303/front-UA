import React, { useState, useEffect } from "react";
import ReportPage from "../ReportPage";
import { internationalDataCollectionReportService } from "../../services/ReportServices";

const FilterDataModel = {
    fechaHasta: null
}

const defaultFilter = {
    fechaHasta: null
}

const ModelDefinition = [
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
        fieldName: 'startDate',
        type: 'calendar'
    },
    {
        fieldName: 'active',
        type: 'string',
        labels: [
            {
                value: 'true',
                label: 'Activo'
            },
            {
                value: 'false',
                label: 'Inactivo'
            }
        ]
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
            'direccion',
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
            'gerencia',
            'subgerencia',
            'oficina',
            'category'
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
            'gerencia',
            'subgerencia',
            'direccion',
            'oficina',
            'globalId',
            'title',
            'surname',
            'firstName',
            'country',
            'department',
            'active',
            'category'
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
            'gerencia',
            'subgerencia',
            'direccion',
            'oficina',
            'globalId',
            'title',
            'surname',
            'firstName',
            'country',
            'department',
            'active',
            'category'
        ],
        sortRow: [
            'globalId',
            'positionTitle',
            'managerToReport',
            'cargoManagerToReport',
            'title',
            'surname',
            'firstName',
            'middleName',
            'otherName',
            'preferedName',
            'dateOfBirth',
            'gender',
            'country',
            'mailLaboral',
            'startDate',
            'horasDeTrabajo',
            'fte',
            'rateFrecuency',
            'salaryBasePayRate',
            'reasonForSalaryChange',
            'employmentType',
            'personnelType',
            'department',
            'termDate',
            'termReason',
            'antiguedad',
            'age',
            'generation',
            'division',
            'category',
            'direccion',
            'gerencia',
            'subgerencia',
            'jefatura',
            'oficina',
            'active'

        ]
    },
    formConfiguration: {
        getFieldTypeByName: getFieldTypeByName,
        activeFields: [
            'fechaHasta'
        ],
        inactiveFields: [
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
    const [reportDataList, setReportDataList] = useState();

    useEffect(() => {
        loadReportData(defaultFilter);
    }, []);

    const loadReportData = (filter) => {
        if (!filter) filter = defaultFilter;
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