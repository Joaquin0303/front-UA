import { Routes, Route, Link  } from "react-router-dom";
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
        <Card img={logoGrupo} title={'Usuarios'} path={'/Administración usuarios/Usuarios'}/>
        <Card img={logoRoles} title={'Roles'} path={'/Administración usuarios/Roles'}/>
        <Card img={logoPermisos} title={'Permisos'} path={'/Administración usuarios/Permisos'}/>
    </div>
</div>

export const AdminParam = () => 
<div className='bloque_principal'>
    <h2>Alta, baja y Modificación</h2>
    <h4>Administración de Parámetros</h4>
    <div className='div-cards'>
        <Card img={logoParam} title={'Tipo de Parámetros'} path={'/Administración Parámetros/Tipo de Parametros'}/>
        <Card img={logoParamTipo} title={'Parámetros'} path={'/Administración Parámetros/Parametros'}/>
        <Card img={logoSecuen} title={'Secuenciador'} path={'/Administración Parámetros/Secuenciador'}/>
        <Card img={logoPuestos} title={'Puestos'} path={'/Administración Parámetros/Puestos'}/>
        <Card img={logoPais} title={'País'} path={'/Administración Parámetros/Pais'}/>
    </div>
</div>