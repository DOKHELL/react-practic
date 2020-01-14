import React from "react";
import './TodoInput.scss';

const TodoInput = props => {
    const inputType = props.type || 'text',
          inputPlaceholder = props.placeholder || '',
          cls = ['todoInput'];
    return (
        <React.Fragment>
            <input
                type={inputType}
                value={props.value}
                className={cls.join(' ')}
                placeholder={inputPlaceholder}
                onKeyUp={props.onKeyUp}
                onChange={props.onChange}
            />
            { props.invalid ? <span className={'todoError-message'}>{props.errorMessage || 'Введите более 4 символов!'}</span> : null}
        </React.Fragment>
    )
};

export default TodoInput;