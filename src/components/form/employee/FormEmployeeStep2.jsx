import React from "react";
import InputParameter from "../InputParameter";
import InputCountry from "../InputCountry";
import InputText from "../InputText";

const FormEmployeeStep2 = ({ parameterList, validation, formData, updateFormData }) => {

    return (
        <div className="form-field-container">
            <InputParameter validation={validation} name="codigoNacionalidad" value={formData["codigoNacionalidad"]} parameterList={parameterList.filter(p => p.tipoParametro.id == 17)} updateFormData={updateFormData} />
            <InputCountry validation={validation} name="codigoPaisResidencia" value={formData["codigoPaisResidencia"]} updateFormData={updateFormData} />
            <InputText validation={validation} name="calleResidencia" updateFormData={updateFormData} value={formData["calleResidencia"]} />
            <InputText validation={validation} name="numeroResidencia" updateFormData={updateFormData} value={formData["numeroResidencia"]} />
            <InputText validation={validation} name="pisoResidencia" updateFormData={updateFormData} value={formData["pisoResidencia"]} />
            <InputText validation={validation} name="departamentoResidencia" updateFormData={updateFormData} value={formData["departamentoResidencia"]} />
            <InputText validation={validation} name="localidadResidencia" updateFormData={updateFormData} value={formData["localidadResidencia"]} />
            <InputParameter validation={validation} name="codigoProvincia" value={formData["codigoProvincia"]} parameterList={parameterList.filter(p => p.tipoParametro.id == 25)} updateFormData={updateFormData} />
            <InputText validation={validation} name="emailPersonal" updateFormData={updateFormData} value={formData["emailPersonal"]} />
            <InputParameter validation={validation} name="codigoEstadoCivil" value={formData["codigoEstadoCivil"]} parameterList={parameterList.filter(p => p.tipoParametro.id == 22)} updateFormData={updateFormData} />
            <InputParameter validation={validation} name="codigoBanco" value={formData["codigoBanco"]} parameterList={parameterList.filter(p => p.tipoParametro.id == 1)} updateFormData={updateFormData} />
            <InputText validation={validation} name="cbu" updateFormData={updateFormData} value={formData["cbu"]} />
        </div>
    );
}

export default FormEmployeeStep2;