import React from "react";
import i18n from "../../localization/i18n";

const ModalView = ({ viewConfiguration, pageName, data, closeModal, onSubmitForm, action }) => {

    const submitForm = () => {
        try {
            onSubmitForm(data);
            closeModal();
        } catch (error) {
            console.error('error', error);
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
            //if ( (data.active && viewConfiguration.activeFields.includes(key)) || (!data.active && viewConfiguration.inactiveFields.includes(key)) ) {

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
                    if (pageName != 'Permisos') {
                        return createCellListInfo(i, key, data[key]);
                    }
                    break;
                case 'permisos':
                    return createCellInfo(i, key, data[key] && data[key].id > 0 ? data[key].descripcion : '');
                case 'codigoPuestoAlQueReporta':
                    return createCellInfo(i, key, data[key] && data[key].id > 0 ? data[key].descripcion : '');
                case 'empleado':
                    return createCellInfo(i, key, data[key] && data[key].id > 0 ? data[key].numeroLegajo + " - " + data[key].apellido + " " + data[key].nombre : '');
                default:
                    if (key != 'id' && key != 'activo' && key != 'fechaAlta'
                        && (pageName != 'parameterType' || key != 'codigo')
                        && (pageName != 'Roles' || key != 'codigo')
                    ) {
                        if (key.startsWith('fechaBaja') && data[key]) {
                            return createCellInfo(i, key, data[key]);
                        } else if (typeof value == 'string' || typeof value == 'number') {
                            return createCellInfo(i, key, data[key]);
                        }
                    }
            }
            //}
        });
        return cells;
    }

    return (
        <div className='modal-container'>
            <div className='modals'>
                <div>
                    <div className='modal-title'>Detalle</div>
                    <div className="modals-content">
                        <div className='form-view'>
                            <div className="form-field-container">
                                {createCell()}
                            </div>
                        </div>
                    </div>
                    <div className='modal-buttons'>
                        {action && action.includes('activate') && (
                            <button type='submit' className='btns' onClick={submitForm}>Confirmar</button>
                        )}
                        <button className='btns-close' onClick={closeModal}>Cerrar</button>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default ModalView;