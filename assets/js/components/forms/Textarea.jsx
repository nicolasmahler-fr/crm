import React from 'react';

const textarea = ({
    name,
    label,
    value,
    onChange,
    placeholder = "",
    error = ''
}) => (
        <div className="form-group p-2">
                <label htmlFor={name}>{label}</label>
                <textarea
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder || label}
                    name={name}
                    id={name}
                    className={"form-control" + (error && " is-invalid")}
                />
                {error && <p className="">{error}</p>}
        </div>
    );
 
export default textarea;