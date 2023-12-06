import React, { useState, useEffect } from "react";
import i18n from "../../localization/i18n";
import { getRoles } from "../../services/RoleServices";

const InputRole = ({ name, value, disabled, updateFormData }) => {

    const [roleList, setRoleList] = useState([]);
    const [rolesSelected, setRolesSelected] = useState(value ? value : []);

    const handleRoleChange = (e, codigo) => {
        if (e.target.checked) {
            setRolesSelected([...rolesSelected, {
                codigo: codigo
            }]);
        } else {
            setRolesSelected(rolesSelected.filter(p => p.codigo != codigo));
        }
    }

    useEffect(() => {
        updateFormData(name, rolesSelected);
    }, [rolesSelected]);

    useEffect(() => {
        getRoles().then(result => {
            if (result.list)
                setRoleList(result.list.filter(d => d.activo == true));
        })
    }, []);

    return (
        <>
            <div className='form-group'>
                <label className='label' htmlFor="id">Roles</label>
                {roleList.map((r, i) => {
                    return <div key={i} className='form-check form-switch'>
                        <label className='label' htmlFor="id">{i18n.t(r.descripcion)}</label>
                        <input disabled={disabled} type='checkbox' className='form-check-input' value='' defaultChecked={rolesSelected.find(s => s.codigo == r.codigo)} onChange={(e) => { handleRoleChange(e, r.codigo) }} />
                    </div>
                })}
            </div>
        </>
    )
}

export default InputRole;