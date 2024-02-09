import React, { useState, useEffect } from "react";
import ReportPage from "../ReportPage";
import { directorsReportService } from "../../services/ReportServices";
import useToken from "../../useToken";
import { decodeToken } from "../../utils/Utils";
import { searchEmployee } from '../../services/EmployeeServices';


const FilterDataModel = {
    estado: [87, 88],
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
        type: 'parameterByDirection',
        code: 12,
        direction: 'codigoDireccion'
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
    director: {},
    tableConfiguration: {
        getFieldTypeByName: getFieldTypeByName,
        hiddenRows: [
            'fechaIngreso',
            'fechaIngresoReconocida',
            'emailLaboral',
            'descripcionOficina',
            'descripcionCategoria',
            'descripcionGerencia',
            'descripcionJefatura',
            'descripcionDivision',
            'descripcionCentroDeCostos',
            'descripcionConvenio'
        ],
        activeRows: [
            'numeroLegajo',
            'apellidoNombre',
            'fechaIngreso',
            'fechaIngresoReconocida',
            'descripcionPais',
            'emailLaboral',
            'descripcionOficina',
            'descripcionPuesto',
            'descripcionCategoria',
            'descripcionManagerJefe',
            'descripcionCargoManagerJefe',
            'descripcionDireccion',
            'descripcionGerencia',
            'descripcionJefatura',
            'descripcionDivision',
            'descripcionCentroDeCostos',
            'descripcionConvenio'
        ],
        inactiveRows: [
            'numeroLegajo',
            'apellidoNombre',
            'fechaIngreso',
            'fechaIngresoReconocida',
            'descripcionPais',
            'emailLaboral',
            'descripcionOficina',
            'descripcionPuesto',
            'descripcionCategoria',
            'descripcionManagerJefe',
            'descripcionCargoManagerJefe',
            'descripcionDireccion',
            'descripcionGerencia',
            'descripcionJefatura',
            'descripcionDivision',
            'descripcionCentroDeCostos',
            'descripcionConvenio'
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

    const [reportDataList, setReportDataList] = useState();
    console.log('reportDataList', reportDataList)

    useEffect(() => {
        let numeroLegajo = 0;
        try {
            const tokenDecoded = decodeToken(token);
            numeroLegajo = tokenDecoded.numeroLegajo;
        } catch (error) {
            console.error(error);
        }
        if (numeroLegajo) {
            searchEmployee(numeroLegajo).then(response => {
                console.log("response empleado=", response)
                if (response && response.list) {
                    const emp = response.list[0];
                    console.log("emp=", emp)
                    if (emp.codigoPuesto) { // SI TIENE PUESTO
                        pageConfiguration.director.categoria = emp.codigoPuesto.codigoCategoria;
                        pageConfiguration.director.pais = emp.codigoPuesto.codigoPais;
                        pageConfiguration.director.direccion = emp.codigoPuesto.codigoDireccion;
                        if (emp.codigoPuesto.codigoCategoria.codigo == 'C01' && emp.codigoPuesto.codigoDireccion.codigo != 'DPRE') {
                            pageConfiguration.formConfiguration.activeFields.splice(pageConfiguration.formConfiguration.activeFields.indexOf('codigoDireccion'), 1);
                            pageConfiguration.formConfiguration.inactiveFields.splice(pageConfiguration.formConfiguration.inactiveFields.indexOf('codigoDireccion'), 1);
                        }
                    }
                }
                loadReportData(defaultFilter);
            })
        }
    }, []);

    const loadReportData = (filter) => {
        if (!filter) filter = defaultFilter;
        if (pageConfiguration.director.categoria && pageConfiguration.director.categoria.codigo == 'C01') {
            if (pageConfiguration.director.direccion.codigo == 'DPRE') { // SI ES CEO O CM
                filter.codigoPais = pageConfiguration.director.pais;
            } else {
                filter.codigoDireccion = pageConfiguration.director.direccion;
                FilterDataModel.codigoDireccion = pageConfiguration.director.direccion;
            }
            console.log('DIR DATA MODEL=', FilterDataModel.codigoDireccion)
        }
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