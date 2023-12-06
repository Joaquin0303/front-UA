import React, { useState, useEffect } from "react";
import i18n from "../../localization/i18n";
import { getPermissions } from "../../services/PermissionServices";

const InputPermission = ({ name, value, disabled, updateFormData }) => {

    const [permissionList, setPermissionList] = useState([]);
    const [permissionsSelected, setPermissionsSelected] = useState(value ? value : []);

    const handlePermissionChange = (e, id) => {
        if (e.target.checked) {
            setPermissionsSelected([...permissionsSelected, {
                id: id
            }]);
        } else {
            setPermissionsSelected(permissionsSelected.filter(p => p.id != id));
        }
    }

    useEffect(() => {
        updateFormData(name, permissionsSelected);
    }, [permissionsSelected]);

    useEffect(() => {
        getPermissions().then(result => {
            if (result.list)
                setPermissionList(result.list.filter(d => d.activo == true));
        })
    }, []);

    return (
        <>
            <div className='form-group'>
                <label className='label' htmlFor="id">Permisos</label>
                {permissionList.map((p, i) => {
                    return <div key={i} className='form-check form-switch'>
                        <label className='label' htmlFor="id">{i18n.t(p.descripcion)}</label>
                        <input disabled={disabled} type='checkbox' className='form-check-input' value='' defaultChecked={permissionsSelected.find(s => s.id == p.id)} onChange={(e) => { handlePermissionChange(e, p.id) }} />
                    </div>
                })}
            </div>

        </>
    )
}

export default InputPermission;