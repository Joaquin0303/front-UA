import React from "react";
import InputText from "../form/InputText";
import InputDate from "../form/InputDate";
import InputParameter from "../form/InputParameter";
import InputNumber from "../form/InputNumber";
import InputSwitch from '../form/InputSwitch';

const FormEmployeeStep3 = ({ parameterList, validation, formData, updateFormData }) => {

    return (
        <div className="accordion">
            <div className="sections">Datos Laborales</div>
            <InputParameter validation={validation} name="codigoTipoContratacion" value={formData["codigoTipoContratacion"]} parameterList={parameterList.filter(p => p.tipoParametro.id == 26)} updateFormData={updateFormData} />
            <InputNumber validation={validation} name="horasSemanales" updateFormData={updateFormData} value={formData["horasSemanales"]} />
            <InputNumber validation={validation} name="fte" updateFormData={updateFormData} value={formData["fte"]} />
            <InputParameter validation={validation} name="codigoFrecuenciaLiquidacion" value={formData["codigoFrecuenciaLiquidacion"]} parameterList={parameterList.filter(p => p.tipoParametro.id == 9)} updateFormData={updateFormData} />
            <InputParameter validation={validation} name="codigoTipoEmpleo" value={formData["codigoTipoEmpleo"]} parameterList={parameterList.filter(p => p.tipoParametro.id == 28)} updateFormData={updateFormData} />
            <InputParameter validation={validation} name="codigoTipoJornada" value={formData["codigoTipoJornada"]} parameterList={parameterList.filter(p => p.tipoParametro.id == 30)} updateFormData={updateFormData} />
            <InputText validation={validation} name="emailLaboral" updateFormData={updateFormData} value={formData["emailLaboral"]} />
            <InputParameter validation={validation} name="codigoDivision" value={formData["codigoDivision"]} parameterList={parameterList.filter(p => p.tipoParametro.id == 7)} updateFormData={updateFormData} />
            <InputParameter validation={validation} name="codigoPrepaga" value={formData["codigoPrepaga"]} parameterList={parameterList.filter(p => p.tipoParametro.id == 23)} updateFormData={updateFormData} />
            <InputParameter validation={validation} name="codigoObraSocial" value={formData["codigoObraSocial"]} parameterList={parameterList.filter(p => p.tipoParametro.id == 18)} updateFormData={updateFormData} />
            <InputParameter validation={validation} name="codigoConvenio" value={formData["codigoConvenio"]} parameterList={parameterList.filter(p => p.tipoParametro.id == 5)} updateFormData={updateFormData} />
            <InputParameter validation={validation} name="codigoCategoriaConvenio" value={formData["codigoCategoriaConvenio"]} parameterList={parameterList.filter(p => p.tipoParametro.id == 2)} updateFormData={updateFormData} />
            <InputSwitch name="afiliadoSindicato" updateFormData={updateFormData} value={formData["afiliadoSindicato"]} />
            <InputParameter validation={validation} name="codigoGrado" value={formData["codigoGrado"]} parameterList={parameterList.filter(p => p.tipoParametro.id == 31)} updateFormData={updateFormData} />
        </div>
    );
}

export default FormEmployeeStep3;