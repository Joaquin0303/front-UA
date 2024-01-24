import React, { useState, useEffect } from "react";
import ReportPage from "../ReportPage";
import { directorsReportService } from "../../services/ReportServices";
import useToken from "../../useToken";



const FilterDataModel = {
    estado: [87],
    codigoDireccion: null,
    codigoGerencia: null
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
        fieldName: 'codigoGerencia',
        type: 'parameter',
        code: 12
    },
    {
        fieldName: 'fechaIngreso',
        type: 'calendar'
    },
    {
        fieldName: 'fechaIngresoReconocida',
        type: 'calendar'
    }
]

const getFieldTypeByName = (fieldName) => {
    const field = ModelDefinition.find(d => d.fieldName == fieldName);
    if (field) return field;
    else return null;
}

const defaultFilter = {
    estado: [87, 88],
    codigoDireccion: null,
    codigoGerencia: null
}

const pageConfiguration = {
    name: 'directores',
    tableConfiguration: {
        getFieldTypeByName: getFieldTypeByName,
        hiddenRows: [
            'fechaIngreso',
            'fechaIngresoReconocida',
            'emailLaboral',
            'oficina',
            'categoria',
            'gerencia',
            'descripcionJefatura',
            'division',
            'centroDeCostos',
            'convenio'
        ],
        activeRows: [
            'numeroLegajo',
            'apellidoNombre',
            'fechaIngreso',
            'fechaIngresoReconocida',
            'descripcionPais',
            'emailLaboral',
            'oficina',
            'descripcionPuesto',
            'descripcionCategoria',
            'descripcionManagerJefe',
            'descripcionCargoManagerJefe',
            'descripcionDireccion',
            'gerencia',
            'descripcionJefatura',
            'division',
            'centroDeCostos',
            'convenio'
        ],
        inactiveRows: [
            'numeroLegajo',
            'apellidoNombre',
            'fechaIngreso',
            'fechaIngresoReconocida',
            'descripcionPais',
            'emailLaboral',
            'oficina',
            'descripcionPuesto',
            'categoria',
            'descripcionManagerJefe',
            'descripcionCargoManagerJefe',
            'descripcionDireccion',
            'gerencia',
            'descripcionJefatura',
            'division',
            'centroDeCostos',
            'convenio'
        ]
    },
    formConfiguration: {
        getFieldTypeByName: getFieldTypeByName,
        activeFields: [
            'estado',
            'codigoDireccion',
            'codigoGerencia'
        ],
        inactiveFields: [
            'estado',
            'codigoDireccion',
            'codigoGerencia'
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

const DirectorsReportPage = ({ }) => {
    const { token } = useToken();

    console.log('user token', token);

    const [reportDataList, setReportDataList] = useState([]);
    console.log('reportDataList', reportDataList)

    useEffect(() => {
        loadReportData(defaultFilter);
    }, []);

    const loadReportData = (filter) => {
        if (!filter) filter = defaultFilter;
        directorsReportService(filter).then(result => {
            if (result.list) {
                setReportDataList(result.list.sort(compare));
            }
        });
    }
    return (
        <ReportPage filterDataModel={FilterDataModel} pageConfiguration={pageConfiguration} reportDataList={reportDataList} loadReportData={loadReportData} />
    )
}


export default DirectorsReportPage;