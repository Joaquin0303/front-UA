import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/abm.css';
import i18n from "../localization/i18n";
import TableWithFilter from '../components/table/TableWithFilter';

const ReportPage = ({ filterDataModel, pageConfiguration, reportDataList, loadReportData }) => {

    let seccion = "/ Reportes";
    let to = '/reportes';

    return (
        <div className='bloque-principal'>
            <div className="bloque-secundario">
                <Link to="/">Inicio</Link> <Link to={to}>{seccion}</Link> <p>/ {i18n.t(pageConfiguration.name)}</p>
            </div>
            <TableWithFilter filterDataModel={filterDataModel} pageConfiguration={pageConfiguration} reportDataList={reportDataList} loadReportData={loadReportData} />
        </div>
    );
}

export default ReportPage;