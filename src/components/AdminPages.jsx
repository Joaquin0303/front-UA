import { Routes, Route, Link } from "react-router-dom";
import logoGrupo from '../img/grupo.png';
import logoRoles from '../img/grupos.png';
import logoPermisos from '../img/permiso.png';
import logoParam from '../img/lupa.png';
import logoParamTipo from '../img/filtrar.png';
import logoSecuen from '../img/secuencia.png';
import logoPuestos from '../img/trabajo-remoto.png';
import logoPais from '../img/paises.png';
import '../styles/AdminUsers.css';
import Card from "./cards";

export const AdminUsers = () =>
    <div className='bloque_principal'>
        <h2>Alta, baja y Modificación</h2>
        <h4>Administración de Usuarios</h4>
        <div className='div-cards'>
            <Card img={logoGrupo} title={'Usuarios'} path={'/administracion-usuarios/usuarios'} />
            <Card img={logoRoles} title={'Roles'} path={'/administracion-usuarios/roles'} />
            <Card img={logoPermisos} title={'Permisos'} path={'/administracion-usuarios/permisos'} />
        </div>
    </div>

export const AdminParam = () =>
    <div className='bloque_principal'>
        <h2>Alta, baja y Modificación</h2>
        <h4>Administración de Parámetros</h4>
        <div className='div-cards'>
            <Card img={logoParam} title={'Tipo de Parámetros'} path={'/administracion-parametros/tipo-de-parametros'} />
            <Card img={logoParamTipo} title={'Parámetros'} path={'/administracion-parametros/parametros'} />
            <Card img={logoSecuen} title={'Secuenciador'} path={'/administracion-parametros/secuenciador'} />
            <Card img={logoPuestos} title={'Puestos'} path={'/administracion-parametros/puestos'} />
            <Card img={logoPais} title={'País'} path={'/administracion-parametros/pais'} />
        </div>
    </div>