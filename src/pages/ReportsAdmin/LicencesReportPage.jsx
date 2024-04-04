import React, { useState, useEffect } from "react";
import ReportPage from "../ReportPage";
import { licencesReportService } from "../../services/ReportServices";

const FilterDataModel = {
    paisLicencia: {
        id: 1
    },
    estadoLicencia: [0, 1],
    codigoDireccion: null
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
    paisLicencia: {
        id: 1
    },
    estadoLicencia: [0, 1],
    codigoDireccion: null
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
        ],
        sortRow: [
            'numeroLegajo',
            'apellido',
            'nombre',
            'descripcionLicencia',
            'fechaInicio',
            'fechaFin',
            'estado',
            'pais',
            'direccion',
            'gerencia',
            'jefatura',
            'puesto'
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
    if (parseInt(a.numeroLegajo) < parseInt(b.numeroLegajo)) {
        return -1;
    } else if (parseInt(a.numeroLegajo) > parseInt(b.numeroLegajo)) {
        return 1;
    } else {
        return 0;
    }
}

const LicencesReportPage = ({ }) => {
    const [reportDataList, setReportDataList] = useState();

    useEffect(() => {
        loadReportData(defaultFilter);
    }, []);

    const loadReportData = (filter) => {
        if (!filter) filter = defaultFilter;
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