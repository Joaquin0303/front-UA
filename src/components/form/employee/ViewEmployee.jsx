import React from "react";
import i18n from "../../../localization/i18n";

const ViewEmployee = ({ data, closeModal }) => {

    const createCellInfo = (label, value) => {
        return (
            <>
                {value && <div className='form-group'>
                    <label className='label' htmlFor="id">{i18n.t(label)}</label>
                    <div className='form-p'>{value}</div>
                </div>}
            </>
        )
    }

    const createCellDataInfo = (label, data, name) => {
        return (
            <>
                {data && data[name] && <div className='form-group'>
                    <label className='label' htmlFor="id">{i18n.t(label)}</label>
                    <div className='form-p'>{data[name]}</div>
                </div>}
            </>
        )
    }

    const createView1 = () => {
        return <>
            <div className="modal-title">View 1</div>
            {createCellInfo('Empleado', data['apellido'] + ' ' + data['segundoNombre'] + ' ' + data['nombre'] + ' (' + data['numeroLegajo'] + ')')}
            {createCellInfo('Nombre Preferido', data['nombrePreferido'])}
            {createCellInfo('Genero', data['codigoGenero'].descripcion)}
            {createCellInfo('Documento Personal', data['codigoTipoDocumento'].descripcion + ' ' + data['numeroDocumentoPersonal'])}
            {createCellInfo('Documento Laboral', data['codigoTipoDocumento'].descripcion + ' ' + data['numeroDocumentoLaboral'])}
            {createCellInfo('Fecha de Nacimiento', data['fechaNacimiento'])}
            {createCellDataInfo('Generacion', data['codigoGeneracion'], 'descripcion')}
            {createCellInfo('Fecha de Ingreso', data['fechaIngreso'])}
            {createCellDataInfo('Pais', data['codigoPais'], 'descripcion')}
            {createCellDataInfo('Oficina', data['codigoOficina'], 'descripcion')}
            {createCellDataInfo('Direccion', data['codigoDireccion'], 'descripcion')}
            {createCellDataInfo('CategoriaEmpleado', data['codigoCategoriaEmpleado'], 'descripcion')}
            {createCellDataInfo('Puesto', data['codigoPuesto'], 'descripcion')}
        </>
    }

    const createView2 = () => {
        return <>
            <div className="modal-title">View 2</div>
            {createCellDataInfo('Nacionalidad', data['codigoNacionalidad'], 'descripcion')}
            {createCellDataInfo('Pais de Residencia', data['codigoPaisResidencia'], 'descripcion')}
            {createCellDataInfo('Provincia', data['codigoProvincia'], 'descripcion')}
            {createCellInfo('calle de Residencia', data['calleResidencia'])}
            {createCellInfo('Numero de Residencia', data['numeroResidencia'])}
            {createCellInfo('Departamento de Residencia', data['departamentoResidencia'])}
            {createCellInfo('Piso de Residencia', data['pisoResidencia'])}
            {createCellInfo('Localidad de Residencia', data['localidadResidencia'])}
            {createCellInfo('Email Personal', data['emailPersonal'])}
            {createCellDataInfo('Banco', data['codigoBanco'], 'descripcion')}
            {createCellInfo('cbu', data['cbu'])}
            {createCellDataInfo('Estado Civil', data['codigoEstadoCivil'], 'descripcion')}
        </>
    }

    const createView3 = () => {
        return <>
            <div className="modal-title">View 3</div>
            {createCellInfo('Fecha Ingreso Reconocida', data['fechaIngresoReconocida'])}
            {createCellDataInfo('Tipo Contratacion', data['codigoTipoContratacion'], 'descripcion')}
            {createCellDataInfo('Horas Semanales', data['horasSemanales'], 'descripcion')}
            {createCellDataInfo('FTE', data['fte'], 'texto2')}
            {createCellDataInfo('Frecuencia de Liquidacion', data['codigoFrecuenciaLiquidacion'], 'descripcion')}
            {createCellDataInfo('Tipo Empleo', data['codigoTipoEmpleo'], 'descripcion')}
            {createCellDataInfo('Tipo Jornada', data['codigoTipoJornada'], 'descripcion')}
            {createCellInfo('Email Laboral', data['emailLaboral'])}
            {createCellDataInfo('Division', data['codigoDivision'], 'descripcion')}
            {createCellDataInfo('Prepaga', data['codigoPrepaga'], 'descripcion')}
            {createCellDataInfo('Obra Social', data['codigoObraSocial'], 'descripcion')}
            {createCellDataInfo('Convenio', data['codigoConvenio'], 'descripcion')}
            {createCellDataInfo('Categoria Convenio', data['codigoCategoriaConvenio'], 'descripcion')}
            {createCellInfo('Afiliado al Sindicato', data['afiliadoSindicato'] ? 'Si' : 'No')}
            {createCellDataInfo('Grado', data['codigoGrado'], 'descripcion')}
        </>
    }

    const createView4 = () => {
        return <>
            <div className="modal-title">View 4</div>
            {createCellDataInfo('Centro De Costo', data['codigoCentroDeCosto'], 'descripcion')}
            {createCellInfo('Fecha Fin Contrato', data['fechaFinContrato'])}
            {createCellInfo('Fecha Egreso', data['fechaEgreso'])}
            {createCellDataInfo('Tipo Egreso', data['codigoTipoEgreso'], 'descripcion')}
            {createCellInfo('Observaciones', data['observaciones'])}
        </>
    }

    return (
        <div>
            <div className="modals-content">
                <div className='form-view'>
                    <div className="form-field-container">
                        {createView1()}
                        {createView2()}
                        {createView3()}
                        {createView4()}
                    </div>
                </div>
            </div>
            <div className='modal-buttons'>
                {<button className='btns-close' onClick={closeModal}>Cerrar</button>}
            </div>
        </div>
    );
}

export default ViewEmployee;