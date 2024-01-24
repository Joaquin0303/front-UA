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

import vueltaColegio from '../img/vueltaColegio.png'
import centralCosto from '../img/centralCosto.png'
import historialLaboral from '../img/historialLaboral.png'
import International from '../img/International.png'
import directores from '../img/directores.png'
import generico from '../img/generico.png'

import '../styles/AdminUsers.css';
import Card from "./cards";
import { ROLES } from "../utils/Roles";

export const AdminUsers = ({ roles }) => {
    if (roles && roles.includes(ROLES.USER_ADMIN.id))
        return <div className='bloque_principal'>
            <h2>Administración de Usuarios</h2>
            <div className='div-cards'>
                <Card img={logoGrupo} title={'Usuarios'} path={'/administracion-usuarios/usuarios'} />
                <Card img={logoRoles} title={'Roles'} path={'/administracion-usuarios/roles'} />
                <Card img={logoPermisos} title={'Permisos'} path={'/administracion-usuarios/permisos'} />
            </div>
        </div>
    else
        return <div>No tiene autorizacion</div>
}

export const AdminParam = ({ roles }) => {
    if (roles && roles.includes(ROLES.EMPLOYEE_ADMIN.id))
        return <div className='bloque_principal' >
            <h2>Administración de Parámetros</h2>
            <div className='div-cards'>
                <Card img={logoParam} title={'Tipo de Parámetros'} path={'/administracion-parametros/tipo-de-parametros'} />
                <Card img={logoParamTipo} title={'Parámetros'} path={'/administracion-parametros/parametros'} />
                <Card img={logoSecuen} title={'Secuenciador'} path={'/administracion-parametros/secuenciador'} />
                <Card img={logoPuestos} title={'Puestos'} path={'/administracion-parametros/puestos'} />
                <Card img={logoPais} title={'País'} path={'/administracion-parametros/pais'} />
            </div>
        </div >
    else
        return <div>No tiene autorizacion</div>
}

export const AdminEmployees = ({ roles }) => {
    if (roles && roles.includes(ROLES.EMPLOYEE_ADMIN.id))
        return <div className='bloque_principal'>
            <h2>Administración de Empleados</h2>
            <div className='div-cards'>
                <Card img={logoEmpleados} title={'Empleados'} path={'/administracion-empleados/empleados'} />
                <Card img={logoFamilia} title={'Carga de Familia'} path={'/administracion-empleados/cargas-de-familia'} />
                <Card img={logoExterno} title={'Empleado Externo'} path={'/administracion-empleados/externos'} />
                <Card img={logoHisIngreso} title={'Historial de Ingresos Caídos'} path={'/administracion-empleados/ingreso-caido'} />
            </div>
        </div>
    else
        return <div>No tiene autorizacion</div>
}

export const Reports = ({ roles }) => {
    if (roles && (roles.includes(ROLES.EMPLOYEE_ADMIN.id) || roles.includes(ROLES.REPORT_DIRECTOR.id)))
        return <div className='bloque_principal'>
            <h2>Reportes</h2>
            <div className='div-cards'>
                {roles && roles.includes(ROLES.EMPLOYEE_ADMIN.id) && <Card img={vueltaColegio} title={'Vuelta al Colegio'} path={'/reportes/vuelta-al-colegio'} />}
                {roles && roles.includes(ROLES.EMPLOYEE_ADMIN.id) && <Card img={centralCosto} title={'Centro de costo'} path={'/reportes/central-costo'} />}
                {roles && roles.includes(ROLES.EMPLOYEE_ADMIN.id) && <Card img={historialLaboral} title={'Historial laboral'} path={'/reportes/historial-laboral'} />}
                {roles && roles.includes(ROLES.EMPLOYEE_ADMIN.id) && <Card img={International} title={'International Data Collection'} path={'/reportes/international'} />}
                {roles && roles.includes(ROLES.EMPLOYEE_ADMIN.id) && <Card img={logoExterno} title={'Externos'} path={'/reportes/externos'} />}
                {roles && (roles.includes(ROLES.EMPLOYEE_ADMIN.id) || roles.includes(ROLES.REPORT_DIRECTOR.id)) && <Card img={directores} title={'Directores'} path={'/reportes/directores'} />}
                {roles && roles.includes(ROLES.EMPLOYEE_ADMIN.id) && <Card img={generico} title={'Genérico'} path={'/reportes/generico'} />}
                {roles && roles.includes(ROLES.EMPLOYEE_ADMIN.id) && <Card img={logoLicencias} title={'Licencias'} path={'/reportes/licencias'} />}
            </div>
        </div>
    else
        return <div>No tiene autorizacion</div>
}
