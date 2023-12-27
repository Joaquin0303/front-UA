import React from "react";
import i18n from "../../localization/i18n";

const DynamicView = ({ viewConfiguration, data, closeModal, onSubmitForm }) => {

    const submitForm = () => {
        try {
            onSubmitForm(data);
            closeModal();
        } catch (error) {
            console.error('error', error);
        }
    }

    const showInfo = (actionName) => {
        if (data.activo != undefined) {
            return (viewConfiguration.activeFields.includes(actionName) && data.activo) ||
                (viewConfiguration.inactiveFields.includes(actionName) && !data.activo);
        } else if (data.codigoEstadoEmpleado) {
            return (viewConfiguration.activeFields.includes(actionName) && 87 == data.codigoEstadoEmpleado.id) ||
                (viewConfiguration.inactiveFields.includes(actionName) && [88, 89].includes(data.codigoEstadoEmpleado.id));
        } else {
            return false;
        }
    }

    const createCellInfo = (cellId, label, value) => {
        return (
            <>
                {value && <div key={cellId} className='form-group'>
                    <label className='label' htmlFor="id">{i18n.t(label)}</label>
                    <div className='form-p'>{value}</div>
                </div>}
            </>
        )
    }

    const createCellListInfo = (cellId, label, listValue) => {
        return (
            <>
                {listValue && listValue.length > 0 && <div key={cellId} className='form-group'>
                    <label className='label' htmlFor="id">{i18n.t(label)}</label>
                    <ul>
                        {listValue.map(v => {
                            return <li>
                                <div className='form-p'>{v.descripcion}</div>
                            </li>
                        })}
                    </ul>
                </div>}
            </>
        )
    }

    const createCell = () => {
        const cells = Object.keys(data).map((key, i) => {
            if (showInfo(key)) {

                const value = data[key];

                switch (key) {
                    case 'secuenciador':
                        return createCellInfo(i, key, data[key] && data[key].id > 0 ? data[key].codigo : '');
                    case 'tipoParametro':
                        return createCellInfo(i, key, data[key] && data[key].id > 0 ? data[key].descripcion : '');
                    case 'codigoDireccion':
                        return createCellInfo(i, key, data[key] && data[key].id > 0 ? data[key].descripcion : '');
                    case 'codigoGerencia':
                        return createCellInfo(i, key, data[key] && data[key].id > 0 ? data[key].descripcion : '');
                    case 'codigoJefatura':
                        return createCellInfo(i, key, data[key] && data[key].id > 0 ? data[key].descripcion : '');
                    case 'codigoCategoria':
                        return createCellInfo(i, key, data[key] && data[key].id > 0 ? data[key].descripcion : '');
                    case 'codigoCentroDeCosto':
                        return createCellInfo(i, key, data[key] && data[key].id > 0 ? data[key].descripcion : '');
                    case "codigoPais":
                        return createCellInfo(i, key, data[key] && data[key].id > 0 ? data[key].descripcion : '');
                    case 'roles':
                        return createCellListInfo(i, key, data[key]);
                    case 'permisos':
                        return createCellListInfo(i, key, data[key]);
                    case 'codigoPuestoAlQueReporta':
                        return createCellInfo(i, key, data[key] && data[key].id > 0 ? data[key].descripcion : '');
                    case 'empleado':
                        return createCellInfo(i, key, data[key] && data[key].id > 0 ? data[key].numeroLegajo + " - " + data[key].apellido + " " + data[key].nombre : '');
                    case 'tipoLicencia':
                        return createCellInfo(i, key, data[key] && data[key].id > 0 ? data[key].descripcion : '');
                    default:
                        return createCellInfo(i, key, data[key]);
                }
            }
        });
        return cells;
    }

    return (
        <div>
            <div className="modals-content">
                <div className='form-view'>
                    <div className="form-field-container">
                        {createCell()}
                    </div>
                </div>
            </div>
            <div className='modal-buttons'>
                {onSubmitForm && <button type='submit' className='btns' onClick={submitForm}>Confirmar</button>}
                {<button className='btns-close' onClick={closeModal}>Cerrar</button>}
            </div>
        </div>
    );

}

export default DynamicView;