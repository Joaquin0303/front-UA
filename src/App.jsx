import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from "react-router-dom";
import { Home } from './pages/Home';
import { AdminUsers } from './components/AdminPages';
import { AdminParam } from './components/AdminPages';
import Users from './pages/Users';
import { Permisos } from './pages/Permisos';
import Roles from './pages/Roles';

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
            <a href="" onClick={() => setToken(null)}><img src={logoout} alt="" />Cerrar Sesion</a>
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

        {/* Administracion de Usuarios */}
        {/* -------------------------- */}
        <Route path="/administracion-parametros" element={<AdminParam />} />
        {<Route path="/administracion-parametros/tipo-de-parametros" element={<ParameterTypesPage />} />}
        {<Route path="/administracion-parametros/parametros" element={<ParametersPage />} />}
        {<Route path="/administracion-parametros/secuenciador" element={<SequencersPage />} />}
        {<Route path="/administracion-parametros/puestos" element={<PositionsPage />} />}
        {<Route path="/administracion-parametros/pais" element={<CountriesPage />} />}
      </Routes>
    </>
  )
}

export default App
