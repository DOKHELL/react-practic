import React from "react";

const TodoItem = props => {
    return props.value.map((item, index) => {
        return (
                <li key={index}>{item}</li>
            )
    })
};

export default TodoItem;