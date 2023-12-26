import '../styles/Home.css'
import ImgFondoHome from '../img/fondo-RRHH.jpg'

export const Home = () => 
<div className='bloque_principal'>
    <h1>Bienvenido al Sistema de Recursos Humanos</h1>
    <div className='container-img'>
        <img className='imgHome' src={ImgFondoHome} alt="Imagen Home" />
    </div>
</div>