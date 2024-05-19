import React from "react"
import './Input.css'

function Input(props){
    let classNames = props.className ? props.className : "";
    if(props.mandatory){
        classNames += " mandatory";
    }

    return(
        <div className="containerInput">
            <p>{props.label} {props.mandatory && <span>*</span>}</p>
            <input
            type={props.type}
            name={props.name}
            value={props.value}
            onChange={props.onChange}
            placeholder={props.placeholder}
            className={classNames}/>
        </div>
    )
}

export default Input