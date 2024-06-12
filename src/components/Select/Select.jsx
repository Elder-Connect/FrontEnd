import React from 'react';
import './Select.css';

const Select = ({ label, value, onChange, options, className, mandatory, name }) => {
    let classNames = className ? className : "";
    if(mandatory){
        classNames += " mandatory";
    }

    return (
        <div>
            <p>{label} {mandatory && <span>*</span>}</p>
            <select name={name} value={value} onChange={onChange}>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Select;