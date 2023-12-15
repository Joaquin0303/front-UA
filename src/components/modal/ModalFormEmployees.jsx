import React from 'react'
import '../../styles/Modal.css'

export const ModalFormEmployees = () => {
    return (
        <div class='modal-container'>
            <div class='modals'>

                <div class="accordion">
                    <div class="section">Carga de Datos Mínimos</div>
                    <div class="content" id="datosMin">
                        <label for="">Nombre</label>
                        <input type="text" id="nombre1" name="nombre1"></input>
                    </div>

                    <div class="section">Datos Personales</div>
                    <div class="content" id="DatosPer">
                        <label for="">Apellido</label>
                        <input type="text" id="apellido" name="apellido"></input>
                    </div>

                    <div class="section">Datos Laborales</div>
                    <div class="content" id="DatosLab">
                        <label for="">Puesto</label>
                        <input type="text" id="puesto" name="puesto"></input>
                    </div>

                    <div class='botones-conf-close'>
                        <button type='submit' class='btns' onClick={submitForm}>Confirmar</button>
                        <button class='btns-close'>Cerrar</button>
                    </div>
                </div>

            </div>
        </div>
    )
}
