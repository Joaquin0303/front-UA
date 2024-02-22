import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, redirect } from "react-router-dom";
import { AdminUsers } from './components/AdminPages';
import { AdminParam } from './components/AdminPages';
import { AdminEmployees } from './components/AdminPages';
import { Home } from './pages/Home';
import Users from './pages/UserAdmin/Users';
import { Permisos } from './pages/UserAdmin/Permisos';
import Roles from './pages/UserAdmin/Roles';
import PasswordSecurity from './pages/UserAdmin/PasswordSecurity';
import ParameterSercurityPassword from './pages/UserAdmin/PasswordSecurityParameter'
import { Reports } from './components/AdminPages';

import logoempresa from './img/logo-empresa.png';
import logoout from './img/logout.png';
import './styles/header_and_nav.css';
import './index.css';
import './App.css';
import Login from './components/Login';
import useToken from './useToken';
import ParameterTypesPage from './pages/ParametersAdmin/ParameterTypesPage';
import ParametersPage from './pages/ParametersAdmin/ParametersPage';
import CountriesPage from './pages/ParametersAdmin/CountriesPage';
import PositionsPage from './pages/ParametersAdmin/PositionsPage';
import SequencersPage from './pages/ParametersAdmin/SequencersPage';
import EmployeesPage from './pages/EmployeesAdmin/EmployeesPage';
import ExcludedIncomePage from './pages/EmployeesAdmin/ExcludedIncomePage';
import LoadFamilyPage from './pages/EmployeesAdmin/LoadFamilyPage';
import ExternalPage from './pages/EmployeesAdmin/ExternalPage';
import BackToSchoolReportPage from './pages/ReportsAdmin/BackToSchoolReportPage';
import CostCenterReportPage from './pages/ReportsAdmin/CostCenterReportPage';
import EmploymentHistoryReportPage from './pages/ReportsAdmin/EmploymentHistoryReportPage';
import InternationalDataCollectionReportPage from './pages/ReportsAdmin/InternationalDataCollectionReportPage';
import ExternalReportPage from './pages/ReportsAdmin/ExternalReportPage';
import DirectorsReportPage from './pages/ReportsAdmin/DirectorsReportPage';
import GenericReportPage from './pages/ReportsAdmin/GenericReportPage';
import LicencesReportPage from './pages/ReportsAdmin/LicencesReportPage';
import { jwtDecode } from "jwt-decode";
import { decodeToken } from './utils/Utils';
import { PERMISSION } from './utils/PermissionList';
import { isAlive } from './services/IsAliveServices';

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJ2YWx1ZSI6InNlciJ9._RCDTTuGvtXwENLAHhQvvJuoYSbkXP_JPoGv2wzoQQo";
const decoded = jwtDecode(token);

function App() {

  const { token, setToken } = useToken();

  useEffect(() => {
    if(token){
      const interval = setInterval(() => {
        isAlive().then(response => {
          console.log('antes del if', response.model.activo)
          if(response.model.activo === false){
            setToken(null)
            clearInterval(interval)
          }
          else{
            console.log('en else', response.model.activo)
          }
        });
      }, 600000);
    }
  }, [token]);

  if (!token) {
    // Uncomment to enable Login
    return <Login setToken={setToken} />
  }

  let permissions = [];
  try {
    const tokenDecoded = decodeToken(token);
    permissions = tokenDecoded.permissions;
  } catch (error) {
    console.error(error);
  }

  return (
    <>
      <header>
        <div className="header">
          <img src={logoempresa} id="logo-empresa" alt="" />
          <div className="close-sesion">
            <a href="" onClick={() => { setToken(null); }}><img src={logoout} alt="" />Cerrar Sesión</a>
          </div>
        </div>
      </header>
      <nav>
        <div className="nav-links">
          <Link to="/">Inicio</Link>
          {permissions && permissions.includes(PERMISSION.PERMISO_SECCION_USUARIOS_ACCESO.id) && < Link to="/administracion-usuarios">Administración de Usuarios</Link>}
          {permissions && permissions.includes(PERMISSION.PERMISO_SECCION_PARAMETROS_ACCESO.id) && <Link to="/administracion-parametros">Administración de Parámetros</Link>}
          {permissions && permissions.includes(PERMISSION.PERMISO_SECCION_EMPLEADOS_ACCESO.id) && <Link to="/administracion-empleados">Administración de Empleados</Link>}
          {permissions && permissions.includes(PERMISSION.PERMISO_SECCION_REPORTES_ACCESO.id) && < Link to="/reportes">Reportes</Link>}
        </div>
      </nav >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />

        {/* Administracion de Usuarios */}
        {/* -------------------------- */}
        <Route path="/administracion-usuarios" element={<AdminUsers permissions={permissions} />} />
        <Route path="/administracion-usuarios/usuarios" element={
          permissions && permissions.includes(PERMISSION.PERMISO_USUARIOS_ACCESO.id) ? <Users /> : <div>No tiene autorizacion</div>
        } />
        <Route path="/administracion-usuarios/permisos" element={
          permissions && permissions.includes(PERMISSION.PERMISO_PERMISOS_ACCESO.id) ? <Permisos /> : <div>No tiene autorizacion</div>
        } />
        <Route path="/administracion-usuarios/roles" element={
          permissions && permissions.includes(PERMISSION.PERMISO_ROLES_ACCESO.id) ? <Roles /> : <div>No tiene autorizacion</div>
        } />
        <Route path="/administracion-usuarios/contrasena-seguridad" element={
          permissions && permissions.includes(PERMISSION.PERMISO_SEGURIDAD_CONTRASENA_ACCESO.id) ? <PasswordSecurity /> : <div>No tiene autorizacion</div>
        } />
        <Route path="/administracion-usuarios/contrasena" element={
          permissions && permissions.includes(PERMISSION.PERMISO_PARAMETROS_CONTRASENA_ACCESO.id) ? <ParameterSercurityPassword /> : <div>No tiene autorizacion</div>
        } />

        {/* Administracion de Parametros */}
        {/* -------------------------- */}
        <Route path="/administracion-parametros" element={<AdminParam permissions={permissions} />} />
        {<Route path="/administracion-parametros/tipo-de-parametros" element={
          permissions && permissions.includes(PERMISSION.PERMISO_TIPO_PARAMETROS_ACCESO.id) ? <ParameterTypesPage /> : <div>No tiene autorizacion</div>
        } />}
        {<Route path="/administracion-parametros/parametros" element={
          permissions && permissions.includes(PERMISSION.PERMISO_PARAMETROS_ACCESO.id) ? <ParametersPage /> : <div>No tiene autorizacion</div>
        } />}
        {<Route path="/administracion-parametros/secuenciador" element={
          permissions && permissions.includes(PERMISSION.PERMISO_SECUENCIADOR_ACCESO.id) ? <SequencersPage /> : <div>No tiene autorizacion</div>
        } />}
        {<Route path="/administracion-parametros/puestos" element={
          permissions && permissions.includes(PERMISSION.PERMISO_PUESTOS_ACCESO.id) ? <PositionsPage /> : <div>No tiene autorizacion</div>
        } />}
        {<Route path="/administracion-parametros/pais" element={
          permissions && permissions.includes(PERMISSION.PERMISO_PAISES_ACCESO.id) ? <CountriesPage /> : <div>No tiene autorizacion</div>
        } />}


        {/* Administracion de Empleados */}
        {/* -------------------------- */}
        <Route path="/administracion-empleados" element={<AdminEmployees permissions={permissions} />} />
        {<Route path="/administracion-empleados/empleados" element={
          permissions && permissions.includes(PERMISSION.PERMISO_EMPLEADOS_ACCESO.id) ? <EmployeesPage /> : <div>No tiene autorizacion</div>
        } />}
        {<Route path="/administracion-empleados/cargas-de-familia" element={
          permissions && permissions.includes(PERMISSION.PERMISO_CARGAS_DE_FAMILIA_ACCESO.id) ? <LoadFamilyPage /> : <div>No tiene autorizacion</div>
        } />}
        {<Route path="/administracion-empleados/externos" element={
          permissions && permissions.includes(PERMISSION.PERMISO_EXTERNOS_ACCESO.id) ? <ExternalPage /> : <div>No tiene autorizacion</div>
        } />}
        {<Route path="/administracion-empleados/ingreso-caido" element={
          permissions && permissions.includes(PERMISSION.PERMISO_HISTORIAL_INGRESOS_CAIDOS_ACCESO.id) ? <ExcludedIncomePage /> : <div>No tiene autorizacion</div>
        } />}

        {/* Reportes */}
        {/* -------------------------- */}
        <Route path="/reportes" element={<Reports permissions={permissions} />} />
        {<Route path="/reportes/vuelta-al-colegio" element={
          permissions && permissions.includes(PERMISSION.PERMISO_REPORTE_VUELTA_AL_COLE_ACCESO.id) ? <BackToSchoolReportPage /> : <div>No tiene autorizacion</div>
        } />}
        {<Route path="/reportes/central-costo" element={
          permissions && permissions.includes(PERMISSION.PERMISO_REPORTE_CENTRO_DE_COSTO_ACCESO.id) ? <CostCenterReportPage /> : <div>No tiene autorizacion</div>
        } />}
        {<Route path="/reportes/historial-laboral" element={
          permissions && permissions.includes(PERMISSION.PERMISO_REPORTE_HISTORIAL_LABORAL_ACCESO.id) ? <EmploymentHistoryReportPage /> : <div>No tiene autorizacion</div>
        } />}
        {<Route path="/reportes/international" element={
          permissions && permissions.includes(PERMISSION.PERMISO_REPORTE_INTERNATIONAL_DATA_COLLECTION_ACCESO.id) ? <InternationalDataCollectionReportPage /> : <div>No tiene autorizacion</div>
        } />}
        {<Route path="/reportes/externos" element={
          permissions && permissions.includes(PERMISSION.PERMISO_REPORTE_EXTERNOS_ACCESO.id) ? <ExternalReportPage /> : <div>No tiene autorizacion</div>
        } />}
        {<Route path="/reportes/directores" element={
          permissions && permissions.includes(PERMISSION.PERMISO_REPORTE_DIRECTORES_ACCESO.id) ? <DirectorsReportPage /> : <div>No tiene autorizacion</div>
        } />}
        {<Route path="/reportes/generico" element={
          permissions && permissions.includes(PERMISSION.PERMISO_REPORTE_GENERICO_ACCESO.id) ? <GenericReportPage /> : <div>No tiene autorizacion</div>
        } />}
        {<Route path="/reportes/licencias" element={
          permissions && permissions.includes(PERMISSION.PERMISO_REPORTE_LICENCIAS_ACCESO.id) ? <LicencesReportPage /> : <div>No tiene autorizacion</div>
        } />}


      </Routes>
    </>
  )
}

export default App
