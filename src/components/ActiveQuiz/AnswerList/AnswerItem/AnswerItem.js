import React from "react";
import './AnswerItem.scss';

const AnswerItem = props => {
    const classes = ['AnswerItem'];
    if (props.state) {
        classes.push(props.state)
        console.log(classes)
    }
    return (
        <li
            className={classes.join(' ')}
            onClick={() => props.onAnswerClick(props.answer.id)}
        >
            {props.answer.text}
        </li>
    )
};

export default AnswerItem;