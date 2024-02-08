import React from "react";
import InputParameter from "../InputParameter";
import InputText from "../InputText";

const FormEmployeeStep0 = ({ validation, formData, updateFormData, parameterList }) => {
    console.log('formData', formData)
    return (
        <div className="form-field-container">
            <InputParameter validation={validation} name="codigoTipoDocumento" value={formData["codigoTipoDocumento"]} parameterList={parameterList.filter(p => p.tipoParametro.id == 29)} updateFormData={updateFormData} />
            <InputText validation={validation} name="numeroDocumentoPersonal" updateFormData={updateFormData} value={formData["numeroDocumentoPersonal"] ? formData["numeroDocumentoPersonal"] : ""} mandatory={true} />
        </div>
    );
}

export default FormEmployeeStep0;