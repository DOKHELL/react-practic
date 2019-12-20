import React from "react";
import './BackDrop.scss';


const BackDrop = (props) => {
    return (
        <div className={'Backdrop'} onClick={props.onClick}></div>
    )
}

export default BackDrop;