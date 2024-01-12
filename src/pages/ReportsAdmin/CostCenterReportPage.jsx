import React, { useState, useEffect } from "react";
import ReportPage from "../ReportPage";
import { costCenterReportService } from "../../services/ReportServices";

const FilterDataModel = {
    codigoDireccion: {
        id: 0
    },
    codigoCentroDeCosto: {
        id: 0
    },
    estado: [1]
}

const defaultFilter = {
    codigoDireccion: {
        id: 0
    },
    codigoCentroDeCosto: {
        id: 0
    },
    estado: [1]
}

const pageConfiguration = {
    name: 'centro-de-costo',
    tableConfiguration: {
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
        activeFields: [
            'codigoDireccion',
            'codigoCentroDeCosto',
            'estado'
        ],
        inactiveFields: [
            'codigoDireccion',
            'codigoCentroDeCosto',
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