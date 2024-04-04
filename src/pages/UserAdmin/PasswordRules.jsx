import React, { useEffect, useState } from 'react';
import '../../styles/AdminUsers.css';
import { getCurrentPaswordSecurity } from '../../services/LoginAndSecurityServices';


const PasswordRules = ({ size }) => {

    const [ruleDescription, setRuleDescription] = useState([]);

    useEffect(() => {
        getCurrentPaswordSecurity().then(rule => {
            console.log(rule.model.regla.split(','))
            if (rule && rule.model && rule.model.regla)
                setRuleDescription(rule.model.regla.split(','));
        })
    }, []);

    return (
        <div className={size === 'small' ? 'password-rules-small' : 'password-rules'} >
            <p>Debe estar compuesta por la siguiente combinación caracteres:</p>
            {ruleDescription.map(rd => {
                return <p>{rd}</p>
            })}

        </div>
    )
}

export default PasswordRules;