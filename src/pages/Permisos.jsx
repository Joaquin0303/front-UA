import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ModalAddSwitch from '../components/Modal-add-switch';
import { getPermissions } from '../services/PermissionServices';
import { getUsers } from '../services/UserServices';
import '../styles/abm.css';

import { FaPlus } from 'react-icons/fa';
import Table from '../components/tabla/Table';

export const Permisos = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [permissionList, setPermissionList] = useState([]);

    useEffect(() => {
        getPermissions().then(result => {
            setPermissionList(result.list);
        });
    }, []);

    return (
        <Table dataList={permissionList} />
    );
};