import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from "react-router-dom";
import { AdminUsers } from './components/AdminPages';
import { AdminParam } from './components/AdminPages';
import { AdminEmployees } from './components/AdminPages';
import { Home } from './pages/Home';
import Users from './pages/UserAdmin/Users';
import { Permisos } from './pages/UserAdmin/Permisos';
import Roles from './pages/UserAdmin/Roles';

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
import PositionChangesPage from './pages/EmployeesAdmin/PositionChangesPage';
import LicensesPage from './pages/EmployeesAdmin/LicenseHistoryPage';
import BackToSchoolReportPage from './pages/ReportsAdmin/BackToSchoolReportPage';
import CostCenterReportPage from './pages/ReportsAdmin/CostCenterReportPage';
import EmploymentHistoryReportPage from './pages/ReportsAdmin/EmploymentHistoryReportPage';
import InternationalDataCollectionReportPage from './pages/ReportsAdmin/InternationalDataCollectionReportPage';
import ExternalReportPage from './pages/ReportsAdmin/ExternalReportPage';
import DirectorsReportPage from './pages/ReportsAdmin/DirectorsReportPage';
import GenericReportPage from './pages/ReportsAdmin/GenericReportPage';
import LicencesReportPage from './pages/ReportsAdmin/LicencesReportPage';

function App() {

  const { token, setToken } = useToken();

  if (!token) {
    // Uncomment to enable Login
    return <Login setToken={setToken} />
  }

  return (
    <>
      <header>
        <div className="header">
          <img src={logoempresa} id="logo-empresa" alt="" />
          <div className="close-sesion">
            <a href="" onClick={() => setToken(null)}><img src={logoout} alt="" />Cerrar Sesión</a>
          </div>
        </div>
      </header>
      <nav>
        <div className="nav-links">
          <Link to="/">Inicio</Link>
          <Link to="/administracion-usuarios">Administración Usuarios</Link>
          <Link to="/administracion-parametros">Administración Parámetros</Link>
          <Link to="/administracion-empleados">Administración Empleados</Link>
          <Link to="/reportes">Reportes</Link>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />

        {/* Administracion de Usuarios */}
        {/* -------------------------- */}
        <Route path="/administracion-usuarios" element={<AdminUsers />} />
        <Route path="/administracion-usuarios/usuarios" element={<Users />} />
        <Route path="/administracion-usuarios/permisos" element={<Permisos />} />
        <Route path="/administracion-usuarios/roles" element={<Roles />} />

        {/* Administracion de Parametros */}
        {/* -------------------------- */}
        <Route path="/administracion-parametros" element={<AdminParam />} />
        {<Route path="/administracion-parametros/tipo-de-parametros" element={<ParameterTypesPage />} />}
        {<Route path="/administracion-parametros/parametros" element={<ParametersPage />} />}
        {<Route path="/administracion-parametros/secuenciador" element={<SequencersPage />} />}
        {<Route path="/administracion-parametros/puestos" element={<PositionsPage />} />}
        {<Route path="/administracion-parametros/pais" element={<CountriesPage />} />}

        {/* Administracion de Empleados */}
        {/* -------------------------- */}
        <Route path="/administracion-empleados" element={<AdminEmployees />} />
        {<Route path="/administracion-empleados/empleados" element={<EmployeesPage />} />}
        {<Route path="/administracion-empleados/cargas-de-familia" element={<LoadFamilyPage />} />}
        {<Route path="/administracion-empleados/externos" element={<ExternalPage />} />}
        {<Route path="/administracion-empleados/historial-licencias" element={<LicensesPage />} />}
        {<Route path="/administracion-empleados/cambios-puestos" element={<PositionChangesPage />} />}
        {<Route path="/administracion-empleados/ingreso-caido" element={<ExcludedIncomePage />} />}

        {/* Reportes */}
        {/* -------------------------- */}
        <Route path="/reportes" element={<Reports />} />
        {<Route path="/reportes/vuelta-al-colegio" element={<BackToSchoolReportPage />} />}
        {<Route path="/reportes/central-costo" element={<CostCenterReportPage />} />}
        {<Route path="/reportes/historial-laboral" element={<EmploymentHistoryReportPage />} />}
        {<Route path="/reportes/international" element={<InternationalDataCollectionReportPage />} />}
        {<Route path="/reportes/externos" element={<ExternalReportPage />} />}
        {<Route path="/reportes/directores" element={<DirectorsReportPage />} />}
        {<Route path="/reportes/generico" element={<GenericReportPage />} />}
        {<Route path="/reportes/licencias" element={<LicencesReportPage />} />}


      </Routes>
    </>
  )
}

export default App
