import React from "react";
import '../../styles/Filter.css'

const PartialReportMessage = ({ formats }) => {
    return (
        <div className="partial-report">
            <h3 className="message">Este es un reporte parcial. Los archivos descargables ({formats}) contienen mayor información.</h3>
        </div>
    )
}

export default PartialReportMessage;