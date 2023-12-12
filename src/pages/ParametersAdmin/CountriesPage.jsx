import React, { useState, useEffect } from 'react';
import { addCountry, getCountries, removeCountry, updateCountry } from '../../services/CountryServices';
import ABMPage from '../ABMPage';

const CountryModel = {
    codigo: '',
    descripcion: '',
    secuenciador: {
        id: 1
    },
    activo: true
}

const CountriesPage = () => {
    const [countryList, setCountryList] = useState([]);
    const [statusActive, setStatusActive] = useState(true);

    useEffect(() => {
        loadCountries();
    }, [statusActive]);

    const loadCountries = () => {
        getCountries().then(result => {
            if (result.list)
                setCountryList(result.list.filter(d => d.activo == statusActive));
        });
    }

    const onAdd = (data) => {
        addCountry(data.codigo, data.descripcion, data.secuenciador, data.activo).then(result => {
            console.log('saved=', result);
            loadCountries();
        });
    }

    const onEdit = (data) => {
        updateCountry(data.id, data.descripcion, data.codigo, data.secuenciador, data.activo).then(result => {
            console.log('edited=', result);
            loadCountries();
        });
    }

    const onRemove = (data) => {
        removeCountry(data.id).then(result => {
            console.log('removed=', result);
            loadCountries();
        });
    }

    const matchHandler = (data, searchTerm) => {
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        return data.descripcion?.toLowerCase().includes(lowerCaseSearchTerm) ||
            data.pais?.toLowerCase().includes(lowerCaseSearchTerm) ||
            data.secuenciador?.codigo?.toLowerCase().includes(lowerCaseSearchTerm);
    }

    return (
        <ABMPage pageName="paises" dataList={countryList} dataModel={CountryModel} onAdd={onAdd} onEdit={onEdit} onRemove={onRemove} matchHandler={matchHandler} setActive={setStatusActive} />
    );
}

export default CountriesPage;