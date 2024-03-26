import { useEffect, useState } from 'react'

const InputCheckbox = ({ validation, name, value, updateFormData, disabled, list }) => {

    const r0 = { pattern: '(?=.*?[A-Z])', rule: 'Mayúsculas (A...Z)' };
    const r1 = { pattern: '(?=.*?[a-z])', rule: 'Minúsculas (a...z)' };
    const r2 = { pattern: '(?=.*?[0-9])', rule: 'Dígitos (0...9)' };
    const r3 = { pattern: '(?=.*?[#?!@$%^&*-])', rule: 'Símbolos (!...?)' };
    const r4 = { pattern: '.{8,16}', rule: 'Longitud (8 a 16)' };

    const ruleDefinition = [r0, r1, r2, r3, r4];

    const [rules, setRules] = useState([
        {
            name: r0,
            active: true
        },
        {
            name: r1,
            active: true
        },
        {
            name: r2,
            active: true
        },
        {
            name: r3,
            active: true
        },
        {
            name: r4,
            active: true
        }
    ]);
    const [ruleResult, setRuleResult] = useState("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,16}$");

    useEffect(() => {
        createRule();
    }, [rules]);

    const getRuleLength = () => {
        let rLength = 0;
        rules.forEach(r => { if (r.active) rLength++ });
        return rLength;
    }

    const createRule = () => {
        if (getRuleLength() > 0) {
            let result = '^';
            rules.forEach(rule => {
                if (rule.name.pattern)
                    result += rule.name.pattern;
            });
            result += '$';
            updateFormData('patron', result);
            //updateFormData('regla', result);
            setRuleResult(result);
        } else {
            updateFormData('patron', "");
            setRuleResult("");
        }
    }

    const updateRule = (e) => {
        const { value, checked: isChecked } = e.target;

        if (isChecked) {
            console.log(`Check ${value}`);
            setRules((prevValues) => {
                const updatedValues = [...prevValues];
                updatedValues[value].name = ruleDefinition[value];
                updatedValues[value].active = true;
                console.log('updatedValues', updatedValues)
                return updatedValues;
            });
        } else {
            if (getRuleLength() > 1) {
                console.log(`Uncheck ${value}`);
                setRules((prevValues) => {
                    const updatedValues = [...prevValues];
                    updatedValues[value].name = '';
                    updatedValues[value].active = false;
                    console.log('updatedValues', updatedValues)
                    return updatedValues;
                });
            } else {
                alert('Debe seleccionar al menos una regla');
            }
        }
    };

    return (
        <div>
            <input value="0" type="checkbox" onChange={updateRule} checked={rules[0].active} />Mayúsculas (A...Z)
            <br />
            <input value="1" type="checkbox" onChange={updateRule} checked={rules[1].active} />Minúsculas (a...z)
            <br />
            <input value="2" type="checkbox" onChange={updateRule} checked={rules[2].active} />Dígitos (0...9)
            <br />
            <input value="3" type="checkbox" onChange={updateRule} checked={rules[3].active} />Símbolos (!...?)
            <br />
            <input value="4" type="checkbox" onChange={updateRule} checked={rules[4].active} />Longitud (8 a 16)
            <br />
            <p id="error"></p>
            <div>
                <label>Regla resultante:</label>
                <input type="text" contentEditable={false} value={ruleResult} readOnly={true} />
            </div>
        </div>
    )
}

export default InputCheckbox;