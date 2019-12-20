import React from 'react';
import './MenuToggle.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faBars } from '@fortawesome/free-solid-svg-icons';

const MenuToggle = (props) => {
    const cls = [
        'MenuToggle',
    ];
    let ico = '';

    if (props.isOpen) {
        cls.push('open')
    }
    if (props.isOpen) {
        ico = faTimes;
    } else {
        ico = faBars;
    }


    return (
        <FontAwesomeIcon onClick={props.onToggle} className={cls.join(' ')} icon={ico} />
    )
};

export default MenuToggle;