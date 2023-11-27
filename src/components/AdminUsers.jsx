import { Routes, Route, Link  } from "react-router-dom";
import logoGrupo from '../img/grupo.png';
import logoRoles from '../img/grupos.png';
import logoPermisos from '../img/permiso.png';
import '../styles/AdminUsers.css';
import Card from "./cards";

export const AdminUsers = () => 
<div className='bloque_principal'>
    <h2>Alta, baja y Modificacion</h2>
    <div className='div-cards'>
        <Card img={logoGrupo} title={'Usuarios'} path={'/Administración usuarios/Usuarios'}/>
        <Card img={logoRoles} title={'Roles'} path={'/Administración usuarios/Roles'}/>
        <Card img={logoPermisos} title={'Permisos'} path={'/Administración usuarios/Permisos'}/>
    </div>
</div>