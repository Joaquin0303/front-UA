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

export const AdminUsers = () =>
    <div className='bloque_principal'>
        <h2>Alta, Baja y Modificación</h2>
        <h4>Administración de Usuarios</h4>
        <div className='div-cards'>
            <Card img={logoGrupo} title={'Usuarios'} path={'/administracion-usuarios/usuarios'} />
            <Card img={logoRoles} title={'Roles'} path={'/administracion-usuarios/roles'} />
            <Card img={logoPermisos} title={'Permisos'} path={'/administracion-usuarios/permisos'} />
        </div>
    </div>

export const AdminParam = () =>
    <div className='bloque_principal'>
        <h2>Alta, Baja y Modificación</h2>
        <h4>Administración de Parámetros</h4>
        <div className='div-cards'>
            <Card img={logoParam} title={'Tipo de Parámetros'} path={'/administracion-parametros/tipo-de-parametros'} />
            <Card img={logoParamTipo} title={'Parámetros'} path={'/administracion-parametros/parametros'} />
            <Card img={logoSecuen} title={'Secuenciador'} path={'/administracion-parametros/secuenciador'} />
            <Card img={logoPuestos} title={'Puestos'} path={'/administracion-parametros/puestos'} />
            <Card img={logoPais} title={'País'} path={'/administracion-parametros/pais'} />
        </div>
    </div>

export const AdminEmployees = () =>
    <div className='bloque_principal'>
        <h2>Alta, Baja y Modificación</h2>
        <h4>Administración de Empleados</h4>
        <div className='div-cards'>
            <Card img={logoEmpleados} title={'Empleados'} path={'/administracion-empleados/empleados'} />
            <Card img={logoFamilia} title={'Cargas de Familia'} path={'/administracion-empleados/cargas-de-familia'} />
            <Card img={logoExterno} title={'Externos'} path={'/administracion-empleados/externos'} />
            <Card img={logoLicencias} title={'Historial Licencias'} path={'/administracion-empleados/historial-licencias'} />
            <Card img={logoHisPuesto} title={'Historial Cambios de Puesto'} path={'/administracion-empleados/cambios-puestos'} />
            <Card img={logoHisIngreso} title={'Historial Ingreso Caído'} path={'/administracion-empleados/ingreso-caido'} />
        </div>
    </div>

export const Reports = () =>
    <div className='bloque_principal'>
        <h4>Reportes</h4>
        <div className='div-cards'>
            <Card img={vueltaColegio} title={'Vuelta al Colegio'} path={'/reportes/vuelta-al-colegio'} />
            <Card img={centralCosto} title={'Central de Costo'} path={'/reportes/central-costo'} />
            <Card img={historialLaboral} title={'Historial laboral'} path={'/reportes/historial-laboral'} />
            <Card img={International} title={'International Data Collection'} path={'/reportes/international'} />
            <Card img={logoExterno} title={'Externos'} path={'/reportes/externos'} />
            <Card img={directores} title={'Directores'} path={'/reportes/directores'} />
            <Card img={generico} title={'Genérico'} path={'/reportes/generico'} />
            <Card img={logoLicencias} title={'Licencias'} path={'/reportes/licencias'} />
        </div>
    </div>