import React, { useState, useEffect } from "react";
import ReportPage from "../ReportPage";
import { genericReportService } from "../../services/ReportServices";

const FilterDataModel = {
    estado: [87],
    codigoDireccion: null,
    codigoGerencia: null
}

const defaultFilter = {
    estado: [87, 88],
    direccion: null,
    gerencia: null
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
        fieldName: 'fechaNacimiento',
        type: 'calendar'
    },
    {
        fieldName: 'fechaIngreso',
        type: 'calendar'
    },
    {
        fieldName: 'fechaIngresoReconocida',
        type: 'calendar'
    }
    ,
    {
        fieldName: 'finFechaContrato',
        type: 'calendar'
    },
    {
        fieldName: 'afiliadoSindicato',
        type: 'string',
        labels: [
            {
                value: 'true',
                label: 'Si'
            },
            {
                value: 'false',
                label: 'No'
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
    name: 'generico',
    tableConfiguration: {
        getFieldTypeByName: getFieldTypeByName,
        hiddenRows: [
            'nombrePreferido',
            'fechaNacimiento',
            'edad',
            'generacion',
            'nacionalidad',
            'genero',
            'denominacion',
            'cuil',
            'domicilio',
            'numeroResidencia',
            'localidadResidencia',
            'provincia',
            'emailPersonal',
            'fechaIngreso',
            'fechaIngresoReconocida',
            'tipoContratacion',
            'horasSemanales',
            'fte',
            'frecuenciaLiquidacion',
            'tipoEmpleo',
            'tipoJornada',
            'pais',
            'lugarDeTrabajo',
            'emailLaboral',
            'categoria',
            'gerencia',
            'jefatura',
            'division',
            'centroDeCosto',
            'prepaga',
            'obraSocial',
            'banco',
            'cbu',
            'convenio',
            'afiliadoSindicato',
            'finFechaContrat',
            'fechaEgreso',
            'tipoEgreso',
            'estadoCivil',
            'grado',
            'manager',
            'cargoManager',
            'cargasDeFamilia',
            'finFechaContrato',
            'pisoResidencia'
        ],
        activeRows: [
            'nombrePreferido',
            'fechaNacimiento',
            'edad',
            'generacion',
            'nacionalidad',
            'genero',
            'denominacion',
            'cuil',
            'domicilio',
            'numeroResidencia',
            'localidadResidencia',
            'provincia',
            'emailPersonal',
            'fechaIngreso',
            'fechaIngresoReconocida',
            'tipoContratacion',
            'horasSemanales',
            'fte',
            'frecuenciaLiquidacion',
            'tipoEmpleo',
            'tipoJornada',
            'pais',
            'lugarDeTrabajo',
            'emailLaboral',
            'categoria',
            'gerencia',
            'jefatura',
            'division',
            'centroDeCosto',
            'prepaga',
            'obraSocial',
            'banco',
            'cbu',
            'convenio',
            'afiliadoSindicato',
            'finFechaContrat',
            'fechaEgreso',
            'tipoEgreso',
            'estadoCivil',
            'grado',
            'manager',
            'cargoManager',
            'cargasDeFamilia',
            'numeroLegajo',
            'nombres',
            'dni',
            'pisoResidencia',
            'direccion',
            'puesto',
            'finFechaContrato'
        ],
        inactiveRows: [
            'nombrePreferido',
            'fechaNacimiento',
            'edad',
            'generacion',
            'nacionalidad',
            'genero',
            'denominacion',
            'cuil',
            'domicilio',
            'numeroResidencia',
            'localidadResidencia',
            'provincia',
            'emailPersonal',
            'fechaIngreso',
            'fechaIngresoReconocida',
            'tipoContratacion',
            'horasSemanales',
            'fte',
            'frecuenciaLiquidacion',
            'tipoEmpleo',
            'tipoJornada',
            'pais',
            'lugarDeTrabajo',
            'emailLaboral',
            'categoria',
            'gerencia',
            'jefatura',
            'division',
            'centroDeCosto',
            'prepaga',
            'obraSocial',
            'banco',
            'cbu',
            'convenio',
            'afiliadoSindicato',
            'finFechaContrat',
            'fechaEgreso',
            'tipoEgreso',
            'estadoCivil',
            'grado',
            'manager',
            'cargoManager',
            'cargasDeFamilia',
            'numeroLegajo',
            'nombres',
            'dni',
            'pisoResidencia',
            'direccion',
            'puesto',
            'finFechaContrato'
        ],
        sortRow: [
            'numeroLegajo',
            'nombres',
            'nombrePreferido',
            'fechaNacimiento',
            'edad',
            'generacion',
            'nacionalidad',
            'genero',
            'denominacion',
            'cuil',
            'dni',
            'domicilio',
            'numeroResidencia',
            'pisoResidencia',
            'localidadResidencia',
            'provincia',
            'emailPersonal',
            'fechaIngreso',
            'fechaIngresoReconocida',
            'tipoContratacion',
            'horasSemanales',
            'fte',
            'frecuenciaLiquidacion',
            'tipoEmpleo',
            'tipoJornada',
            'pais',
            'lugarDeTrabajo',
            'emailLaboral',
            'puesto',
            'categoria',
            'manager',
            'cargoManager',
            'direccion',
            'gerencia',
            'jefatura',
            'division',
            'centroDeCosto',
            'prepaga',
            'obraSocial',
            'banco',
            'cbu',
            'cargasDeFamilia',
            'convenio',
            'afiliadoSindicato',
            'finFechaContrato',
            'fechaEgreso',
            'tipoEgreso',
            'estadoCivil',
            'grado'
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
    if (a.numeroLegajo < b.numeroLegajo) {
        return -1;
    } else if (a.numeroLegajo > b.numeroLegajo) {
        return 1;
    } else {
        return 0;
    }
}

const GenericReportPage = ({ }) => {
    const [reportDataList, setReportDataList] = useState();
    console.log('reportDataList', reportDataList)

    useEffect(() => {
        loadReportData(defaultFilter);
    }, []);

    const loadReportData = (filter) => {
        if (!filter) filter = defaultFilter;
        genericReportService(filter).then(result => {
            if (result.list) {
                setReportDataList(result.list.sort(compare));
            }
        });
    }
    return (
        <ReportPage filterDataModel={FilterDataModel} pageConfiguration={pageConfiguration} reportDataList={reportDataList} loadReportData={loadReportData} />
    )
}


export default GenericReportPage;