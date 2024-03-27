import { useEffect, useState } from 'react'

const InputCheckbox = ({ validation, name, value, updateFormData, disabled, list }) => {

    const r0 = { pattern: '(?=.*?[A-Z])', nopattern: '', rule: 'Mayúsculas (A...Z)', norule: '' };
    const r1 = { pattern: '(?=.*?[a-z])', nopattern: '', rule: 'Minúsculas (a...z)', norule: '' };
    const r2 = { pattern: '(?=.*?[0-9])', nopattern: '', rule: 'Dígitos (0...9)', norule: '' };
    const r3 = { pattern: '(?=.*?[#?!@$%^&*-])', nopattern: '', rule: 'Símbolos (!...?)', norule: '' };
    const r4 = { pattern: '.{8,16}', nopattern: '.*', rule: 'Longitud (8 a 16)', norule: '' };

    const ruleDefinition = [r0, r1, r2, r3, r4];

    const [rules, setRules] = useState([
        {
            name: r0,
            active: !value || value.includes(r0.rule)
        },
        {
            name: r1,
            active: !value || value.includes(r1.rule)
        },
        {
            name: r2,
            active: !value || value.includes(r2.rule)
        },
        {
            name: r3,
            active: !value || value.includes(r3.rule)
        },
        {
            name: r4,
            active: !value || value.includes(r4.rule)
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
            let resultPattern = '^';
            let resultRule = '';
            rules.forEach(rule => {
                if (rule.active) {
                    resultPattern += rule.name.pattern;
                    resultRule += rule.name.rule + ", ";
                } else {
                    console.log('rule', rule.name)
                    resultPattern += rule.name.nopattern;
                    if (rule.name.norule)
                        resultRule += rule.name.norule + ", ";
                }
            });
            resultPattern += '$';
            resultRule = resultRule.slice(0, -2);
            updateFormData('patron', resultPattern);
            updateFormData('regla', resultRule);
            setRuleResult(resultPattern);
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
                    //updatedValues[value].name = '';
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
        <>
            <div className='form-check form-switch'>
                <label className='label' htmlFor="id">Mayúsculas (A...Z)</label>
                <input className='form-check-input' value="0" type="checkbox" onChange={updateRule} checked={rules[0].active} />
            </div>
            <div className='form-check form-switch'>
                <label className='label' htmlFor="id">Minúsculas (a...z)</label>
                <input className='form-check-input' value="1" type="checkbox" onChange={updateRule} checked={rules[1].active} />
            </div>
            <div className='form-check form-switch'>
                <label className='label' htmlFor="id">Dígitos (0...9)</label>
                <input className='form-check-input' value="2" type="checkbox" onChange={updateRule} checked={rules[2].active} />
            </div>
            <div className='form-check form-switch'>
                <label className='label' htmlFor="id">Símbolos (!...?)</label>
                <input className='form-check-input' value="3" type="checkbox" onChange={updateRule} checked={rules[3].active} />
            </div>
            <div className='form-check form-switch'>
                <label className='label' htmlFor="id">Longitud (8 a 16)</label>
                <input className='form-check-input' value="4" type="checkbox" onChange={updateRule} checked={rules[4].active} />
            </div>
            <p id="error"></p>

        </>
    )
}

export default InputCheckbox;