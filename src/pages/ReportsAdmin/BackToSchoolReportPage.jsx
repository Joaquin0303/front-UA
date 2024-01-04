import React, { useState, useEffect } from "react";
import { backToSchoolReportService } from "../../services/ReportServices";
import ReportPage from "../ReportPage";

const FilterDataModel = {
    codigoPais: {
        id: 0
    }
}

const defaultFilter = {
    f1: 0
}

const pageConfiguration = {
    name: 'vuelta-al-colegio',
    show_search: true,
    show_add_button: true,
    show_active_button: true,
    tableConfiguration: {
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
            'hijos',
            'edades',
            'codigoPais'
        ],
        inactiveRows: [
        ]
    },
    formConfiguration: {
        activeFields: [
            'codigoPais'
        ],
        inactiveFields: [
            'codigoPais'
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
    if (a.codigoPais.codigo.toLowerCase() < b.codigoPais.codigo.toLowerCase()) {
        return -1;
    } else if (a.codigoPais.codigo.toLowerCase() > b.codigoPais.codigo.toLowerCase()) {
        return 1;
    } else {
        if (a.numeroLegajo < b.numeroLegajo) {
            return -1;
        } else if (a.numeroLegajo > b.numeroLegajo) {
            return 1;
        } else {
            return 0;
        }
    }
}

const BackToSchoolReportPage = ({ }) => {
    const [reportDataList, setReportDataList] = useState([]);
    console.log('reportDataList', reportDataList)

    useEffect(() => {
        loadReportData(defaultFilter);
    }, []);

    const loadReportData = (filter) => {
        backToSchoolReportService(filter).then(result => {
            if (result.list) {
                setReportDataList(result.list.sort(compare));
            }
        });
    }

    return (
        <ReportPage filterDataModel={FilterDataModel} pageConfiguration={pageConfiguration} reportDataList={reportDataList} loadReportData={loadReportData} />
    )
}

export default BackToSchoolReportPage;