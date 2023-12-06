import React, { useState, useEffect } from 'react';
import { getUsers, addUser, editUser, removeUser } from '../services/UserServices';
import { assignRoleToUser } from '../services/RoleServices';
import ABMPage from './ABMPage';

const UserModel = {
    numeroLegajo: '',
    nombreUsuario: '',
    roles: [],
    fechaAlta: '',
    activo: true
}

const Users = () => {
    const [userList, setUserList] = useState([]);
    const [activeUsers, setActiveUsers] = useState(true);

    useEffect(() => {
        loadUsers();
    }, [activeUsers]);

    const loadUsers = () => {
        getUsers().then(result => {
            console.log('User List=', result.list);
            if (result.list)
                setUserList(result.list.filter(d => d.activo == activeUsers));
        });
    }

    const onAdd = (data) => {
        addUser(data.numeroLegajo, data.nombreUsuario, data.activo, data.roles, data.fechaAlta).then(result => {
            console.log('user saved=', result);
            data.roles && data.roles.forEach(userRole => {
                assignRoleToUser(userRole.codigo, result.model.id).then(result => {
                    console.log('role user saved=', result);
                    loadUsers();
                });
            });
            if (!data.roles || data.roles.length == 0) {
                loadUsers();
            }
        });
    }

    const onEdit = (data) => {
        editUser(data.id, data.numeroLegajo, data.nombreUsuario, data.activo, data.roles).then(result => {
            console.log('user edited=', result);
            data.roles && data.roles.forEach(userRole => {
                assignRoleToUser(userRole.codigo, result.model.id).then(result => {
                    console.log('role user saved=', result);
                    loadUsers();
                });
            });
            if (!data.roles || data.roles.length == 0) {
                loadUsers();
            }
        });
    }

    const onRemove = (data) => {
        removeUser(data.id).then(result => {
            console.log('removed=', result);
            loadUsers();
        });
    }

    return (
        <ABMPage pageName="Usuarios" dataList={userList} dataModel={UserModel} onAdd={onAdd} onEdit={onEdit} onRemove={onRemove} searchKey='nombreUsuario' setActive={setActiveUsers} />
    );
}

/*
import '../styles/abm.css'
import React, { useEffect, useState } from 'react';
import { Routes, Route, Link } from "react-router-dom";
import axios from 'axios'

import { IoEyeSharp } from "react-icons/io5";
import { BsFillPencilFill } from 'react-icons/bs'
import { FaArrowDown } from "react-icons/fa";
import { FaUserPlus } from "react-icons/fa";

import Modal from '../components/Modal-add';
import ModalView from '../components/Modal-view'
import ModalEdit from '../components/Modal-edit';
import ModalDelete from '../components/Modal-delete'

const Users = () => {
    const [modalOpen, setModalOpen] = useState(false)
    const [viewModalOpen, setViewModalOpen] = useState(false)
    const [editModalOpen, setEditModalOpen] = useState(false)
    const [deleteModalOpen, setDeleteModalOpen] = useState(false)
    const [selectedUser, setSelectedUser] = useState(null);
    const [columns, setColumns] = useState([])
    const [records, setRecords] = useState([])
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredRecords, setFilteredRecords] = useState([]);

    //Agrega nuevo usuario
    const addNewUser = (newUserData) => {
        setRecords([...records, newUserData]);
        setModalOpen(false);
    };

    //Edita Usuario
    const handleEditSubmit = (formData) => {
        setRecords((prevRecords) => {
            const updatedRecords = prevRecords.map((record) => {
                if (record.id === formData.id) {
                    return formData;
                }
                return record;
            });
            return updatedRecords;
        });
        setEditModalOpen(false);
    };

    //Borra usuario
    const handleDeleteUser = () => {
        setRecords((prevRecords) => {
            const updatedRecords = prevRecords.filter((record) => record.id !== selectedUser.id);
            return updatedRecords;
        });
        setDeleteModalOpen(false);
    };

    //Buscador-----------------------
    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/users')
            .then(response => {
                setColumns(Object.keys(response.data[0]))
                setRecords(response.data)
                setFilteredRecords(response.data);
            })
    }, [])

    useEffect(() => {
        const filtered = records.filter((record) => {
            const lowerCaseSearchTerm = searchTerm.toLowerCase();
            return (
                record.name.toLowerCase().includes(lowerCaseSearchTerm) ||
                record.id.toString().includes(lowerCaseSearchTerm)
            );
        });

        setFilteredRecords(filtered);
    }, [searchTerm, records]);
    //--------------------------------

    return (
        <div className='bloque-principal'>
            <div className="bloque-secundario">
                <Link to="/">Inicio</Link><p>/ Usuarios</p>
            </div>
            <div className='bloque-search'>
                <div className='search'>
                    <input type="text" className='search-input' placeholder='Buscar' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                    <i class="fa-solid fa-magnifying-glass icon"></i>
                </div>
                <button className='btns-add' onClick={() => setModalOpen(true)}><FaUserPlus />Alta Usuario</button>
            </div>
            <div className='table-wrapper'>
                <table className='table'>
                    <thead >
                        <tr>
                            {columns.map((c, i) => (
                                <th key={i}> {c} </th>
                            ))}
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody className='expand'>
                        {
                            filteredRecords.map((d) => (
                                <tr key={d.id}>
                                    <td>{d.id}</td>
                                    <td >{d.name}</td>
                                    <td>{d.username}</td>
                                    <td>{d.email}</td>
                                    <td>{d.address.street}</td>
                                    <td>{d.phone}</td>
                                    <td>{d.website}</td>
                                    <td>{d.company.name}</td>
                                    <td className='expand'>
                                        <span className='actions'>
                                            <div title="Ver" onClick={() => { setSelectedUser(d); setViewModalOpen(true) }}>
                                                <IoEyeSharp />
                                            </div>
                                            <div title="Editar">
                                                <BsFillPencilFill onClick={() => { setSelectedUser(d); setEditModalOpen(true) }} />
                                            </div>
                                            <div title="Dar de Baja" onClick={() => { setSelectedUser(d); setDeleteModalOpen(true) }}>
                                                <FaArrowDown />
                                            </div>
                                        </span>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
            {modalOpen && <Modal closeModal={() => { setModalOpen(false) }} onSubmit={addNewUser} />}
            {viewModalOpen && <ModalView user={selectedUser} closeModal={() => setViewModalOpen(false)} />}
            {editModalOpen && <ModalEdit user={selectedUser} closeModal={() => setEditModalOpen(false)} onSubmit={handleEditSubmit} />}
            {deleteModalOpen && <ModalDelete user={selectedUser} closeModal={() => setDeleteModalOpen(false)} onDelete={handleDeleteUser} />}

        </div>

    )
}
*/

export default Users;

