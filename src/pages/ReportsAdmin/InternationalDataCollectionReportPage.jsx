import React, { useState, useEffect } from "react";
import ReportPage from "../ReportPage";
import { internationalDataCollectionReportService } from "../../services/ReportServices";

const FilterDataModel = {

}

const defaultFilter = {

}

const pageConfiguration = {
    name: 'international-data-collection',
    tableConfiguration: {
        activeRows: [
        ],
        inactiveRows: [
        ]
    },
    formConfiguration: {
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