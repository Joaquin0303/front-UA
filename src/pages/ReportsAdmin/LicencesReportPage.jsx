import React, { useState, useEffect } from "react";
import ReportPage from "../ReportPage";
import { licencesReportService } from "../../services/ReportServices";

const FilterDataModel = {
    paisLicencia: [1],
    estadoLicencia: [1],
    codigoDireccion: null,
    estadoEmpleado: [88]
}

const ModelDefinition = [
    {
        fieldName: 'paisLicencia',
        type: 'country',
        multivalue: false
    },
    {
        fieldName: 'estadoLicencia',
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
        fieldName: 'codigoDireccion',
        type: 'parameter',
        code: 6
    },
    {
        fieldName: 'estadoEmpleado',
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
        fieldName: 'estado',
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
    },
    {
        fieldName: 'fechaInicio',
        type: 'calendar'
    },
    {
        fieldName: 'fechaFin',
        type: 'calendar'
    }
]

const getFieldTypeByName = (fieldName) => {
    const field = ModelDefinition.find(d => d.fieldName == fieldName);
    if (field) return field;
    else return null;
}

const defaultFilter = {
    paisLicencia: [1],
    estadoLicencia: [1],
    codigoDireccion: null,
    estadoEmpleado: [88]
}

const pageConfiguration = {
    name: 'licencias',
    tableConfiguration: {
        getFieldTypeByName: getFieldTypeByName,
        activeRows: [
            'numeroLegajo',
            'apellido',
            'nombre',
            'descripcionLicencia',
            'fechaInicio',
            'fechaFin',
            'estado',
            'pais',
            'puesto',
            'direccion',
            'gerencia',
            'jefatura'
        ],
        inactiveRows: [
            'numeroLegajo',
            'apellido',
            'nombre',
            'descripcionLicencia',
            'fechaInicio',
            'fechaFin',
            'estado',
            'pais',
            'puesto',
            'direccion',
            'gerencia',
            'jefatura'
        ]
    },
    formConfiguration: {
        getFieldTypeByName: getFieldTypeByName,
        activeFields: [
            'estadoLicencia',
            'paisLicencia',
            'codigoDireccion',
            'estadoEmpleado'
        ],
        inactiveFields: [
            'estadoLicencia',
            'paisLicencia',
            'codigoDireccion',
            'estadoEmpleado'
        ]
    }
}

const compare = (a, b) => {
    if (a.numeroLegajo < b.numeroLegajo) {
        return -1;
    } else if (a.numeroLegajo > b.numeroLegajo) {
        return 1;
    } else {
        return 0;
    }

}

const LicencesReportPage = ({ }) => {
    const [reportDataList, setReportDataList] = useState([]);
    console.log('reportDataList', reportDataList)

    useEffect(() => {
        loadReportData(defaultFilter);
    }, []);

    const loadReportData = (filter) => {
        licencesReportService(filter).then(result => {
            if (result.list) {
                setReportDataList(result.list.sort(compare));
            }
        });
    }
    return (
        <ReportPage filterDataModel={FilterDataModel} pageConfiguration={pageConfiguration} reportDataList={reportDataList} loadReportData={loadReportData} />
    )
}


export default LicencesReportPage;