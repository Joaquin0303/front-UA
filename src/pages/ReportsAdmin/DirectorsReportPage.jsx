import React, { useState, useEffect } from "react";
import ReportPage from "../ReportPage";
import { directorsReportService } from "../../services/ReportServices";

const FilterDataModel = {
    estado: [1],
    codigoDireccion: null,
    codigoGerencia: null
}

const defaultFilter = {
    estado: [1],
    codigoDireccion: null,
    codigoGerencia: null
}

const pageConfiguration = {
    name: 'directores',
    tableConfiguration: {
        activeRows: [
            'numeroLegajo',
            'apellidoNombre',
            'fechaIngreso',
            'fechaIngresoReconocida',
            'descripcionPais',
            'descripcionLugarDeTrabajo',
            'emailLaboral',
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
            'descripcionLugarDeTrabajo',
            'emailLaboral',
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
    const [reportDataList, setReportDataList] = useState([]);
    console.log('reportDataList', reportDataList)

    useEffect(() => {
        loadReportData(defaultFilter);
    }, []);

    const loadReportData = (filter) => {
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