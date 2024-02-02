import { Routes, Route, Link } from "react-router-dom";
import logoGrupo from '../img/grupo.png';
import logoRoles from '../img/grupos.png';
import logoPermisos from '../img/permiso.png';
import logoParam from '../img/lupa.png';
import logoParamTipo from '../img/filtrar.png';
import logoSecuen from '../img/secuencia.png';
import logoPuestos from '../img/trabajo-remoto.png';
import logoPais from '../img/paises.png';
import logoEmpleados from '../img/empleado.png'
import logoFamilia from '../img/familia.png'
import logoExterno from '../img/externo.png'
import logoLicencias from '../img/licencias.png'
import logoHisPuesto from '../img/historial-puesto.png'
import logoHisIngreso from '../img/historial-ingresos.png'
import logoContrasena from '../img/contrasena.png'
import vueltaColegio from '../img/vueltaColegio.png'
import centralCosto from '../img/centralCosto.png'
import historialLaboral from '../img/historialLaboral.png'
import International from '../img/International.png'
import directores from '../img/directores.png'
import generico from '../img/generico.png'

import '../styles/AdminUsers.css';
import Card from "./cards";
import { ROLES } from "../utils/Roles";
import { PERMISSION } from "../utils/PermissionList";

export const AdminUsers = ({ permissions }) => {
    if (permissions && permissions.includes(PERMISSION.PERMISO_SECCION_USUARIOS_ACCESO.id))
        return <div className='bloque_principal'>
            <h2>Administración de Usuarios</h2>
            <div className='div-cards'>
                {permissions && permissions.includes(PERMISSION.PERMISO_USUARIOS_ACCESO.id) && <Card img={logoGrupo} title={'Usuarios'} path={'/administracion-usuarios/usuarios'} />}
                {permissions && permissions.includes(PERMISSION.PERMISO_ROLES_ACCESO.id) && <Card img={logoRoles} title={'Roles'} path={'/administracion-usuarios/roles'} />}
                {permissions && permissions.includes(PERMISSION.PERMISO_PERMISOS_ACCESO.id) && <Card img={logoPermisos} title={'Permisos'} path={'/administracion-usuarios/permisos'} />}
                {permissions && permissions.includes(PERMISSION.PERMISO_SEGURIDAD_CONTRASENA_ACCESO.id) && <Card img={logoContrasena} title={'Seguridad Contraseña'} path={'/administracion-usuarios/contrasena-seguridad'} />}
                {permissions && permissions.includes(PERMISSION.PERMISO_PARAMETROS_CONTRASENA_ACCESO.id) && <Card img={logoContrasena} title={'Parámetros Contraseña'} path={'/administracion-usuarios/contrasena'} />}
            </div>
        </div>
    else
        return <div>No tiene autorizacion</div>
}

export const AdminParam = ({ permissions }) => {
    if (permissions && permissions.includes(PERMISSION.PERMISO_SECCION_PARAMETROS_ACCESO.id))
        return <div className='bloque_principal' >
            <h2>Administración de Parámetros</h2>
            <div className='div-cards'>
                {permissions && permissions.includes(PERMISSION.PERMISO_TIPO_PARAMETROS_ACCESO.id) && <Card img={logoParam} title={'Tipo de Parámetros'} path={'/administracion-parametros/tipo-de-parametros'} />}
                {permissions && permissions.includes(PERMISSION.PERMISO_PARAMETROS_ACCESO.id) && <Card img={logoParamTipo} title={'Parámetros'} path={'/administracion-parametros/parametros'} />}
                {permissions && permissions.includes(PERMISSION.PERMISO_SECUENCIADOR_ACCESO.id) && <Card img={logoSecuen} title={'Secuenciador'} path={'/administracion-parametros/secuenciador'} />}
                {permissions && permissions.includes(PERMISSION.PERMISO_PUESTOS_ACCESO.id) && <Card img={logoPuestos} title={'Puestos'} path={'/administracion-parametros/puestos'} />}
                {permissions && permissions.includes(PERMISSION.PERMISO_PAISES_ACCESO.id) && <Card img={logoPais} title={'País'} path={'/administracion-parametros/pais'} />}
            </div>
        </div >
    else
        return <div>No tiene autorizacion</div>
}

export const AdminEmployees = ({ permissions }) => {
    if (permissions && permissions.includes(PERMISSION.PERMISO_SECCION_EMPLEADOS_ACCESO.id))
        return <div className='bloque_principal'>
            <h2>Administración de Empleados</h2>
            <div className='div-cards'>
                {permissions && permissions.includes(PERMISSION.PERMISO_EMPLEADOS_ACCESO.id) && <Card img={logoEmpleados} title={'Empleados'} path={'/administracion-empleados/empleados'} />}
                {permissions && permissions.includes(PERMISSION.PERMISO_CARGAS_DE_FAMILIA_ACCESO.id) && <Card img={logoFamilia} title={'Carga de Familia'} path={'/administracion-empleados/cargas-de-familia'} />}
                {permissions && permissions.includes(PERMISSION.PERMISO_EXTERNOS_ACCESO.id) && <Card img={logoExterno} title={'Empleado Externo'} path={'/administracion-empleados/externos'} />}
                {permissions && permissions.includes(PERMISSION.PERMISO_HISTORIAL_INGRESOS_CAIDOS_ACCESO.id) && <Card img={logoHisIngreso} title={'Historial de Ingresos Caídos'} path={'/administracion-empleados/ingreso-caido'} />}
            </div>
        </div>
    else
        return <div>No tiene autorizacion</div>
}

export const Reports = ({ permissions }) => {
    if (permissions && permissions.includes(PERMISSION.PERMISO_SECCION_REPORTES_ACCESO.id))
        return <div className='bloque_principal'>
            <h2>Reportes</h2>
            <div className='div-cards'>
                {permissions && permissions.includes(PERMISSION.PERMISO_REPORTE_VUELTA_AL_COLE_ACCESO.id) && <Card img={vueltaColegio} title={'Vuelta al Colegio'} path={'/reportes/vuelta-al-colegio'} />}
                {permissions && permissions.includes(PERMISSION.PERMISO_REPORTE_CENTRO_DE_COSTO_ACCESO.id) && <Card img={centralCosto} title={'Centro de Costo'} path={'/reportes/central-costo'} />}
                {permissions && permissions.includes(PERMISSION.PERMISO_REPORTE_HISTORIAL_LABORAL_ACCESO.id) && <Card img={historialLaboral} title={'Historial laboral'} path={'/reportes/historial-laboral'} />}
                {permissions && permissions.includes(PERMISSION.PERMISO_REPORTE_INTERNATIONAL_DATA_COLLECTION_ACCESO.id) && <Card img={International} title={'International Data Collection'} path={'/reportes/international'} />}
                {permissions && permissions.includes(PERMISSION.PERMISO_REPORTE_EXTERNOS_ACCESO.id) && <Card img={logoExterno} title={'Externos'} path={'/reportes/externos'} />}
                {permissions && permissions.includes(PERMISSION.PERMISO_REPORTE_DIRECTORES_ACCESO.id) && <Card img={directores} title={'Directores'} path={'/reportes/directores'} />}
                {permissions && permissions.includes(PERMISSION.PERMISO_REPORTE_GENERICO_ACCESO.id) && <Card img={generico} title={'Genérico'} path={'/reportes/generico'} />}
                {permissions && permissions.includes(PERMISSION.PERMISO_REPORTE_LICENCIAS_ACCESO.id) && <Card img={logoLicencias} title={'Licencias'} path={'/reportes/licencias'} />}
            </div>
        </div>
    else
        return <div>No tiene autorizacion</div>
}
