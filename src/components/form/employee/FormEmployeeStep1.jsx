import React from "react";
import InputText from "../InputText";
import InputDate from "../InputDate";
import InputCountry from "../InputCountry";
import InputPositionCode from "../InputPositionCode";
import InputParameter from "../InputParameter";
import InputNumber from "../InputNumber";

const FormEmployeeStep1 = ({ parameterList, validation, formData, updateFormData }) => {

    return (
        <div className="form-step-container">
            <InputText validation={validation} name="apellido" updateFormData={updateFormData} value={formData["apellido"]} />
            <InputText validation={validation} name="nombre" updateFormData={updateFormData} value={formData["nombre"]} />
            <InputText validation={validation} name="segundoNombre" updateFormData={updateFormData} value={formData["segundoNombre"]} />
            <InputText validation={validation} name="nombrePreferido" updateFormData={updateFormData} value={formData["nombrePreferido"]} />
            <InputParameter validation={validation} name="codigoGenero" value={formData["codigoGenero"]} parameterList={parameterList.filter(p => p.tipoParametro.id == 11)} updateFormData={updateFormData} />
            <InputDate validation={validation} name="fechaNacimiento" updateFormData={updateFormData} value={formData["fechaNacimiento"]} />
            <InputParameter validation={validation} name="codigoGeneracion" value={formData["codigoGeneracion"]} parameterList={parameterList.filter(p => p.tipoParametro.id == 10)} updateFormData={updateFormData} />
            <InputDate validation={validation} name="fechaIngreso" updateFormData={updateFormData} value={formData["fechaIngreso"]} />
            <InputParameter validation={validation} name="codigoTipoDocumento" value={formData["codigoTipoDocumento"]} parameterList={parameterList.filter(p => p.tipoParametro.id == 29)} updateFormData={updateFormData} />
            <InputNumber validation={validation} name="numeroDocumentoPersonal" updateFormData={updateFormData} value={formData["numeroDocumentoPersonal"]} />
            <InputNumber validation={validation} name="numeroDocumentoLaboral" updateFormData={updateFormData} value={formData["numeroDocumentoLaboral"]} />
            <InputParameter validation={validation} name="codigoOficina" value={formData["codigoOficina"]} parameterList={parameterList.filter(p => p.tipoParametro.id == 19)} updateFormData={updateFormData} />

            <InputCountry validation={validation} name="codigoPais" value={formData["codigoPais"]} updateFormData={updateFormData} />
            <InputParameter validation={validation} name="codigoDireccion" value={formData["codigoDireccion"]} parameterList={parameterList.filter(p => p.tipoParametro.id == 6)} updateFormData={updateFormData} />
            <InputParameter validation={validation} name="codigoCategoriaEmpleado" value={formData["codigoCategoriaEmpleado"]} parameterList={parameterList.filter(p => p.tipoParametro.id == 3)} updateFormData={updateFormData} />
            <InputPositionCode validation={validation} name="codigoPuesto" value={formData["codigoPuesto"]} updateFormData={updateFormData} directionCode={formData['codigoDireccion']} countryCode={formData['codigoPais']} categoryCode={formData['codigoCategoriaEmpleado']} currentPositionId={formData['id']} />

            <InputText disabled={true} validation={validation} name="A quien reporta" updateFormData={() => { }} value={formData['codigoPuesto'] && formData['codigoPuesto'].codigoPuestoAlQueReporta ? formData['codigoPuesto'].codigoPuestoAlQueReporta.descripcion : ""} />
            <InputText disabled={true} validation={validation} name="Centro de costo" updateFormData={() => { }} value={formData['codigoPuesto'] && formData['codigoPuesto'].codigoCentroDeCosto ? formData['codigoPuesto'].codigoCentroDeCosto.descripcion : ""} />
            <InputText disabled={true} validation={validation} name="Gerencia" updateFormData={() => { }} value={formData['codigoPuesto'] && formData['codigoPuesto'].codigoGerencia ? formData['codigoPuesto'].codigoGerencia.descripcion : ""} />
            <InputText disabled={true} validation={validation} name="Jefatura" updateFormData={() => { }} value={formData['codigoPuesto'] && formData['codigoPuesto'].codigoJefatura ? formData['codigoPuesto'].codigoJefatura.descripcion : ""} />
        </div>
    );
}

export default FormEmployeeStep1;