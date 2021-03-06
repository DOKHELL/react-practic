import React from "react";
import './Input.scss';


function isInvalid({valid, touched, shouldValidate}) {
    return !valid && shouldValidate && touched;
}


const Input = props => {
    const inputType = props.type || 'text';
    const cls = [
        'Input'
    ];
    const htmlFor = `${inputType}-${Math.random()}`;

    if (isInvalid(props)) {
        cls.push('invalid');
    }


    return (
        <div className={cls.join(' ')}>
            <label htmlFor={htmlFor}>
                {props.label}
            </label>
            <input
                type={inputType}
                value={props.value}
                id={htmlFor}
                onChange={props.onChange}
            />
            { isInvalid(props) ? <span>{props.errorMessage || 'Enter right value!'}</span> : null}
        </div>
    )
};

export default Input;