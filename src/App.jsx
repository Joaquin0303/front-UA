import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from "react-router-dom";
import { Home } from './pages/Home';
import { AdminUsers } from './components/AdminPages';
import { AdminParam } from './components/AdminPages';
import Users from './pages/Users';
import { Permisos } from './pages/Permisos';

import logoempresa from './img/logo-empresa.png';
import logoout from './img/logout.png';
import './styles/header_and_nav.css';
import './index.css';
import './App.css';
import Login from './components/Login';
import useToken from './useToken';

function App() {

  const { token, setToken } = useToken();

  if (!token) {
    // Uncomment to enable Login
    // return <Login setToken={setToken} />
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
          <Link to="/Administración usuarios">Administración Usuarios</Link>
          <Link to="/Administración Parámetros">Administración Parámetros</Link>
          <Link to="/Administración Empleados">Administración Empleados</Link>
          <Link to="/Reportes">Reportes</Link>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Administracion de Usuarios */}
        {/* -------------------------- */}
        <Route path="/Administración usuarios" element={<AdminUsers />} />
        <Route path="/Administración usuarios/Usuarios" element={<Users />} />
        <Route path="/Administración usuarios/Permisos" element={<Permisos />} />
        {/*<Route path="/Administración usuarios/Roles" element={<Roles/>}/>*/}

        {/* Administracion de Usuarios */}
        {/* -------------------------- */}
        <Route path="/Administración Parámetros" element={<AdminParam />} />
        {/*<Route path="/Administración Parámetros/Tipo de Parametros" element={<TipoParametros/>}/>*/}
        {/*<Route path="/Administración Parámetros/Parametros" element={<Parametros/>}/>*/}
        {/*<Route path="/Administración Parámetros/Secuenciador" element={<Secuenciador/>}/>*/}
        {/*<Route path="/Administración Parámetros/Puestos" element={<Puestos/>}/>*/}
        {/*<Route path="/Administración Parámetros/Pais" element={<Pais/>}/>*/}
      </Routes>
    </>
  )
}

export default App
