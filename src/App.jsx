import { Routes, Route, Link  } from "react-router-dom";
import {Home} from './components/Home';
import {AdminUsers} from './components/AdminUsers';
import Users from './components/Users';
import {Permisos} from './components/Permisos';

import logoempresa from './img/logo-empresa.png';
import logoout from './img/logout.png';
import './styles/header_and_nav.css';
import './index.css';

function App() {

  return (
    <>
    <header>
      <div className="header">
        <img src={logoempresa} id="logo-empresa" alt="" />
        <div className="close-sesion">
          <a href=""><img src={logoout} alt="" />Cerrar Sesion</a>
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
      <Route path="/" element={<Home/>}/>
      <Route path="/Administración usuarios" element={<AdminUsers/>}/>
      <Route path="/Administración usuarios/Usuarios" element={<Users/>}/>
      <Route path="/Administración usuarios/Permisos" element={<Permisos/>}/>
    </Routes>
    </>
  )
}

export default App
