import React from "react";
import InputText from "../InputText";
import InputDate from "../InputDate";
import InputCountry from "../InputCountry";
import InputPositionCode from "../InputPositionCode";
import InputParameter from "../InputParameter";
import { TABLE_ACTIONS } from "../../../utils/GeneralConstants";

const FormEmployeeStep1 = ({ action, parameterList, validation, formData, updateFormData }) => {

    return (
        <div className="form-field-container">
            <InputText validation={validation} name="apellido" updateFormData={updateFormData} value={formData["apellido"]} mandatory={true} />
            <InputText validation={validation} name="nombre" updateFormData={updateFormData} value={formData["nombre"]} mandatory={true} />
            <InputText validation={validation} name="segundoNombre" updateFormData={updateFormData} value={formData["segundoNombre"]} />
            <InputText validation={validation} name="nombrePreferido" updateFormData={updateFormData} value={formData["nombrePreferido"]} />
            <InputParameter validation={validation} name="codigoGenero" value={formData["codigoGenero"]} parameterList={parameterList.filter(p => p.tipoParametro.id == 11)} updateFormData={updateFormData} mandatory={true} />
            <InputDate validation={validation} name="fechaNacimiento" updateFormData={updateFormData} value={formData["fechaNacimiento"]} mandatory={true} />
            <InputParameter validation={validation} name="codigoGeneracion" value={formData["codigoGeneracion"]} parameterList={parameterList.filter(p => p.tipoParametro.id == 10)} updateFormData={updateFormData} mandatory={true} />
            <InputDate validation={validation} name="fechaIngreso" updateFormData={updateFormData} value={formData["fechaIngreso"]} mandatory={true} />
            {action == TABLE_ACTIONS.EDIT && <InputDate validation={validation} name="fechaIngresoReconocida" updateFormData={updateFormData} value={formData["fechaIngresoReconocida"]} />}
            <InputParameter validation={validation} name="codigoTipoDocumento" value={formData["codigoTipoDocumento"]} parameterList={parameterList.filter(p => p.tipoParametro.id == 29)} updateFormData={updateFormData} mandatory={true} />
            <InputText validation={validation} name="numeroDocumentoPersonal" updateFormData={updateFormData} value={formData["numeroDocumentoPersonal"]} mandatory={true} />
            <InputText validation={validation} name="numeroDocumentoLaboral" updateFormData={updateFormData} value={formData["numeroDocumentoLaboral"]} mandatory={true} />
            {action == TABLE_ACTIONS.EDIT && <>
                <InputParameter validation={validation} name="codigoOficina" value={formData["codigoOficina"]} parameterList={parameterList.filter(p => p.tipoParametro.id == 19)} updateFormData={updateFormData} country={formData["codigoPais"]} mandatory={true} />
            </>}
            {action == TABLE_ACTIONS.ADD && <>
                <InputCountry validation={validation} name="codigoPais" value={formData["codigoPais"]} updateFormData={updateFormData} mandatory={true} />
                <InputParameter validation={validation} name="codigoOficina" value={formData["codigoOficina"]} parameterList={parameterList.filter(p => p.tipoParametro.id == 19)} updateFormData={updateFormData} country={formData["codigoPais"]} mandatory={true} />
                <InputParameter validation={validation} name="codigoDireccion" value={formData["codigoDireccion"]} parameterList={parameterList.filter(p => p.tipoParametro.id == 6)} updateFormData={updateFormData} mandatory={true} />
                <InputPositionCode validation={validation} name="codigoPuesto" value={formData["codigoPuesto"]} updateFormData={updateFormData} directionCode={formData['codigoDireccion']} countryCode={formData['codigoPais']} currentPositionId={formData['id']} mandatory={true} />

                <InputText disabled={true} validation={validation} name="Categoria" updateFormData={() => { }} value={formData['codigoPuesto'] && formData['codigoPuesto'].codigoCategoria ? formData['codigoPuesto'].codigoCategoria.descripcion : ""} />
                <InputText disabled={true} validation={validation} name="A quien reporta" updateFormData={() => { }} value={formData['codigoPuesto'] && formData['codigoPuesto'].codigoPuestoAlQueReporta ? formData['codigoPuesto'].codigoPuestoAlQueReporta.descripcion : ""} />
                <InputText disabled={true} validation={validation} name="Centro de costo" updateFormData={() => { }} value={formData['codigoPuesto'] && formData['codigoPuesto'].codigoCentroDeCosto ? formData['codigoPuesto'].codigoCentroDeCosto.descripcion : ""} />
                <InputText disabled={true} validation={validation} name="Gerencia" updateFormData={() => { }} value={formData['codigoPuesto'] && formData['codigoPuesto'].codigoGerencia ? formData['codigoPuesto'].codigoGerencia.descripcion : ""} />
                <InputText disabled={true} validation={validation} name="Jefatura" updateFormData={() => { }} value={formData['codigoPuesto'] && formData['codigoPuesto'].codigoJefatura ? formData['codigoPuesto'].codigoJefatura.descripcion : ""} />
            </>}
        </div>
    );
}

export default FormEmployeeStep1;